// Imports
const express = require("express");
const homeController = require("../controllers/homeController");
const tasksController = require("../controllers/tasksController");
const accountController = require("../controllers/accountController");
const auth = require("../auth/auth");
const { ensureLoggedIn } = require("connect-ensure-login");

const router = express.Router();

// Routes
// Home and root
router.get("/", homeController.landingPage);

// Tasks
router.get("/activities/add", ensureLoggedIn("/account-login"), tasksController.addActivity);

router.post("/activities/add", ensureLoggedIn("/account-login"), tasksController.postAddActivity);

router.get("/activities/planner",  tasksController.viewPlanner);

router.get("/activities/delete/:_id", tasksController.deleteTask);

router.post("/activities/delete/:_id", tasksController.postDeleteTask);

router.get("/activities/edit/:_id", tasksController.editTask);

router.post("/activities/edit/:_id", tasksController.postEditTask);

router.get("/activities/share", tasksController.shareActivity);

router.post("/activities/planner", tasksController.completeTask);

router.get("/activities/missed", tasksController.missedActivities);

// Account
router.get("/account/login", accountController.login);

router.post(
	"/account/login",
	auth.authorize("/account/login"),
	accountController.postLogin
);

router.get("/account/signup", accountController.signUp);

router.post("/account/signup", accountController.postSignUp);

router.get("/account/logout", accountController.logout);

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
