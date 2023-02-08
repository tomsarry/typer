import { bip39words } from '../words.server';

export async function load() {
	return {
		words: bip39words.sort()
	};
}
