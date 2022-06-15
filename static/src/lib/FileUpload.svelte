<script>
    export let onUpload;

    const handleUpload = e => {
        let fileInfos = e.dataTransfer.items;

        if (fileInfos) {
            let files = [];
            for (let fileInfo of fileInfos) {
                if (fileInfo.kind == "file") {
                    files.push(fileInfo.getAsFile());
                }
            }
            if (files.length != 0) {
                onUpload(files);
            }
        }
    };
</script>

<svelte:window on:dragover|preventDefault on:drop|preventDefault={handleUpload}></svelte:window>