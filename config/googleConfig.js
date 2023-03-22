
const passport = require("passport");
const  googlestrategy = require ("passport-google-oauth20");
const strategy = googlestrategy.Strategy(); 

module.exports =  passport.use(new strategy({

  ClientID : process.env.GOOGLE_CLIENT_ID,
  clientSecret : process.env.GOOGLE_CLIENT_SECRET,
  callbackURL : process.env.GOOGLE_CALLBACK_URL

},

(accessToken, refreshToken, profile, cb) => {
    // Here, you can save the user information to your database
    return cb(null, profile);
  }

))
