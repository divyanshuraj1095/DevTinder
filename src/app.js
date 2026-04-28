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

app.get("/userID", async(req, res)=>{
    const userId = req.body._id;
    try{
        const users = await User.findById({_id : userId});
        if(users.length === 0){
           
           res.status(404).send("User not found");
        }
        else{
            res.send(users);
        }
        
    }
    catch (err) {
        res.status(400).send("Smoething went wrong");
    }
});

app.get("/feed", async(req, res)=>{
    try{
        const users = await User.find({});
        if(users.length === 0){
            res.status(404).send("No user in the database");
        }
        else{
            res.send(users);
        }
    }
    catch (err) {
        res.status(400).send("Something went wrong");
    }
})

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

app.delete("/user", async (req, res)=>{
    const userId = req.body.userId;

    try{
        const user = await User.findByIdAndDelete(userId);// const user = await User.findByIdAndDelete({_id : userId});  both are same
        if(user.length === 0){
            res.status(404).send("User Not found");
        }
        res.send("User Successfully deleted!!");
    }
    catch(err) {
        res.status(400).send("Something went wrong");
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






