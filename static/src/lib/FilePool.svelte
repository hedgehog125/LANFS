<script>
    import UploadedFile from "$lib/UploadedFile.svelte";

    export let roomName;
    export let roomData;

    const handleClick = (e, file) => {
        if (! file.ready) e.preventDefault();
    };
</script>

<main>
    {#each roomData.files as file, index (index)}
        {#if file != null}
            <UploadedFile {roomName} {file} {index} {handleClick}></UploadedFile>
        {/if}
    {/each}
</main>