// Imports
const { response } = require("express");
const tasks = require("../models/tasksModels");

const db = new tasks();
db.init();

const validations = require("../public/js/validations");
const vali = new validations();

// /activities-add
exports.addActivity = function (req, res) {
	res.render("activities/activities-add", {
		title: "Fitness - Add Activities",
		user: req.user,
	});
};

// POST: /activities-add
exports.postAddActivity = function (req, res) {
	// console.log("Procesing...");
	if (!req.body.name) {
		res.status(400).send("Activity must have a name.");
		return;
	}
	db.addTask(req.body.name, req.body.details, req.body.date, req.user.user);
	res.redirect("/activities/planner");
};

// /activities-share
exports.shareActivity = function (req, res) {
	res.render("activities/activities-share", {
		title: "Fitness - Share",
		user: req.user,
	});
};

exports.guestShare = function (req, res) {
	var username = req.params.username;
	var id = req.params.first;
	// console.log("id", id);
	// console.log(username);
	var currentWeek = vali.getDays();
	db.currentWeekTasks(currentWeek, username).then((list) => {
		res.render("activities/activities-share-guest", {
			tasks: list,
		});
	});
};

// viewPlanner
exports.viewPlanner = function (req, res) {
	var username = req.user.user;
	var currentWeek = vali.getDays();
	var previousWeek = vali.getPreviousWeekStart();
	console.log("previous week:", previousWeek);
	var nextWeek = vali.getNextWeekStart();
	console.log("next week:", nextWeek);
	db.currentWeekTasks(currentWeek, username)
		.then((list) => {
			res.render("activities/activities-planner", {
				title: "Fitness - Schedule",
				tasks: list,
				user: req.user,
				weekStart: currentWeek[0],
				weekEnd: currentWeek[6],
				first: currentWeek[0],
				next: nextWeek,
				previous: previousWeek,
			});
			// console.log("promise resolved");
		})
		.catch((err) => {
			// console.log("Promise rejected", err);
		});
};

//activities-delete
exports.deleteTask = function (req, res) {
	res.render("activities/activities-delete", {});
};

// activities-delete [POST]
exports.postDeleteTask = function (req, res) {
	db.deleteTask(req.params._id);
	res.redirect("/activities/planner");
};

exports.editTask = function (req, res) {
	let user = req.params._id;
	db.getTaskByID(user)
		.then((task) => {
			res.render("activities/activities-edit", {
				title: "Fitness Tracker - Edit Tasks",
				task: task,
				user: req.user,
			});
		})
		.catch((err) => {
			// console.log("Error handling user task", err);
		});
};

// post
exports.postEditTask = function (req, res) {
	db.updateTask(
		req.body.name,
		req.body.details,
		req.body.date,
		req.params._id
	);
	res.redirect("/activities/planner");
};

// post complete
exports.completeTask = function (req, res) {
	db.completeTask(req.body.completeButton);
	res.redirect("/activities/planner");
};

exports.missedActivities = function (req, res) {
	var username = req.user.user;
	db.getAllUncompletedTasks(username)
		.then((tasks) => {
			res.render("activities/activities-missed", {
				tasks: tasks,
			});
		})
		.catch((err) => {
			// console.log(err);
		});
};

exports.previousWeek = function (req, res) {
	var username = req.user.user;
	var date = req.params.previous;
	db.getTaskByWeek(date, username).then((list) => {
		res.render("activities/activities-previous", {
            tasks: list
        })
	});
};

exports.nextWeek = function (req, res) {
	var username = req.user.user;
	var date = req.params.next;
	db.getTaskByWeek(date, username).then((list) => {
		res.render("activities/activities-next", {
            tasks: list
        })
	});
};
