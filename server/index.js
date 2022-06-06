/*
TODO

Main loop that runs once a second and adjusts times. Then deletes when times run out
*/

const PORT = process.env.PORT?? 7000;

const GB_TO_BYTES = Math.pow(1024, 3);
const fs = require("fs/promises");
const fileUpload = require("express-fileupload");
const mime = require("mime-types");

const path = require("path");
path.sandboxPath = path => {
	let index = path.indexOf(__dirname);
	if (index != 0) { // The base path must appear at the start of the path
		throw new Error(`Attempted to access a file or folder outside of the local path.\nPath:\n${path}`);
	}
	return path;
};
path.accessLocal = localPath => path.sandboxPath(path.join(__dirname, localPath));
path.accessOutsideLocal = localPath => path.join(__dirname, localPath);

const express = require("express");
const app = express();


const readline = require("readline");
const { type } = require("os");
const cli = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

const state = {
	rooms: {},
	roomCount: 0,
	totalSize: 0,

	cleaningUp: false
};
let config; // It'll be loaded from the disk

const loadConfig = async _ => {
	config = JSON.parse(await fs.readFile(path.accessLocal("config.json")));
	let max = config.limits.max;
	if (max.fileSize != -1) max.fileSize *= GB_TO_BYTES;
	max.totalFileSize *= GB_TO_BYTES;
};

const cleanUp = async _ => {
	state.cleaningUp = true;
	const shareFolder = path.accessLocal("sharedFiles");
	
	let folderInfo;
	try {
		folderInfo = await fs.stat(shareFolder);
	}
	catch (error) {
		await fs.mkdir(shareFolder);
		folderInfo = await fs.stat(shareFolder);
	}


	if (! folderInfo.isDirectory()) {
		throw new Error("The name for the needed directory \"sharedFiles\" has been taken by a file.");
	}
	let toDelete = await fs.readdir(shareFolder);

	for (let folderNameShort of toDelete) {
		folderName = path.sandboxPath(path.join(shareFolder, folderNameShort));

		if ((await fs.stat(folderName)).isDirectory()) {
			await fs.rm(folderName, {
				recursive: true
			});
		}
	}

	state.cleaningUp = false;
};

const startServer = _ => {
	app.use(express.static("../static/build/"));

	const getOrCreateRoom = async (roomName, create=true) => {
		let room = state.rooms[roomName];
		if (room == null) {
			if (! create) return null;

			const max = config.limits.max.rooms;
			let roomID = 0;
			while (roomID < max) {
				let usingID = false;
				for (let i in state.rooms) {
					if (state.rooms[i].id == roomID) {
						usingID = true;
						break;
					}
				}

				if (! usingID) { // Make sure none of the rooms are using this id
					break;
				}
				roomID++;
			}
			if (roomID == max) return null;

			room = {
				id: roomID,
				timeLeft: 0, // It'll be set in a second
				files: []
			};
			state.rooms[roomName] = room;

			// Make the folder if it doesn't exist. Or throw an error if a file is taking that name
			const roomFolder = path.accessLocal(`sharedFiles/${roomID}/`);
			let folderInfo;
			try {
				folderInfo = await fs.stat(roomFolder);
			}
			catch (error) {
				await fs.mkdir(roomFolder);
			}

			if (folderInfo != null && (! folderInfo.isDirectory())) { // folderInfo being null means it was just made
				throw new Error(`The folder at path:\n${roomFolder}\nin sharedFiles has been taken by a file.`);
			}
		}

		room.timeLeft = config.timings.delete.unusedRoom; // Reset the countdown
		return room;
	};

	app.get("/room/get/:roomName", async (req, res) => {
		const room = await getOrCreateRoom(req.params.roomName);
		if (room == null) { // Reached room limit
			res.setHeader("Retry-After", config.timings.clientRelated.maxRoomsReached);
			res.status(503).send("RoomLimitReached");
			return;
		}

		res.json({
			files: room.files.map(file => ({ // Don't expose a few things
				fileName: file.originalName,
				timeLeft: file.timeLeft,
				ready: file.ready
			}))
		});
	});
	app.get("/room/get/:roomName/:fileID", async (req, res) => {
		const room = await getOrCreateRoom(req.params.roomName, false); // Don't create a new room if none exists
		const fileInfo = room?.files?.[parseInt(req.params.fileID)];

		if (room == null || fileInfo == null) { // The room doesn't exist or the file doesn't
			res.status(404).send("MissingRoomOrFile");
			return;
		}
		if (! fileInfo.ready) {
			res.setHeader("Retry-After", config.timings.clientRelated.fileNotReady);
			res.status(503).send("StillProcessing");
			return;
		}

		let filePath = path.accessLocal(`sharedFiles/${room.id}/${fileInfo.storedName}`);
		res.sendFile(filePath);
	});

	{
		let max = config.limits.max;
		app.use(fileUpload({
			limits: {
				fileSize: max.fileSize == -1? max.totalFileSize : max.fileSize
			}
		}));
	}
	app.post("/room/upload/:roomName/", async (req, res) => {
		if (state.cleaningUp) {
			res.setHeader("Retry-After", config.timings.clientRelated.cleaningUp);
			res.status(503).send("CleaningUp");
			return;
		}

		const room = await getOrCreateRoom(req.params.roomName);
		if (room == null) { // Reached room limit
			res.setHeader("Retry-After", config.timings.clientRelated.maxRoomsReached);
			res.status(503).send("RoomLimitReached");
			return;
		}

		let file = req.files?.upload;
		if (file == null) {
			res.status(400).send("MissingFile");
			return;
		}
		
		if (state.totalSize + file.size > config.limits.max.totalFileSize) {
			res.status(503).send("TooManyFilesOnServer");
			return;
		}

		state.totalSize += file.size;

		let id = room.files.indexOf(null);
		if (id == -1) id = room.files.length;

		let ext = "." + mime.extension(file.mimetype);
		if (ext == ".") ext = "";
		const storedName = `${id}${ext}`;
		room.files[id] = {
			originalName: file.name,
			storedName: storedName,
			timeLeft: config.timings.delete.newFile,
			ready: false,
			keep: false
		};

		res.send(id.toString());
		await file.mv(path.accessLocal(`sharedFiles/${room.id}/${storedName}`));

		room.files[id].ready = true;
	});

	app.post("room/delete/:roomName/:fileID", async (req, res) => { // Destructive action so it doesn't use GET
		const room = await getOrCreateRoom(req.params.roomName, false); // Don't create a new room if none exists
		const fileInfo = room?.files?.[parseInt(req.params.fileID)];

		if (room == null || fileInfo == null) { // The room doesn't exist or the file doesn't
			res.status(404).send("MissingRoomOrFile");
			return;
		}
		if (! fileInfo.ready) {
			res.setHeader("Retry-After", config.timings.clientRelated.fileNotReady);
			res.status(503).send("StillProcessing");
			return;
		}

		//await fs.rm(path.accessLocal()); TODO
		res.send("Deleted");
	});

	app.get("/brew/coffee", (req, res) => {
		res.status(418).send("I'm a teapot, I can't brew coffee. Try tea instead.");
	});
	app.get("/brew/tea", (req, res) => {
		res.status(418).send("Enjoy your tea. ☕");
	});


	app.listen(PORT, _ => {
		console.log(`Running on port ${PORT}.`);
	});
};

const main = _ => {
	for (let id in state.rooms) {
		let room = state.rooms[id];

		//if (room.files)
	}
};

const start = async _ => {
	await loadConfig();
	cleanUp();
	startServer();
	setInterval(main, 1000);
};
start();