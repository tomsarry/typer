<script>
	import './styles.css';
</script>

<div class="app">
	<header>
		<h1>bip39typer</h1>
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

	header {
		width: 100vw;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}

	footer {
		margin: 10px;
	}
</style>
