
const checkoutModel = require("../models/checkoutModel.js");
const corderModel = require("../models/orderModel.js");

class checkout {

  static checkout = async (req , res) =>{

    try {
        
   const {fname,lname,email,address,address2,country,state,zip} = req.body;
       



    } catch (error) {
        
        console.log(error);
    }

  }

    


}

module.exports = checkout