require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const ejs = require('ejs');
const md5 = require('md5'); // hashing password




// security
const encrypt = require('mongoose-encryption'); 
const app = express();


app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
    extended: true
}));




// --- setting up the MongoDB --
mongoose.set("strictQuery", false);

mongoose.connect("mongodb://localhost:27017/userDB", () => {
    console.log("Connected to MongoDB");
});

// user schema AND creating new user (model)
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: String,
    password: String
});

// Encription
// convient method
const secretENV = process.env.SECRET;

userSchema.plugin(encrypt, 
    
    {
        
        secret: secretENV, 
        encryptedFields: ["password"]
    }
    );

const User = new mongoose.model("User", userSchema); // after encription
// --- Routing to pages ---- 

app.get("/", (req, res) => {
    res.render("home")
});

// login page
app.route("/login")
    .get((req, res) => {
        res.render("login")
    })
    .post((req, res) => {

        const username = req.body.username;
        const password = md5(req.body.password);

        User.findOne(
            {email: username}, (err, foundUser) => {
                if (err){
                    console.log(err);
                }else{
                    if (foundUser){
                        if (foundUser.password === password){
                            res.render("secrets")
                        }
                    }
                }
            });
    });
// register 
app.route("/register")
    .get((req, res) => {
        res.render("register")
    })
    .post((req, res) => {
        const newUser = new User(
            {
                email: req.body.username,
                password: md5(req.body.password)
            });
        newUser.save(
            (err) => {
                if (!err) {
                    res.render("secrets")
                } else {
                    console.log(err)
                }
            }
        );
    });




// ------------------------HOST--------------------------------------
// Host port 
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});