import { Typer } from './typer';

const typer = new Typer();

export function load() {
	return { words: typer.words };
}

export const actions = {
	update: async ({ request }) => {
		const data = await request.formData();
		console.log(data);
		const key = data.get('key');

		if (key === 'backspace') {
			typer.erase();
			return;
		}

		typer.add(key);
	},

	reset: async () => {
		typer.reset();
	}
};
