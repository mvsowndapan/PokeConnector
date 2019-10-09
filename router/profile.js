const express = require('express'),
    passport = require('passport'),
    router = express.Router();

// model
const Profile = require('../model/profile'),
    User = require('../model/user');

//validation
const validateProfileInput = require('../validation/profile'),
    validateExperienceInput = require('../validation/experience'),
    validateEducationInput = require('../validation/education');;

//routes
// @route	Get /profile/
// @desc	get current user
// @access	Private
router.get('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
    let err = {};
    await Profile.
        findOne({ user: req.user.id })
        .populate('user', ['name', 'avatar'])
        .then(profile => {
            // console.log(profile);
            if (!profile) { err.noprofile = "No Profile Found !!!"; return res.status(404).json(err); }
            res.json(profile);
        })
        .catch(err => res.json(err))
});

// @route	Post /profile/
// @desc    Add || Update profile for user
// @access	Private
router.post('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
    // Validating inputs... 
    let { err, isValid } = validateProfileInput(req.body);
    if (!isValid) return res.status(400).json(err);
    //gathering data
    let profileData = {};
    profileData.social = {};
    //....putting Values into the profileData array for insertion
    profileData.user = req.user.id;
    if (req.body.handle) profileData.handle = req.body.handle;
    if (req.body.town) profileData.town = req.body.town;
    if (req.body.lab) profileData.lab = req.body.lab;
    if (req.body.location) profileData.location = req.body.location;
    if (req.body.status) profileData.status = req.body.status;
    if (req.body.bio) profileData.bio = req.body.bio;
    if (req.body.github) profileData.github = req.body.github;
    if (typeof req.body.skill !== 'undefined') profileData.skill = req.body.skill.split(',');//Skills we need to split the data
    if (req.body.youtube) profileData.social.youtube = req.body.youtube; //Social
    if (req.body.twitter) profileData.social.twitter = req.body.twitter;
    if (req.body.facebook) profileData.social.facebook = req.body.facebook;
    if (req.body.instagram) profileData.social.instagram = req.body.instagram;
    if (req.body.linkedin) profileData.social.linkedin = req.body.linkedin;
    //....
    await Profile
        .findOne({ user: req.user.id })
        .then(profile => {
            if (profile) {
                Profile  //update
                    .findOneAndUpdate({ user: req.user.id }, { $set: profileData }, { new: true })
                    .then(newProfile => { res.json(newProfile) });
            }
            else {
                Profile  //create
                    .findOne({ handle: req.body.handle })
                    .then(profile => {
                        if (profile) { return res.status(400).json({ error: "Handle already exists !!" }); }
                        new Profile(profileData)
                            .save()
                            .then(profile => { res.json(profile); });
                    });
            }
        });
});

// @route	Delete /profile/delete
// @desc	Delete the profile and account
// @access	Public
router.delete('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        await Profile.findOneAndRemove({ user: req.user.id });
        await User.findOneAndRemove({ _id: req.user.id });
        res.json({ success: "Profile Deleted successfully" });
    }
    catch (err) { res.status(400).json({ profile: 'Profile can\'t be deleted || Profile Doesn\'t exists' }) }
});



// @route	Get /profile/handle/:id
// @desc	get profile by handle
// @access	Public
router.get('/handle/:id', async (req, res) => {
    let err = {};
    await Profile
        .findOne({ handle: req.params.id })
        .populate('user', ['name', 'avatar'])
        .then(profile => {
            if (!profile) { err.noprofile = "Profile not found !!!"; return res.status(404).json(err); }
            res.json(profile);
        })
        .catch(() => res.status(404).json({ profile: "Profile not found !!!" }));
});


// @route	Get /profile/user/:id
// @desc	get profile by user
// @access	Public
router.get('/user/:id', async (req, res) => {
    let err = {};
    await Profile
        .findOne({ user: req.params.id })
        .populate('user', ['name', 'avatar'])
        .then(profile => {
            if (!profile) { err.noprofile = "Profile not found !!!"; return res.status(404).json(err); }
            res.json(profile);
        })
        .catch(() => res.status(404).json({ profile: "Profile not found !!!" }));
});

// @route	Get /profile/all
// @desc	Get all the profiles
// @access	Public
router.get('/all', async (req, res) => {
    try {
        let profiles = await Profile.find().populate('user', ['name', 'avatar']);
        if (!profiles) return res.status(404).json({ noprofiles: 'No profiles here !!!' });
        res.json(profiles);
    }
    catch (err) { res.status(404).json({ noprofiles: 'No profiles here !!!' }); }
});

// @route	Post /profile/experience
// @desc	Add Experiance to the user
// @access	Private
router.post('/experience', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        let { err, isValid } = await validateExperienceInput(req.body);
        if (!isValid) { return res.status(400).json(err); } //Validation
        let { title, description, from, to, current } = req.body;
        let profile = await Profile.findOne({ user: req.user.id });
        profile.experience.push({ title, description, from, to, current });
        profile.save();
        res.json(profile);
    }
    catch (err) { res.status(404).json({ experience: 'Error While Adding a Experiance, Try Again !!' }); }
});

// @route	Delete /profile/experience/:id
// @desc	delete the experience of the user
// @access	Private
router.delete('/experience/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        let profile = await Profile.findOne({ user: req.user.id });
        let removeIndex = profile.experience.map(exp => exp.id).indexOf(req.params.id);//mapping the index of data
        profile.experience.splice(removeIndex, 1);
        await profile.save();
        res.json(profile);
    }
    catch (err) { res.status(404).json({ experience: 'Error While Deleting a Experiance, Try Again !!' }); }
})



// @route	Post /profile/education
// @desc	Add Education to the user
// @access	Private
router.post('/education', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        let { err, isValid } = await validateEducationInput(req.body);
        if (!isValid) { return res.status(400).json(err); } //Validation
        let { school, degree, specialist, description, from, to, current } = req.body;
        let profile = await Profile.findOne({ user: req.user.id });
        profile.education.push({ school, degree, specialist, description, from, to, current });
        profile.save();
        res.json(profile);
    }
    catch (err) { res.status(404).json({ noprofiles: 'Error While Adding a Education, Try Again !!' }); }
});

// @route	Delete /profile/education/:id
// @desc	delete the experience of the user
// @access	Private
router.delete('/education/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        let profile = await Profile.findOne({ user: req.user.id });
        let removeIndex = profile.education.map(exp => exp.id).indexOf(req.params.id);//mapping the index of data
        profile.education.splice(removeIndex, 1);
        await profile.save();
        res.json(profile);
    }
    catch (err) { res.status(404).json({ experience: 'Error While Deleting a Education, Try Again !!' }); }
})

module.exports = router;