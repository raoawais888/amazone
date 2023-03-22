const mongoose =  require ("mongoose");
const userSchema = mongoose.Schema({
    name: {type: String, require:true},
    email: { type: String, require: true, unique: true },
    userType: { type: Number, default: 2 },
    isActive: {type: Number, default: 0},
    password: {type: String},
    created_at: {type:Date, default:Date.now}
})

const userModel = mongoose.model('user',userSchema)

module.exports = userModel