/*
TODO

Handle failed fetches
Handle server errors
Use await for when a request can't be completed due to the server cleaning up. It won't be long
Use a preflight system for the upload. Client sends request to a different URL, with the size of the file. Server sends back a random key and id it'll be at. This id and the space for the file is now reserved, client has 5 seconds to start the main request or everything's ondone and the code is invalid. The upload also fails if the file becomes bigger than what was stated upfront.
Check scaling
Preload images

Enforce total file count limit. Also check others
More security stuff involving timings I guess? Mainly around async stuff and assuming data is still correct. Maybe delay processing new rooms when the folder is being created for a new room or something
Proper tab order
Check the max space in config is available

Use maps instead of objects generally. Objects should ideally be used in the same way as in strongly typed languages

= Bugs =
State can desync with files, causing errors
Error: write EPIPE on download disconnect 
Client aborting uploads isn't properly handled. The code will be 400 and request.aborted will be true "Error: Request aborted". Or at least sometimes...? Might be a busboy issue
*/


const GB_TO_BYTES = Math.pow(1024, 3);

const fs = require("fs/promises");
const oldFS = require("fs");

const busboy = require("busboy");
const mime = require("mime-types");
const meter = require("stream-meter");
const serveCompressed = require("express-precompressed");

const ipPackage = require("ip");
const IP = ipPackage.address();

const path = require("path");
const helper = require("./src/helper.js");
helper.install.sandbox(path, __dirname);


const express = require("express");
const app = express();

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
	fileInfo.deleting = true;

	if (fileInfo.metaUploaded) {
		let filePath = path.accessLocal(`sharedFiles/${room.id}/${fileInfo.storedName}`);
		await fs.rm(filePath);
	}
	
	room.fileCount--;
	state.totalSize -= fileInfo.size; // A guess is still known even if the upload immediately fails so no metadata
	if (room.fileCount == 0) {
		room.files = [];
		room.timeLeft = config.timings.delete.unusedRoom;
	}
	else delete room.files[fileID];
};

const loadConfig = async _ => {
	config = JSON.parse(await fs.readFile(path.accessLocal("config.json")));
	let max = config.limits.max;
	if (max.fileSize != -1) {
		max.fileSize *= GB_TO_BYTES;
		max.fileSize--; // The limits are one less
	}
	max.totalFileSize *= GB_TO_BYTES;

	PORT = process.env.PORT?? config.port;
};

const cleanUp = async _ => {
	state.cleaningUp = true;
	await helper.clearDir("sharedFiles", fs, path);
	state.cleaningUp = false;
};

