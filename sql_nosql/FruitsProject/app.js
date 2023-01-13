
// ---------- Required packages ----------

const mongoose = require('mongoose');
// ----------------------------------------

// ---- Connection URL -----
mongoose.set('strictQuery', true);

mongoose.connect('mongodb://127.0.0.1:27017/fruitsDB');
// .then(() => console.log('Connected to server!'));


const fruitSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "please add the fruit name"]
    },
    rating: {
        type: Number,
        min: 1,
        max: 10,
    },
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
    } else {
        //console.log(fruits);
        mongoose.connection.close();

        fruits.forEach((fruit) => { //just show the name
            console.log(fruit.name)
        });
    }
})

// ----------------------- Update database----------------------------
Fruit.updateOne(
    {
        _id: "63c167d93b394047d9b444d3"
    },
    { // what's being updated
        name: "Peach",
        rating: 9
    },
    (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log("Successfully updated your entry")
        }
    }
);
// ----------------------- Delete an Entry/ document-----------------

Fruit.deleteOne({
    _id: "63c167d93b394047d9b444d2"
},
(err)=>{
    if(err){
        console.log(err);
    }else{
        console.log("Successfully deleted entry")
    }
}
);

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