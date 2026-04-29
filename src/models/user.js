const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName : {
        type : String,
        required : true,
        trim : true,
        
    },
    lastName : {
        type : String,
        trim: true,
    },
    eMail : {
        type : String,
        required : true,
        lower : true,
        trim : true,
        unique : true,
    },
    password : {
        type : String,
        required : true,
        minLength : 8,
        maxLength : 12
    },
    age : {
        type : Number,
        min : 18,
    },
    photo : {
        type: String,
        default : "https://media.istockphoto.com/id/2014684899/vector/placeholder-avatar-female-person-default-woman-avatar-image-gray-profile-anonymous-face.jpg?s=612x612&w=0&k=20&c=D-dk9ek0_jb19TiMVNVmlpvYVrQiFiJmgGmiLB5yE4w=",
    },
    about : {
        type : String,
        default : "This is default description about the user please update it",
    },
    gender : {
        type : String,
        validate(value){
            if(!["male", "female", "others"].includes(value)){
                throw new Error("Gender data is not valid!!");
            }
        }
    },
    skills : {
        type : [String],
    }
}, {
    timestamps : true,
});

const User = mongoose.model("User", userSchema);

module.exports = User;