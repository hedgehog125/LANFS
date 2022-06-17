module.exports = {
    install: {
        sandbox: (pathModule, runPath) => {
            if (runPath == null) throw new Error("Invalid sandbox path.");
            __dirname = runPath;

            pathModule.sandboxPath = fullPath => {
                let index = fullPath.indexOf(__dirname);
                if (index != 0) { // The base path must appear at the start of the path
                    throw new Error(`Attempted to access a file or folder outside of the local path.\nFull path:\n${fullPath}\nThis could be because you provided a relative path instead of an absolute. If that's the case, use accessLocal instead.`);
                }
                return fullPath;
            };
            pathModule.accessLocal = localPath => pathModule.sandboxPath(pathModule.join(__dirname, localPath));
            pathModule.accessOutsideLocal = localPath => pathModule.join(__dirname, localPath);
        }
    },
    clearDir: async (folderName, fs, path) => {
        const folder = path.accessLocal(folderName);
	
        let folderInfo;
        try {
            folderInfo = await fs.stat(folder);
        }
        catch (error) {
            await fs.mkdir(folder);
            folderInfo = await fs.stat(folder);
        }


        if (! folderInfo.isDirectory()) {
            throw new Error(`The name for the needed directory \"${folderName}\" has been taken by a file.`);
        }
        let toDelete = await fs.readdir(folder);

        for (let fileName of toDelete) {
            let filePath = path.sandboxPath(path.join(folder, fileName));

            await fs.rm(filePath, {
                recursive: true
            });
        }
    },
    recursiveFind: async (folder, fs, path, allowOutside=false) => {
        let found = [];
        await recursiveFindSub(folder, found, fs, path, allowOutside, "");
        return found;
    }
};

const recursiveFindSub = async (folder, found, fs, path, allowOutside, previousPath) => {
    let files = await fs.readdir(allowOutside? path.accessOutsideLocal(folder) : path.accessLocal(folder));

    for (let fileName of files) {
        let relativePath = path.join(folder, fileName);
        let filePath = allowOutside? path.accessOutsideLocal(relativePath) : path.accessLocal(relativePath);
        let newPath = path.join(previousPath, fileName);

        if ((await fs.stat(filePath)).isDirectory()) {
            found.push({
                path: newPath,
                isFolder: true
            });

            await recursiveFindSub(relativePath, found, fs, path, allowOutside, newPath + "/");
        }
        else {
            found.push({
                path: newPath,
                isFolder: false
            });
        }
    }
};