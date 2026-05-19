const mongoose = require("mongoose");
const User = require("../models/user.js");

const messageSchema = new mongoose.Schema({
    fromUser : {
        type : mongoose.Schema.Types.ObjectId,
        ref : User,
        required : true
    },
    toUser : {
        type : mongoose.Schema.Types.ObjectId,
        ref : User,
        required : true
    },
    text : {
        type : String,
        required : true
    }

},{timestamps : true});

module.exports = new mongoose.model("Message", messageSchema);