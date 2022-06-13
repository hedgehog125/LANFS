<script>
    import TopBar from "$lib/TopBar.svelte";
    import RoomSelector from "$lib/RoomSelector.svelte";
    import FilePool from "$lib/FilePool.svelte";

    import { onMount } from "svelte";
    import { page } from "$app/stores";

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

    onMount(async _ => { // Load the config and check the room slightly early
        roomName = location.hash.slice(1); // Remove the hashtag
        if (roomName == "") {
            invalidRoom();
            return;
        }

        reloadRoom(); // Start loading it at the same time as the config loads
        await loadConfig();
        loading = false;

        setInterval(reloadRoom, config.timings.refreshDelay * 1000);
    });
</script>

<main>
    <TopBar></TopBar>

    {#if loading}
        <RoomSelector></RoomSelector>
    {:else}
        <FilePool {roomName} {roomData}></FilePool>
    {/if}
</main>