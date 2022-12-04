// require packages and paths //

const app = require("express").Router();
const fs = require("fs");
const util = require("util");
var notesInfo;

const writeFileAsync = util.promisify(fs.writeFile);
const readFileAsync = util.promisify(fs.readFile);

// GET function to return database as JSON //

app.get("/notes", function (req, res) {

    // reads JSON file //

    readFileAsync("db/db.json", "utf8").then(function (data) {

        // parse data to get an array of objects //

        notesInfo = JSON.parse(data);
        res.json(notesInfo);
      });
});

// POST function to push notes to database //

app.post("/notes", function (req, res) {
    readFileAsync("db/db.json", "utf8").then(function (data) {
    
    // parse data into array of objects //
    
    notesInfo = JSON.parse(data);

    let newNote = req.body;
    let currentNote = notesInfo.length;

    newNote.id = currentNote + 1;

    // add new note to the array of note objects //

    notesInfo.push(newNote);

    notesInfo = JSON.stringify(notesInfo);

    writeFileAsync("db/db.json", notesInfo).then(function (data) {
      console.log("Note has been added.");
    });
    res.json(notesInfo);
  });
});


// DELETE function to remove notes from database //

app.delete("/notes/:id", (req, res) => {
    let ID = parseInt(req.params.id);

    for (let i = 0; i < notesInfo.length; i++) {
        if (ID === notesInfo[i].id) {
          notesInfo.splice(i, 1);
          let noteJSON = JSON.stringify(notesInfo, null, 2);
    
          writeFileAsync("db/db.json", noteJSON).then(function () {
            console.log("Note has been deleted.");
          });
        }
      }
      res.json(notesInfo);
    });

module.exports = app;