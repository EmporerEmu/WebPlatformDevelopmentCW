// Imports
const express = require("express");
const path = require("path");
const mustacheExpress = require("mustache-express");
const bodyParser = require("body-parser");
const auth = require("./auth/auth");
const passport = require("passport");
const session = require("express-session");
const router = require("./routes/routes");


// creating the application with express
const app = express();

// Deprecated!
// TODO: find and use the express middleware
app.use(bodyParser.urlencoded({ extended: true }));

const public = path.join(__dirname, "public");
const views = path.join(__dirname, "views");

app.use(express.static(public));
app.use(express.static(views));

// Creating and registering the template engine for the app
app.engine("mustache", mustacheExpress());
app.set("view engine", "mustache");


// Authentication and session
app.use(
	session({
		secret: "dont tell anyone",
		resave: false,
		saveUninitialized: false,
	})
);
app.use(passport.initialize());

app.use(passport.session());

auth.init(app);

// Mapping router to all requests starting from the root
app.use("/", router);

// Server start
app.listen(3000, () => {
	console.log("Server started. Ctrl^C to exit.");
});
