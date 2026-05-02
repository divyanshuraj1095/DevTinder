const validator = require("validator");


const validateSinUp = (req) =>{
    const {firstName, lastName, eMail, password} = req.body;
    if(!firstName || !lastName){
        throw new Error("Both the names are required!!");
    }
    else if(!validator.isEmail(eMail)){
        throw new Error("Email format is not correct");
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error("Password is not strong!!");
    }
}

const validateUpdate = (req) =>{
    try{
       const editValid = ["firstName", "lastName", "about", "skills", "gender", "photoUrl", "age"];

       const isValidToEdit = Object.keys(req.body).every((k) => editValid.includes(k));

       return isValidToEdit;
    }
    catch{
        res.status(400).send("ERROR: "+err.message);
    }
}

// const validatePassUpdate = (req) =>{
//     try{
//         const isCorrect = bcrypt.compare()
//     }
//     catch(err) {
//         res.status(400).send("ERROR: "+err.message);
//     }
// }

module.exports = {
    validateSinUp,
    validateUpdate
}
