 
const local  =   require ("passport-local");
const  userModel =  require ("../models/userModel.js");
const  bcrypt = require ("bcrypt");
const LocalStategy = local.Strategy;


const  init = (passport)=>{
    
    passport.use(new LocalStategy ({usernameField:'email'}, async (email,password,done)=>{

             const user = await  userModel.findOne({email:email});
             
             console.log(email);

             if(user){
             
              return done(null, user , {message:"Incorrect Username Or password"});

             }

                 if(await bcrypt.compare(password,user.password)){

                  return  done(null,user,{message:"login Success"});
                 }else{

                  return done(null, false , {message:"incorrect username password"});
                 }



           }))


           passport.serializeUser((user, done)=>{

          done(null, user._id)

           })



           passport.deserializeUser((id,done)=>{

           const userdata = userModel.findById(id);

            done(null,userdata);

           })

}

module.exports =  init;