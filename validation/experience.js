//middleware
const Validator = require('validator');

// importing validation stuff
const isEmpty = require('./isempty');



module.exports = function validateExperienceInput(data) {
    let err = {};
    // validation for empty data 
    data.title = !isEmpty(data.title) ? data.title : '';
    data.from = !isEmpty(data.from) ? data.from : '';
    if (Validator.isEmpty(data.title)) err.title = "Title is required !!";
    if (Validator.isEmpty(data.from)) err.from = "From is required !!";
    return {
        err,
        isValid: isEmpty(err)
    }
}


