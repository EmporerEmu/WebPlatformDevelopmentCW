const nedb = require("nedb");

class Tasks {
  constructor(dbFilePath) {
    if (dbFilePath) {
      this.db = new nedb({ filename: dbFilePath, autoload: true });
      console.log("DB Connected to: " + dbFilePath);
    } else {
      this.db = new nedb();
    }
  }

  init() {
    this.db.insert({
      task: "Running",
      day: "Monday",
      duration: "15 Mins",
    });
    console.log("DB Task inserted");
  }
} // end of class

module.exports = Tasks;
