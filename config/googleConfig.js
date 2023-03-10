
const StrategyGoogle =  require('passport-google-oauth20');
const GoogleStrategy = StrategyGoogle.Strategy; 
const userModel  = require("../models/userModel.js");
const GoogleConfig = (passport) => {
passport.use(new GoogleStrategy(
  {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL
},
(accessToken, refreshToken, profile, cb) => {
  // Here, you can save the user information to your database
  
   const email = profile._json.email

    const check = userModel.findOne({email:email});

    console.log(check);
    if(!check){
      
    

    }else{
     
    return cb(null, profile);
    }

  

}
));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});



}

module.exports = GoogleConfig;