//middleware
const Validator = require('validator');

// importing validation stuff
const isEmpty = require('./isempty');



module.exports = function validateProfileInput(data) {
    let err = {};

    // validation for empty data 
    data.handle = !isEmpty(data.handle) ? data.handle : '';
    data.status = !isEmpty(data.status) ? data.status : '';
    data.skill = !isEmpty(data.skill) ? data.skill : '';
    data.lab = !isEmpty(data.lab) ? data.lab : '';

    if (!Validator.isLength(data.handle, { min: 2, max: 30 })) err.handle = "Handle must have 2 to 30 Characters";
    if (Validator.isEmpty(data.handle)) err.handle = "Profile must have an handle !!!";
    if (Validator.isEmpty(data.status)) err.status = "Status can't be empty !!!";
    if (Validator.isEmpty(data.skill)) err.skill = "Skills can't be empty !!!";
    if (Validator.isEmpty(data.lab)) err.lab = "Lab can't be empty !!!";

    //Social 
    if (!isEmpty(data.youtube)) if (!Validator.isURL(data.youtube)) err.youtube = "Not a Valid Url !!";
    if (!isEmpty(data.twitter)) if (!Validator.isURL(data.twitter)) err.twitter = "Not a Valid Url !!";
    if (!isEmpty(data.instagram)) if (!Validator.isURL(data.instagram)) err.instagram = "Not a Valid Url !!";
    if (!isEmpty(data.linkedin)) if (!Validator.isURL(data.linkedin)) err.linkedin = "Not a Valid Url !!";
    if (!isEmpty(data.facebook)) if (!Validator.isURL(data.facebook)) err.facebook = "Not a Valid Url !!";

    return {
        err,
        isValid: isEmpty(err)
    }
}


