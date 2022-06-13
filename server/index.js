/*
TODO

More security stuff involving timings I guess? Mainly around async stuff and assuming data is still correct. Maybe delay processing new rooms when the folder is being created for a new room or something
Could have an extra second where things are half deleted? Requests behave as if it's deleted but new things still work around it?
*/


const GB_TO_BYTES = Math.pow(1024, 3);
const fs = require("fs/promises");
const fileUpload = require("express-fileupload");
const mime = require("mime-types");
const ipPackage = require("ip");
const IP = ipPackage.address();

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
let PORT; // Loaded as part of config or from the environment variable

const deleteUpload = async (room, fileID) => {
	const fileInfo = room.files[fileID];

	let filePath = path.accessLocal(`sharedFiles/${room.id}/${fileInfo.storedName}`);
	room.fileCount--;
	if (room.fileCount == 0) {
		room.files = [];
		room.timeLeft = config.timings.delete.unusedRoom;
	}
	else delete room.files[fileID];

	await fs.rm(filePath);
};



const loadConfig = async _ => {
	config = JSON.parse(await fs.readFile(path.accessLocal("config.json")));
	let max = config.limits.max;
	if (max.fileSize != -1) max.fileSize *= GB_TO_BYTES;
	max.totalFileSize *= GB_TO_BYTES;

	PORT = process.env.PORT?? config.port;
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
	app.use(express.static("../static/build/", {
		extensions: ["html"]
	}));

	const getOrCreateRoom = async (roomName, create=true) => {
		let room = state.rooms[roomName];
		if (room == null) {
			if (! create) return null;
			if (state.roomCount == config.limits.max.rooms) return null;

			let roomID = 0;
			{
				let idUsed;
				do {
					idUsed = false;
					for (let i in state.rooms) {
						if (state.rooms[i].id == roomID) {
							idUsed = true;
							break;
						}
					}
				} while (idUsed); // Make sure none of the rooms are using this id
			}

			room = {
				id: roomID,
				timeLeft: 0, // It'll be set in a second
				files: [],
				fileCount: 0
			};
			state.rooms[roomName] = room;
			state.roomCount++;

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

	const checks = {
		fileExistsAndReady: (room, fileInfo, res) => {
			if (room == null || fileInfo == null) { // The room doesn't exist or the file doesn't
				res.status(404).send("MissingRoomOrFile");
				return false;
			}
			if (! fileInfo.ready) {
				res.setHeader("Retry-After", config.timings.clientRelated.fileNotReady);
				res.status(503).send("StillProcessing");
				return false;
			}
			return true
		},
		underRoomLimit: (room, res) => {
			if (room == null) { // Reached room limit
				res.setHeader("Retry-After", config.timings.clientRelated.maxRoomsReached);
				res.status(503).send("RoomLimitReached");
				return false;
			}
			return true;
		}
	};

	app.get("/room/get/:roomName", async (req, res) => {
		const room = await getOrCreateRoom(req.params.roomName);
		if (! checks.underRoomLimit(room, res)) return;

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
		if (! checks.fileExistsAndReady(room, fileInfo, res)) return;

		let filePath = path.accessLocal(`sharedFiles/${room.id}/${fileInfo.storedName}`);
		fileInfo.timeLeft = config.timings.delete.downloadedFile;
		res.sendFile(filePath);
		// TODO: bring back keep property and use the error handler function to set keep to false again after
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
		if (! checks.underRoomLimit(room, res)) return;

		let file = req.files?.upload;
		if (file == null) {
			res.status(400).send("MissingFile");
			return;
		}
		
		if (state.totalSize + file.size > config.limits.max.totalFileSize) {
			res.setHeader("Retry-After", config.timings.clientRelated.tooManyFiles);
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
			ready: false
		};
		room.fileCount++;

		res.send(id.toString());
		await file.mv(path.accessLocal(`sharedFiles/${room.id}/${storedName}`));

		room.files[id].ready = true;
	});

	app.post("room/delete/:roomName/:fileID", async (req, res) => { // Destructive action, so it doesn't use GET
		let fileID = parseInt(req.params.fileID);
		const room = await getOrCreateRoom(req.params.roomName, false); // Don't create a new room if none exists
		const fileInfo = room?.files?.[fileID];
		if (! checks.fileExistsAndReady(room, fileInfo, res)) return;

		res.send("Deleted");
		await deleteUpload(room, fileID);
	});

	app.post("room/extend/:roomName/:fileID", async (req, res) => { // Does something, so no GET
		const room = await getOrCreateRoom(req.params.roomName, false); // Don't create a new room if none exists
		const fileInfo = room?.files?.[parseInt(req.params.fileID)];
		if (! checks.fileExistsAndReady(room, fileInfo, res)) return;

		fileInfo.timeLeft = config.timings.delete.newFile;
		res.send("Extended");
	});

	app.get("/brew/coffee", (req, res) => {
		res.status(418).send("I'm a teapot, I can't brew coffee. Try tea instead.");
	});
	app.get("/brew/tea", (req, res) => {
		res.send("Enjoy your tea. ☕");
	});


	app.listen(PORT, _ => {
		console.log(
			`Running on port ${PORT} using IP ${IP}.
	
For access on the same machine: http://localhost:${PORT}/
And for other devices on your LAN: http://${IP}:${PORT}/
`
		);
	});
};

const main = _ => {
	for (let roomName in state.rooms) {
		let room = state.rooms[roomName];

		for (let fileID in room.files) {
			const file = room.files[fileID];
			if (file == null) continue;

			if (file.timeLeft == 0) {
				deleteUpload(room, fileID);
			}
			else {
				file.timeLeft--;
			}
		}

		if (room.fileCount == 0) { // The files will eventually be deleted, which means the room will close after this countdown
			if (room.timeLeft == 0) {
				fs.rm(path.accessLocal(`sharedFiles/${room.id}`), {
					recursive: true
				});

				delete state.rooms[roomName];
				state.roomCount--;
			}
			else {
				room.timeLeft--;
			}
		}
	}
};

const start = async _ => {
	await loadConfig();

	cleanUp();
	startServer();
	setInterval(main, 1000);
};
start();