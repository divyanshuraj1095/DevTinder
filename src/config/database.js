const mongoose = require("mongoose");

const connectDB = async ()=>{
    await mongoose.connect("mongodb+srv://divyanshuraj2310:divyanshu2310@cluster0.ythqwux.mongodb.net/?appName=Cluster0");
};

module.exports = connectDB;

connectDB()
.then(()=>{
    console.log("DataBase Successfully Connected!!");
}).catch((err)=>{
    console.log("Error Connecting to DataBase");
})
    



