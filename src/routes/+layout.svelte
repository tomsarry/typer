<script>
	import './styles.css';
	import { page } from '$app/stores';
</script>

<div class="app">
	<header>
		<h1>bip39typer</h1>
		<nav>
			<span aria-current={$page.url.pathname === '/' ? 'page' : undefined} class="nav-link"
				><a href="/">typer</a></span
			>
			<span aria-current={$page.url.pathname === '/about' ? 'page' : undefined} class="nav-link"
				><a href="/about">about</a></span
			>
		</nav>
	</header>

	<slot />

	<footer>Made with ❤️ by tomsarry</footer>
</div>

<style>
	.app {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		background-color: #ebebeb;
		color: #313131;
	}

	h1 {
		margin: 20px 0 10px 0;
		font-size: 3em;
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
		background-color: #cecece;
	}

	.nav-link[aria-current='page'] {
		background-color: #313131;
		color: #ebebeb;
	}

	.nav-link[aria-current='page'] a {
		color: white;
	}

	a {
		color: #313131;
		font-weight: 400;
		font-size: 1.5em;
		padding: 0px 14px;
		text-decoration: none;
	}

	header {
		width: 100vw;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	footer {
		margin: 10px;
	}
</style>
