<script>
	import './styles.css';
	import Header from './Header.svelte';
	import Footer from './Footer.svelte';
</script>

<div class="mobile">
	<p>Please open on a computer for the best experience.</p>
</div>

<div class="app">
	<Header />

	<div class="content">
		<slot />
	</div>

	<Footer />
</div>

<style>
	.app {
		min-height: 100vh;
		max-width: 600px;
		margin: auto;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
	}

	.content {
		flex-grow: 1;
	}

	.mobile {
		display: none;
	}

	@media (max-width: 700px) {
		.app {
			display: none;
		}

		.mobile {
			flex-grow: 1;
			min-height: 100vh;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}
</style>
