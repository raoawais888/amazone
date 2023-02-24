
import productModel from "../models/productModel.js";

class HomeController {
  static index = async (req, res) => {
    res.render("frontend/pages/home");
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
  static search = async (req,res) => {
    console.log(req.body);
    return false;
  }
}

export default HomeController;
