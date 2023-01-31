const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const ejs = require('ejs');
const express = require('express');


const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static("public"));


// setting up the MongoDB
mongoose.set("strictQuery", false);

mongoose.connect("mongodb://localhost:27017/wikiDB", () => {
    console.log("Connected to MongoDB");
});
// -----------------------SCHEMA---------------------------------------
// create a schema to the document
const articleSchema = {
    title: String,
    content: String
}

const Article = mongoose.model("Article", articleSchema);


// ------------------------DISPLAY i.e Get route that fetches all the Articles --------------------------------------
// Display  --> Server Code
app.get('/articles', (req, res) => {
    Article.find( (err, foundArticles) =>{
        if(!err){
            res.send(foundArticles);
        }else{
            res.send(err);
        }
        
    });
});

// Grab data set through  -- Used postman
app.post('/articles', (req, res) => {
    console.log( );
    console.log( );

    const newArticle =  new Article({
        title: req.body.title,
        content: req.body.content
    });

    newArticle.save((err) => {
        if(!err){
            res.send("Successfully added a new article")
        }else{
            res.send(err);
        }
    });
});

// ------------------------HOST--------------------------------------
// Host port 
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});