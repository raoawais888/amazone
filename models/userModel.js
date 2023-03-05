import mongoose from "mongoose";
const userSchema = mongoose.Schema({
    name: {type: String, require:true},
    email: { type: String, require: true, unique: true },
    userType: { type: Number, require: true },
    isActive: {type: Number, default: 0},
    password: {type: String},
    created_at: {type:Date, default:Date.now}
})

const userModel = mongoose.model('user',userSchema)

export default userModel