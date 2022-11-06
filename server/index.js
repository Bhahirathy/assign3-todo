const express=require("express")
const mongoose=require("mongoose")
const dotenv=require("dotenv").config()
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")
const cors=require("cors")
const salt=10
const userModel=require("./models/userModel")
const dataModel=require("./models/todoModel")
const app=express()
app.listen(process.env.PORT,(err)=>{
    if(!err){
        console.log(`server connected on port ${process.env.PORT}`)
    }else{
        console.log(err)
    }
})
mongoose.connect(process.env.MONGODB,(err)=>{
    if(!err){
        console.log("Database Connected Successfully")
    }else{
        console.log(err)
    } 
})
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())
app.post("/register",  (req, res) => {
    userModel.find({username: req.body.username}).then((user)=>{
    if (user.length){
        res.status(400).send("User exist already");
    } else {
        bcrypt.genSalt(salt).then((hashSalt)=>{
            bcrypt.hash(req.body.password,hashSalt).then((passwordHash) => {
                userModel.create({ 
                    username:req.body.username,
                    password: passwordHash,
                    confirmPassword:passwordHash
                }).then((data) => {
                    res.status(200).send("User created Successfully")
                }).catch((err) => {
                    res.status(400).send(err)
                })
            });
        })
    }        
    })
})
app.post("/login",(req,res)=>{
    userModel.find({username:req.body.username}).then((data)=>{
        if(data.length){
            bcrypt.compare(req.body.password,data[0].password).then((val)=>{
                if(val){
                    const authToken=jwt.sign(data[0].username,process.env.SECRET_KEY)
                    res.status(200).send({authToken})
                }else{
                    res.status(400).send("Invalid password or username")
                }
            })
        }else{
            res.status(400).send("User does not exist")
        }
    })
})
app.get("/details",(req,res)=>{
    const username=jwt.verify(req.headers.authorization,process.env.secret_key)
    userModel.find({username:username}).then((data)=>{
        res.status(200).send(data[0])
    })
})
app.post("/add",(req,res)=>{
    const user= jwt.verify(req.headers.authorization,process.env.secret_key)
     dataModel.create({
         username:user,
         Activity:req.body.Activity,
         Status:"Pending",
         timetaken:""
     }).then((data)=>{
         res.status(200).send("todo Created Successfully")
     }).catch((err)=>{
         res.status(400).send(err)
     })
 })
app.post("/update",(req,res)=>{    
    dataModel.updateOne({_id:req.body._id},{ $set:{timetaken:req.body.timetaken}}).then(()=>{
        dataModel.updateOne({_id:req.body._id},{ $set:{Status:"Completed"}}).then(()=>{
            res.status(200).send("Changed Successfully")
        }).catch((err)=>{
            res.status(400).send(err)
        })
    })
})
app.get("/all",(req,res)=>{
    const user=jwt.verify(req.headers.authorization, process.env.secret_key)
        dataModel.find({username:user}).then((data)=>{
            res.status(200).send(data)
        })
    })
app.post("/logout", (req, res)=> {
    res.status(200).send("logout works");
});
    