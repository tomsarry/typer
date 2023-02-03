<script>
	import './styles.css';
</script>

<div class="app">
	<slot />
</div>

<style>
	.app {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
</style>
