import mongoose from "mongoose";
const userSchema = mongoose.Schema({
    userName: {type: String, require:true},
    email: {type: String, require:true, unique:true},
    password: {type: String, require:true},
    created_at: {type:Date, default:Date.now}
})

const userModel = mongoose.model('user',userSchema)

export default userModel