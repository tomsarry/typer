<script>
	import { enhance } from '$app/forms';
	import { fly } from 'svelte/transition';

	import Counter from './Counter.svelte';

	import restart from '$lib/images/restart.svg';
	import enter from '$lib/images/enter.svg';

	export let data;

	let wordIndex = 0;
	let won = false;

	let start = undefined;
	let end = undefined;
	let time = undefined;
	let userWordInput = '';

	$: inputSize = userWordInput.length;
	$: words = data.words.split(',');
	$: word = words[wordIndex];
	$: nextWords = words.slice(wordIndex + 1, wordIndex + 4);

	let previousWords = '';

	$: if (data.words != previousWords) {
		userWordInput = '';
		won = false;
		wordIndex = 0;
		previousWords = words;
		resetTimer();
	}

	let rot = 360;

	function handle_rotate() {
		let restartButton = document.getElementById('reset-btn');
		restartButton.style = 'transform: rotate(' + rot + 'deg)';
		rot += 360;
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

	function saveTime() {
		document.getElementById('add-btn').setAttribute('value', time);
		document.getElementById('add-btn').click();
	}

	function check_word() {
		if (userWordInput == words[wordIndex]) {
			wordIndex++;
			userWordInput = '';
		}

		if (wordIndex == words.length) {
			stopTimer();
			won = true;
			saveTime();
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

		if (key === 'enter') {
			document.getElementById('reset-btn').click();
			return;
		}

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

<svelte:head>
	<title>BIP39 Typer</title>
	<meta name="description" content="BIP39 Typer" />
</svelte:head>

<div class="content">
	<div class="typer">
		<Counter current={wordIndex} total={words.length} />

		{#if won}
			<p class="finish" in:fly={{ duration: 150 }}>
				Typed {words.length} words in {(time / 1000).toFixed(2)}s
			</p>
		{:else}
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
			<div class="reset-controls">
				<button
					on:click={handle_rotate}
					id="reset-btn"
					class="reset"
					formaction="?/reset"
					title="Click to restart"
				>
					<img src={restart} alt="reset button" />
				</button>
				<span class="separator" />
				<div class="enter-div" title="Press Enter to restart">
					<img src={enter} alt="enter key" />
				</div>
			</div>
		</form>
	</div>

	<form method="POST" action="?/add" use:enhance>
		<button id="add-btn" name="time" formaction="?/add" value={time} class="hidden" />
	</form>

	{#if data.scores.length}
		<div class="scores">
			<span class="scores-title">Highscores</span>
			<ul>
				{#each data.scores as score, i}
					{#if i == 0}
						<li class="score best">{(score / 1000).toFixed(2)}s</li>
					{:else}
						<li class="score">{(score / 1000).toFixed(2)}s</li>
					{/if}
				{/each}
			</ul>

			<form method="POST" action="?/delete" use:enhance>
				<button name="time" formaction="?/delete" class="delete-btn" title="Reset highscores">
					reset
				</button>
			</form>
		</div>
	{/if}
</div>

<style>
	.typer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin-bottom: 150px;
	}

	.finish {
		font-size: 2.5em;
		color: var(--text-color);
	}

	.scores {
		position: absolute;
		display: flex;
		flex-direction: column;
		align-items: center;
		right: 50px;
		bottom: 50px;
	}

	.best {
		font-size: 1.2em;
		opacity: 1;
	}

	.best::after {
		content: '🏆';
		font-size: 0.8em;
		margin-left: 8px;
	}

	.scores-title {
		font-size: 1.2em;
		margin-bottom: 4px;
		text-decoration: underline;
	}

	ul {
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	li {
		list-style: none;
		opacity: 0.8;
	}

	.delete-btn {
		background-color: var(--invalid-color);
		color: var(--bg-color);
		font-weight: 400;
		height: 40px;
		line-height: 40px;
		font-size: 1em;
		padding: 0px 16px;
		font-family: inherit;
		border: none;
		border-radius: 8px;
		transition: opacity 0.2s ease;
		margin: 16px;
		cursor: pointer;
	}

	.delete-btn:hover {
		opacity: 0.9;
	}

	.reset {
		height: 40px;
		background: none;
		color: inherit;
		border: none;
		border-radius: 50%;
		padding: 0;
		font: inherit;
		cursor: pointer;
		transition: opacity 0.2s ease, transform 0.4s ease-out;
	}

	.reset:hover {
		opacity: 0.7;
	}

	.reset-controls {
		margin-top: 24px;
		display: flex;
	}

	.separator {
		width: 2px;
		background-color: var(--secondary-color);
		margin: 0px 14px 0px 10px;
		border-radius: 8px;
	}

	.enter-div {
		border: 2px solid var(--text-color);
		border-radius: 4px;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: var(--secondary-color);
		width: 40px;
		height: 40px;
		box-sizing: border-box;
	}

	.enter-div img {
		width: 30px;
		height: 30px;
	}

	img {
		width: 40px;
		height: 40px;
		object-fit: contain;
	}

	.hidden {
		display: none;
	}

	.word {
		font-size: 4em;
		letter-spacing: 0.05em;
	}

	.letter {
		display: inline-block;
		color: var(--unfocused-color);
	}

	.active {
		color: var(--text-color);
	}

	.invalid {
		color: var(--invalid-color);
	}

	.next-words {
		height: 200px;
		text-align: center;
		color: var(--unfocused-color);
	}

	.next-word-0 {
		font-size: 3em;
		line-height: 1em;
		margin-bottom: 10px;
	}

	.next-word-1 {
		font-size: 2.3em;
		line-height: 1em;
		margin-bottom: 8px;
	}

	.next-word-2 {
		font-size: 1.8em;
		line-height: 1em;
	}
</style>
