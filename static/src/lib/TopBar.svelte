<script>
    import backIcon from "$lib/imgs/back.svg";
    import uploadIcon from "$lib/imgs/upload.svg";

    import { page } from "$app/stores";

    const showBack = $page.url.pathname != "/";

    export let handleUpload;
    export let enableUpload;

    let uploadElement;
    const triggerUpload = _ => {
        if (enableUpload) uploadElement.click();
    };
    const handleUploadInternal = _ => {
        handleUpload(uploadElement.files);
    };
</script>

<main>
    <div class="main">
        {#if showBack}
            <a href="/">
                <img src={backIcon} alt="Back" width=24 height=24>
            </a>
        {/if}
        {#if handleUpload}
            <button on:click={triggerUpload}>
                <img src={uploadIcon} alt="Upload a file" width=24 height=24>
            </button>
            <input type="file" multiple bind:this={uploadElement} on:change={handleUploadInternal}/>
        {/if}
        <h1>
            LANFS
        </h1>
    </div>
    <div class="space"></div> <!---- Same size as the other div but effects document flow -->
    <br>
</main>

<style>
    .main {
        position: absolute;
        left: 0px;
        right: 0px;
        top: 0px;
        min-height: 50px;

        background-color: rgb(50, 80, 210);
    }
    .space {
        margin-bottom: 50px;
    }

    a {
        position: absolute;
        left: 0px;
    }

    h1 {
        display: inline;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);

        padding: 5px;
        margin: 0px;
        margin-left: auto;


        color: rgb(255, 180, 40);
    }

    img {
        width: auto;
        height: 50px;

        display: block;
    }

    input[type="file"] {
        display: none;
    }
    button {
        position: absolute;
        right: 0px;

		border: none;
		background: none;

		padding: 0px;
	}
</style>