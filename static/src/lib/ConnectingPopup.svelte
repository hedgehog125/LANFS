<script>
	export let isNetworkError;
</script>

<main>
	<div>
		<p>
			{#if isNetworkError}
				Connection error. <br>
				Will continue to retry...
			{:else}
				Connecting...
			{/if}
		</p>
	</div>
</main>

<style>
	div {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;

		--base-margin: min(2.5vw, 22.5vh);
		margin: var(--base-margin);
		margin-top: calc(var(--base-margin) + 50px);

		background-color: rgb(200, 200, 200);
		border-radius: min(12.5vw, 12.5vh);
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
</style>