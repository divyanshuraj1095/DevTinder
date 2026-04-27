const express = require('express');

const {authAdmin, authUser} = require("./middlewares/auth.js");

const User = require("./models/user.js");

const connectDB = require("./config/database.js");

const app = express();

app.post("/signup", async (req, res)=>{
    const user = new User({
        firstName : "Luffy",
        lastName : "D",
        eMail : "luffy@gmail.com",
        password : "2310luff",
        gender : "Male"
    });
    try{
       await user.save();
       res.send("User added successfully!!");
    }
    catch (err) {
        res.status(400).send("Failed adding user to the database!!")
    }
    
});

connectDB()
.then(()=>{
    console.log("DataBase Successfully Connected!!");
    app.listen(7777, ()=>{
    console.log("Listening to port 7777...");
});
}).catch((err)=>{
    console.log("Error Connecting to DataBase");
});






