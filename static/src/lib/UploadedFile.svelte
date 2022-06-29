<script>
	import { config, info } from "$lib/util/GetServerInfo.js";
	const deleteTimings = info.timings.delete;

	import { format } from "$lib/util/Tools.js";

	import PieChart from "$lib/PieChart.svelte";

	import downloadIcon from "$lib/imgs/download.svg";
	import cancelIcon from "$lib/imgs/close.svg";
	import extendIcon from "$lib/imgs/timer-plus.svg";
	import fileIcon from "$lib/imgs/file-document-outline.svg";


	export let roomName;
	export let file;
	export let index;
</script>

<main>
	<div class="top">
		<div class="piechart">
			<PieChart amount={
				file.ready?
					(file.timeLeft / (file.quickDownloadDelete? deleteTimings.downloadedFile : deleteTimings.newFile))
				: file.uploadProgress
			} interpolateTime={config.timings.refreshDelay}></PieChart>
		</div>
		<span class:warning={file.ready && file.timeLeft <= 15}>
			{file.ready?
				format.time(file.timeLeft, 2)
				: `${Math.floor(file.uploadProgress * 100)}% Uploaded`
			}
		</span>
		<button title={file.ready? "Delete file" : "Cancel upload"}>
			<img src={cancelIcon} alt={file.ready? "Delete file" : "Cancel upload"}>
		</button>
	</div>

	<p class="title">
		{format.shorten(file.fileName, 30)}
	</p>

	<div class="background">
		<img src={fileIcon} alt="A file icon">
	</div>

	{#if file.ready}
		<div class="bottom">
			<button title="Extend file time limit">
				<img src={extendIcon} alt="Extend file time limit">
			</button>
	
			<a href={`/room/get/${roomName}/${index}`} download={file.fileName} title="Download the file">
				<img src={downloadIcon} alt="Download the file">
			</a>
		</div>
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
		overflow: hidden;
	}

	.top, .title, .bottom {
		background-color: white;
	}

	.top {
		position: absolute;
		top: 0px;
		left: 0px;
		right: 0px;
		height: 45px; /* 35px for the heights and 5px padding on both the top and bottom */
	}
	.top > *, .bottom > * {
		position: absolute;
		top: 5px;

		padding-top: 0px;
		padding-bottom: 0px;
	}
	.piechart {
		left: 5px;
		padding: 5px; /* So the total size is the same as the x button which has some blank space in the image */
	}
	.top > span {
		left: 50%;
		transform: translateX(-50%);
		font-size: 15px;

		padding-top: 9.25px;
		padding-bottom: 9.25px;
	}
	.warning {
		color: rgb(200, 0, 0);
	}
	.top > button {
		right: 5px;
	}

	.title {
		position: absolute;
		top: 45px;
		left: 0px;
		right: 0px;

		margin-top: 0px;
		margin-bottom: 0px;
		padding-top: 2.5px;
		padding-bottom: 2.5px;
		text-align: center;

		font-weight: bold;
		border-top: 2px dotted black;
		border-bottom: 2px dotted black;
		overflow: hidden;
	}

	.bottom {
		position: absolute;
		bottom: 0px;
		left: 0px;
		right: 0px;
		height: 45px;

		border-top: 2px dotted black;
	}
	.bottom > button {
		left: 5px;
	}
	.bottom > a {
		right: 5px;
	}

	.background {
		position: absolute;
		left: 0px;
		right: 0px;
		top: 0px;
		bottom: 0px;

		display: flex;
		justify-content: center;
		align-items: center;
	}
	.background > img {
		position: relative;
		z-index: -1;

		width: 75%;
		height: auto;
	}

	p, span {
		font-weight: bold;
	}

	img {
		width: 35px;
		height: 35px;

		display: block;
	}

	button {
		border: none;
		background: none;

		padding: 0px;
	}

	button, div {
		user-select: none;
	}
</style>