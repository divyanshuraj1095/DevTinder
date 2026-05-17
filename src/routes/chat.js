const express = require("express");
const chatRouter = express.Router();
const Message = require("../models/message.js");
const {authUser} = require("../middlewares/auth.js")

chatRouter.post("/message", authUser, async(req, res)=>{
    try{
        const {toUserId, text} = req.body;

        const message = new Message({
            fromUser : req.user._id,
            toUser : toUserId,
            text
        });

        await message.save();
        res.json({
            message : "Text send successfully!!",
            data : message
        });
    }
    catch{
        res.status(400).json({
            message : "Unable to send message!!"
        })
    }
});

chatRouter.get("/messages/:UserId", authUser, async(req, res)=>{
    try{
       const userId = req.params.userId;

       const message = await Message.find({
        $or : [
            {fromUser : req.user._id, toUser : userId},
            {fromUser : userId, toUser : req.user._id}
        ]
       }).sort({created : 1})
       res.json(message);
    }
    catch{
        res.json({
            message : "Failed to get message!"
        })
    }
})