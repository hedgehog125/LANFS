<script>
    export let roomName;
    export let roomData;

    const handleClick = (e, file) => {
        if (! file.ready) e.preventDefault();
    };
</script>

<main>
    {#each roomData.files as file, index (index)}
        {#if file != null}
            <a href={`/room/get/${roomName}/${index}`} download={file.fileName} on:click={e => handleClick(e, file)}>
                {file.fileName}
            </a>
            {#if ! file.ready}
                {Math.floor(file.uploadProgress * 100)}%
            {/if}
            <br>
        {/if}
    {/each}
</main>