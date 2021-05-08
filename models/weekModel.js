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
			date: new Date("7 May 2021 12:00 UTC")
				.toISOString()
				.substring(0, 10),
			username: "ann@gmail.com",
			workouts: {
				name: "Outside jog",
				details: "45 mins",
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
			date: new Date("4 May 2021 12:00 UTC")
				.toISOString()
				.substring(0, 10),
			username: "ann@gmail.com",
			workouts: {
				name: "Morning swim",
				details: "20 mins",
				completed: "false",
			},
		});
		this.db.insert({
			weekStart: new Date("3 May 2021 12:00 UTC")
				.toISOString()
				.substring(0, 10),
			weekEnd: new Date("9 May 2021 12:00 UTC")
				.toISOString()
				.substring(0, 10),
			date: new Date("6 May 2021 12:00 UTC")
				.toISOString()
				.substring(0, 10),
			username: "ann@gmail.com",
			workouts: {
				name: "Weight Session",
				details: "20 mins",
				completed: "false",
			},
		});
		this.db.insert({
			weekStart: new Date("3 May 2021 12:00 UTC")
				.toISOString()
				.substring(0, 10),
			weekEnd: new Date("9 May 2021 12:00 UTC")
				.toISOString()
				.substring(0, 10),
			date: new Date("9 May 2021 12:00 UTC")
				.toISOString()
				.substring(0, 10),
			username: "ann@gmail.com",
			workouts: {
				name: "Sunday swim",
				details: "30 mins",
				completed: "false",
			},
		});
		this.db.insert({
			weekStart: new Date("3 May 2021 12:00 UTC")
				.toISOString()
				.substring(0, 10),
			weekEnd: new Date("9 May 2021 12:00 UTC")
				.toISOString()
				.substring(0, 10),
			date: new Date("2 May 2021 12:00 UTC")
				.toISOString()
				.substring(0, 10),
			username: "ann@gmail.com",
			workouts: {
				name: "Afternoon Stroll",
				details: "45 mins",
				completed: "false",
			},
		});
		this.db.insert({
			weekStart: new Date("10 May 2021 12:00 UTC")
				.toISOString()
				.substring(0, 10),
			weekEnd: new Date("16 May 2021 12:00 UTC")
				.toISOString()
				.substring(0, 10),
			date: new Date("13 May 2021 12:00 UTC")
				.toISOString()
				.substring(0, 10),
			username: "ann@gmail.com",
			workouts: {
				name: "Morning swim",
				details: "20 mins",
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

	currentWeekTasks(currentWeekArray, usernameIn) {
		var currentWeekArray = currentWeekArray;
		return new Promise((resolve, reject) => {
			this.db.find(
				{
					$and: [
						{
							weekStart: {
								$gte: new Date(currentWeekArray[0])
									.toISOString()
									.substring(0, 10),
							},
						},
						{
							weekEnd: {
								$lte: new Date(currentWeekArray[6])
									.toISOString()
									.substring(0, 10),
							},
						},
					],
				},
				function (err, tasks) {
					if (err) {
						reject(err);
					} else {
						vali.sortByDateDesc(tasks);
						resolve(tasks);
						console.log("currentWeekTasks returns: ", tasks);
					}
				}
			);
		});
	}

	addTask(name, details, date, username) {
		var week = vali.getStartAndEnd(date);
		console.log("Week is: ", week);
		var task = {
			weekStart: new Date(week[0]).toISOString().substring(0, 10),
			weekEnd: new Date(week[6]).toISOString().substring(0, 10),
			username: username,
			workouts: {
				name: name,
				details: details,
				date: new Date(date).toISOString().substring(0, 10),
				completed: false,
			},
		};
		this.db.insert(task, function (err, doc) {
			if (err) {
				console.log("Error inserting document", task);
			} else {
				console.log("Document inserted into weeks DB", doc);
			}
		});
	}
} // end of class Week

module.exports = Week;
