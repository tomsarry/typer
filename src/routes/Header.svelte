<script>
	import { page } from '$app/stores';
	import github from '$lib/images/github.svg';
</script>

<header>
	<h1>BIP39 Typer</h1>
	<nav>
		<span aria-current={$page.url.pathname === '/' ? 'page' : undefined} class="nav-link"
			><a href="/">typer</a></span
		>
		<span aria-current={$page.url.pathname === '/about' ? 'page' : undefined} class="nav-link"
			><a href="/about">about</a></span
		>
	</nav>

	<a
		href="https://github.com/tomsarry/typer"
		rel="noopener noreferrer nofollow"
		target="_blank"
		class="github"
		title="Go to the project's repository"
	>
		<img src={github} alt="github logo" />
	</a>
</header>

<style>
	.github {
		position: absolute;
		top: 20px;
		right: 20px;
		height: 50px;
		background: none;
		color: inherit;
		border: none;
		border-radius: 50%;
		padding: 0;
		font: inherit;
		cursor: pointer;
		transition: opacity 0.2s ease;
	}

	.github:hover {
		opacity: 0.7;
	}

	img {
		width: 50px;
		height: 50px;
		object-fit: contain;
	}

	h1 {
		margin: 20px 0 10px 0;
		font-size: 2.5em;
	}

	nav {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.nav-link {
		display: inline-block;
		margin: 0px 8px;
		border-radius: 8px;
		transition: background-color 0.2s ease;
	}

	.nav-link:hover {
		background-color: var(--secondary-color);
	}

	.nav-link[aria-current='page'] {
		background-color: var(--text-color);
		color: var(--bg-color);
	}

	.nav-link[aria-current='page'] a {
		color: var(--bg-color);
	}

	a {
		color: inherit;
		font-weight: 400;
		display: inline-block;
		height: 40px;
		line-height: 40px;
		font-size: 1.2em;
		padding: 0px 16px;
		text-decoration: none;
	}

	header {
		width: 100vw;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin-bottom: 2em;
	}
</style>
