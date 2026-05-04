const express = require('express');
const connectDB = require("./config/database.js");
const jwt = require("jsonwebtoken");
const cookie = require("cookie-parser");
const authRouter = require("./routes/auth.js");
const profileRouter = require("./routes/profile.js");
const requestRouter = require("./routes/request.js");
const userRouter = require("./routes/user.js");

const app = express();
app.use(cookie());
app.use(express.json());

app.use('/',authRouter);
app.use('/',profileRouter);
app.use('/',requestRouter);
app.use('/',userRouter);

connectDB()
.then(()=>{
    console.log("DataBase Successfully Connected!!");
    app.listen(7777, ()=>{
    console.log("Listening to port 7777...");
});
}).catch((err)=>{
    console.log("Error Connecting to DataBase");
});






