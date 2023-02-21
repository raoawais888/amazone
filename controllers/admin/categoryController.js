import categoryModel from "../../models/categoryModel.js";
class categoryController {
    static allCategory = async (req,res) => {
        try {
                const categories = await categoryModel.find({});
                res.render("backend/pages/categories/Categories",{categories:categories});
        } catch (error) {
            console.log("Error",error)
        }
    }
    static addCategory = async (req,res) => {
        try {
            res.render("backend/pages/categories/addCategory");
        } catch (error) {
            console.log("Error",error)
        }
    }
    static storeCategory = async (req,res) => {
        try {
                var imgName = req.file
                if (!imgName) {
                  req.flash("fail", "Please upload Image!");
                  res.redirect("/add-category");
                } else {
                  imgName = req.file.filename;
            }
            // console.log(imgName)
            // return false;
                     if (!req.body.categoryName) {
                       req.flash("fail", "Please Enter Name!");
                       res.redirect("/add-category");
                     } else {
                       const catDoc = categoryModel({
                         name: req.body.categoryName,
                         image: imgName
                       });
                       await catDoc.save();
                       req.flash("success", "Category Added Successfully!");
                       res.redirect("/add-category");
                     }
        } catch (error) {
            console.log("Error",error)
        }
    }
    static editCategory = async (req,res) => {
        try {
            res.render("backend/pages/categories/editCategory");
        } catch (error) {
            console.log("Error",error)
        }
    }
    static updateCategory = async (req,res) => {
        try {
            
        } catch (error) {
            console.log("Error",error)
        }
    }
    static deleteCategory = async (req,res) => {
        try {
            
        } catch (error) {
            console.log("Error",error)
        }
    }
}

export default categoryController