const express = require('express');
const router = express.Router();
const passport = require('passport');

// Post model
const Post = require('../../models/Post');

// Profile model
const Profile = require('../../models/Profile');

// Validation
const validatePostInput = require('../../validation/post');

// @route   GET api/posts/test
// @desc    Tests posts route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Posts Works!' }));

// @route   POST api/posts
// @desc    Create post
// @access  Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    //Validation check
    const { errors, isValid } = validatePostInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const newPost = new Post({
      user: req.user.id,
      text: req.body.text,
      avatar: req.body.avatar,
      name: req.body.name,
    });

    newPost.save().then((post) => res.json(post));
  },
);

// @route   GET api/posts
// @desc    GET posts
// @access  Public
router.get('/', (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then((posts) => res.json(posts))
    .catch((err) => res.status(404).json({ nopostfound: 'No posts found' }));
});

// @route   GET api/posts/:id
// @desc    GET post
// @access  Public
router.get('/:id', (req, res) => {
  Post.findById(req.params.id)
    .then((post) => res.json(post))
    .catch((err) =>
      res.status(404).json({ nopostfound: 'No post found with that ID' }),
    );
});

// @route   DELETE api/posts/:id
// @desc    Delete post by ID
// @access  Private
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(() => {
      Post.findById(req.params.id)
        .then((post) => {
          // Check for post owner
          if (post.user.toString() !== req.user.id) {
            return res
              .status(401)
              .json({ noauthorized: 'User not authorized' });
          }
          // Delete post
          post.remove().then(() => res.json({ success: true }));
        })
        .catch(() =>
          res.status(404).json({ nopostfound: 'No post found with that ID' }),
        );
    });
  },
);

// @route   POST api/posts/like/:id
// @desc    Like post
// @access  Private
router.post(
  '/like/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then((profile) => {
      Post.findById(req.params.id)
        .then((post) => {
          //Already liked check
          if (
            post.likes.filter((like) => like.user.toString() === req.user.id)
              .length > 0
          ) {
            return res
              .status(404)
              .json({ alreadyliked: 'You have already liked this post' });
          }

          // Like post
          post.likes.unshift({ user: req.user.id });
          //Save post
          post.save().then((post) => res.json(post));
        })
        .catch(() =>
          res.status(404).json({ nopostfound: 'No post found with that ID' }),
        );
    });
  },
);

// @route   POST api/posts/unlike/:id
// @desc    Unlike post
// @access  Private
router.post(
  '/unlike/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then((profile) => {
      Post.findById(req.params.id)
        .then((post) => {
          //No liked check
          if (
            post.likes.filter((like) => like.user.toString() === req.user.id)
              .length === 0
          ) {
            return res
              .status(404)
              .json({ noliked: 'This user not yet liked this post' });
          }

          // Get remove index
          const removeIndex = post.likes
            .map((like) => like.user)
            .indexOf(req.user.id);
          //Remove like
          post.likes.splice(removeIndex, 1);
          // Save post
          post.save().then((post) => res.json(post));
        })
        .catch(() =>
          res.status(404).json({ nopostfound: 'No post found with that ID' }),
        );
    });
  },
);

// @route   POST api/posts/comments/:id
// @desc    Add comment
// @access  Private
router.post(
  '/comments/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    //Validation check
    const { errors, isValid } = validatePostInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }

    Post.findById(req.params.id)
      .then((post) => {
        const newComment = {
          user: req.user.id,
          text: req.body.text,
          name: req.body.name,
          avatar: req.body.avatar,
        };
        // Add comment to array
        post.comments.unshift(newComment);
        // Save
        post.save().then((post) => res.json(post));
      })

      .catch(() =>
        res.status(404).json({ nopostfound: 'No post found with that ID' }),
      );
  },
);

// @route   DELETE api/posts/comments/:id/:comment_id
// @desc    Delete comment
// @access  Private
router.delete(
  '/comments/:id/:comment_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Post.findById(req.params.id)
      .then((post) => {
        //Check to see if comment exists
        if (
          post.comments.filter(
            (comment) => comment._id.toString() === req.params.comment_id,
          ).length === 0
        ) {
          return res
            .status(404)
            .json({ commentnotexists: 'Comment does not exists' });
        }

        // Get remove index
        const removeIndex = post.comments
          .map((comment) => comment._id.toString())
          .indexOf(req.params.comment_id);
        //Remove comment from array
        post.comments.splice(removeIndex, 1);
        // Save post
        post.save().then((post) => res.json(post));
      })
      .catch(() =>
        res.status(404).json({ nopostfound: 'No post found with that ID' }),
      );
  },
);

module.exports = router;
