// Imports
const nedb = require("nedb");

// Creating a seeding method for the database
class DatabaseSeed {
  constructor(dbFilePath) {
    // Instantiate the DB
    if (dbFilePath) {
      this.db = new nedb({ filename: dbFilePath, autoload: true });
      console.log("DB connected to: " + dbFilePath);
    } else {
      this.db = new nedb();
    }
  }

  init() {
    this.db.insert({
      subject: "I like this",
      author: "Jamie",
    });
    console.log("DB Jamie inserted");
  }
} // End of class

module.exports = DatabaseSeed;
