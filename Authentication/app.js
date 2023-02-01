require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const ejs = require('ejs');

const session = require('express-session');
const passport = require('passport');

const passportLocalMongoose = require('passport-local-mongoose');
const findOrCreate = require('mongoose-findorcreate');


const GoogleStrategy = require('passport-google-oauth20').Strategy;


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
    password: String,
    googleId: String,
    secret: String
});
// set passportLocalMoogoes 
userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);


const User = new mongoose.model("User", userSchema); // after encription

// initialize passport 
passport.use(User.createStrategy());

passport.serializeUser((user, done) => {
    done(null, user.id);
});
passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});

// ---- google Authentication -----


passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/secrets",
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
},
    function (accessToken, refreshToken, profile, cb) {

        //console.log(profile);

        User.findOrCreate(
            { googleId: profile.id },
            (err, user) => { // find or create
                return cb(err, user);
            });
    }
));

// --- Routing to pages ---- 

app.get("/", (req, res) => {
    res.render("home")
});

// - Routing to auth/google --
app.route("/auth/google")
    .get(
        passport.authenticate("google",  // using google strategy
            {
                scope: ["profile"]
            })
    );
// - Routing to auth/google/secrets --
app.route("/auth/google/secrets")
    .get(
        passport.authenticate("google",
            {
                failureRedirect: "/login",
            }), (req, res) => {
                // successfull login
                res.redirect("/secrets")
            }
    );
// routing for submit 

app.route("/submit")
    .get((req, res) => {
        if (req.isAuthenticated()) {
            res.render("submit")
        } else {
            res.redirect("/login")
        }
    })
    .post((req, res) => {
        const submittedSecret = req.body.secret;
        console.log(req.user.id);

        User.findById(req.user.id, (err, foundUser) => {
            if (err) {
                console.log(err);
            } else {
                if (foundUser) {
                    foundUser.secret = submittedSecret;
                    foundUser.save(() => {
                        res.redirect('/secrets')
                    });
                }
            }
        })
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
        User.find({"secret": {$ne: null}}, (err, foundUsers) => {
            if (err) {
                console.log(err);
            } else {
                if (foundUsers){
                    res.render("secrets", {usersWithSecret: foundUsers})
                }
            }
        });
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