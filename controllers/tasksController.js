// Imports
const { response } = require("express");
const tasks = require("../models/tasksModels");

const db = new tasks();
db.init();



// /add
exports.addActivity = function (req, res) {
  res.render("activities-add", {
    title: "Fitness - Add Activities",
  });
};

// POST: /add
exports.postAddActivity = function (req, res) {
  console.log("Procesing...");
  if (!req.body.name) {
    response.status(400).send("Activity must have a name.");
    return;
  }
  db.addTask(
    req.body.name,
    req.body.type,
    req.body.startTime,
    req.body.endTime
  );
  db.getAllTasks();
  res.redirect("/activities-planner");
};

exports.editDeleteActivity = function(req, res) {
  res.render("")
}

// viewPlanner
exports.viewPlanner = function (req, res) {
  // res.render("viewPlanner", {
  //   title: "Fitness - Schedule",
  // });
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
