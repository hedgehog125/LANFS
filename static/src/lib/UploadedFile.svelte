<script>
    // TODO: use store to load interpolate time

    import PieChart from "$lib/PieChart.svelte";

    export let roomName;
    export let file;
    export let index;

    export let handleClick;
</script>

<main>
    <a href={`/room/get/${roomName}/${index}`} download={file.fileName} on:click={e => handleClick(e, file)}>
        {file.fileName}
    </a>
    {#if ! file.ready}
        <PieChart amount={file.uploadProgress} interpolateTime=1></PieChart>
    {/if}
    <br>
</main>