const express = require('express');

const {authAdmin, authUser} = require("./middlewares/auth.js");

require("./config/database.js");

const app = express();




app.listen(7777, ()=>{
    console.log("Listening to port 7777...");
});