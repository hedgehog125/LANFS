<script>
    export let roomName;
    export let roomData;
</script>

<main>
    {#each roomData.files as file, index (index)}
        {#if file != null}
            <a href={`/room/get/${roomName}/${index}`} download={file.fileName}>{file.fileName}</a>
            <br>
        {/if}
    {/each}
</main>