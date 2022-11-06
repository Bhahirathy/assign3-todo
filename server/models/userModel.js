const mongoose=require("mongoose")
const userModel=new mongoose.Schema({
    username:{
        type:String,
        unique:true,
        required:true
    },password:{
        type:String,
        required:true
    },confirmPassword:{
        type:String,
        required:true
    }
})
const userSchema=mongoose.model("user",userModel)
module.exports=userSchema