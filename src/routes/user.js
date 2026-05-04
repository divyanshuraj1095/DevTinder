const express = require("express");
const userRouter = express.Router();
const {authUser} = require("../middlewares/auth.js")
const ConnectionRequest = require("../models/connectionRequest.js");

userRouter.get("/user/request/received", authUser, async (req, res)=>{
    try{
        const user = req.user;

        const connectionRequest = await ConnectionRequest.find({
            toUserId : user._id,
            status : "interested"

        }).populate("fromUserId", ["firstName", "lastName", "age", "gender", "about"]);

        if(!connectionRequest){
            throw new Error("No Pending Requests!!");
        }

        res.json({
            message : "List of Requests!",
            data : connectionRequest
        })

    }
    catch(err){
        res.status(400).send("ERROR: "+err.message);
    }
});

module.exports = userRouter;