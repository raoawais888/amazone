import categoryModel from "../../models/categoryModel.js";
class categoryController {
    static allCategory = async (req,res) => {
        try {
                // const all_cat = await CategoryModel.find({});
                // res.render("backend/pages/Categories",{category:all_cat});
                res.render("backend/pages//categories/categories");
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
                var img = req.file
                if(!img){
                    req.flash('fail','Please upload Image!')
                    res.redirect('/addproduct')
                }
                else{
                    img = req.file.filenamel
                }
                     if(!req.body.cname)
                {
                req.flash('fail', 'Please Enter Name!')
                res.redirect('/addcategory')
                }
                else{
                   const catDoc = categoryModel({
                    name: req.body.catname,
                    image: req.body.catImg
                   })
                   await catDoc.save()
                   req.flash('success', 'Category Added Successfully!')
                   res.redirect('/addcategory')
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