<script>
    import { onMount } from "svelte";
    import { config, getInfo } from "$lib/util/GetServerInfo.js";
    
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

    let popupMessageCode = -1;
    const handlePopupClose = _ => {
        popupMessageCode = -1;
    };

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
    const handleUpload = files => {
        let tooBig = false;
        for (let file of files) {
            if (file.size > config.max.fileSize) {
                tooBig = true;
                continue;
            }

            let upload = new FormData();
            upload.set("upload", file);
    
            fetch(`room/upload/${roomName}`, {
                method: "POST",
                body: upload
            }).catch(error => {
                console.log(error.name);
            });

            // While we wait for the refresh, might as well temporarily add the files into the UI
            roomData.files[roomData.files.length] = {
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
    <TopBar></TopBar>

    <Popups {isNetworkError} {loading} {popupMessageCode} {handlePopupClose}></Popups>
    {#if ! loading}
        <FilePool {roomName} {roomData}></FilePool>
        <FileUpload {handleUpload}></FileUpload>
    {/if}
</main>