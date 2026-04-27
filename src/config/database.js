const mongoose = require("mongoose");

const connectDB = async ()=>{
    await mongoose.connect("mongodb+srv://divyanshuraj2310:divyanshu2310@cluster0.ythqwux.mongodb.net/?appName=devtindor");
};

module.exports = connectDB;


    



