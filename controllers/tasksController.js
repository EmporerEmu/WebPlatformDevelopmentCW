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
	console.log("Procesing...");
	if (!req.body.name) {
		response.status(400).send("Activity must have a name.");
		return;
	}
	db.addTask(req.body.name, req.body.details, req.body.date, req.user.user);
	week.addTask(req.body.name, req.body.details, req.body.date, req.user.user);
	// db.getAllTasks();
	res.redirect("/activities-planner");
};

// /activities-share
exports.shareActivity = function (req, res) {
	res.render("activities/activities-share", {
		title: "Fitness - Share",
		user: req.user,
	});
};

// viewPlanner
exports.viewPlanner = function (req, res) {
	var username = req.user.user;
	var currentWeek = vali.getDays();
	db.currentWeekTasks(currentWeek, username)
		.then((list) => {
			res.render("activities/activities-planner", {
				title: "Fitness - Schedule",
				tasks: list,
				user: req.user,
				weekStart: currentWeek[0],
				weekEnd: currentWeek[6],
			});
			console.log("promise resolved");
		})
		.catch((err) => {
			console.log("Promise rejected", err);
		});
};

//activities-delete
exports.deleteTask = function (req, res) {
	res.render("activities/activities-delete", {});
};

// activities-delete [POST]
exports.postDeleteTask = function (req, res) {
	db.deleteTask(req.params._id);
	res.redirect("/activities-planner");
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
			console.log("Error handling user task", err);
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
	res.redirect("/activities-planner");
};

// post complete
exports.completeTask = function (req, res) {
	db.completeTask(req.body.completeButton);
	res.redirect("/activities-planner");
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
			console.log(err);
		});
};
