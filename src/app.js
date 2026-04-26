const express = require('express');

const app = express();

app.use("/user", (req, res, next)=>{
    console.log("response 1");
    next();
},
(req,res, next)=>{
    // res.send("handler1");
    console.log("response 2");
    next();
    // res.send("handler 2nd call");
}, 
(req, res, next)=>{
    res.send("handler 3 rd call");
}


);



app.listen(7777, ()=>{
    console.log("Listening to port 7777...");
});