const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    Name : String,
    Email : String,
    Password : String,
    Role : {type: String, enum : ["Creator","Viewer","View_all"],default:"View_all"}
})

const UserModel = mongoose.model("User",userSchema);

module.exports={UserModel};