const express = require("express");
const chatRouter = express.Router();
const Message = require("../models/message.js");
const {authUser} = require("../middlewares/auth.js")

chatRouter.post("/", authUser, (req, res)=>{
    
})