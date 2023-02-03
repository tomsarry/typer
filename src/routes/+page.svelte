<script>
	import { enhance } from '$app/forms';
	export let data;

	let userWordInput = '';
	$: inputSize = userWordInput.length;
	$: word = data.words[wordIndex];

	$: if (data) {
		userWordInput = '';
		won = false;
		wordIndex = 0;
	}

	let wordIndex = 0;
	let won = false;

	let start = undefined;
	let end = undefined;
	let time = undefined;

	function eraseLast() {
		userWordInput = userWordInput.slice(0, -1);
	}

	function add(key) {
		userWordInput += key;
	}

	function isChar(keyCode) {
		return String.fromCharCode(keyCode).match(/(\w|\s)/g);
	}

	function check_word() {
		if (userWordInput == data.words[wordIndex]) {
			wordIndex++;
			userWordInput = '';
		}

		if (wordIndex == data.words.length) {
			stopTimer();
			won = true;
			resetTimer();
		}
	}

	function resetTimer() {
		start = undefined;
		end = undefined;
	}

	function stopTimer() {
		end = performance.now();
		time = end - start;
	}

	function startTimer() {
		start = performance.now();
		end = undefined;
	}

	function keydown(event) {
		if (start === undefined) startTimer();

		const key = event.key.toLowerCase();

		if (key === 'backspace') {
			eraseLast();
			return;
		}

		if (!isChar(event.keyCode) || key === 'enter') {
			return;
		}

		if (inputSize >= word.length) {
			return;
		}

		add(key);

		check_word();
	}
</script>

<svelte:window on:keydown={keydown} />

<div class="typer">
	{#if won}
		<p>won in {time}ms</p>
	{:else}
		{wordIndex + 1} / {data.words.length}
		<div class="word">
			{#each word as letter, i}
				{#if userWordInput.length == i}
					<span class="letter bold">{letter}</span>
				{:else if userWordInput.charAt(i) != word.charAt(i) && inputSize > i}
					<span class="letter invalid">{letter}</span>
				{:else}
					<span class="letter">{letter}</span>
				{/if}
			{/each}
		</div>
	{/if}

	<form method="POST" action="?/reset" use:enhance>
		<input type="hidden" name="reset" />
		<button data-key="reset" formaction="?/reset">reset</button>
	</form>
</div>

<style>
	.typer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin-bottom: 15%;
	}

	.word {
		font-size: 4em;
		letter-spacing: 0.05em;
	}

	.letter {
		display: inline-block;
		color: grey;
	}

	.bold {
		color: black;
	}

	.invalid {
		color: red;
	}
</style>
