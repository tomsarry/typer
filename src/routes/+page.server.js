import { Scores } from './scores';
import { Typer } from './typer';

const typer = new Typer();
const scores = new Scores();

export async function load({ cookies }) {
	scores.load(cookies.get('typer-scores'));

	return {
		words: typer.words.join(),
		scores: scores.times.sort((a, b) => parseInt(a) - parseInt(b))
	};
}

export const actions = {
	reset: async () => {
		typer.reset();
	},

	add: async ({ request, cookies }) => {
		const data = await request.formData();
		const time = parseInt(data.get('time'));

		scores.add(time);
		cookies.set('typer-scores', `${scores.toString()}`, {
			path: '/',
			maxAge: 60 * 60 * 24 * 365,
			httpOnly: true,
			sameSite: 'strict'
		});
	},

	delete: async ({ cookies }) => {
		await cookies.delete('typer-scores');
	}
};
