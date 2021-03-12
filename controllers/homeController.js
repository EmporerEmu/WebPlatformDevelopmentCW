// Imports
const { response } = require("express");

// root
// exports.landingPage = function(req, res) {
//   res.send("<h1>Not yet Implemented. Landing page</h1>");
// }

exports.landingPage = function(req, res) {
  res.render("layout",
  {
    title: "Fitness - Landing Page"
  })
}

// /new
exports.addActivity = function(req, res) {
  res.send("<h1>Not yet implemented. New goals");
}