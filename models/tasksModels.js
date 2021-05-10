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

	// Seeds in task for the current week
	thisWeek() {
		var currentWeek = vali.getDays();
		this.db.insert({
			weekStart: new Date(currentWeek[0]).toISOString().substring(0, 10),
			weekEnd: new Date(currentWeek[6]).toISOString().substring(0, 10),
			date: new Date(currentWeek[3]).toISOString().substring(0, 10),
			username: "ann@gmail.com",
			workouts: {
				name: "Outside jog",
				details: "45 mins",
				completed: true,
			},
		});
		this.db.insert({
			weekStart: new Date(currentWeek[0]).toISOString().substring(0, 10),
			weekEnd: new Date(currentWeek[6]).toISOString().substring(0, 10),
			date: new Date(currentWeek[4]).toISOString().substring(0, 10),
			username: "ann@gmail.com",
			workouts: {
				name: "Morning swim",
				details: "20 mins",
				completed: false,
			},
		});
		this.db.insert({
			weekStart: new Date(currentWeek[0]).toISOString().substring(0, 10),
			weekEnd: new Date(currentWeek[6]).toISOString().substring(0, 10),
			date: new Date(currentWeek[5]).toISOString().substring(0, 10),
			username: "ann@gmail.com",
			workouts: {
				name: "Weight Session",
				details: "20 mins",
				completed: false,
			},
		});
		this.db.insert({
			weekStart: new Date(currentWeek[0]).toISOString().substring(0, 10),
			weekEnd: new Date(currentWeek[6]).toISOString().substring(0, 10),
			date: new Date(currentWeek[6]).toISOString().substring(0, 10),
			username: "ann@gmail.com",
			workouts: {
				name: "Sunday swim",
				details: "30 mins",
				completed: false,
			},
		});
	}
	// Seeds in tasks for the previous week
	lastWeek() {
		var date = vali.getPreviousWeekStart();
		var previousWeek = vali.getStartAndEnd(date);
		this.db.insert({
			weekStart: new Date(previousWeek[0]).toISOString().substring(0, 10),
			weekEnd: new Date(previousWeek[6]).toISOString().substring(0, 10),
			date: new Date(previousWeek[6]).toISOString().substring(0, 10),
			username: "ann@gmail.com",
			workouts: {
				name: "Sunday swim",
				details: "30 mins",
				completed: false,
			},
		});
		this.db.insert({
			weekStart: new Date(previousWeek[0]).toISOString().substring(0, 10),
			weekEnd: new Date(previousWeek[6]).toISOString().substring(0, 10),
			date: new Date(previousWeek[2]).toISOString().substring(0, 10),
			username: "ann@gmail.com",
			workouts: {
				name: "Afternoon Stroll",
				details: "45 mins",
				completed: false,
			},
		});
	}
	// Seeds in tasks for the next week
	nextWeek() {
		var date = vali.getNextWeekStart();
		var nextWeek = vali.getStartAndEnd(date);
		this.db.insert({
			weekStart: new Date(nextWeek[0]).toISOString().substring(0, 10),
			weekEnd: new Date(nextWeek[6]).toISOString().substring(0, 10),
			date: new Date(nextWeek[2]).toISOString().substring(0, 10),
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
						// console.log("currentWeekTasks returns: ", tasks);
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
			date: new Date(date).toISOString().substring(0, 10),
			workouts: {
				name: name,
				details: details,
				completed: false,
			},
		};
		this.db.insert(task, function (err, doc) {
			if (err) {
				// console.log("Error inserting document", task);
			} else {
				// console.log("Document inserted into DB", doc);
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
					// console.log("Document got", doc);
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
						// console.log("Document not updated", err);
					} else {
						resolve(doc);
						// console.log("Document updated: ", doc);
					}
				}
			);
		});
	}

	// Takes in ID as a paramater
	// Updates record where record _id == ID
	completeTask(ID) {
		return new Promise((resolve, reject) => {
			this.db.update(
				{ _id: ID },
				{
					$set: {
						"workouts.completed": true,
					},
				},
				// {},
				function (err, doc) {
					if (err) {
						reject(err);
					} else {
						resolve(doc);
						// console.log("Document updated: ", doc);
					}
				}
			);
		});
	}

	// Takes in ID as a parameter
	// Deletes record where record _id == ID
	deleteTask(ID) {
		return new Promise((resolve, reject) => {
			this.db.remove({ _id: ID }, {}, function (err, docRem) {
				if (err) {
					reject(err);
				} else {
					resolve(docRem);
					// console.log("Document removed from db");
				}
			});
		});
	}

	// Takes in username as a parameter
	// Gets all records where completed = false.
	getAllUncompletedTasks(usernameIn) {
		return new Promise((resolve, reject) => {
			this.db.find(
				{ username: usernameIn, "workouts.completed": false },
				{},
				function (err, docs) {
					if (err) {
						reject(err);
						// console.log("Cannot get all uncompleted tasks", err);
					} else {
                        vali.sortByDateDesc(docs);
						resolve(docs);
						// console.log("All uncompleted tasks:", docs);
					}
				}
			);
		});
	}

	getTaskByWeek(date, usernameIn) {
		var week = vali.getStartAndEnd(date);
		return new Promise((resolve, reject) => {
			this.db.find(
				{
					username: usernameIn,
					$and: [
						{
							weekStart: {
								$gte: new Date(week[0])
									.toISOString()
									.substring(0, 10),
							},
						},
						{
							weekEnd: {
								$lte: new Date(week[6])
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
						// console.log("currentWeekTasks returns: ", tasks);
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
} // end of class

module.exports = Tasks;
