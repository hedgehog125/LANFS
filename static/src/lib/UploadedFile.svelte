<script>
    // TODO: use store to load interpolate time
    import PieChart from "$lib/PieChart.svelte";

    import downloadIcon from "$lib/imgs/download.svg";
    import cancelIcon from "$lib/imgs/close.svg";

    export let roomName;
    export let file;
    export let index;

    export let handleClick;
</script>

<main>
    <p>
        {file.fileName}
    </p>
    
    {#if file.ready}
        <a href={`/room/get/${roomName}/${index}`} download={file.fileName} on:click={e => handleClick(e, file)}>
            <img src={downloadIcon} alt="Download icon">
        </a>
    {:else}
        <button>
            <img src={cancelIcon} alt="Cancel icon">
        </button>
        <PieChart amount={file.uploadProgress} interpolateTime=1></PieChart>
    {/if}
    <br>
</main>

<style>
    main {
        position: relative;

        width: 225px;
        height: 300px;
        border: 3px solid black;
        border-radius: 25px;
    }

    p {
        position: relative;

        margin-top: 0px;
        margin-bottom: 0px;
        text-align: center;

        font-weight: bold;
    }

    img {
        width: 25px;
        height: 25px;
    }

    button { /* In the top corner of the file */
        position: absolute;    
        right: 0px;

        border: none;
        background: none;
    }

    p, button {
        top: 10px;
        transform: translateY(-50%);

        padding: 0px;
    }
</style>