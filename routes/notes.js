// import express package and paths //

const path = require("path");
const app = require("express").Router();

// GET method to send notes.html //

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/notes.html"));
});

// GET method to send index.html //

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
});

module.exports = app;