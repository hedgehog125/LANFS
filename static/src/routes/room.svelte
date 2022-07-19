<script>
    import { onMount } from "svelte";
    import { config, info, getInfo } from "$lib/util/GetServerInfo.js";

    import Preload from "$lib/util/Preload.svelte";
    import downloadIcon from "$lib/imgs/download.svg";
	import cancelIcon from "$lib/imgs/close.svg";
	import extendIcon from "$lib/imgs/timer-plus.svg";
	import fileIcon from "$lib/imgs/file-document-outline.svg";
    const assetsToPreload = {
        image: [
            downloadIcon,
            cancelIcon,
            extendIcon,
            fileIcon
        ]
    };
    
    import TopBar from "$lib/TopBar.svelte";
    import Popups from "$lib/Popups.svelte";
    import FilePool from "$lib/FilePool.svelte";
    import FileUpload from "$lib/FileUpload.svelte";

    const MIN_CONNECT_TIME = 0.75 * 1000;

    let roomData;
    let roomName;
    let loading = true;
    let loadingDoneTask;
    let isNetworkError = false;

    const reloadRoom = async _ => {
        if (popupMessageCode == 2) return; // At max room count

        let start = Date.now();
        try {
            let res = await fetch(`/room/get/${roomName}`);
            if (res.ok) {
                roomData = await res.json();
            }
            else {
                roomData = null;
                isNetworkError = false;

                let error = await res.text();
                if (error == "NoRooms") {
                    popupMessageCode = 2;
                }
                else {
                    popupMessageCode = 99;
                }
            }
        }
        catch {
            roomData = null;
            isNetworkError = true;
        }

        if (roomData) {
            if (loading) {
                loadingDoneTask = setTimeout(_ => {
                    loading = false;
                }, MIN_CONNECT_TIME - (Date.now() - start));
            }
        }
        else { // If it fails on load, the refreshing should mean it'll eventually get the room data
            loading = true;
            if (loadingDoneTask != null) clearTimeout(loadingDoneTask);
        }
    };
    const invalidRoom = _ => {
        location.href = "/";
    };


    let uploading = new Map();
    const handleUpload = files => {
        if (loading) return;

        let tooBig = false;
        for (let file of files) {
            if (file.size > config.max.fileSize) {
                tooBig = true;
                continue;
            }
            let tmpID = roomData.files.length;

            let upload = new FormData();
            upload.set("upload", file);
    
            let abortController = new AbortController();
            fetch(`/room/upload/${roomName}`, {
                method: "POST",
                body: upload,
                signal: abortController.signal
            }).then(async res => {
                uploading.delete(tmpID);

                if (res.ok) return;
                let error = await res.text();
                if (error == "FileTooBig") {
                    popupMessageCode = 0;
                }
                else if (error == "TooManyFiles") {
                    popupMessageCode = 3;
                }
                else if (error == "NoSpace") {
                    popupMessageCode = 4;
                }
                else {
                    popupMessageCode = 99;
                }
            }).catch(error => {
                uploading.delete(tmpID);

                if (error.name == "AbortSignal") return;
                popupMessageCode = 1; // This won't always happen, apparently sometimes the browser is able to keep the connection
            });
            uploading.set(tmpID, abortController);

            // While we wait for the refresh, might as well temporarily add the files into the UI
            roomData.files[tmpID] = {
                fileName: file.name,
                timeLeft: 0, // Not displayed while it's uploading anyway
                ready: false,
                uploadProgress: 0,
                size: file.size
            };
        }

        if (tooBig) {
            popupMessageCode = 0;
        }
    };

    let popupMessageCode = -1;
    const handlePopupClose = _ => {
        popupMessageCode = -1;
    };

    const handleDelete = id => {
        let roomFile = roomData.files[id];

        if (roomFile.ready) {
            fetch(`/room/delete/${roomName}/${id}`, {
                method: "POST"
            });
            roomData.files[id] = null;
        }
        else {
            if (uploading.has(id)) {
                uploading.get(id).abort();
            }
        }
    };
    const handleExtend = id => {
        let roomFile = roomData.files[id];

        fetch(`/room/extend/${roomName}/${id}`, {
            method: "POST"
        });
        roomFile.timeLeft = info.timings.delete.newFile;
        roomData.files[id] = roomFile;
    };


    onMount(async _ => { // Load the config and check the room slightly early
        roomName = location.hash.slice(1); // Remove the hashtag
        if (roomName == "") {
            invalidRoom();
            return;
        }

        await Promise.all([getInfo(), reloadRoom()]);

        setInterval(reloadRoom, config.timings.refreshDelay * 1000);
    });
</script>

<svelte:head>
    <Preload {assetsToPreload}></Preload>
</svelte:head>

<main>
    <TopBar {handleUpload} enableUpload={! loading}></TopBar>

    <Popups {isNetworkError} {loading} {popupMessageCode} {handlePopupClose}></Popups>
    {#if ! loading}
        <FilePool {roomName} {roomData} {handleDelete} {handleExtend}></FilePool>
    {/if}
    <FileUpload {handleUpload}></FileUpload> <!-- This is always active to prevent accidental downloads when trying to upload a file too soon. But those uploads will be ignored -->
</main>