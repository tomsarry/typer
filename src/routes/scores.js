function sortInt(a, b) {
	return parseInt(a) - parseInt(b);
}

export class Scores {
	constructor() {
		this.times = new Array();
	}

	load(serialized) {
		this.times = new Array();

		if (serialized) {
			const scores = serialized.split(',');

			scores.forEach((time) => {
				this.times.push(parseInt(time));
			});

			this.times.sort(sortInt);
		}
	}

	add(time) {
		if (this.times.length < 5) {
			this.times.push(parseInt(time));
			this.times.sort(sortInt);
			return;
		}

		this.times.sort(sortInt);

		for (let i = 0; i < 5; i++) {
			if (time < this.times[i]) {
				this.times.splice(i, 0, time);
				break;
			}
		}

		this.times = this.times.slice(0, 5);
	}

	toString() {
		return `${this.times.join()}`;
	}
}
