//middleware
const Validator = require('validator');

// importing validation stuff
const isEmpty = require('./isempty');



module.exports = function validatePostInput(data) {
    let err = {};

    // validation for empty data 
    data.text = !isEmpty(data.text) ? data.text : '';

    //text validation
    if (Validator.isEmpty(data.text)) err.text = "Text is invalid";
    if (!Validator.isLength(data.text, { min: 2, max: 300 })) err.text = "Text must be between 2 to 300 Characters"

    return {
        err,
        isValid: isEmpty(err)
    }
}


