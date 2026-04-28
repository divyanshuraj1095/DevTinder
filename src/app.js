const express = require('express');

const {authAdmin, authUser} = require("./middlewares/auth.js");

const User = require("./models/user.js");

const connectDB = require("./config/database.js");

const app = express();

app.use(express.json());

app.post("/signup", async (req, res)=>{

    console.log(req.body);
    const user = new User(req.body);
    try{
       await user.save();
       res.send("User added successfully!!");
    }
    catch (err) {
        res.status(400).send("Failed adding user to the database!!")
    }
    
});

app.get("/user", async (req, res)=>{
    const userMail = req.body.eMail;

    try{
        const users = await User.find({eMail : userMail});
        if(users.length === 0){
            res.status(404).send("User not found");
        }
        else{
            res.send(users);
        }
        
    }
    catch (err) {
        res.status(400).send("Something Went Wrong !!");
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






