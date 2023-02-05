<script>
	export let current;
	export let total;
</script>

<div class="counter">
	{current + 1} / {total}
</div>

<style>
	.counter {
		background-color: var(--secondary-color);
		font-weight: 400;
		font-size: 1em;
		padding: 6px 14px;
		border-radius: 8px;
		font-family: Arial, Helvetica, sans-serif;
	}
</style>
