// Imports
const express = require("express");
const homeController = require("../controllers/homeController");
const tasksController = require("../controllers/tasksController");
const accountController = require("../controllers/accountController");

const router = express.Router();

// Routes
// Home and root
router.get("/", homeController.landingPage);

// Tasks
router.get("/activities-add", tasksController.addActivity);

router.post("/activities-add", tasksController.postAddActivity);

router.get("/activities-planner", tasksController.viewPlanner);

// Account
router.get("/account-login", accountController.login);

router.get("/account-signUp", accountController.signUp);

// Routes | status codes

router.use(function (req, res) {
  res.status(400);
  res.type("text/plain");
  res.send("404 Not found");
});

router.use(function (err, req, res, next) {
  res.status(500);
  res.type("text/plain");
  res.send("Internal server error");
});

module.exports = router;
