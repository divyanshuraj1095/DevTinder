const express = require("express");
const userRouter = express.Router();
const {authUser} = require("../middlewares/auth.js")
const ConnectionRequest = require("../models/connectionRequest.js");
const User = require("../models/user.js");

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

userRouter.get("/feed", authUser, async (req, res)=>{
    try{
       const loggedUser = req.user;

       const page = (req.query.page) || 1;
       let limit = (req.query.limit) || 10;

       if(limit > 50) limit = 50;
       else limit = limit;

       const skip = (page-1)*limit;

       const connectionRequest = await ConnectionRequest.find({
        $or : [{fromUserId : loggedUser}, {toUserId : loggedUser}]
       }).select("fromUserId  toUserId");

       const hideFromFeed = new Set();

       connectionRequest.forEach((x) =>{
        hideFromFeed.add(x.fromUserId.toString());
        hideFromFeed.add(x.toUserId.toString());
       });

       const user = await User.find({
        $and : [{
         _id : {$nin : Array.from(hideFromFeed)},
         _id : {$ne : loggedUser._id}
        }]}).select("firstName lastName age gender about photoUrl skills")
        .limit(limit)
        .skip(skip);

        res.send(user);
    }
    catch(err){
        res.status(400).json({
            message : "Error"+err.message
        })
    }
})

module.exports = userRouter;