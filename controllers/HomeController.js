
const productModel = require ("../models/productModel.js");
const orderModel = require("../models/orderModel.js");
const categoryModel = require("../models/categoryModel");
const commentModel = require("../models/productCommentModel.js");
const brandModel = require("../models/brandModel.js");
const moment  = require("moment");
const nodemailer = require ("nodemailer");
const { use } = require("passport");
const mobileModel = require("../models/mobileModel.js");
class HomeController {
  static index = async (req, res) => {
    const product = await productModel.find({verified:1});
    const latest_product = await productModel.find({verified:1}).sort('-created_at').limit(10);
    const category = await categoryModel.find();
     const active = 'home';
    res.render("frontend/pages/home",{product , latest_product,category,active});
  };

  static about = async (req, res) => {
    const category = await categoryModel.find();
    res.render("frontend/pages/about",{category});
  };

  static product = async (req, res) => {
    try {
      const product = await productModel.find({ verified: 1 });
      const category = await categoryModel.find();
      const brands = await brandModel.find({});
  
      const p_data = [];
  
      for (const brand of brands) {
        const brand_data = {
          brand: {
            name: brand.name,
            category: [],
          },
        };
         const fetchCat = await categoryModel.find({brand:brand._id});
        
  
        for (const category of fetchCat) {
          if (category.brand.toString() === brand._id.toString()) {
            const category_data = {
              name: category.name,
              model: [],
            };
            
              const model = await mobileModel.find({category:category._id , brand : brand._id });


            for (const product of model) {
              if (product.category.toString() === category._id.toString()) {
              
            
                category_data.model.push(product);
              }
            }
  
            brand_data.brand.category.push(category_data);
          }
        }
  
        p_data.push(brand_data);
      }
             
     
      res.render("frontend/pages/product",{data:p_data , category , product});
      // Now, you can use the populated p_data as needed in your response or further processing.
      // res.json(p_data);
    } catch (error) {
      console.error(error);
      // Handle errors and send an appropriate response.
      // res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  

  static product_detail = async (req, res) => {
     const id = req.params.id;
     const detail = await productModel.findById({_id:id})
     const category = await categoryModel.find();
     const comments = await commentModel.find({product:detail._id}).populate('user');
    res.render("frontend/pages/product_detail",{detail:detail,category,comments:comments});
  };
  static review = async(req,res) => {
      const{user,product,comment} = req.body;
      const commentDoc = new commentModel({
            comment:comment,
            user:user,
            product:product
      });
        await commentDoc.save();
        req.flash('success',"Your review submited");
        return res.redirect('back');
  }


  static why = async (req, res) => {
    const category = await categoryModel.find();
    res.render("frontend/pages/why",{category});
  };

  static testimonial = async (req, res) => {
    const category = await categoryModel.find();
    res.render("frontend/pages/testimonial",{category});
  };
  static dashboard = async (req, res) => {
    await res.render("vendor/pages/dashboard");
  };
  static privacy = async (req, res) => {
    await res.render("vendor/pages/privacy_policy");
  };

  static order = async (req, res) => {

    const user_id = req.user._id;
    const category = await categoryModel.find();
    const order = await orderModel.find({user_id:user_id}).sort({'created_at':-1});
    await res.render("frontend/pages/order",{order,category});
  };

  static orderDetail = async (req,res)=>{

    const order = req.params.order;
    const category = await categoryModel.find();
      const order_detail = await orderModel.findOne({orderNo:order});
      const cart = Object.values(order_detail.item.items);

    
      const userDetail = req.user;
      const cartSession =order_detail.item;
  
      let CurrentDate = moment().format('YYYY-MM-DD');
       res.render("frontend/pages/orderDetail",{order,order_detail,cart,userDetail,cartSession,CurrentDate,category});

 


  }


  static search = async(req,res)=>{
    try {
      const category = await categoryModel.find();
       const{categoryS,search} = req.body;
      
      const categorySearch = await categoryModel.find({name:categoryS});
      const cat_id = await categorySearch._id;
     const product = productModel.find({$or:[{category: cat_id},{name:search}]}, function(err, product) 
 {
    if (err)
    {
        res.send(err);
    }
       
       res.render("frontend/pages/product_search",{product,search,category});

 });

     

      
         


    } catch (error) {
      
      console.log(error);
    }
  }

  static mail = async (req,res)=>{
    try {
      
      // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "mail.amazon2amazon.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "info@amazon2amazon.com", // generated ethereal user
      pass: "RCy262@f", // generated ethereal password
    },
    tls: {
      // do not fail on invalid certs
      rejectUnauthorized: false,
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Fred Foo 👻" <info@amazon2amazon.com>', // sender address
    to: "raoawais888@gmail.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
 
    } catch (error) {
      
      console.log(error);
    }
  }

}

module.exports =  HomeController;
