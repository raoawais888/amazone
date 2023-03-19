const  categoryModel = require( "../../models/categoryModel.js");
const  fs = require( 'fs');
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
                  res.redirect("/admin/add-category");
                } else {
                  imgName = req.file.filename;
            }
                     if (!req.body.categoryName) {
                       req.flash("fail", "Please Enter Name!");
                       res.redirect("/admin/add-category");
                     } else {
                       const catDoc = categoryModel({
                         name: req.body.categoryName,
                         image: imgName
                       });
                       await catDoc.save();
                       req.flash("success", "Category Added Successfully!");
                       res.redirect("/admin/category");
                     }
        } catch (error) {
            console.log("Error",error)
        }
    }
    static editCategory = async (req,res) => {
        try {
            const cate = await categoryModel.findById({_id:req.params.id})
            console.log(cate)
            res.render("backend/pages/categories/editCategory",{category:cate});
        } catch (error) {
            console.log("Error",error)
        }
    }
    static updateCategory = async (req,res) => {
        try {
                const {cat_id,categoryName,old_image} = req.body
                var updated_image = old_image
                if(req.file){
                        updated_image = req.file.filename
                      await fs.unlink(`public/uploads/${old_image}`,(error)=>{
                    if(error){
                        console.log(error);
                    }else{
                        console.log("deleted");
                    }
                })
                }
                  const updated_cat = await  categoryModel.findByIdAndUpdate(cat_id,{
                        name:categoryName,
                        image:  updated_image,
                    });
                    if(updated_cat)
                    {
                        req.flash('success', 'Category Updated Succefully!!')
                        res.redirect('/admin/category')
                    }
                    else{
                         req.flash('fail', 'Something went wrong! Please try again!')
                        res.redirect('/admin/category')
                    }
        } catch (error) {
            console.log("Error",error)
        }
    }
    static deleteCategory = async (req,res) => {
        try {
            const cId = req.params.id;
            const category = await categoryModel.findById({_id:cId})
                  if(category.image){        
                    await fs.unlink(`public/uploads/${category.image}`,(error)=>{
                    if(error){
                        console.log(error);
                    }else{
                        console.log("deleted");
                    }
                })
            }
          const deleted = await categoryModel.findByIdAndDelete({_id:cId});
          if(deleted)
          {
            req.flash("success","Category Deleted Successfully!")
            res.redirect("/admin/category");
          }
          else{
            req.flash("fail","Something went wrong! Please try again")
            res.redirect("/admin/category");
          }
        } catch (error) {
            console.log("Error",error)
        }
    }
}

module.exports = categoryController