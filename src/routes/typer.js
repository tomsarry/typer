import { bip39words } from './words.server';

export class Typer {
	constructor() {
		this.words = [];
		this.selectWords();
	}

	selectWords() {
		this.words = bip39words.sort(() => 0.5 - Math.random()).slice(0, 12);
	}

	reset() {
		this.words = [];
		this.selectWords();
	}
}
