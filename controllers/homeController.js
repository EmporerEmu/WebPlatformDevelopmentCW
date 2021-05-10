// Imports
const { response } = require("express");


exports.landingPage = function (req, res) {
	res.render("landingPage", {
		title: "Fitness - Landing Page",
		user: req.user,
	});
};