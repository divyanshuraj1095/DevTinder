const express = require('express');

const app = express();

app.use("/", (req, res) =>{
    res.send("Hello from the server!!");
    
});
app.use("/test",(req, res)=>{
    res.send("testing !");
});

app.listen(7777, ()=>{
    console.log("Listening to port 7777...");
});