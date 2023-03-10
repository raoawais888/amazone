const product = require( "../models/productModel.js");
const transporter = require( "../config/emailSend.js");
class cartController {

     static index = async(req , res) =>{
        
        if(!req.session.cart){
            res.render("frontend/pages/cart");
          
        }else{
           
            var cart = Object.values(req.session.cart.items);
            res.render("frontend/pages/cart",{cart})
        }
        

       
           

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
         


        //    update qty 


        static updateCart = async (req , res)=>{

            try {
                
                const qty =  JSON.parse(req.body.qty)
                const data =  req.body.id;
                 const id = data._id ;
                 let cart = req.session.cart;
                
                    if(cart.items[id]){
                        let old_qty =  cart.items[id].qty;
                        let new_qty = cart.totalQty - old_qty;
                        let old_price =  cart.items[id].item.price * cart.items[id].qty;
                        let new_price = qty * cart.items[id].item.price - old_price ;
                        let update_price = qty * cart.items[id].item.price;
                        cart.items[id].qty = cart.items[id].qty + qty - cart.items[id].qty;
                     
                        let total_qty =  cart.totalQty = new_qty + qty;   
                        let total_price = cart.totalPrice = cart.totalPrice + new_price

                    res.send({price : total_price, qty: total_qty , new_price:update_price});
                    
                    }
                 
               
          
                      

            } catch (error) {
                
                console.log(error);
            }
        }
        


        //    checkout function 

        static checkout = async (req,res)=>{

            try {

                if(!req.session.cart){
                    res.render("frontend/pages/cart");
                  
                }else{

                    var cart = Object.values(req.session.cart.items);
                    await res.render("frontend/pages/checkout",{cart});
                  
                }
               
            } catch (error) {
                
                console.log(error)
            }
        }



    // delete cart 

     static  deleteCart = async (req , res)=>{


              
                
              try {
                const data = JSON.parse(req.body.id);
                const id = data._id;
              
                
            const cart = req.session.cart;

                   if(cart.items[id]){

                    const qty = cart.items[id].qty;
                    const price =  cart.items[id].item.price * qty;
                    const total_qty = cart.totalQty = cart.totalQty - qty;
                    const totalPrice =  cart.totalPrice = cart.totalPrice - price;
                    delete cart.items[id];
                    res.send({price : totalPrice, qty: total_qty});

                   }
            
             
                
          
 
                
              } catch (error) {
                console.log(error);
              }

     }


     static send = async (req , res)=>{
         
        try {

              // send mail with defined transport object
  let info = await transporter.sendMail({
    from: "leadtest77@gmail.com", // sender address
    to: "raoawais888@gmail.com", // list of receivers
    subject: "Hello ???", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
            
        } catch (error) {
            
            console.log(error);
        }
        
     }


    }


 module.exports =   cartController