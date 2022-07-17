<script>
	import closeIcon from "$lib/imgs/close.svg";

	export let isNetworkError;
	export let loading;

	export let popupMessageCode;
	export let handlePopupClose;

	const messages = [
		[
			"Oh no,",
			"looks like that file's too big."
		],
		[
			"That's annoying,",
			"the upload failed due to a connection error."
		]
	];
	messages[99] = [
		"Huh,",
		"that's an unknown error."
	];
	$: messageLines = messages[popupMessageCode];
</script>

<main>
	{#if popupMessageCode != -1 || loading}
		<div>
			<p>
				{#if popupMessageCode == -1}
					{#if loading}
						{#if isNetworkError}
							Connection error. <br>
							Will continue to retry...
						{:else}
							Connecting...
						{/if}
					{/if}
				{:else}
					{#each messageLines as line, index}
						{line}
						{#if index != messageLines.length - 1}
							<br>
						{/if}
					{/each}
					<button type="button" on:click={handlePopupClose} title="Close">
						<img src={closeIcon} width=24 height=24 alt="Close">
					</button>
				{/if}
			</p>
		</div>
	{/if}
</main>

<style>
	main {
		--border-radius: min(12.5vw, 12.5vh);
	}

	div {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 99;

		--base-margin: min(2.5vw, 22.5vh);
		margin: var(--base-margin);
		margin-top: calc(var(--base-margin) + 50px);

		background-color: rgb(200, 200, 200);
		border-radius: var(--border-radius);
		border-style: none;

		font-weight: bold;

		display: flex;
		justify-content: center;
		align-items: center;
	}

	p {
		font-size: 25px;
		font-weight: bold;
		text-align: center;
	}

	button {
		border: none;
		background: none;
		user-select: none;


		padding: 0px;
	}

	img {
		position: absolute;
		--position: calc((var(--border-radius) / 4) + 15px);
		top: var(--position);
		right: var(--position);

		--size: calc(var(--border-radius) / 2);
		width: var(--size);
		height: var(--size);

		display: block;
	}
</style>