<script>
	export let data;

	let search = '';

	$: filtered = data.words.filter((w) => w.startsWith(search));
</script>

<svelte:head>
	<title>BIP39 Typer | Words</title>
	<meta name="description" content="BIP39 Typer words list page" />
</svelte:head>

<div class="words">
	<p>You will find here a complete list of the 2048 BIP39 words, simply search to filter.</p>

	<div class="div-search">
		<input type="text" class="search" bind:value={search} on:input />
	</div>

	<div class="words-list">
		{#each filtered as word}
			<span>
				{word}
			</span>
		{/each}
	</div>
</div>

<style>
	.words-list {
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		gap: 10px;
	}

	.div-search {
		display: flex;
		justify-content: center;
		margin-bottom: 32px;
	}

	.search {
		border: 1px solid var(--text-color);
		font-size: 0.8em;
		border-radius: 8px;
		padding: 4px 8px;
		caret-color: var(--text-color);
	}

	.search:focus {
		outline: #787878 solid 2px;
	}

	p {
		margin-top: 0px;
	}
</style>
