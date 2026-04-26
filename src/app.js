const express = require('express');

const {authAdmin, authUser} = require("./middlewares/auth.js");

const app = express();

// app.use("/admin", authAdmin);

// app.get("/admin/getAllData", (req, res, next)=>{
//        res.send("All data send !!");
// });

// app.get("/user/login", (req, res, next)=>{
//        res.send("Login Successful");
// });



// app.use("/user", authUser,(req, res, next)=>{
//     console.log("response 1");
//     next();
// },
// (req,res, next)=>{
//     // res.send("handler1");
//     console.log("response 2");
//     next();
//     // res.send("handler 2nd call");
// }, 
// (req, res, next)=>{
//     res.send("handler 3 rd call");
// }
// );

app.use("/user", (req, res)=>{
    try{
        throw new err;
        res.send("User Details!!");
    }
    catch (err){
        res.status(401).send("Something is wrong");
    }
    
    
})

app.use("/", (err, req, res, next)=>{
    if(err){
        res.status(401).send("Something went wrong");
    }
})



app.listen(7777, ()=>{
    console.log("Listening to port 7777...");
});