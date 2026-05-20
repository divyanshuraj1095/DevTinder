const express = require('express');
const cors = require("cors");
require("dotenv").config({ path: "./.env" });
const connectDB = require("./config/database.js");
const jwt = require("jsonwebtoken");
const cookie = require("cookie-parser");
const authRouter = require("./routes/auth.js");
const profileRouter = require("./routes/profile.js");
const requestRouter = require("./routes/request.js");
const userRouter = require("./routes/user.js");
const chatRouter = require("./routes/chat.js")

const app = express();
app.use(cookie());
app.use(express.json());
app.use(cors({
   origin: process.env.CLIENT_URL,
   credentials: true
}));


app.use('/',authRouter);
app.use('/',profileRouter);
app.use('/',requestRouter);
app.use('/',userRouter);
app.use('/',chatRouter);


connectDB()
.then(()=>{
    console.log("DataBase Successfully Connected!!");
    app.listen(7777, ()=>{
    console.log("Listening to port 7777...");
});
}).catch((err)=>{
    console.log(err.message+"Error Connecting to DataBase");
});






