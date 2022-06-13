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
			<input type="text" bind:value={roomName} aria-label="A name for a new or existing room" placeholder="Enter a room name...">
			<button type="submit">Join</button>
		</form>
	</div>
</main>

<style>
	:not(h3) {
		font-size: 20px;
	}
	:not(h3, input) {
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

	button, input {
		border-color: black;
		border-style: solid;
	}

	input {
		border-radius: 10px;
		border-width: 2px;
		width: 300px;
		text-align: center;
	}

	button {
		border-radius: 5px;
		border-width: 1.5px;
		background-color: rgb(130, 205, 255);
	}
</style>