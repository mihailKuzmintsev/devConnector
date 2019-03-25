const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Load input validation
const validationProfileInput = require('../../validation/profile');
const validationExperienceInput = require('../../validation/experience');
const validationEducationInput = require('../../validation/education');

// Load Profile Model
const Profile = require('../../models/Profile');

// Load User model
const User = require('../../models/User');

// @route   GET api/profile/test
// @desc    Tests profile route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Profile Works!' }));

// @route   GET api/profile/handle/:handle
// @desc    Get user profile by handle
// @access  Public
router.get('/handle/:handle', (req, res) => {
  errors = {};
  Profile.findOne({ handle: req.params.handle })
    .populate('user', ['name', 'avatar'])
    .then((profile) => {
      if (!profile) {
        errors.noprofile = 'There is no profile for this user';
        return res.status(404).json(errors);
      }

      res.json(profile);
    })
    .catch((err) =>
      res.status(404).json({ profile: 'There is no profile for this user' }),
    );
});

// @route   GET api/profile/user/:user_id
// @desc    Get user profile by userId
// @access  Public
router.get('/user/:user_id', (req, res) => {
  errors = {};
  Profile.findOne({ user: req.params.user_id })
    .populate('user', ['name', 'avatar'])
    .then((profile) => {
      if (!profile) {
        errors.noprofile = 'There is no profile for this user';
        return res.status(404).json(errors);
      }

      res.json(profile);
    })
    .catch((err) =>
      res.status(404).json({ profile: 'There is no profile for this user' }),
    );
});

// @route   GET api/profile/all
// @desc    Get all user profile
// @access  Public
router.get('/all', (req, res) => {
  errors = {};
  Profile.find()
    .populate('user', ['name', 'avatar'])
    .then((profiles) => {
      if (!profiles) {
        errors.noprofile = 'There are no profile';
        return res.status(404).json(errors);
      }

      res.json(profiles);
    })
    .catch((err) => res.status(404).json(err));
});

// @route   GET api/profile
// @desc    Get profile current user
// @access  Private
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.user.id })
      .populate('user', ['name', 'avatar'])
      .then((profile) => {
        if (!profile) {
          errors.noprofile = 'There is no profile for this user';
          return res.status(404).json(errors);
        }

        return res.json(profile);
      });
  },
);

// @route   POST api/profile
// @desc    Create or edit user profile
// @access  Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    // Check validation
    const { errors, isValid } = validationProfileInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }

    // Get fields
    const {
      handle,
      company,
      website,
      location,
      bio,
      status,
      githubusername,
      skills,
      youtube,
      vk,
      instagram,
      twitter,
      facebook,
    } = req.body;

    const profileFields = {};
    profileFields.user = req.user.id;
    if (handle) profileFields.handle = handle;
    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;
    if (githubusername) profileFields.githubusername = githubusername;
    // Skills - split into array
    if (typeof skills !== 'undefined') profileFields.skills = skills.split(',');

    // Social
    profileFields.social = {};
    if (youtube) profileFields.social.youtube = youtube;
    if (vk) profileFields.social.vk = vk;
    if (instagram) profileFields.social.instagram = instagram;
    if (twitter) profileFields.social.twitter = twitter;
    if (facebook) profileFields.social.facebook = facebook;

    Profile.findOne({ user: req.user.id }).then((profile) => {
      if (profile) {
        // Update profile
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true },
        ).then((profile) => res.json(profile));
      } else {
        // Create

        // Check if handle exists
        Profile.findOne({ handle: profileFields.handle }).then((profile) => {
          if (profile) {
            errors.handle = 'That handle already exists';
            return res.status(400).json(errors);
          }

          // Save Profile
          new Profile(profileFields)
            .save()
            .then((profile) => res.json(profile));
        });
      }
    });
  },
);

// @route   POST api/profile/experience
// @desc    Add user experience data
// @access  Private
router.post(
  '/experience',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    // Validation check
    const { errors, isValid } = validationExperienceInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    } = req.body;

    const newExperience = {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    };

    Profile.findOne({ user: req.user.id }).then((profile) => {
      // Add to exparray
      profile.experience.unshift(newExperience);

      profile.save().then((profile) => res.json(profile));
    });
  },
);

// @route   POST api/profile/education
// @desc    Add user education data
// @access  Private
router.post(
  '/education',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    // Validation check
    const { errors, isValid } = validationEducationInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
    } = req.body;

    const newEducation = {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
    };

    Profile.findOne({ user: req.user.id }).then((profile) => {
      // Add to exparray
      profile.education.unshift(newEducation);

      profile.save().then((profile) => res.json(profile));
    });
  },
);

// @route   DELETE api/profile/education/:edu_id
// @desc    Delete education from user profile
// @access  Private
router.delete(
  '/education/:edu_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then((profile) => {
      // Get delete index
      const deleteIndex = profile.education
        .map((item) => item.id)
        .indexOf(req.params.edu_id);

      // Splice out of array
      profile.education.splice(deleteIndex, 1);

      // Save
      profile.save().then((profile) => res.json(profile));
    });
  },
);

// @route   DELETE api/profile/experience/:exp_id
// @desc    Delete experience from user profile
// @access  Private
router.delete(
  '/experience/:exp_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then((profile) => {
      // Get delete index
      const deleteIndex = profile.experience
        .map((item) => item.id)
        .indexOf(req.params.exp_id);

      // Splice out of array
      profile.experience.splice(deleteIndex, 1);

      // Save
      profile.save().then((profile) => res.json(profile));
    });
  },
);

// @route   DELETE api/profile
// @desc    Delete profile and user
// @access  Private
router.delete(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    // Delete profile
    Profile.findOneAndRemove({ user: req.user.id }).then(() => {
      // Delete User
      User.findByIdAndRemove({ _id: req.user.id }).then(() => {
        return res.json({ success: true });
      });
    });
  },
);

module.exports = router;
