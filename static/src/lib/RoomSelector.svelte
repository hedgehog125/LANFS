<script>
	import MobileNewline from "$lib/MobileNewline.svelte";

	let roomName;
	
	const submit = _ => {
		location.href = `room#${roomName}`;
	};
</script>

<main>
	<div>
		<h2>
			To get started, enter a new or existing room name...
		</h2>

		<form on:submit|preventDefault={submit}>
			<input type="text" bind:value={roomName} aria-label="A name for a new or existing room" placeholder="Enter a room name...">
			<MobileNewline></MobileNewline>
			<button type="submit">Join</button>
		</form>
	</div>
</main>

<style>
    @media only screen and (max-width: 600px) {
		button {
			margin-top: px;
			width: 150px;
		}
	}

	* {
		font-size: 22.5px;
	}
	h2 {
		font-size: unset;
	}
	:not(input) {
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