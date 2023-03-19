const userModel = require( "../models/userModel.js");
const categoryModel = require( "../models/categoryModel.js");
const bcrypt = require( "bcrypt");
const validator = require( "validator");
const passport = require( "passport");
class authController {

  static register = async (req, res) => {
    
    try {
      const category = await categoryModel.find();
      await res.render("frontend/pages/register",{category});
    } catch (error) {
      console.log("Error", error);
    }
  };
  static store = async (req, res) => {
    try {
      const { name, email, user_type, pass, cpass } = req.body;
      const exist_email = await userModel.findOne({ email: email });
      if (!name || !email || !user_type || !pass) {
        req.flash("fail", "Please Fill all fields!");
        res.redirect("/register");
      } else if (name.length < 3) {
        req.flash("fail", "Name will be at least 3 charcter!");
        res.redirect("/register");
      } else if (!validator.isEmail(email)) {
        req.flash("fail", "Please Enter valid Email!");
        res.redirect("/register");
      } else if (exist_email) {
        req.flash("fail", "Email already exist! Try Another");
        res.redirect("/register");
      } else if (pass.length < 8) {
        req.flash("fail", "Password Must be at least 8 charcters!");
        res.redirect("/register");
      } else if (pass != cpass) {
        req.flash("fail", "Password and Confirm Password Does't match!");
        res.redirect("/register");
      } else {
        const hashPassword = await bcrypt.hash(pass, 12);
        const userDoc = userModel({
          name: name,
          email: email,
          userType: user_type,
          password: hashPassword,
        });
        await userDoc.save();
        req.flash("success", "User Registerd Successfully!");
        res.redirect("/login");
      }
    } catch (error) {
      console.log("Error", error);
    }
  };
  static login = async (req, res) => {
    try {
      const category = await categoryModel.find();
      await res.render("frontend/pages/login",{category});
    } catch (error) {
      console.log("Error", error);
    }
  };


  static auth =  (req, res , next) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        req.flash("fail", "Please Fill all fields!");
        res.redirect("/login");
      } 

      if (!validator.isEmail(email)) {
        req.flash("fail", "Please Enter valid Email!");
        res.redirect("/login");
      } 

      passport.authenticate('local',(err,user,info)=>{

         if(err){
          req.flash ('error',info.message);
          return next(err);
         }

         if(!user){

          req.flash ('error',info.message);
          res.redirect("/login")
         }

          req.logIn(user,(err)=>{

            if(err){
              req.flash ('error',info.message);
          return next(err);
            }
              
            if(req.user.userType == 1){

              res.redirect("/admin")
            }
            if(req.user.userType == 2){
                  
              res.redirect("/vendor")

            }
            if(req.user.userType == 3){

              res.redirect("/")
            }

            
           
          })

      })(req,res,next);
        
      
    } catch (error) {
      console.log("Error", error);
    }
  };

  
  static logout = async (req,res)=>{
    try {
      
      req.logout(req.user, err => {
        if(err) return next(err);
        res.redirect("/");
      });

    } catch (error) {
      
      console.log(error);
    }
  }


  
}

 module.exports = authController;
