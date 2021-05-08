const nedb = require("nedb");
const { resolve } = require("path");
const validations = require("../public/js/validations");
const vali = new validations();

class Tasks {
	constructor(dbFilePath) {
		if (dbFilePath) {
			this.db = new nedb({ filename: dbFilePath, autoload: true });
			console.log("DB Connected to: " + dbFilePath);
		} else {
			this.db = new nedb();
		}
	}
	#region;
	// Seeding tasks into the database
	// init() {
	// 	this.db.insert({
	// 		name: "I don't understand",
	// 		type: "Running",
	// 		date: new Date("31 May 2021 12:00 UTC")
	// 			.toISOString()
	// 			.substring(0, 10),
	// 		completed: true,
	// 		username: "ann@gmail.com",
	// 	});
	// 	this.db.insert({
	// 		name: "Like, really don't understand",
	// 		type: "Lifting",
	// 		date: new Date("27 May 2021 12:00 UTC")
	// 			.toISOString()
	// 			.substring(0, 10),
	// 		completed: true,
	// 		username: "ann@gmail.com",
	// 	});
	// 	this.db.insert({
	// 		name: "?",
	// 		type: "Swimming",
	// 		date: new Date("1 May 2021 12:00 UTC")
	// 			.toISOString()
	// 			.substring(0, 10),
	// 		completed: true,
	// 		username: "ann@gmail.com",
	// 	});
	// 	this.db.insert({
	// 		name: "Morning Jog",
	// 		type: "Running",
	// 		date: new Date("2 May 2021 12:00 UTC")
	// 			.toISOString()
	// 			.substring(0, 10),
	// 		completed: true,
	// 		username: "ann@gmail.com",
	// 	});
	// 	this.db.insert({
	// 		name: "Morning Cardio",
	// 		type: "Swimming",
	// 		date: new Date("3 May 2021 12:00 UTC")
	// 			.toISOString()
	// 			.substring(0, 10),
	// 		completed: true,
	// 		username: "ann@gmail.com",
	// 	});
	// 	console.log("DB Task inserted");
	// 	this.db.insert({
	// 		name: "Flying session",
	// 		type: "Something else",
	// 		date: new Date("4 May 2021 12:00 UTC")
	// 			.toISOString()
	// 			.substring(0, 10),
	// 		completed: false,
	// 		username: "ann@gmail.com",
	// 	});
	// 	console.log("DB Task inserted");
	// 	this.db.insert({
	// 		name: "Leg Day",
	// 		type: "Lifting",
	// 		date: new Date("5 May 2021 12:00 UTC")
	// 			.toISOString()
	// 			.substring(0, 10),
	// 		completed: false,
	// 		username: "ann@gmail.com",
	// 	});
	// 	console.log("DB Task inserted");
	// 	this.db.insert({
	// 		name: "New Year New Me",
	// 		type: "Something else",
	// 		date: new Date("6 May 2021 12:00 UTC")
	// 			.toISOString()
	// 			.substring(0, 10),
	// 		completed: false,
	// 		username: "ann@gmail.com",
	// 	});
	// 	console.log("DB Task inserted");
	// }
	#endregion;

	// Seeding tasks into the database
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
				completed: true,
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
				completed: false,
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
				completed: false,
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
				completed: false,
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
				completed: false,
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
				completed: false,
			},
		});
	}

	// Takes in an array with dates of current week and logged in users username
	// Searchers for records which match the username, and conditionals based
	// on the currrent week to return records for this week only.
	currentWeekTasks(currentWeekArray, usernameIn) {
		var currentWeekArray = currentWeekArray;
		return new Promise((resolve, reject) => {
			this.db.find(
				{
					username: usernameIn,
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

	// Takes in workout details as paramaters, calculates the
	// start and ending dates of that week, then saves to DB.
	addTask(name, details, date, username) {
		var week = vali.getStartAndEnd(date);
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
				console.log("Document inserted into DB", doc);
			}
		});
	}

    // Takes parameter in which is ID, searches DB for record with that ID
    // returns it.
	getTaskByID(ID) {
		return new Promise((resolve, reject) => {
			this.db.find({ _id: ID }, {}, function (err, doc) {
				if (err) {
					reject(err);
				} else {
					resolve(doc);
					console.log("Document got", doc);
				}
			});
		});
	}

    // Takes in paramaters. ID is used to search for the record
    // Paramaters are used to update the record.
    // Dot notation used for the fields in the sub-document.
    // Object notation will result in sub-document fields getting deleted if not mentioned in the 
    // update query.
	updateTask(name, details, date, ID) {
		return new Promise((resolve, reject) => {
			this.db.update(
				{ _id: ID },
				{
					$set: {
                        date: new Date(date).toISOString().substring(0, 10),
						"workouts.name": name,
						"workouts.details": details,
					},
				},
				{},
				function (err, doc) {
					if (err) {
						reject(err);
						console.log("Document not updated", err);
					} else {
						resolve(doc);
						console.log("Document updated: ", doc);
					}
				}
			);
		});
	}

	// getTaskByUsername(usernameIn) {
	// 	return new Promise((resolve, reject) => {
	// 		this.db.find({ username: usernameIn }, {}, function (err, doc) {
	// 			if (err) {
	// 				reject(err);
	// 			} else {
	// 				resolve(doc);
	// 				console.log("document got", doc);
	// 			}
	// 		});
	// 	});
	// }

	// 	this.db.insert(entry, function (err, doc) {
	// 		if (err) {
	// 			console.log("Error inserting document", entry);
	// 		} else {
	// 			console.log("Document inserted into the database", doc);
	// 		}
	// 	});
	// }

	// getAllTasks() {
	// 	return new Promise((resolve, reject) => {
	// 		this.db.find({}, function (err, tasks) {
	// 			if (err) {
	// 				reject(err);
	// 			} else {
	// 				resolve(tasks);
	// 				console.log("getAllTasks() returns: ", tasks);
	// 			}
	// 		});
	// 	});
	// }

	// deleteTask(ID) {
	// 	return new Promise((resolve, reject) => {
	// 		this.db.remove({ _id: ID }, {}, function (err, docRem) {
	// 			if (err) {
	// 				reject(err);
	// 			} else {
	// 				resolve(docRem);
	// 				console.log("Document removed from db");
	// 			}
	// 		});
	// 	});
	// }

	// completeTask(ID) {
	// 	return new Promise((resolve, reject) => {
	// 		this.db.update(
	// 			{ _id: ID },
	// 			{
	// 				$set: {
	// 					completed: true,
	// 				},
	// 			},
	// 			// {},
	// 			function (err, doc) {
	// 				if (err) {
	// 					reject(err);
	// 				} else {
	// 					resolve(doc);
	// 					console.log("Document updated: ", doc);
	// 				}
	// 			}
	// 		);
	// 	});
	// }
} // end of class

module.exports = Tasks;
