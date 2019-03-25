const validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateLoginInput(data) {
  let errors = {};

  let { email, password } = data;

  email = isEmpty(email) ? '' : email;
  password = isEmpty(password) ? '' : password;

  if (validator.isEmpty(password)) {
    errors.password = 'Password field is required';
  }

  if (!validator.isEmail(email)) {
    errors.email = 'Email is invalid';
  }

  if (validator.isEmpty(email)) {
    errors.email = 'Email field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
