const { response } = require("express");
const User = require("../models/userModel");

// /login
exports.login = function (req, res) {
	res.render("account/account-login", {
		title: "Fitness - Log in",
	});
};

// post: login
exports.postLogin = function (req, res) {
	// console.log("this is post login");
	res.redirect("/");
};

// /signUp
exports.signUp = function (req, res) {
	res.render("account/account-signup", {
		title: "Fitness - Sign Up",
	});
};

// post: signUp
exports.postSignUp = function (req, res) {
	const user = req.body.emailIn;
	const password = req.body.passwordIn;
	// console.log("register user", user, "password", password);
	if (!user || !password) {
		res.send(401, "no user or no password");
		return;
	}
	User.lookup(user, function (err, u) {
		if (u) {
			res.send(401, "User exists", user);
			// console.log("User exists", user);
			return;
		}
		User.create(user, password);
		res.redirect("/account/login");
	});
};

// logout
exports.logout = function (req, res) {
	req.logout();
	res.redirect("/");
};
