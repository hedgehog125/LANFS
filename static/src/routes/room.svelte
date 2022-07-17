<script>
    import { onMount } from "svelte";
    import { config, info, getInfo } from "$lib/util/GetServerInfo.js";
    
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
        let start = Date.now();
        try {
            let res = await fetch(`/room/get/${roomName}`);
            if (res.ok) {
                roomData = await res.json();
            }
            else {
                roomData = null;
                isNetworkError = false;
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
            }).then(_ => {
                uploading.delete(tmpID);

                // TODO: handle errors given by server
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

<main>
    <TopBar {handleUpload}></TopBar>

    <Popups {isNetworkError} {loading} {popupMessageCode} {handlePopupClose}></Popups>
    {#if ! loading}
        <FilePool {roomName} {roomData} {handleDelete} {handleExtend}></FilePool>
        <FileUpload {handleUpload}></FileUpload>
    {/if}
</main>