// Imports
const { response } = require("express");
const tasks = require("../models/tasksModels");

const db = new tasks();
db.init();

// /add
exports.addActivity = function (req, res) {
  res.render("addActivity", {
    title: "Fitness - Add Activities",
  });
};

// viewPlanner
exports.viewPlanner = function (req, res) {
  res.render("viewPlanner", {
    title: "Fitness - Schedule",
  });
};
