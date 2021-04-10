const passport = require("passport");
const Strategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const userModel = require("../models/userModel");

exports.init = function (app) {
	// setup password
	passport.use(
		new Strategy(function (email, password, cb) {
			userModel.lookup(email, function (err, user) {
                console.log("lookup", email);
				if (err) {
					console.log("error looking up user", err);
					return cb(err);
				}
				if (!user) {
					console.log("user", email, " not found");
					return cb(null, false);
				}
				// Compare password with stored password
				bcrypt.compare(password, user.password),
					function (err, result) {
						if (result) {
							cb(null, user);
						} else {
							cb(null, false);
						}
					};
			});
		})
	);

	// For session handling we need to serialize and deserialize users
	// Simplest is just to use the email
	passport.serializeUser(function (user, cb) {
		cb(null, user.email);
	});

	passport.deserializeUser(function (id, cb) {
		userModel.lookup(id, function (err, user) {
			if (err) {
				return cb(err);
			}
			cb(null, user);
		});
	});

	app.use(passport.initialize());
	app.use(passport.session());
};

exports.authorize = function (redirect) {
	return passport.authenticate("local", { failureRedirect: redirect });
};
