import productModel from "../../models/productModel.js";
import categoryModel from "../../models/categoryModel.js";
class vendorProductController {
    static allProduct = async (req,res) => {
        try {
            const Products = await productModel.find().populate('category');
            res.render("backend/pages/products/products",{products:Products})
        } catch (error) {
            console.log("Error",error)
        }
    }
    static addProduct = async (req,res) => {
        try {
            const category= await categoryModel.find({})
            res.render("backend/pages/products/addProduct",{category:category})
        } catch (error) {
            console.log("Error",error)
        }
    }
    static storeProduct = async (req,res) => {
        try {
            const {pname,pprice,qty,pdesc,p_cat} = req.body
               var img = req.file
                if(!img){
                    req.flash('fail','Please upload Image!')
                    res.redirect('/addproduct')
                }
                else{
                    img = req.file.filename
                }
                
                if(!pname || !pprice || !p_cat || !qty )
                {
                    req.flash('fail','Please Fill All Fields!')
                    res.redirect('/addproduct')
                }
                else
                {
                    const ProductDoc = productModel ({
                        name: pname,
                        price: pprice,
                        category:p_cat,
                        stock:qty,
                        image:img,
                        desc:pdesc

                    })
                    await ProductDoc.save()
                    req.flash('success','Product Added Successfully!')
                    res.redirect('/products')
                }
        } catch (error) {
            console.log("Error",error)
        }
    }
    static editProduct = async (req,res) => {
        try {
            const id = req.params.id
            const product = await productModel.findById({_id:id})
            res.render("backend/pages/products/editProduct",{product:product})
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
                 const id = req.params.id
                    const product = await productModel.findById(id)
                    if(product.image){        
                    await fs.unlink(`public/uploads/${product.image}`,(error)=>{
                    if(error){
                        console.log(error);
                    }else{
                        console.log("deleted");
                    }
                })
            }
                    const product_delete = await productModel.findByIdAndDelete(id)
                    if(product_delete)
                    {
                        req.flash('success','Product Deleted Successfully!!')
                        res.redirect('/products')
                    }
                    else{
                        req.flash('fail','Something went Wrong Please Try Again!!')
                        res.redirect('/products')
                    }
        } catch (error) {
            console.log("Error",error)
        }
    }
}
export default vendorProductController;