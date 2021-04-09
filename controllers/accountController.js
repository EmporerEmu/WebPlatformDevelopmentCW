const { response } = require("express");

// /login
exports.login = function (req, res) {
  res.render("user/account-login", {
    title: "Fitness - Log in",
  });
};

// /signUp
exports.signUp = function (req, res) {
  res.render("user/account-signup", {
    title: "Fitness - Sign Up",
  });
};
