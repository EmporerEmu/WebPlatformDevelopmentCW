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

	// Seeding tasks into the database
	init() {
		this.db.insert({
			name: "Last month test",
			type: "Swimming",
			date: "26/04/2021",
			completed: true,
			username: "ann@gmail.com",
		});
		this.db.insert({
			name: "Last month test",
			type: "Swimming",
			date: "27/04/2021",
			completed: true,
			username: "ann@gmail.com",
		});
		this.db.insert({
			name: "Last month test",
			type: "Swimming",
			date: "01/05/2021",
			completed: true,
			username: "ann@gmail.com",
		});
		this.db.insert({
			name: "Last month test",
			type: "Swimming",
			date: "02/05/2021",
			completed: true,
			username: "ann@gmail.com",
		});
		this.db.insert({
			name: "Morning Cardio",
			type: "Swimming",
			date: "03/05/2021",
			completed: true,
			username: "ann@gmail.com",
		});
		console.log("DB Task inserted");
		this.db.insert({
			name: "Flying session",
			type: "Something else",
			date: "04/05/2021",
			completed: false,
			username: "ann@gmail.com",
		});
		console.log("DB Task inserted");
		this.db.insert({
			name: "Leg Day",
			type: "Lifting",
			date: "05/05/2021",
			completed: false,
			username: "ann@gmail.com",
		});
		console.log("DB Task inserted");
		this.db.insert({
			name: "New Year New Me",
			type: "Something else",
			date: "06/05/2021",
			completed: false,
			username: "ann@gmail.com",
		});
		console.log("DB Task inserted");
	}

	addTask(name, type, date, username) {
		// var duration = endTime.getHours() - startTime.getHours();
		// console.log(duration);
		var entry = {
			name: name,
			type: type,
			date: new Date(date).toLocaleDateString("en-gb"),
			username: username,
            completed: false,
		};
		console.log("Entry created", entry);

		this.db.insert(entry, function (err, doc) {
			if (err) {
				console.log("Error inserting document", entry);
			} else {
				console.log("Document inserted into the database", doc);
			}
		});
	}

	getAllTasks() {
		return new Promise((resolve, reject) => {
			this.db.find({}, function (err, tasks) {
				if (err) {
					reject(err);
				} else {
					resolve(tasks);
					console.log("getAllTasks() returns: ", tasks);
				}
			});
		});
	}

	deleteTask(ID) {
		return new Promise((resolve, reject) => {
			this.db.remove({ _id: ID }, {}, function (err, docRem) {
				if (err) {
					reject(err);
				} else {
                    resolve(docRem);
					console.log("Document removed from db");
				}
			});
		});
	}

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

	getTaskByUsername(usernameIn) {
		return new Promise((resolve, reject) => {
			this.db.find({ username: usernameIn }, {}, function (err, doc) {
				if (err) {
					reject(err);
				} else {
                    vali.sortByDateDesc(doc);
					resolve(doc);
					console.log("document got", doc);
				}
			});
		});
	}

	updateTask(name, type, date, ID) {
		return new Promise((resolve, reject) => {
			this.db.update(
				{ _id: ID },
				{
					$set: {
						name: name,
						type: type,
						date: new Date(date).toLocaleDateString("en-gb"),
					},
				},
				// {},
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

	completeTask(ID) {
		return new Promise((resolve, reject) => {
			this.db.update(
				{ _id: ID },
				{
					$set: {
						completed: true,
					},
				},
				// {},
				function (err, doc) {
					if (err) {
						reject(err);
					} else {
						resolve(doc);
						console.log("Document updated: ", doc);
					}
				}
			);
		});
	}
} // end of class

module.exports = Tasks;
