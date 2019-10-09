const mongoose = require('mongoose'),
    schema = mongoose.Schema({
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        handle: { type: String, required: true, max: 40 },
        town: { type: String },
        lab: { type: String },
        location: { type: String },
        status: { type: String, required: true },
        skill: { type: [String], required: true },
        bio: { type: String },
        github: { type: String },
        experience: [{
            title: { type: String, required: true },
            description: { type: String },
            from: { type: Date, required: true },
            to: { type: Date },
            current: { type: Boolean, default: false }
        }],
        education: [{
            school: { type: String, required: true },
            description: { type: String },
            specialist: { type: String, required: true },
            degree: { type: String },
            from: { type: Date, required: true },
            to: { type: Date },
            current: { type: Boolean, default: false }
        }],
        social: {
            youtube: { type: String },
            twitter: { type: String },
            facebook: { type: String },
            instagram: { type: String },
            linkedin: { type: String }
        },
        date: { type: Date, default: Date.now }
    }),
    model = mongoose.model('Profile', schema);
module.exports = model;