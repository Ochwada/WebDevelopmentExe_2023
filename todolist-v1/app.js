
// ----- packages ---- 

const express = require('express');
const bodyParser = require('body-parser');


const app = express();


app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static("public"))
// --- Variables --- 

let items = [];
let workItems = [];
// --------------------




app.get('/', (req, res) => {

    //res.sendFile( __dirname + '/index.html');
    var today = new Date();
  

    var options = {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    }
    var day = today.toLocaleDateString("en-US", options);


    res.render("list", {
        // kindOfDay: day,
        listTitle:day,
        newListItems: items,
    });
    //res.render("list", { kindOfDay: day }) // "list" is an ejs file from view directory

});


// --- Post request to add a TO DO ----------->
app.post("/", (req, res) => {

    var item = req.body.newItem;

    items.push(item);

    //console.log(item)
    res.redirect("/")

});

// ------------------------------------------->

app.get("/work", function (req, res) {
    res.render("list", {
        listTitle: "Work List",
        newListItems: workItems
    });
});

app.post("/work", (req, res) => {
    let item = req.body.newItem;
    workItems.push(item);
    res.redirect("/work")
})


// PORT
// http://localhost:3000/
const port = 3000;

app.listen(port, () =>
    console.log('Server started on port ' + port)); 

/* app.listen(process.env.PORT, function () {
    console.log("Server running on Port (pre assigned)")
});  */