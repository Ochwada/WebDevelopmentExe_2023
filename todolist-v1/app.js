
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

var items = [];
// --------------------




app.get('/', (req, res) => {

    //res.sendFile( __dirname + '/index.html');
    var today = new Date();
    /* var currentTime = today.getTime();
    var currentDay = today.getDay(); */
    //var day = "";

    var options = {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    }
    var day = today.toLocaleDateString("en-US", options);

    /*  if (currentDate === 6 || currentDate === 0){
         //day = "weekend";
         day = currentDay + ". A Weekend"
         //res.write("its weekend");
     }else{
         day = currentDay + " Day. A Weekday"
         
         //res.sendFile(__dirname + '/index.html');
     } */

    /* 
        switch(currentDay){
            case 0:
                day ="Sunday";
                break;
            case 1:
                day = "Monday";
                break;
            case 2:
                day = "Tuesday";
                break;
            case 3:
                day = "Wednesday";
                break;
            case 4:
                day = "Thursday";
                break;
            case 5:
                day = "Friday";
                break;
            case 6:
                day= "Saturday";
                break;
            default:
                console.log("Error: current day is equal to:" + currentDay);
        
        } */

    res.render("list", {
        kindOfDay: day,
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




// PORT
// http://localhost:3000/
const port = 3000;

app.listen(port, () =>
    console.log('Server started on port ' + port)); 

/* app.listen(process.env.PORT, function () {
    console.log("Server running on Port (pre assigned)")
});  */