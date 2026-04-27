const express = require('express');

const {authAdmin, authUser} = require("./middlewares/auth.js");

const connectDB = require("./config/database.js");

const app = express();

connectDB()
.then(()=>{
    console.log("DataBase Successfully Connected!!");
    app.listen(7777, ()=>{
    console.log("Listening to port 7777...");
});
}).catch((err)=>{
    console.log("Error Connecting to DataBase");
})




