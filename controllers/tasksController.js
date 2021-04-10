// Imports
const { response } = require("express");
const tasks = require("../models/tasksModels");

const db = new tasks();
db.init();

// /activities-add
exports.addActivity = function (req, res) {
	res.render("activities/activities-add", {
		title: "Fitness - Add Activities",
	});
};

// POST: /activities-add
exports.postAddActivity = function (req, res) {
	console.log("Procesing...");
	if (!req.body.name) {
		response.status(400).send("Activity must have a name.");
		return;
	}
	db.addTask(
		req.body.name,
		req.body.type,
		req.body.date,
		req.body.startTime,
		req.body.endTime
	);
	// db.getAllTasks();
	res.redirect("/activities-planner");
};

// /activities-share
exports.shareActivity = function (req, res) {
	res.render("activities/activities-share", {
		title: "Fitness - Share",
	});
};

// viewPlanner
exports.viewPlanner = function (req, res) {
	db.getAllTasks()
		.then((list) => {
			res.render("activities/activities-planner", {
				title: "Fitness - Schedule",
				tasks: list,
			});
			console.log("promise resolved");
		})
		.catch((err) => {
			console.log("Promise rejected", err);
		});
};

// deleteTask
exports.deleteTask = function (req, res) {
	db.deleteTask(req.body.deleteButton);
	res.redirect("/activities-planner");
};

exports.editTask = function (req, res) {
	let user = req.params._id;
	db.getTaskByID(user)
		.then((task) => {
			res.render("activities/activities-edit", {
				title: "Fitness Tracker - Edit Tasks",
				task: task,
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
		req.body.type,
		req.body.date,
		req.body.startTime,
		req.body.endTime,
		req.params._id
	);
	res.redirect("/activities-planner");
};

// sidebar
exports.sidebar = function (req, res) {
	res.render("activities/activities-sidebar");
};
