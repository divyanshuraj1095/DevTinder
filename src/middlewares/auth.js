const User = require("../models/user.js");
const jwt = require("jsonwebtoken");

const authUser = async (req, res, next) =>{
    try{
       const {token} = req.cookies;
       if(!token){
        throw new Error("Invalid tokennnn!!");
       }
       const decoded = await jwt.verify(token, "DEV@Tinder123");

       const {_id} = decoded;
       const user = await User.findById(_id);
       if(!user){
        throw new Error("User doesnt exist");
       }
       req.user = user; //we are attaching user details on req...
       next();

    }
    catch(err){
        res.status(400).send("ERROR: "+err.message);
    }
};

module.exports = {
    authUser
}