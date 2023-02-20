import mongoose from "mongoose";

const CategorySchema = mongoose.Schema({
    name: {type:String, require: true,trim:true},
    image: {type:String, require:true},
    created_at: {type: Date, default:Date.now }
})

const categoryModel = mongoose.model('productCategory',CategorySchema)

export default categoryModel