
const checkoutModel = require("../models/checkoutModel.js");
const corderModel = require("../models/orderModel.js");

class checkout {

  static checkout = async (req , res) =>{

    try {
        
   const {fname,lname,email,address,address2,country,state,zip} = req.body;
      
    const user_id = req.session.passport.user
         
       const checkoutDoc = new checkoutModel({

        fname:fname,
        lname:lname,
        email:email,
        address:address,
        address2:address2,
        country:country,
        state:state,
        zip:zip,
        user_id:user_id

       })


       


    } catch (error) {
        
        console.log(error);
    }

  }

    


}

module.exports = checkout