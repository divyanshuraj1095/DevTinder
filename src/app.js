const express = require('express');

const {authAdmin, authUser} = require("./middlewares/auth.js");

const User = require("./models/user.js");

const validator = require("validator");

const connectDB = require("./config/database.js");
const { validateSinUp } = require('./utils/validate.js');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookie = require("cookie-parser");

const app = express();

app.use(cookie());

app.use(express.json());

app.post("/login", async(req, res)=>{
    try{
        const {eMail,password} = req.body;

        if(!validator.isEmail(eMail)){
            throw new Error("Email is in the wrong format");
        }
        const user = await User.findOne({eMail:eMail});
        if(!user){
            throw new Error("Invalid Credentials");
        }
        const valid = await bcrypt.compare(password, user.password);
        if(!valid){
            throw new Error("Inavlid Credentials");   
        }
        const token = await jwt.sign({_id : user._id}, "DEV@Tinder123");

        res.cookie("token", token);
        res.send("Loggin Successful!!");
    }
    catch (err) {
        res.status(400).send("Error: "+err.message);
    }
});

app.get("/profile", async(req, res)=>{
    try{
    const cookie = req.cookies;     
    const {token} = cookie;
    if(!token){
        throw new Error("Invalid Token");
    }

    const decodedInfo = await jwt.verify(token,"DEV@Tinder123");
    console.log(decodedInfo);

    const {_id} = decodedInfo;

    const user = await User.findById(_id);
    if(!user){
        throw new Error("User doesnt exist");
    }
    res.send(user);
   }
   catch(err) {
    res.status(400).send("ERROR: "+err.message);
   }

});



app.post("/signup", async (req, res)=>{
    try{
       validateSinUp(req);

       const {firstName, lastName, eMail, password} = req.body;

       const hashPassword = await bcrypt.hash(password, 10);
       const user = new User({
          firstName,
          lastName,
          eMail,
          password : hashPassword,
       });
    
       await user.save();
       res.send("User added successfully!!");
    }
    catch (err) {
        res.status(400).send("Error: "+err.message)
    }
    
});

app.get("/userId", async(req, res)=>{
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

app.patch("/user/:userId", async (req, res)=>{
    const userId = req.params.userId;
    const data = req.body;

    try{
       const ALLOWED_UPDATES = ["gender", "age", "about", "photo", "skills"];
       const isUpdateAllowed = Object.keys(data).every((k)=> ALLOWED_UPDATES.includes(k));

       if(!isUpdateAllowed){
        throw new Error("Update not Allowed");
       }

       await User.findByIdAndUpdate(userId, data, {
        runValidators : true,
       });
       res.send("User Updated Successfully!!");

    }
    catch (err) {
        res.status(400).send("Something Went wrong");
    }
})

connectDB()
.then(()=>{
    console.log("DataBase Successfully Connected!!");
    app.listen(7777, ()=>{
    console.log("Listening to port 7777...");
});
}).catch((err)=>{
    console.log("Error Connecting to DataBase");
});






