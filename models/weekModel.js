const nedb = require("nedb");
const { resolve } = require("path");
const validations = require("../public/js/validations");
const vali = new validations();

class Week {
	constructor(dbFilePath) {
		if (dbFilePath) {
			this.db = new nedb({ filename: dbFilePath, autoload: true });
			console.log("DB Connected to: " + dbFilePath);
		} else {
			this.db = new nedb();
		}
	}

	init() {
		this.db.insert({
			weekStart: new Date("3 May 2021 12:00 UTC")
				.toISOString()
				.substring(0, 10),
			weekEnd: new Date("9 May 2021 12:00 UTC")
				.toISOString()
				.substring(0, 10),
			username: "ann@gmail.com",
			workouts: {
				name: "Outside jog",
				details: "45 mins",
				date: new Date("7 May 2021 12:00 UTC")
					.toISOString()
					.substring(0, 10),
				completed: "false",
			},
		});
		console.log("Week added");
        this.db.insert({
			weekStart: new Date("3 May 2021 12:00 UTC")
				.toISOString()
				.substring(0, 10),
			weekEnd: new Date("9 May 2021 12:00 UTC")
				.toISOString()
				.substring(0, 10),
			username: "ann@gmail.com",
			workouts: {
				name: "Morning swim",
				details: "20 mins",
				date: new Date("4 May 2021 12:00 UTC")
					.toISOString()
					.substring(0, 10),
				completed: "false",
			},
		});
	}

	getAllWeeks() {
		return new Promise((resolve, reject) => {
			this.db.find({}, function (err, tasks) {
				if (err) {
					reject(err);
				} else {
					resolve(tasks);
					console.log("getAllWeeks() returns: ", tasks);
				}
			});
		});
	}
} // end of class Week

module.exports = Week;
