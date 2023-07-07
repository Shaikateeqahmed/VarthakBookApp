const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticate = (req,res,next)=>{
    let token = req.headers.authorization
    
    //Checking for User Having a Token or Not.
    if(token){

        //Checking for Token is correct or not.
        jwt.verify(token,process.env.key,(err,decode)=>{
            if(err){
                res.send("Token Expires, Please Login Again!");
            }else{
                let UserID = decode.UserID;
                req.body.UserID = UserID;
                let UserRole = decode.UserRole;
                req.body.UserRole = UserRole;
                next();
            }
        })
    }else{
        res.send("Please Login First!")
    }   
}

module.exports={authenticate};