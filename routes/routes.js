// Imports
const express = require("express");
const controller = require("../controllers/controller");

const router = express.Router();

// Routes
router.get("/", controller.landingPage);

router.get("/add", controller.addActivity)

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
