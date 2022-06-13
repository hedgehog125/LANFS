<script>
    import TopBar from "$lib/TopBar.svelte";
    import WelcomeMessage from "$lib/WelcomeMessage.svelte";
    import RoomSelector from "$lib/RoomSelector.svelte";

    /*
    upload = new FormData();
    upload.set("upload", new File([new Blob(["I found among us"])], "among", {
        type: "text/plain"   
    }));

    fetch("http://localhost:7000/room/upload/among/", {
        method: "POST",
        body: upload
    }).then(res => {a = res});
   */
</script>

<main>
    <TopBar></TopBar>
    <WelcomeMessage></WelcomeMessage>
    <RoomSelector></RoomSelector>
</main>