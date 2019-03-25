const validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateExperienceInput(data) {
  let errors = {};

  let { title, company, from } = data;

  title = isEmpty(title) ? '' : title;
  company = isEmpty(company) ? '' : company;
  from = isEmpty(from) ? '' : from;

  if (validator.isEmpty(title)) {
    errors.title = 'Job title is required';
  }

  if (validator.isEmpty(company)) {
    errors.company = 'Company  field is required';
  }

  if (validator.isEmpty(from)) {
    errors.from = 'From date field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
