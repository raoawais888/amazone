import categoryModel from "../../models/productModel.js";
class productController {
    static allProduct = async (req,res) => {
        try {
            res.render("backend/pages/products/products")
        } catch (error) {
            console.log("Error",error)
        }
    }
    static addProduct = async (req,res) => {
        try {
            res.render("backend/pages/products/addProduct")
        } catch (error) {
            console.log("Error",error)
        }
    }
    static storeProduct = async (req,res) => {
        try {
            
        } catch (error) {
            console.log("Error",error)
        }
    }
    static editProduct = async (req,res) => {
        try {
            res.render("backend/pages/products/editProduct")
        } catch (error) {
            console.log("Error",error)
        }
    }
    static updateProduct = async (req,res) => {
        try {
            
        } catch (error) {
            console.log("Error",error)
        }
    }
    static deleteProduct = async (req,res) => {
        try {
            
        } catch (error) {
            console.log("Error",error)
        }
    }
}
export default productController