const express = require("express");
const chatRouter = express.Router();
const Message = require("../models/message.js");
const User = require("../models/user.js");
const {authUser} = require("../middlewares/auth.js")
const ConnectionRequest = require("../models/connectionRequest.js")

chatRouter.post("/message", authUser, async(req, res)=>{
    try{

        console.log("check!!")
        const toUserId = req.body.toUser;
        const text = req.body.text;



        if(!toUserId || !text){
            throw new Error("Fields are required!!");
        }
        console.log("Check")

        const loggedUser = req.user;

        const isExistingUser = await ConnectionRequest.findOne({
            $or : [
                {
            fromUserId: loggedUser._id,
            toUserId: toUserId,
            status: "accepted"
        },
        {
            fromUserId: toUserId,
            toUserId: loggedUser._id,
            status: "accepted"
        }
        ]
        });
        console.log("check")

        if(!isExistingUser){
            throw new Error("Person has to be your connection!!!");
        }
        
        const message = new Message({
            fromUser : req.user._id,
            toUser : toUserId,
            text : text
        });


        await message.save();
        res.json({
            message : "Text send successfully!!",
            data : message
        });
    }
    catch(err){
        res.status(400).json({
            message : err.message
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

module.exports = chatRouter;