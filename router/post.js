const express = require('express'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    router = express.Router();

//model
const Profile = require('../model/profile'),
    Post = require('../model/post'),
    User = require('../model/user');

//Validation file
const validatePostInput = require('../validation/post');
//routes

// @route	Post /post
// @desc	Adding Post of the user
// @access	Private
router.post('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        let { err, isValid } = validatePostInput(req.body);
        if (!isValid) return res.status(400).json(err); //text validation 
        let { text, name, avatar } = req.body, { id } = req.user;
        let newPost = await Post.create({ text, name, avatar, user: id });
        res.json(newPost);
    }
    catch (err) { res.status(400).json('Failed to Post, Try Again !!'); }

});

// @route	Get /post
// @desc    Get all the post
// @access	Public
router.get('/', async (req, res) => {
    try {
        let posts = await Post.find().sort({ date: -1 });
        res.json(posts);
    }
    catch (err) { res.status(400).json({ post: "Error while Fetching all the post" }); }
});

// @route	Get /post/:postId
// @desc    Get single the post
// @access	Public
router.get('/:id', async (req, res) => {
    try {
        let post = await Post.findOne({ _id: req.params.id });
        res.json(post);
    }
    catch (err) { res.status(404).json({ post: "Post not found" }); }
});

// @route	Delete /post/:postId
// @desc    Delete the post
// @access	Private
router.delete('/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        let profile = await Profile.findOne({ user: req.user.id });
        let post = await Post.findById(req.params.id);
        if (post.user.toString() != req.user.id) return res.status(401).json({ post: "Ypu are Unauthurised to delete this post" });
        post.remove();
        res.json({ success: "Deleted Successfully" });
    }
    catch (err) { res.status(404).json({ post: "Can't Delete Post,some error occured" }); }
});

// @route	Post /post/like/:postId
// @desc    like the post
// @access	Private
router.post('/like/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        let profile = await Profile.findOne({ user: req.user.id });
        let post = await Post.findById(req.params.id);
        if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0)
            return res.status(400).json({ alreadyliked: 'You already Liked this Post' });
        post.likes.unshift({ user: req.user.id });
        let newPost = await post.save();
        res.json(newPost);
    }
    catch (err) { res.status(404).json({ post: "Failed to like, Try Again !!!" }); }
});

// @route	 Post /post/unlike/:postId
// @desc    Unlike the post
// @access	Private
router.post('/unlike/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        let profile = await Profile.findOne({ user: req.user.id });
        let post = await Post.findById(req.params.id);
        if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0)
            return res.status(400).json({ notliked: 'You have not yet liked this post' });
        let removeIndex = post.likes.map(item => item.id).indexOf(req.params.id);//mapping the index of data
        post.likes.splice(removeIndex, 1);
        let newpost = await post.save();
        res.json(newpost);
    }
    catch (err) { res.status(404).json({ post: "Failed to Unlike, Try Again !!!" }); }
});

// @route	Post /post/comment/:postId
// @desc	Add a Comment to the post
// @access	Private
router.post('/comment/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        let { err, isValid } = validatePostInput(req.body);
        if (!isValid) return res.status(400).json(err); //text validation 
        let post = await Post.findById(req.params.id);
        let { name, text, avatar } = req.body, { id } = req.user;
        post.comments.unshift({ name, text, avatar, user: id });
        let newPost = await post.save();
        res.json(newPost);
    }
    catch (err) { res.status(400).json({ comment: 'Failed to add Comment, Try again !!' }); }
});

// @route	Delete /post/comment/:postId/:commentId
// @desc	Delete the comment
// @access	Private
router.delete('/comment/:postId/:commentId', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        let post = await Post.findById(req.params.postId);
        if (post.comments.filter(comment => comment._id.toString() === req.params.commentId).length === 0)
            return res.status(404).json({ comment: "Comment not found " });
        let removeIndex = post.comments.map(item => item.id).indexOf(req.params.commentId);
        post.comments.splice(removeIndex, 1);
        let newPost = await post.save();
        res.json(newPost);
    }
    catch (err) { }
})
module.exports = router;