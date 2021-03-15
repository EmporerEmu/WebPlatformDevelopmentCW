const nedb = require("nedb");
const DatabaseSeed = require("./dbSeed");

class Tasks {
  constructor(dbFilePath) {
    if (dbFilePath) {
      this.db = new nedb({ filename: dbFilePath, autoload: true });
      console.log("DB Connected to: " + dbFilePath);
    } else {
      this.db = new nedb();
    }
  }

  // Seeding tasks into the database
  init() {
    this.db.insert({
      name: "Morning Cardio",
      type: "Swimming",
      startTime: "12:30",
      endTime: "13:30",
      duration: "",
      added: "01/02/2020",
    });
    console.log("DB Task inserted");
  }

  addTask(name, type, startTime, endTime) {
    // var duration = endTime.getHours() - startTime.getHours();
    // console.log(duration);
    var entry = {
      name: name,
      type: type,
      startTime: startTime,
      endTime: endTime,
      added: new Date().toLocaleDateString("en-gb"),
    };
    console.log("Entry created", entry);

    this.db.insert(entry, function (err, doc) {
      if (err) {
        console.log("Error inserting document", entry);
      } else {
        console.log("Document inserted into the database", doc);
      }
    });
  }

  getAllTasks() {
    return new Promise((resolve, reject) => {
      this.db.find({}, function(err, tasks) {
        if (err) {
          reject (err);
        } else {
          resolve(tasks);
          console.log("getAllTasks() returns: ", tasks);
        }
      })
    })
  }
} // end of class

module.exports = Tasks;
