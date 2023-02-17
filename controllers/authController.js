import userModel from "../models/userModel.js"
import bcrypt from 'bcrypt'
import validator from 'validator'
class authController {

    static register = async (req,res) =>  {
        try {
            await res.render('frontend/pages/register');
        } catch (error) {
            console.log('Error',error)
        }
    }
    static store = async (req,res) => {
        try {
          await console.log(req.body);
               const {name,email,pass} = req.body
            const exist_email = await userModel.findOne({email:email})
           if(!name || !email || !pass){
            req.flash('fail', 'Please Fill all fields!')
            res.redirect('/register');
           }
           else if(!validator.isEmail(email)) {
            req.flash('fail', 'Please Enter valid Email!')
            res.redirect('/register');
           }
           else if(exist_email)
           {
              req.flash('fail', 'Email already exist! Try Another')
              res.redirect('/register');
           }
           else {
           const hashPassword = await bcrypt.hash(pass,12)
           const userDoc = userModel ({
            userName: name,
            email:email,
            password: hashPassword
           })
           await userDoc.save()
           req.flash('success', 'User Registerd Successfully!')
           res.redirect('/login');
          }
            
        } catch (error) {
            console.log('Error',error)
        }
    }
    static login = async (req,res) => {
        try {
            await res.render('frontend/pages/login')
        } catch (error) {
            console.log('Error',error)
        }
    }
    static auth = async () => {
        try {
                const {email, pass} = req.body
             if(!email || !pass){
            req.flash('fail', 'Please Fill all fields!')
            res.redirect('/login');
           }
            else if(!validator.isEmail(email)) {
            req.flash('fail', 'Please Enter valid Email!')
            res.redirect('/login');
           } else {
             const result = await userModel.findOne({email:email})
            if(result != null){
                const isMatch = await bcrypt.compare(pass,result.password)
              if(isMatch)
              {
                  req.flash('success', 'Under Construction Please Wait!!')
                  res.redirect('/login');
              }
              else{
                req.flash('fail', 'Email or Password is incorrecet!!')
                res.redirect('/login');
              }
            }
            else{
            req.flash('fail', 'Email is not Registerd!!')
            res.redirect('/login');
            }
           
           }
        } catch (error) {
            console.log('Error',error)
        }
    }


}

export default authController