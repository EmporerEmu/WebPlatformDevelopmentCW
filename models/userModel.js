const nedb = require("nedb");
const bcrypt = require("bcrypt");
const saltRounds = 10;

class User {
	constructor(dbFilePath) {
		if (dbFilePath) {
			// embedded
			this.db = new nedb({ filename: dbFilePath, autoload: true });
		} else {
			// memory
			this.db = new nedb();
		}
	}

	init() {
		this.db.insert({
			user: "peter@gmail.com",
			// "Peter"
			password:
				"$2b$10$I82WRFuGghOMjtu3LLZW9OAMrmYOlMZjEEkh.vx.K2MM05iu5hY2C",
		});
		console.log("User: Peter inserted into db from init");

		this.db.insert({
			user: "ann@gmail.com",
			// "Ann"
			password:
				"$2b$10$bnEYkqZM.MhEF/LycycymOeVwkQONq8kuAUGx6G5tF9UtUcaYDs3S",
		});
		console.log("User: Ann inserted into db from init");
		return this;
	}

	create(email, password) {
		const that = this;
		bcrypt.hash(password, saltRounds).then(function (hash) {
			var entry = {
				user: email,
				password: hash,
			};
			console.log("User entry is: ", entry);

			that.db.insert(entry, function (err) {
				if (err) {
					console.log("Can't insert user:", email);
				}
			});
		});
	}

	lookup(user, cb) {
		this.db.find({ user: user }, function (err, entries) {
			if (err) {
				return cb(null, null);
			} else {
				if (entries.length == 0) {
					return cb(null, null);
				}
				return cb(null, entries[0]);
			}
		});
	}
}

const dao = new User();
dao.init();
module.exports = dao;

