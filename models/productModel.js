import mongoose from "mongoose";

const ProductSchema = mongoose.Schema({
    name: {type:String, require:true, trim:true},
    image: {type:String, require:true},
    price: {type:Number, require:true, trim:true},
    stock: {type:Number, require:true, trim:true},
    category: {type: mongoose.Types.ObjectId, ref: 'productCategory'},
    user: {type: mongoose.Types.ObjectId, ref: 'user'},
    desc: {type: String},
    created_at: {type:Date, default:Date.now}
})

const productModel = mongoose.model('product',ProductSchema)

export default productModel