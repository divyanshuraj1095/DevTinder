const express = require("express");
const profileRouter = express.Router();
const User = require("../models/user.js");
const {authUser} = require("../middlewares/auth.js");

profileRouter.get("/profile", authUser , async(req, res)=>{
    try{
    
    const user = req.user;
    res.send(user);
   }
   catch(err) {
    res.status(400).send("ERROR: "+err.message);
   }

});

profileRouter.patch("/user/:userId", async (req, res)=>{
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

profileRouter.delete("/user", async (req, res)=>{
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

profileRouter.get("/user", async (req, res)=>{
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

module.exports = profileRouter;