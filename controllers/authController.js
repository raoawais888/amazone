import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import validator from "validator";
class authController {
  static register = async (req, res) => {
    try {
      await res.render("frontend/pages/register");
    } catch (error) {
      console.log("Error", error);
    }
  };
  static store = async (req, res) => {
    try {
      console.log(req.body);
      // return false;
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
          userName: name,
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
      await res.render("frontend/pages/login");
    } catch (error) {
      console.log("Error", error);
    }
  };
  static auth = async (req, res) => {
    try {
      const { email, pass } = req.body;
      if (!email || !pass) {
        req.flash("fail", "Please Fill all fields!");
        res.redirect("/login");
      } else if (!validator.isEmail(email)) {
        req.flash("fail", "Please Enter valid Email!");
        res.redirect("/login");
      } else {
        const result = await userModel.findOne({ email: email });
        //   console.log(result);
        //   return false;
        if (result != null) {
          const isMatch = await bcrypt.compare(pass, result.password);
          if (isMatch) {
            req.session.user = result;
              // res.locals.user = req.session.user;
              // console.log(res.locals.user)
            res.redirect("/dashboard");
          } else {
            req.flash("fail", "Email or Password is incorrecet!!");
            res.redirect("/login");
          }
        } else {
          req.flash("fail", "Email is not Registerd!!");
          res.redirect("/login");
        }
      }
    } catch (error) {
      console.log("Error", error);
    }
  };
  static logout = async (req, res) => {
    await req.session.destroy(() => {
      console.log("Session Destroyed");
    });
    res.redirect("/login");
  };
  
}

export default authController;
