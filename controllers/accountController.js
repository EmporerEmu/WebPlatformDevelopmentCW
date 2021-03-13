const { response } = require("express");

// /login
exports.login = function (req, res) {
  res.render("login", {
    title: "Fitness - Log in",
  });
};

// /signUp
exports.signUp = function (req, res) {
  res.render("signUp", {
    title: "Fitness - Sign Up",
  });
};
