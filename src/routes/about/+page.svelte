<svelte:head>
	<title>BIP39 Typer | About</title>
	<meta name="description" content="BIP39 Typer about page" />
</svelte:head>

<div class="about">
	<p>
		This website is a little toy project I made over the week-end. It was so cold out (-40 degrees
		Celcius), I had to find something to keep me busy inside and so here it is: a <b
			>BIP39 word typer</b
		> using SvelteKit.
	</p>
	<p>
		For those of you that do not know, <a
			href="https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki"
			rel="noopener noreferrer nofollow"
			target="_blank">BIP39</a
		>
		is the <i>Bitcoin Improvement Proposal</i> that suggested we use a mnemonic code composed of english
		words (the seed words) to have a more user-friendly way to generate deterministic wallets.
	</p>

	<p>
		BIP39 therefore uses a collection of 2048 words, that are unambiguous: the first four letters
		are sufficient to uniquely determine a word and where pairs of similar words are avoided (woman
		vs women for example). If you're wondering what these words are, simply start <a href="/"
			>typing</a
		>, or look through <a href="/words">them</a> (you can verify that any 4 letter combination yields
		at most one word 😉)!
	</p>
</div>

<style>
	.about {
		text-align: justify;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
	}

	p {
		margin-top: 0;
	}
</style>
