import product from "../models/productModel.js"
class cartController {

     static index = async(req , res) =>{
            
              var cart = Object.values(req.session.cart.items);
            

             res.render("frontend/pages/cart",{cart})

     }

    static cart = async (req,res)=> {
            

        // let cart = {

        //     item:{pizzaid :{item:object , qty:1}},

        //     totalQty :0,
        //     totalPrice : 0
        // }
        
         if(!req.session.cart){
             req.session.cart = {
              
                items:{},
                totalQty : 0,
                totalPrice : 0

             }
         }

         let cart = req.session.cart;
         
         if(!cart.items[req.body._id]){
                
            cart.items[req.body._id] = {
                item : req.body,
                qty : 1 
            }
                 
            cart.totalQty = cart.totalQty + 1
            cart.totalPrice = cart.totalPrice +  req.body.price
           
           }else{
           
              cart.items[req.body._id].qty =  cart.items[req.body._id].qty + 1
               cart.totalQty = cart.totalQty + 1
               cart.totalPrice = cart.totalPrice + req.body.price

           }

         

         
           res.send({data:req.session.cart.totalQty});
        
            
           

            
           }
         
        

    }


export default cartController