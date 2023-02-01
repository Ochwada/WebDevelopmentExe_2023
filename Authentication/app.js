require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const ejs = require('ejs');

const session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');


// security
const app = express();


app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
    extended: true
}));


// ----------Add cookies and session-- 
app.use(session({
    secret: 'Our little secret.',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());



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
// set passportLocalMoogoes 
userSchema.plugin(passportLocalMongoose);


const User = new mongoose.model("User", userSchema); // after encription

// initialize passport
passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
// --- Routing to pages ---- 

app.get("/", (req, res) => {
    res.render("home")
});

// routing to login page
app.route("/login")
    .get((req, res) => {
        res.render("login")
    })
    .post((req, res) => {
        const user = new User({
            username: req.body.username,
            password: req.body.password
        });
        // use passport to login and autheticate the user
        req.login(user, (err) => {
            if (err) {
                console.log(err)
            } else {
                passport.authenticate("local")(req, res, () => {
                    res.redirect("/secrets");
                });
            }
        })
    });
// routing to secrets page 
app.route("/secrets")
    .get((req, res) => {
        if (req.isAuthenticated()) {
            res.render("secrets");
        } else {
            res.redirect("/login")
        }
    });

// routing to logout  page  ---
// deautheticate the user ---

app.route("/logout")
    .get((req, res, next) => {
        req.logout((err) => {
            if (err) { return next(err); }
            res.redirect('/');
        });
    });


// routing to register  page 
app.route("/register")
    .get((req, res) => {
        res.render("register")
    })
    .post((req, res) => {

        User.register(
            {
                username: req.body.username
            },
            req.body.password,
            (err, user) => {
                if (err) {
                    console.log(err);
                    res.redirect("/register")
                } else {
                    passport.authenticate("local")(req, res, () => {
                        res.redirect("/secrets")
                    })
                }
            });
    });

// ------------------------HOST--------------------------------------
// Host port 
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});