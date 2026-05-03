const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema({
    fromRequest : {
        type : mongoose.Schema.Types.ObjectId,
        required : true
    },
    toRequest : {
        type : mongoose.Schema.Types.ObjectId,
        required : true
    },
    status : {
        type : String,
        required : true,
        enum : {
            values : ["ignored", "interested", "accepted", "rejected"],
            message : `${VALUE} is incorrect status type`,
        },
    }
}, {timestamps : true});

const connectionRequest = mongoose.model("ConnectionRequest", connectionRequestSchema);

module.exports = connectionRequest;