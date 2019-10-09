//middleware
const Validator = require('validator');

// importing validation stuff
const isEmpty = require('./isempty');



module.exports = function validateEducationInput(data) {
    let err = {};

    // validation for empty data 
    data.school = !isEmpty(data.school) ? data.school : '';
    data.specialist = !isEmpty(data.specialist) ? data.specialist : '';
    data.from = !isEmpty(data.from) ? data.from : '';

    if (Validator.isEmpty(data.specialist)) err.specialist = "Specialist is required !!";
    if (Validator.isEmpty(data.school)) err.school = "School is required !!";
    if (Validator.isEmpty(data.from)) err.from = "From is required !!";
    return {
        err,
        isValid: isEmpty(err)
    }
}


