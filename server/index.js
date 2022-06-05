const PORT = process.env.PORT?? 7000;

const fs = require("fs/promises");
const path = require("path");
path.sandboxPath = path => {
    let index = path.indexOf(__dirname);
    if (index != 0) { // The base path must appear at the start of the path
        throw new Error(`Attempted to access a file or folder outside of the local path.\nPath: ${JSON.stringify(path)}`);
    }
    return path;
};
path.accessLocal = localPath => path.sandboxPath(path.join(__dirname, localPath));
path.accessOutsideLocal = localPath => path.join(__dirname, localPath);

const express = require("express");
const app = express();


const readline = require("readline");
const cli = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

/*
testing: {
            id: 0,
            timeLeft: 60,
            files: [
                {
                    originalName: "testing.txt",
                    storedName: "0.txt",
                    timeLeft: 0
                }
            ]
        }
*/

const state = {
    rooms: {},
    roomCount: 0,
    cleaningUp: false
};
let config; // It'll be loaded from the disk

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

    const getOrCreateRoom = (roomName, create=true) => {
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
                timeLeft: 0, // Reset in a second
                files: []
            };
            state.rooms[roomName] = room;
        }

        room.timeLeft = config.timings.delete.unusedRoom;
        return room;
    };

    app.get("/room/get/:roomName", (req, res) => {
        const room = getOrCreateRoom(req.params.roomName);
        if (room == null) { // Reached room limit
            res.setHeader("Retry-After", config.timings.clientRelated.maxRoomsReached);
            res.status(503).send("RoomLimitReached");
            return;
        }

        res.json({
            files: room.files
        });
    });
    app.get("/room/get/:roomName/:fileID", async (req, res) => {
        const room = getOrCreateRoom(req.params.roomName, false); // Don't create a new room if none exists
        const fileInfo = room?.files?.[parseInt(req.params.fileID)];

        if (room == null || fileInfo == null) { // The room doesn't exist or the file doesn't
            res.status(404).send("MissingRoomOrFile");
            return;
        }

        let filePath = path.accessLocal(`sharedFiles/${room.id}/${fileInfo.storedName}`);
        res.sendFile(filePath);
    });

    app.post("/room/upload/:roomName/", (req, res) => {
        if (state.cleaningUp) {
            res.setHeader("Retry-After", config.timings.clientRelated.cleaningUp);
            res.status(503).send("CleaningUp");
            return;
        }


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

const start = async _ => {
    config = JSON.parse(await fs.readFile(path.accessLocal("config.json")));

    cleanUp();
    startServer();
};
start();