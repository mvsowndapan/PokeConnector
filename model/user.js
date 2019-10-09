const mongoose = require('mongoose'),
    schema = mongoose.Schema({
        name: { type: String, required: true },
        email: { type: String, required: true },
        avatar: { type: String },
        password: { type: String, required: true },
        date: { type: String, default: Date.now }
    }),
    model = mongoose.model('User', schema);

module.exports = model;