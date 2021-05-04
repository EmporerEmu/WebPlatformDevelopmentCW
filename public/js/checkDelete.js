const controller = require(".../controllers/tasksController");
// const tasksController = require("../controllers/tasksController");

$("#deleteButton").click(function () {
	controller.deleteTask();
});
