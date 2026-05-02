const express = require("express");
const bcrypt = require("bcrypt");
const { validateSinUp } = require('../utils/validate.js');
const authRouter = express.Router();
const User = require("../models/user.js");
const validator = require("validator");


authRouter.post("/signup", async (req, res)=>{
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

authRouter.post("/login", async(req, res)=>{
    try{
        const {eMail,password} = req.body;

        if(!validator.isEmail(eMail)){
            throw new Error("Email is in the wrong format");
        }
        const user = await User.findOne({eMail:eMail});
        if(!user){
            throw new Error("Invalid Credentials");
        }
        const valid = await user.bcryptCompare(password);
        if(!valid){
            throw new Error("Inavlid Credentials");   
        }
        const token = await user.getJWT();

        res.cookie("token", token);
        res.send("Loggin Successful!!");
    }
    catch (err) {
        res.status(400).send("Error: "+err.message);
    }
});

module.exports = authRouter;