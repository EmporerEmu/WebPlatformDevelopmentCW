class Validations {
	getDays() {
		let curr = new Date();

		let week = [];

		for (let i = 1; i <= 7; i++) {
			let first = curr.getDate() - curr.getDay() + i;
			let day = new Date(curr.setDate(first)).toISOString().slice(0, 10);
			week.push(day);
		}
		console.log(week);
        return week;
	}

	sortByDateDesc(list) {
		list.sort(function (a, b) {
			if (a.date > b.date) return 1;
			if (a.date < b.date) return -1;
			return 0;
		});
	}

	sortByDateAsc(list) {
		list.sort(function (a, b) {
			if (a.date > b.date) return -1;
			if (a.date < b.date) return 1;

			return 0;
		});
	}
}

module.exports = Validations;
