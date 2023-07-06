const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({
    Author_Name : String,
    Title : String,
    Description : String,
    Date : String,
    Time : String,
    Status : {type : String, enum : ["new","old"],default:"new"},
    UserID : String
})

const BookModel = mongoose.model("Book",bookSchema);

module.exports={BookModel};