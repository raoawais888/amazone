import product from "../models/productModel.js"
class cartController {
    static cart = async (req,res)=> {
            const cart_id  = req.params.id;
            // const store = localStorage.setItem('cart',cart_id)
            const store = req.cookie
            console.log(store);
    }
}

export default cartController