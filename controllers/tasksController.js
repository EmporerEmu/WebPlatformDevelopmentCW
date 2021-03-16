// Imports
const { response } = require("express");
const tasks = require("../models/tasksModels");

const db = new tasks();
db.init();

// /activities-add
exports.addActivity = function (req, res) {
  res.render("activities-add", {
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
  db.getAllTasks();
  res.redirect("/activities-planner");
};

// /activities-share
exports.shareActivity = function (req, res) {
  res.render("activities-share", {
    title: "Fitness - Share",
  });
};

// viewPlanner
exports.viewPlanner = function (req, res) {
  db.getAllTasks()
    .then((list) => {
      res.render("activities-planner", {
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

// /activities-edit
exports.editDeleteActivity = function (req, res) {
  db.getTaskByID(req.body.editButton);
  res.redirect("/activities-edit");
};
