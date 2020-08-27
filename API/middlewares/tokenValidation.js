const jwt = require('jsonwebtoken');

module.exports.validateToken = (req, res, next) => {
  const response = {
    status: 400,
    message: '',
    body: {},
  };
  try {
    if (!req.headers.authorization) {
      throw new Error ('Token missing from header');
    }
    const token = req.headers.authorization.split('Bearer')[1].trim();
    jwt.verify(token,process.env.JWT_SECRET_KEY);
    return next();
  } catch (error) {
    response.status = 401;
    response.message = error.message;
  }
  return res.status(response.status).send(response);
}

module.exports.validateMail = (req, res, next) => {
  const response = {
    status: 400,
    message: '',
    body: {},
  };
  try {
    if(!req.params.token) {
      throw new Error ('Token missing');
    }
    const decoded = jwt.verify(req.params.token, process.env.JWT_SECRET_MAIL);
    res.locals.userMail = decoded.id
    return next();
  } catch (error) {
    response.status = 401;
    response.message = error.message;
  }
  return res.status(response.status).send(response);
}