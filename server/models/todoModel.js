const mongoose =require("mongoose")
const todoModel=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    Activity:{
        type:String,
        required:true
    },
    Status:{
        type:String,
         required:true,
    },
    timetaken:{
        type:String
    }
})
const dataModel=mongoose.model("posts",todoModel)
module.exports=dataModel