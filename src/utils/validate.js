const validator = require("validator");

const validateSinUp = (req) =>{
    const {firstName, lastName, eMail, password} = req.body;
    if(!firstName || lastName){
        throw new Error("Both the names are required!!");
    }
    else if(!validator.isEmail(eMail)){
        throw new Error("Email format is not correct");
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error("Password is not strong!!");
    }
}

module.exports = {
    validateSinUp,
}
