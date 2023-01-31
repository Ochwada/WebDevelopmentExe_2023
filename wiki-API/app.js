const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const ejs = require('ejs');
const express = require('express');


const app = express();

// setting up the MongoDB
mongoose.set("strictQuery", false);
mongoose.connect("mongodb://localhost/wikiDB", () => {
  console.log("Connected to MongoDB");
});
        
// Display  --> server code
app.get('/', (req, res) => {
  res.send('Hello Linda!');
});


// Host port 
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});