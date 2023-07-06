const fs = require("fs");

const logger = (req,res,next)=>{
    const method = req.method;
    const route = req.url;
    const ipaddress = req.ip;
    const date = new Date();
    const Current_Date = date.toDateString();
    const Current_Time = date.toTimeString();

    
    // file for logger logger.txt is created and record of information like Method, Route, IpAddress, Date, Time. is maintain in Logger.txt file
    fs.appendFileSync("./logger.txt",`\n Method : ${method}, Route : ${route}, IpAddress : ${ipaddress}, Date : ${Current_Date}, Time : ${Current_Time} \n`);
     next();
}

module.exports={logger};