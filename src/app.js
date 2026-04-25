const express = require('express');

const app = express();

app.post("/hello", (req, res) =>{
    res.send("post here");
});

app.delete("/hello", (req, res) =>{
    res.send("delete");
});
app.patch("/hello", (req, res)=>{
    res.send("patch");
});
app.put("/hello", (req, res)=>{
    res.send("put");
});
app.get("/hello", (req,res)=> {
    res.send("get here");
});
app.use("/hello", (req, res)=>{
    res.send("from hello route!!")
});
app.use("/", (req, res) =>{
    res.send("Hello from the server!!");
    
});
app.use("/test",(req, res)=>{
    res.send("testing !");
});

app.listen(7777, ()=>{
    console.log("Listening to port 7777...");
});