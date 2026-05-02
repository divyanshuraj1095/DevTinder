const express = require("express");
const profileRouter = express.Router();
const User = require("../models/user.js");
const {authUser} = require("../middlewares/auth.js");
const { validateUpdate } = require("../utils/validate.js");

profileRouter.get("/profile/view", authUser , async(req, res)=>{
    try{
    
    const user = req.user;
    res.send(user);
   }
   catch(err) {
    res.status(400).send("ERROR: "+err.message);
   }

});

profileRouter.patch("/profile/edit", authUser ,async (req, res)=>{

    try{
     if(!validateUpdate(req)){
        throw new Error("Field can't be edited!!")
     }

     const loggedUser = req.user; //user attached to middleware

     Object.keys(req.body).forEach((key) => loggedUser[key] = req.body[key]);

     await loggedUser.save();

     res.send("Update Successful");

    }
    catch(err){
        res.status(400).send("Error: "+err.message);
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