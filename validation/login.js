//middleware
const Validator = require('validator');

// importing validation stuff
const isEmpty = require('./isempty');



module.exports = function validateLoginInput(data) {
    let err = {};

    // validation for empty data 
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';

    //Email validation
    if (!Validator.isEmail(data.email)) err.email = "Email is invalid";
    if (Validator.isEmpty(data.email)) err.email = "Email Can't be empty";

    //Password Validation
    if (Validator.isEmpty(data.password)) err.password = "Password Can't be empty";

    return {
        err,
        isValid: isEmpty(err)
    }
}


