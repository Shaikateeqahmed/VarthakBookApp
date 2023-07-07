const mongoose = require("mongoose");
require("dotenv").config();


// Connection Make with MongoDB by the Help of mongoose.
const connection = mongoose.connect(process.env.mongodburl);

module.exports={connection};