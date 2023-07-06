const express = require("express");
const {BookModel} = require("../Models/BookModel.js");
const {authorise} = require("../MiddleWares/Authorization.js");

const Book = express.Router();

// Creator can see the Books Created by them Only on this End point.
Book.get("/",authorise(["Creator","Viewer"]),async(req,res)=>{

    let UserID = req.body.UserID;
    
    // Geting all the Books Written By Particular User.
    let Books_Of_User = await BookModel.find({UserID});

    res.send({"Books_Created_By_You" : Books_Of_User});
})

// Creator can Create a Book On This End Point.
Book.post("/",authorise(["Creator"]),async(req,res)=>{

    let {Author_Name, Title, Description} = req.body;
    let UserID = req.body.UserID;

    const date = new Date();

    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
     
    //Creating a Date from inbuild function.
    let Current_Date = date.toDateString();

    //Creating a Time from inbuild function for Changing a Status from New To Old.
    let Current_Time = `${hours}:${minutes}:${seconds}`;


    // Checking for All the Required Feilds.
    if(!Author_Name||!Title||!Description){
      res.send("Please Fill All The Fields!");
    }else{
        let new_Book = new BookModel({Author_Name,Title,Description,Date:Current_Date,Time:Current_Time,UserID});

        await new_Book.save();
    
        res.send("Book Successfully Added To the Collection!");
    }

    

})

// Viewer can see the Books Based on Status(that is Old or New).
Book.get("/:status",authorise(["Creator","Viewer","View_all"]),async(req,res)=>{

    const status = req.params.status;
    
    let New_Books = await BookModel.find({Status:status});
    res.send(New_Books);


})

// every minute below setInterval is checking a Time and Updating a Status Accordingly
setInterval(async()=>{
    let All_Books = await BookModel.find({Status:"new"});
    const date = new Date();

    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    let Current_Time = `${hours}:${minutes}:${seconds}`;
    
    All_Books.filter(async(el)=>{

        // This is for checking the difference of time with in a Hour.
        let created_Time = el.Time.trim().split(":").map(Number);
        let difference =  minutes - created_Time[1]

        // This is for Checking the difference when Hours Change.
        let difference_when_hours_change = el.Time.trim().split("");
        let minute = +difference_when_hours_change[4];
        let difference2 = minute - minutes;

        // checking the status according to the time distance.
        if(difference>=10 || difference2==0){
            await BookModel.findByIdAndUpdate({_id:el._id},{Status:"old"});
        }
    })
    console.log(`status checked And Change Accordingly if Required(If Time Is More Then 10 Minutes)!`);
},60000);

module.exports={Book};