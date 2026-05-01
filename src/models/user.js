const mongoose = require("mongoose");
const validator = require("validator");
const { default: isEmail } = require("validator/lib/isEmail");
const jwt = require("jsonwebtoken");

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
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Enter correct email"+value);
            }
        }
    },
    password : {
        type : String,
        required : true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("The password is too weak!"+value);
            }
        }
    },
    age : {
        type : Number,
        min : 18,
    },
    photo : {
        type: String,
        default : "https://media.istockphoto.com/id/2014684899/vector/placeholder-avatar-female-person-default-woman-avatar-image-gray-profile-anonymous-face.jpg?s=612x612&w=0&k=20&c=D-dk9ek0_jb19TiMVNVmlpvYVrQiFiJmgGmiLB5yE4w=",
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("Enter valid URL"+value);
            }
        }
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

userSchema.methods.getJWT = async function() {
    const user = this;

    const token = await jwt.sign({_id : user._id}, "DEV@Tinder123", {expiresIn : "7d"});

    return token;
}

const User = mongoose.model("User", userSchema);

module.exports = User;