const fs = require("fs/promises");
const path = require("path");
const helper = require("./src/helper.js");
helper.install.sandbox(path, __dirname);

const {gzip} = require("node-gzip");

const main = async _ => {
    console.log("Deleting previous build...");
    await helper.clearDir("gzipBuild", fs, path);

    console.log("Gzipping build...");

    let buildFiles = await helper.recursiveFind("../static/build", fs, path, true);
    const gzipPath = path.accessLocal("gzipBuild");
    const buildPath = path.accessOutsideLocal("../static/build"); // Note to self: only *READ* this

    for (let fileInfo of buildFiles) {
        let newfilePath = path.sandboxPath(path.join(gzipPath, fileInfo.path));

        if (fileInfo.isFolder) {
            await fs.mkdir(newfilePath);
        }
        else {
            let compressed = await gzip(await fs.readFile(path.join(buildPath, fileInfo.path)));
            await fs.writeFile(newfilePath + ".gz", compressed);
        }
    }

    console.log(`Compressed ${buildFiles.length} build files and folders.`);
};
main();