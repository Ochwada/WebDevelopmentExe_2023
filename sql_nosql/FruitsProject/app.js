
// ---------- Required packages ----------

const mongoose = require('mongoose');
// ----------------------------------------

// ---- Connection URL -----
mongoose.set('strictQuery', true);

mongoose.connect('mongodb://127.0.0.1:27017/fruitsDB')
    .then(() => console.log('Connected to server!'));


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

//fruit.save();

// new schema

const personSchema = new mongoose.Schema({
    name: String,
    age: Number
});

const Person = mongoose.model("Person", personSchema);
const person = new Person({
    name: "John",
    age: 37
}) ;

person.save();