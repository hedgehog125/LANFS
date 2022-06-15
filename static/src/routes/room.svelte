<script>
    import TopBar from "$lib/TopBar.svelte";
    import ConnectingPopup from "$lib/ConnectingPopup.svelte";
    import FilePool from "$lib/FilePool.svelte";
    import FileUpload from "$lib/FileUpload.svelte";

    import { onMount } from "svelte";
    import { page } from "$app/stores";

    const MIN_CONNECT_TIME = 0.75 * 1000;

    let config;
    let roomData;
    let roomName;
    let loading = true;

    const reloadRoom = async _ => {
        let res = await fetch(`/room/get/${roomName}`);
        roomData = await res.json();
    };
    const loadConfig = async _ => {
        let res = await fetch("/info");
        config = (await res.json()).clientConfig;
    };

    const invalidRoom = _ => {
        location.href = "/";
    };
    const onUpload = files => {
        for (let file of files) {
            let upload = new FormData();
            upload.set("upload", file);
    
            fetch(`room/upload/${roomName}`, {
                method: "POST",
                body: upload
            });

            // While we wait for the refresh, might as well temporarily add the files into the UI
            roomData.files[roomData.files.length] = {
                fileName: file.name,
				timeLeft: 0, // Not displayed while it's uploading anyway
				ready: false
            };
        }
    };

    onMount(async _ => { // Load the config and check the room slightly early
        let start = Date.now();

        roomName = location.hash.slice(1); // Remove the hashtag
        if (roomName == "") {
            invalidRoom();
            return;
        }

        reloadRoom(); // Start loading it at the same time as the config loads
        await loadConfig();

        setTimeout(_ => {
            loading = false;

            setInterval(reloadRoom, config.timings.refreshDelay * 1000);
        }, MIN_CONNECT_TIME - (Date.now() - start));
    });
</script>

<main>
    <TopBar></TopBar>

    {#if loading}
        <ConnectingPopup></ConnectingPopup>
    {:else}
        <FilePool {roomName} {roomData}></FilePool>
        <FileUpload {onUpload}></FileUpload>
    {/if}
</main>