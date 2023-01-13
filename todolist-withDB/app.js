
// ----- packages ---- 


const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');
const mongoose = require('mongoose');

//const date = require(__dirname + '/date.js');
const app = express();


app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static("public"))


// create a database in Mongoose
// ---- Connection URL -----
mongoose.set('strictQuery', true);
mongoose.connect('mongodb://127.0.0.1:27017/todolistDB');

// ---------Mongo Schema -------- 
const itemsSchema = new mongoose.Schema({
    name: String
});

// ---------Mongo model -------- 

const Item = mongoose.model("Item", itemsSchema);


// add documents ---
const cook = new Item({
    name: "cook"
});
const clean = new Item({
    name: "clean"
});
const wash = new Item({
    name: "wash"
});

const defaultItems = [cook, clean, wash]
/*
Item.insertMany(defaultItems, (err)=>{
    if(err){
        console.log(err);
    }else{
        console.log("successful inputs")
    }
}) */

Item.find((err, items) => {
    if (err) {
        console.log(err);
    } else {
        items.forEach((item) => {
            console.log(item.name)
        })
    }
}
);
// --------------------

app.get('/', (req, res) => {

// check if  item collection is empty

    Item.find({}, (err, foundItems) => {
        //console.log(foundItems);
        res.render("list", {
            // kindOfDay: day,
            listTitle: "Today",
            newListItems: foundItems
        });
    })

    
});


// --- Post request to add a TO DO ----------->
app.post("/", (req, res) => {
    var item = req.body.newItem;

    if (req.body.list === "Work") {
        workItems.push(item);
    } else {
        items.push(item);
        //console.log(item)
        res.redirect("/")
    }

});

// ------------------------------------------->

app.get("/work", (req, res) => {
    res.render("list", {
        listTitle: "Work List",
        newListItems: workItems
    });
});

app.get("/about", (req, res) => {
    res.render("about");
})

// PORT
// http://localhost:3000/
const port = 3000;

app.listen(port, () =>
    console.log('Server started on port ' + port));

/* app.listen(process.env.PORT, function () {
    console.log("Server running on Port (pre assigned)")
});  */

