<script>
    export let handleUpload;

    const handleUploadInternal = e => {
        let fileInfos = e.dataTransfer.items;

        if (fileInfos) {
            let files = [];
            for (let fileInfo of fileInfos) {
                if (fileInfo.kind == "file") {
                    files.push(fileInfo.getAsFile());
                }
            }
            if (files.length != 0) {
                handleUpload(files);
            }
        }
    };
</script>

<svelte:window on:dragover|preventDefault on:drop|preventDefault={handleUploadInternal}></svelte:window>