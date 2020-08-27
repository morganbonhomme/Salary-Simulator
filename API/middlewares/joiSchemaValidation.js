const Joi = require('@hapi/joi');

const validateObjectSchema = (data, schema) => {
  const result = schema.validate(data);
  if (result.error) {
    const errorDetail = {
      error: result.error.details[0].message,
      path: result.error.details[0].path
    }
    return errorDetail;
  }
  return null;
}

module.exports.validateBody = (schema) => {
  let response = {
    status: 400,
    message: '',
    body: {},
  };
  return (req, res, next) => {
    const error = validateObjectSchema(req.body, schema);
    if (error) {
      response.body = error;
      response.message = "Invalid field";
      return res.status(response.status).send(response);
    }
    return next();
  }
}