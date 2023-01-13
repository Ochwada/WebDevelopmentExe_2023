
// ---------- Required packages ----------

const mongoose = require('mongoose');
// ----------------------------------------

// ---- Connection URL -----
mongoose.set('strictQuery', true);

mongoose.connect('mongodb://127.0.0.1:27017/fruitsDB');
// .then(() => console.log('Connected to server!'));


const fruitSchema = new mongoose.Schema({
    name: String,
    rating: Number,
    review: String
});

const Fruit = mongoose.model("Fruit", fruitSchema);

const fruit = new Fruit({
    name: "Apple",
    rating: 7,
    review: "Okay for a fruit!"
});

// ---------fruits -------
const kiwi = new Fruit({
    name: "Kiwi",
    rating: 3,
    review: "Sour!"
});

const orange = new Fruit({
    name: "Orange",
    score: 6,
    review: "Abit sour"
});

const Banana = new Fruit({
    name: "Banana",
    score: 9,
    review: "Very Great"
})

// -----------------------
// insert data 

/* Fruit.insertMany([kiwi, orange, Banana], (err) => {
    if (err) {
        console.log("Error occured");
    } else {
        console.log("information updated in the database")
    }
}); */

//fruit.save();
// ----------------------- Find Function ----------------------------
Fruit.find((err, fruits) => {
if (err) {
    console.log(err);
}else{
    //console.log(fruits);

    fruits.forEach((fruit) => { //just show the name
        console.log(fruit.name)
    });
}
})

// -----------------------------------------------------------------
// new schema

const personSchema = new mongoose.Schema({
    name: String,
    age: Number
});

const Person = mongoose.model("Person", personSchema);
const person = new Person({
    name: "John",
    age: 37
});

//person.save();