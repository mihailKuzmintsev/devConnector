const validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateProfileInput(data) {
  let errors = {};

  let {
    handle,
    status,
    skills,
    youtube,
    twitter,
    instagram,
    vk,
    facebook,
    website,
  } = data;

  handle = isEmpty(handle) ? '' : handle;
  status = isEmpty(status) ? '' : status;
  skills = isEmpty(skills) ? '' : skills;

  if (!validator.isLength(handle, { min: 2, max: 40 })) {
    errors.handle = 'Profile handle must between 2 and 40 characters';
  }

  if (validator.isEmpty(handle)) {
    errors.handle = 'Profile handle is required';
  }

  if (validator.isEmpty(status)) {
    errors.status = 'Status field is required';
  }

  if (validator.isEmpty(skills)) {
    errors.skills = 'Skills field is required';
  }

  if (!isEmpty(website)) {
    if (!validator.isURL(website)) {
      errors.website = 'Not valid URL';
    }
  }

  if (!isEmpty(youtube)) {
    if (!validator.isURL(youtube)) {
      errors.youtube = 'Not valid URL';
    }
  }

  if (!isEmpty(twitter)) {
    if (!validator.isURL(twitter)) {
      errors.twitter = 'Not valid URL';
    }
  }

  if (!isEmpty(vk)) {
    if (!validator.isURL(vk)) {
      errors.vk = 'Not valid URL';
    }
  }

  if (!isEmpty(instagram)) {
    if (!validator.isURL(instagram)) {
      errors.instagram = 'Not valid URL';
    }
  }

  if (!isEmpty(facebook)) {
    if (!validator.isURL(facebook)) {
      errors.facebook = 'Not valid URL';
    }
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
