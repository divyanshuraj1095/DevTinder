const express = require("express");
const {authUser} = require("../middlewares/auth.js");
const requestRouter = express.Router();

requestRouter.post("/sendRequest",authUser, async (req, res)=>{
    const user = req.user ///we have attached user info in the middleware!!

    res.send(user.firstName+" "+"has sent you a connection request!");
})

module.exports = requestRouter;