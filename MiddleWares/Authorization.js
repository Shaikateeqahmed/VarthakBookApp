const authorise = (role_array)=>{
  
    return (req,res,next)=>{

         const UserRole = req.body.UserRole;

         //checking for User is Authorise to the following Endpoint.
         if(role_array.includes(UserRole)){
            next();
         }else{
            res.send("You Are Not Authorised!")
         }
    }
}

module.exports={authorise};