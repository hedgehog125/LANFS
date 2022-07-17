<script>
    import UploadedFile from "$lib/UploadedFile.svelte";

    export let roomName;
    export let roomData;

    export let handleDelete;
    export let handleExtend;
</script>

<main>
    {#if roomData.files.length == 0}
        <p class="bold">
            Looks like there aren't any files here yet. <br>
            Try uploading one by dropping it here or by clicking the upload button.
        </p>
    {:else}
        {#each roomData.files as file, index (index)}
            {#if file != null}
                <UploadedFile {roomName} {file} fileID={index} {index} {handleDelete} {handleExtend}></UploadedFile>
            {/if}
        {/each}
    {/if}
</main>

<style>
    .bold {
        font-weight: bold;
    }
</style>