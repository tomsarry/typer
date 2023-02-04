<script>
	import { enhance } from '$app/forms';
	export let data;

	let wordIndex = 0;
	let won = false;

	let start = undefined;
	let end = undefined;
	let time = undefined;
	let userWordInput = '';

	$: inputSize = userWordInput.length;
	$: word = data.words[wordIndex];
	$: nextWords = data.words.slice(wordIndex + 1, wordIndex + 4);

	$: if (data) {
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
		let key = String.fromCharCode(keyCode);
		return key >= 'A' && key <= 'Z';
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

		if (!isChar(event.keyCode)) {
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
		<div class="counter">
			{wordIndex + 1} / {data.words.length}
		</div>

		<div class="word">
			{#each word as letter, i}
				{#if userWordInput.length == i}
					<span class="letter active">{letter}</span>
				{:else if userWordInput.charAt(i) != word.charAt(i) && inputSize > i}
					<span class="letter invalid">{letter}</span>
				{:else}
					<span class="letter">{letter}</span>
				{/if}
			{/each}
		</div>

		<div class="next-words">
			{#each nextWords as word, i}
				<div class="next-word-{i}">{word}</div>
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
		margin-bottom: 150px;
	}

	.word {
		font-size: 4em;
		letter-spacing: 0.05em;
	}

	.letter {
		display: inline-block;
		color: #808080;
	}

	.active {
		color: #313131;
	}

	.invalid {
		color: rgb(216, 79, 79);
	}

	.counter {
		font-size: 1.5em;
	}

	.next-words {
		height: 200px;
		text-align: center;
		color: #808080;
	}

	.next-word-0 {
		font-size: 3em;
	}

	.next-word-1 {
		font-size: 2em;
	}

	.next-word-2 {
		font-size: 2em;
	}
</style>
