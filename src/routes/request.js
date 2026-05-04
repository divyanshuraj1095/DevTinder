const express = require("express");
const {authUser} = require("../middlewares/auth.js");
const requestRouter = express.Router();
const ConnectionRequest = require("../models/connectionRequest.js");
const User = require("../models/user.js")

requestRouter.post("/request/send/:status/:toUserId",authUser, async (req, res)=>{
   try{
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;

      const allowedStatus = ["ignored", "interested"];
      if(!allowedStatus.includes(status)){
        throw new Error("Invalid status!!");
      }

      const isExistingUser = await User.findById(toUserId);
      if(!isExistingUser){
        throw new Error("User doesnt exist!!");
      }
      console.log("1");

      const existingConnectionRequest = await ConnectionRequest.findOne({
        $or : [
            {fromUserId, toUserId},
            {fromUserId : toUserId, toUserId : fromUserId}
        ],
      });
      console.log("2");

      if(existingConnectionRequest){
        throw new Error("Connection Already Exists!!");
      }
      const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status
      });
      console.log("3");

      const data = await connectionRequest.save();
      console.log("4")

      res.json({
        message : "Action Done!!",
        data
      })
   }
   catch(err){
    res.status(400).send("ERROR: "+err.message);
   }
})

requestRouter.post("/request/review/:status/:requestId", authUser, async (req, res)=>{
  try{
    const loggedUser = req.user;
    const {status, requestId} = req.params;

    const isAllowed = ["accepted", "rejected"];
    if(!isAllowed.includes(status)){
      throw new Error("Invalid status!!");
    }

    const isRequstExist = await ConnectionRequest.findOne({
      _id : requestId,
      toUserId : loggedUser._id,
      status : "interested"
    })

    if(!isRequstExist){
      throw new Error("Request doesnt exist");
    }

    isRequstExist.status = status;
    const data = await isRequstExist.save();

    res.json({
      message : status,
      data
    });

  }
  catch(err){
    res.status(400).send("ERROR: "+err.message);
  }
})

module.exports = requestRouter;