const { response } = require("express");

// /login
exports.login = function (req, res) {
  res.render("account-login", {
    title: "Fitness - Log in",
  });
};

// /signUp
exports.signUp = function (req, res) {
  res.render("account-signup", {
    title: "Fitness - Sign Up",
  });
};
