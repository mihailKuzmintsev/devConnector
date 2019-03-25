const validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateEducationInput(data) {
  let errors = {};

  let { school, degree, fieldofstudy, from } = data;

  school = isEmpty(school) ? '' : school;
  degree = isEmpty(degree) ? '' : degree;
  fieldofstudy = isEmpty(fieldofstudy) ? '' : fieldofstudy;
  from = isEmpty(from) ? '' : from;

  if (validator.isEmpty(school)) {
    errors.school = 'School field is required';
  }

  if (validator.isEmpty(degree)) {
    errors.degree = 'Degree field is required';
  }

  if (validator.isEmpty(fieldofstudy)) {
    errors.fieldofstudy = 'Fieldofstudy field is required';
  }

  if (validator.isEmpty(from)) {
    errors.from = 'From date field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
