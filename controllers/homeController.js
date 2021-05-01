// Imports
const { response } = require("express");
const seed = require("../models/dbSeed");

// Instance of DB
const db = new seed();
db.init();

// root
// exports.landingPage = function(req, res) {
//   res.send("<h1>Not yet Implemented. Landing page</h1>");
// }

exports.landingPage = function (req, res) {
	res.render("landingPage", {
		title: "Fitness - Landing Page",
		user: req.user,
	});
};
