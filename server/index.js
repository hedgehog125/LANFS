const PORT = process.env.PORT?? 7000;

const fs = require("fs/promises");
const path = require("path");
path.sandboxPath = path => {
    let index = path.indexOf(__dirname);
    if (index != 0) { // The base path must appear at the start of the path
        throw new Error(`Attempted to access a file or folder outside of the local path.\nPath: ${JSON.stringify(path)}`);
    }
    return path;
}
path.accessLocal = localPath => path.sandboxPath(path.join(__dirname, localPath));
path.accessOutsideLocal = localPath => path.join(__dirname, localPath);

const express = require("express");
const app = express();


const readline = require("readline");
const cli = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const state = {
    rooms: {
        testing: {
            id: 0,
            files: [
                {
                    fileName: "testing.txt"
                }
            ]
        }
    }
};

const cleanUp = async _ => {
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
            console.log(`Deleted ${folderNameShort}`);
            await fs.rm(folderName, {
                recursive: true
            });
        }
    }
};

const startServer = _ => {
    app.use(express.static("../static/build/"));

    app.get("/room/:roomName", (req, res) => {
        if (state.rooms[req.params.roomName] == null) {

        }
    });

    app.get("/room/:roomName/:fileID", (req, res) => {
        // 404 if either are incorrect

        res.sendFile(`${__dirname}/sharedFiles/secret.txt`, {}, error => {
            console.log(error);
        });
    });

    app.listen(PORT, _ => {
        console.log(`Running on port ${PORT}.`);
    });
};

const start = async _ => {
    await cleanUp();
    startServer();
};
start();