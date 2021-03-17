const nedb = require("nedb");
const { resolve } = require("path");
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
      date: "29/01/2020",
      startTime: "12:30",
      endTime: "13:30",
      duration: "",
      added: "28/01/2020",
      completed: true,
    });
    console.log("DB Task inserted");
    this.db.insert({
      name: "Flying session",
      type: "Something else",
      date: "03/02/2020",
      startTime: "14:45",
      endTime: "17:30",
      duration: "",
      added: "01/02/2020",
      conpleted: true,
    });
    console.log("DB Task inserted");
    this.db.insert({
      name: "Leg Day",
      type: "Lifting",
      date: "15/02/2020",
      startTime: "09:45",
      endTime: "10:45",
      duration: "",
      added: "14/02/2020",
      completed: true,
    });
    console.log("DB Task inserted");
    this.db.insert({
      name: "New Year New Me",
      type: "Something else",
      date: "02/01/2020",
      startTime: "09:00",
      endTime: "10:00",
      duration: "",
      added: "01/01/2020",
      completed: true,
    });
    console.log("DB Task inserted");
  }

  addTask(name, type, date, startTime, endTime) {
    // var duration = endTime.getHours() - startTime.getHours();
    // console.log(duration);
    var entry = {
      name: name,
      type: type,
      date: date,
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
      this.db.find({}, function (err, tasks) {
        if (err) {
          reject(err);
        } else {
          resolve(tasks);
          console.log("getAllTasks() returns: ", tasks);
        }
      });
    });
  }

  deleteTask(ID) {
    return new Promise((resolve, reject) => {
      this.db.remove({ _id: ID }, {}, function (err, docRem) {
        if (err) {
          reject(err);
        } else {
          console.log("Document removed from db");
        }
      });
    });
  }

  getTaskByID(ID) {
    return new Promise((resolve, reject) => {
      this.db.find({ _id: ID }, {}, function (err, doc) {
        if (err) {
          reject(err);
        } else {
          resolve(doc);
          console.log("Document got", doc);
        }
      });
    });
  }

  updateTask(name, type, date, startTime, endTime, ID) {
    return new Promise((resolve, reject) => {
      this.db.update(
        { _id: ID },
        {
          $set: {
            name: name,
            type: type,
            date: date,
            startTime: startTime,
            endTime: endTime,
          },
        },
        // {},
        function (err, doc) {
          if (err) {
            reject(err);
          } else {
            resolve(doc);
            console.log("Document updated: ", doc);
          }
        }
      );
    });
  }
} // end of class

module.exports = Tasks;
