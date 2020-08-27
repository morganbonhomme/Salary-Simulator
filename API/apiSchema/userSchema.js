const Joi = require('@hapi/joi');

module.exports.create = Joi.object({
  firstName: Joi.string()
    .required(),
  lastName: Joi.string()
    .required(),
  role: Joi.string(),
  password: Joi.string(),
  email: Joi.string()
    .email()
    .lowercase(),
  salary: Joi.number(),
});

module.exports.login = Joi.object({
  password: Joi.string()
    .required(),
  email: Joi.string()
    .email()
    .lowercase(),
});