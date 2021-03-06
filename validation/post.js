const validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validatePostInput(data) {
  let errors = {};

  const text = isEmpty(data.text) ? '' : data.text;

  if (!validator.isLength(text, { min: 10, max: 300 })) {
    errors.text = 'Text must between 10 and 300 characters';
  }
  if (validator.isEmpty(text)) {
    errors.text = 'Text field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
