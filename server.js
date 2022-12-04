// require packages  //

const express = require("express");
const fs = require("fs");
const app = express();

// routes //

const apiRoutes = require("./routes/index.js");
const htmlRoutes = require('./routes/notes.js');

// setup port //

const PORT = process.env.PORT || 3001;

// middleware //

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);

module.exports = app;