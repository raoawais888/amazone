import passport from "passport";
import StrategyGoogle   from "passport-google-oauth20";
const GoogleStrategy = StrategyGoogle.Strategy; 

import  Facebook from  'passport-facebook';
const FacebookStrategy = Facebook.Strategy;

import env from "dotenv";
env.config();

import express from "express";
import web from "./routes/web.js";
import admin from "./routes/admin.js";
import vendor from "./routes/vendor.js";
import path from "path";
import CONNECT_DB from "./db/connection.js";
import flash from "connect-flash";
import session from "express-session";
import cookieParser from "cookie-parser";
import cors from "cors";
import MongoStore from "connect-mongo";
import LocalPassport  from "./config/authConfig.js"
const app = express();
const port = process.env.PORT;
const DB_URL = process.env.DB_URL;




app.use(cors());
app.use(express.json());
app.use(express.static(path.join(process.cwd(), "public")));
app.use(cookieParser());

  const mongoaDBStore = new MongoStore({
    mongoUrl:DB_URL,
    dbName: process.env.DB_NAME
  })
app.use(
  session({
    name: "waqas",
    secret: "awais don",
    store:mongoaDBStore,
    cookie: { maxAge: 1000*60*60*24 },
    resave: false,
    saveUninitialized: false,
  })
);


app.use(passport.initialize());
app.use(passport.session());

LocalPassport(passport);


passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use(new GoogleStrategy(
  
  {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL
},
(accessToken, refreshToken, profile, cb) => {
  // Here, you can save the user information to your database
  return cb(null, profile);
}
));



// facebook login  

// passport.use(new FacebookStrategy({
//   clientID: "507202154822583",
//   clientSecret: "0aa29b1ff2c0bd4cf6a67892cd2b0ebc",
//   callbackURL: "http://localhost:8000/auth/facebook/callback"
// },
// function(accessToken, refreshToken, profile, cb) {
//   // User has been authenticated, do something with the data
// }));



// app.get('/auth/facebook', passport.authenticate('facebook'));

// app.get('/auth/facebook/callback',
//   passport.authenticate('facebook', { failureRedirect: '/login' }),
//   function(req, res) {
//     // Successful authentication, redirect home.
//     res.redirect('/');
//   });


  // app.get('/profile', passport.authenticate('facebook'), function(req, res) {
  //   // Render the user's profile page
  //   res.render('profile', { user: req.user });
  // });

app.get('/logout', function(req, res, next) {
  req.logout(function(err) {  // do this
    if (err) { return next(err); }// do this
    res.redirect('/');
  });
});






app.use((req, res, next) => {
  if (req.session.user) {
    res.locals.user = req.session.user;
  }
  next();
});

app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});
app.use(flash());
app.use((req, res, next) => {
  res.locals.message = req.flash();
  next();
});
app.use(express.urlencoded({extended:true}));
app.use("/", web);

app.use("/vendor", vendor);

app.use("/admin", admin);


app.set("view engine", "ejs");

CONNECT_DB(DB_URL);

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});



  


