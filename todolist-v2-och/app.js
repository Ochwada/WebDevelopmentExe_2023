// ----- packages ---- 


const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');
const mongoose = require('mongoose');

const app = express();


app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static("public"))


// create a database in Mongoose
// ---- Connection URL -----
mongoose.set('strictQuery', true);
mongoose.connect('mongodb+srv://ochwada:-Natabona2288@cluster0.3mbg9nw.mongodb.net/todolistDB');

// ---------Mongo Schema -------- 
const itemsSchema = new mongoose.Schema({
    name: String
});

const listSchema = new mongoose.Schema({
    name: String,
    items: [itemsSchema]
});

// ---------Mongo model -------- 
const Item = mongoose.model("Item", itemsSchema);

const List = mongoose.model("List", listSchema);


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

// rendering other pages

app.get("/:customListName", (req, res) => {
    const customListName = _.capitalize(req.params.customListName);


    List.findOne({ name: customListName }, (err, foundList) => {
        if (!err) {
            if (!foundList) {
                const list = new List({
                    name: customListName,
                    item: defaultItems

                });

                list.save();
                res.render("/" + customListName);
            } else {
                res.render("list", { listTitle: foundList.name, newListItems: foundList.items })
            }
        }
    });


});

Item.find((err, items) => {
    if (err) {
        console.log(err);
    } else {
        items.forEach((item) => {
            //console.log(item.name)
        })
    }
});
// --------------------

app.get('/', (req, res) => {

    // check if  item collection is empty

    Item.find({}, (err, foundItems) => {
        if (foundItems.length === 0) {

            Item.insertMany(defaultItems, (err) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log("successful inputs")
                }
            });
            res.redirect("/");
        } else {
            res.render("list", {
                listTitle: "Today",
                newListItems: foundItems
            });

        }

    })

});


// --- Post request to add a TO DO ----------->
app.post("/", (req, res) => {

    let itemName = req.body.newItem;
    let listName = req.body.list;

    let item = new Item({ // Creating new document
        name: itemName
    });

    if (listName === "Today") {
        item.save();
        res.redirect("/");
    } else {
        List.findOne({ name: listName }, (err, foundList) => {
            foundList.items.push(item);
            foundList.save();
            res.redirect("/" + listName);
        });
    }
});

// Deleting Items from the todolist

app.post("/delete", (req, res) => {
    const checkedItemId = req.body.checkbox;
    const listName = req.body.listName;

    if(listName === "Today"){
        Item.findByIdAndRemove(checkedItemId, (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log("successfully removed");
                res.redirect("/");
            }
        });
    }else{
        List.findOneAndUpdate(
            {name: listName},
            {$pull:{items:{_id: checkedItemId}}}, 
            (err, foundList) => {
                if(!err) {
                    res.redirect("/" + listName);
                }
            })
    }


    
});

// -------------------Routing to pages------------------------>

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