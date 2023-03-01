
import productModel from "../models/productModel.js";

class HomeController {
  static index = async (req, res) => {

    const product = await productModel.find();
    const latest_product = await productModel.find().sort('-created_at').limit(10);
   

    res.render("frontend/pages/home",{product , latest_product});
  };

  static about = async (req, res) => {
    res.render("frontend/pages/about");
  };

  static product = async (req, res) => {
     
    const product = await productModel.find();
    res.render("frontend/pages/product",{product});
  };

  static product_detail = async (req, res) => {
     const id = req.params.id;
     const detail = await productModel.findById({_id:id})
   
    res.render("frontend/pages/product_detail",{detail:detail});
  };

  static why = async (req, res) => {
    res.render("frontend/pages/why");
  };

  static testimonial = async (req, res) => {
    res.render("frontend/pages/testimonial");
  };
  static dashboard = async (req, res) => {
    await res.render("vendor/pages/dashboard");
  };
}

export default HomeController;
