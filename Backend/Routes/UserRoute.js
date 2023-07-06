const express = require("express");
const {UserModel}= require("../Models/UserModel.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = express.Router();
require("dotenv").config();


User.post("/signup",async(req,res)=>{
    let {Name, Email, Password, Role} = req.body;
    
    let Is_user_exists = await UserModel.find({Email});

    //Checking For Filling of All the Feilds.
    if(!Name||!Email||!Password||!Role){
        res.send("Please Fill All the Fields!")
    }else{

        //Checking For, Is User Already Exists Or Its a new User.
        if(Is_user_exists.length>0){
            res.send("Opps, Its Seems Like User With This EmailID Already Exists!");
        }else{

           //Bcrypting Password For Security Purpose
           bcrypt.hash(Password,5,async(error,hash)=>{
            if(error){
                res.send("Opps, Something Went Wrong Please Try After SomeTime!");
                console.log(error);
            }else{

                // Saving the User Data in MongoDB
                let newUser = new UserModel({Name,Email,Password:hash,Role});
                await newUser.save();
                res.send(`Thank You ${Name} For Signup Succesfully!`);
            }
           })
        }
    }
    
})

User.post("/login", async(req,res)=>{
    let {Email, Password} = req.body;

    let Is_user_exists = await UserModel.find({Email});
    
    //Checking For Filling of All the Feilds.
    if(!Email||!Password){
        res.send("Please Fill All the Fields!");
    }else{

    //Checking For User had Signup Or Not.
    if(Is_user_exists.length>0){

        //Checking For Login Password is correct with Bcrypt Password.
        bcrypt.compare(Password, Is_user_exists[0].Password, (error,result)=>{
         if(error){
             res.send("Opps, Something Went Wrong Please Try After SomeTime!");
         }else{
 
            //Assigning a Token For the Purpose of Authentication
            let token = jwt.sign({UserID:Is_user_exists[0]._id,UserRole:Is_user_exists[0].Role},process.env.key);
            res.send(token);
         }
        })
     }else{
         res.send(`Opps, Its Seems Like You Didn't Signup, Please Signup First!`)
     }
    }
   


})

module.exports={User};