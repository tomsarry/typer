<script>
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';

	const progress = tweened(0, {
		duration: 200,
		easing: cubicOut
	});

	$: {
		progress.set(current / total);
	}

	export let current;
	export let total;
</script>

<progress value={$progress} />

<style>
	progress {
		display: inline-block;
		background-color: var(--bg-color);
		height: 5px;
		border: 1px solid var(--text-color);
		border-radius: 16px;
		color: var(--text-color);
		margin: 10px;
	}

	progress::-moz-progress-bar {
		background: var(--text-color);
	}
	progress::-webkit-progress-value {
		background: var(--text-color);
	}
</style>
