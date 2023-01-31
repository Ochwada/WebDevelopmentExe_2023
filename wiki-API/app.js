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


// ------------------------DISPLAY i.e Get route that fetches ALL the Articles --------------------------------------
app.route("/articles")
    // --- Display  --> Server Code
    .get((req, res) => {
        Article.find((err, foundArticles) => {
            if (!err) {
                res.send(foundArticles);
            } else {
                res.send(err);
            }

        });
    })
    // --- Grab data set through  -- Used postman
    .post((req, res) => {
        const newArticle = new Article({
            title: req.body.title,
            content: req.body.content
        });

        newArticle.save((err) => {
            if (!err) {
                res.send("Successfully added a new article")
            } else {
                res.send(err);
            }
        });
    })
    //  --- Delete request
    .delete(
        (req, res) => {
            Article.deleteMany((err) => {
                if (!err) {
                    res.send("Successfully deleted all articles")
                } else {
                    res.send(err)
                }
            });
        });
// ------------------------DISPLAY i.e Get route that fetches SPECIFIC Articles --------------------------------------
app.route("/articles/:articleTitle")
    // get method for the article
    .get((req, res) => {

        Article.findOne({
            title: req.params.articleTitle
        }, (err, foundArticle) => {
            if (foundArticle) {
                res.send(foundArticle);
            } else {
                res.send("No articles found matching said title.");
            }
        });
    })
    // update an article 
    .put((req, res) => {

        Article.updateOne(
            { title: req.params.articleTitle },
            {
                title: req.body.title,
                content: req.body.content
            },
            //{ overwrite: true },
            (err) => {
                if (!err) {
                    res.send("Successfully updated article")
                } else {
                    res.send("err")
                }
            }
        );
    })
    .patch((req, res) => {
        Article.updateOne(
            { title: req.params.articleTitle },
            {$set: req.body},
            (err) => {
                if(!err){
                    res.send("Successfully update")
                }else{
                    res.send(err)
                }
            }
            )
    })
    .delete((req, res) => {

        Article.deleteOne(
            {title: req.params.articleTitle},
            (err) => {
                if (!err){
                    res.send("Successfully deleted")
                }else{
                    res.send(err)
                }
            }
            )
    });

// ------------------------HOST--------------------------------------
// Host port 
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});