const express = require("express");
const {connection} = require("./ConnectionToMongoDB/connection.js");
const {User} = require("./Routes/UserRoute.js");
const { authenticate } = require("./MiddleWares/Authentication.js");
const { Book } = require("./Routes/BookRoute.js");
const {logger} = require("./MiddleWares/Logger.js");
require("dotenv").config();


const app = express();

// express.json() is used for Converting a data in JSON format.
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("Home Page");
})

// Logger Middleware is applicable to all the below Routes. 
app.use(logger);
app.use("/user",User);

// Authenticate Middleware is Only applicable to Books Route.
app.use(authenticate);
app.use("/books",Book);


app.listen(process.env.port,async()=>{
    await connection;
    console.log(`Server is running on Port ${process.env.port}`);
})