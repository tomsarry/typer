<script>
	import { enhance } from '$app/forms';
	export let data;

	let userWordInput = '';
	$: inputSize = userWordInput.length;
	$: word = data.words[wordIndex];
	let wordIndex = 0;
	let won = false;

	function handle_click() {
		userWordInput = '';
		won = false;
		wordIndex = 0;
	}

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
			won = true;
		}
	}

	function keydown(event) {
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

{#if won}
	<p>won</p>
{:else}
	{wordIndex + 1} / {data.words.length}
	<div class="word">
		{#each data.words[wordIndex] as letter, i}
			{#if userWordInput.length == i}
				<span class="bold">{letter}</span>
			{:else if userWordInput.charAt(i) != word.charAt(i) && inputSize > i}
				<span class="invalid">{letter}</span>
			{:else}
				{letter}
			{/if}
		{/each}
	</div>
{/if}

<form method="POST" action="?/reset" use:enhance>
	<input type="hidden" name="reset" />
	<button on:click={handle_click} data-key="reset" formaction="?/reset">reset</button>
</form>

<style>
	.word {
		font-size: 4em;
	}

	.bold {
		font-weight: bold;
	}

	.invalid {
		color: red;
	}
</style>