const startServer = _ => {
	app.use(serveCompressed("gzipBuild/", "../static/build/", {
		extensions: ["html"],
		disableCompression: ! config.serve.gzip
	}));

	const getOrCreateRoom = async (roomName, create=true) => {
		if (roomName == "") return null;

		let room = state.rooms[roomName];
		if (room == null) {
			if (! create) return null;
			if (state.roomCount == config.limits.max.rooms) return null;

			let roomID = -1;
			{
				let idUsed;
				do {
					roomID++;
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
			if (room == null || fileInfo == null || fileInfo.deleting) { // The room doesn't exist or the file doesn't
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
			files: room.files.map(file => ((file.deleting || (! file.metaUploaded))? null : { // Don't expose a few things
				fileName: file.originalName,
				timeLeft: file.timeLeft,
				ready: file.ready,
				uploadProgress: file.ready? 1 : (file.size == 0? 0 : (file.meter.bytes / file.size)),
				size: file.size,
				quickDownloadDelete: file.quickDownloadDelete,
				downloading: file.downloadingCount != 0
			}))
		});
	});
	app.get("/room/get/:roomName/:fileID", async (req, res, next) => {
		const room = await getOrCreateRoom(req.params.roomName, false); // Don't create a new room if none exists
		const fileInfo = room?.files?.[parseInt(req.params.fileID)];
		if (! checks.fileExistsAndReady(room, fileInfo, res)) return;

		let filePath = path.accessLocal(`sharedFiles/${room.id}/${fileInfo.storedName}`);
		fileInfo.downloadingCount++;
		fileInfo.timeLeft = config.timings.delete.downloadedFile;
		fileInfo.quickDownloadDelete = true;

		res.sendFile(filePath, {
			headers: {
				"Content-Type": fileInfo.mime
			}
		}, error => {
			fileInfo.downloadingCount--;
			if (error) { // Give them another chance to download it
				fileInfo.timeLeft = config.timings.delete.newFile;
				fileInfo.quickDownloadDelete = false;
			}

			next();
		});
	});

	app.post("/room/upload/:roomName/", async (req, res) => {
		if (state.cleaningUp) {
			res.setHeader("Retry-After", config.timings.clientRelated.cleaningUp);
			res.status(503).send("CleaningUp");
			return;
		}

		const room = await getOrCreateRoom(req.params.roomName);
		if (! checks.underRoomLimit(room, res)) return;

		const max = config.limits.max;
		let spaceLeft = max.totalFileSize - state.totalSize;
		let maxFilesize = max.fileSize == -1? spaceLeft : Math.min(max.fileSize, spaceLeft);

		let fileSize = parseInt(req.headers["content-length"]); // Not completely accurate due to overhead but will be reduced once the length is known
		if (fileSize - max.expectedUploadOverhead > maxFilesize) { // Stop the request early if it'll be too big
			if (max.fileSize == -1 || spaceLeft < max.fileSize) { // More-so the server's fault
				res.setHeader("Retry-After", config.timings.clientRelated.tooManyFiles);
				res.status(503).send("TooManyFiles");
			}
			else {
				res.status(413).send("FileTooBig");
			}
			return;
		}

		let fileHandler;
		try {
			fileHandler = busboy({
				headers: req.headers,
				limits: {
					fields: 0,
					parts: 1,
	
					fileSize: maxFilesize,
					files: 1
				}
			});
		}
		catch (error) {
			res.status(400).send("InvalidForm");
			return;
		}
		state.totalSize += fileSize; 

		// Prepare for the file
		let id = room.files.indexOf(null);
		if (id == -1) id = room.files.length;

		// Nothing's known about the file yet so this is just a placeholder
		room.files[id] = {
			originalName: null,
			storedName: null,
			mime: null,

			timeLeft: config.timings.delete.newFile,
			size: fileSize,
			meter: meter(),

			ready: false,
			metaUploaded: false,
			deleting: false,
			downloadingCount: 0,
			quickDownloadDelete: false // If the file is using the shorter time because it's been downloaded
		};
		room.fileCount++;

		const roomFileInfo = room.files[id];
		const m = roomFileInfo.meter;
		let stream;

		const finalProcess = roomFileInfo => {
			state.totalSize += m.bytes - roomFileInfo.size; // Subtract the difference now the proper size is known 

			// It's easier to set up everything anyway even if the upload is invalid so it can be deleted more easily
			roomFileInfo.size = m.bytes;
			roomFileInfo.meter = null;
		};

		req.on("aborted", _ => { // Connection stopped mid-way. Discard the file
			req.unpipe(fileHandler);
			if (stream) stream.unpipe(m);
			m.end();

			finalProcess(roomFileInfo);

			deleteUpload(room, id);
			res.end();

			if (config.log.unusual) {
				if (stream) {
					console.log("File upload failed due to client disconnecting.");
				}
				else {
					console.log("Upload cancelled as content-length is too big.");
				}
			}
		});

		fileHandler.on("file", (name, _stream, info) => {
			stream = _stream;
			// There shouldn't be a mismatch between the extension and the MIME type but just in case, the file is stored using the extension for that MIME type (so it's used when it's sent) and it's downloaded as the original file name (which includes the original extension)
			let ext =  mime.extension(info.mimeType);
			if (ext === false) ext = "";
			else if (ext != "") ext = "." + ext;

			const storedName = `${id}${ext}`;

			roomFileInfo.originalName = info.filename;
			roomFileInfo.storedName = storedName;
			roomFileInfo.mime = info.mimeType;
			roomFileInfo.metaUploaded = true;

			const filePath = path.accessLocal(`sharedFiles/${room.id}/${storedName}`);
			stream.pipe(m).pipe(oldFS.createWriteStream(filePath));
		});
		fileHandler.on("close", _ => {
			finalProcess(roomFileInfo);

			if (stream.truncated) { // Urgh, we just wasted a bunch of time uploading only to have to delete the upload
				res.status(413).send("FileTooBig");
				deleteUpload(room, id);
			}
			else {
				roomFileInfo.ready = true;
				res.send("Uploaded");
			}
		});

		req.pipe(fileHandler);
	});

	app.post("/room/delete/:roomName/:fileID", async (req, res) => { // Destructive action, so it doesn't use GET
		let fileID = parseInt(req.params.fileID);
		const room = await getOrCreateRoom(req.params.roomName, false); // Don't create a new room if none exists
		const fileInfo = room?.files?.[fileID];
		if (! checks.fileExistsAndReady(room, fileInfo, res)) return;

		res.send("Deleting");
		await deleteUpload(room, fileID);
	});

	app.post("/room/extend/:roomName/:fileID", async (req, res) => { // Does something, so no GET
		const room = await getOrCreateRoom(req.params.roomName, false); // Don't create a new room if none exists
		const fileInfo = room?.files?.[parseInt(req.params.fileID)];
		if (! checks.fileExistsAndReady(room, fileInfo, res)) return;

		fileInfo.timeLeft = config.timings.delete.newFile;
		fileInfo.quickDownloadDelete = false;
		res.send("Extended");
	});

	app.get("/brew/coffee", (req, res) => {
		res.status(418).send("I'm a teapot, I can't brew coffee. Try tea instead.");
	});
	app.get("/brew/tea", (req, res) => {
		res.send("Enjoy your tea. ☕");
	});

	{
		const max = config.limits.max;
		const deleteTimings = config.timings.delete;
		let roughMaxFilesize = max.fileSize == -1? max.totalFileSize : Math.min(max.fileSize, max.totalFileSize);

		app.get("/info", (req, res) => {
			res.json({
				type: "LANFS",
				clientConfig: {
					...config.client,
					max: {
						fileSize: roughMaxFilesize
					}
				},
				timings: { // Send a few of the timings so percentages can be calculated
					delete: {
						newFile: deleteTimings.newFile,
						downloadedFile: deleteTimings.downloadedFile
					}
				}
			});
		});
	}

	app.listen(PORT, _ => {
		console.log(
			`Running on port ${PORT} using IP ${IP} with gzip ${config.serve.gzip? "enabled" : "disabled"}.
	
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
			if (
				file == null
				|| (! file.ready)
				|| file.downloadingCount != 0
				|| file.deleting
			) continue;

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