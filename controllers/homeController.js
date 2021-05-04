// Imports
const { response } = require("express");

// Instance of DB

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
