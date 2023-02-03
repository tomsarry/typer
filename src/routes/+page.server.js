import { Typer } from './typer';

const typer = new Typer();

export function load() {
	return { words: typer.words };
}

export const actions = {
	reset: async () => {
		typer.reset();
	}
};
