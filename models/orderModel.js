import mongoose from "mongoose";

const order = new mongoose({

   fname:{type:String, required:true, trim:true},
   lname:{type:String, required:true, trim:true},
   email:{type:String, required:true, trim:true},
   address:{type:String, required:true, trim:true},
   address2:{type:String, trim:true},
   country:{type:String, required:true, trim:true},
   state:{type:String, required:true, trim:true},
   zip:{type:Number, required:true, trim:true},

})


const orderModel = mongoose.model('order', order);

export default orderModel;