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

        }).populate("fromUserId", ["firstName", "lastName", "age", "gender", "about", "photoUrl", "skills"]);

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

userRouter.get("/user/connections", authUser, async(req, res)=>{
    try{
        const loggedUser = req.user;

        const connectionRequest = await ConnectionRequest.find({
            $or : [
                {
                    fromUserId : loggedUser._id, status : "accepted"
                },
                {
                    toUserId : loggedUser._id, status : "accepted"
                }
            ]
        }).populate("fromUserId", ["firstName", "lastName", "age", "gender", "about", "photoUrl", "skills"])
          .populate("toUserId", ["firstName", "lastName", "age", "gender", "about", "photoUrl", "skills"]);

          console.log("wdwww")

        const data = connectionRequest.map((x)=>{
            if(x.fromUserId._id.toString() === loggedUser._id.toString()){
                return x.toUserId;
            }
            return x.fromUserId;
        })
        console.log("wdwww")

        res.json({
            message : "Your Connections",
            data
        })
    }
    catch(err){
        res.status(400).send("ERROR: "+err.message);
    }
})

module.exports = userRouter;