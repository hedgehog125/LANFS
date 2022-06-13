<script>
	let roomName;
	
	const submit = _ => {
		location.href = `room#${roomName}`;
	};
</script>

<main>
	<div>
		<h3>
			To get started, enter a new or existing room name...
		</h3>

		<form on:submit|preventDefault={submit}>
			<input type="text" bind:value={roomName} aria-label="A name for a new or existing room">
			<button type="submit">Join</button>
		</form>
	</div>
</main>

<style>
	:not(h3) {
		font-size: 20px;
		font-weight: bold;
	}

	div {
		position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
		width: fit-content;

		justify-content: center;
		text-align: center;
	}

	button {
		border-radius: 10%;
		background-color: rgb(130, 205, 255);
	}
</style>