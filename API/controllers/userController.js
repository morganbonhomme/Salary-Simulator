const userService = require('../services/userService')

module.exports.create = async (req, res, next) => {
  const response = {
    status: 400,
    message: '',
    body: {},
  };
  try {
    const responseFromService = await userService.create(req.body);
    response.status = 200;
    response.message = 'User created successfully';
    response.body = responseFromService;
  } catch (err) {
    console.log('Something went wrong: Controller: Create User', err);
    response.message = err.message;
  }
  return res.status(response.status).send(response);
};

module.exports.sendMail = async (req, res, next) => {
  const response = {
    status: 400,
    message: '',
    body: {},
  };
  try {
    const responseFromService = await userService.sendMail(req.body.email);
    response.status = 200;
    response.message = 'Send mail successfully';
    response.body = responseFromService;
  } catch (err) {
    console.log('Something went wrong: Controller: Send mail', err);
    response.message = err.message;
  }
  return res.status(response.status).send(response);
};

module.exports.login = async (req, res, next) => {
  const response = {
    status: 400,
    message: '',
    body: {},
  };
  try {
    const responseFromService = await userService.login(req.body);
    response.status = 200;
    response.message = 'Login success';
    response.body = responseFromService;
  } catch (err) {
    console.log('Something went wrong: Controller: Login', err);
    response.message = err.message;
  }
  return res.status(response.status).send(response);
};

module.exports.validateMailGet = async (req, res, next) => {
  const response = {
    status: 400,
    message: '',
    body: {},
  };
  try {
    const responseFromService = await userService.validateMailGet(req.body, res);
    response.status = 200;
    response.message = 'Validate Mail Get success';
    response.body = responseFromService;
    response.email = res.locals.userMail;
  } catch (err) {
    console.log('Something went wrong: Controller: Validate mail Get', err);
    response.message = err.message;
  }
  return res.status(response.status).send(response);
};

module.exports.validateMailPost = async (req, res, next) => {
  const response = {
    status: 400,
    message: '',
    body: {},
  };
  try {
    const responseFromService = await userService.validateMailPost(req, res);
    response.status = 200;
    response.message = 'Validate Mail Post success';
    response.body = responseFromService;
  } catch (err) {
    console.log('Something went wrong: Controller: Validate mail Post', err);
    response.message = err.message;
  }
  return res.status(response.status).send(response);
};

module.exports.getUsers = async (req, res, next) => {
  const response = {
    status: 400,
    message: '',
    body: {},
  };
  try {
    const responseFromService = await userService.getUsers();
    response.status = 200;
    response.message = 'Get users success';
    response.body = responseFromService;
  } catch (err) {
    console.log('Something went wrong: Controller: Get users', err);
    response.message = err.message;
  }
  return res.status(response.status).send(response);
};

module.exports.getOneUser = async (req, res, next) => {
  const response = {
    status: 400,
    message: '',
    body: {},
  };
  try {
    console.log('test',req.params)
    const responseFromService = await userService.getOneUser(req.params.email);
    response.status = 200;
    response.message = 'Get one user success';
    response.body = responseFromService;
  } catch (err) {
    console.log('Something went wrong: Controller: Get one user', err);
    response.message = err.message;
  }
  return res.status(response.status).send(response);
};

module.exports.saveSalary = async (req, res, next) => {
  const response = {
    status: 400,
    message: '',
    body: {},
  };
  try {
    const responseFromService = await userService.saveSalary(req.body);
    response.status = 200;
    response.message = 'Save Salary success';
    response.body = responseFromService;
  } catch (err) {
    console.log('Something went wrong: Controller: Save Salary ', err);
    response.message = err.message;
  }
  return res.status(response.status).send(response);
};

module.exports.saveRole = async (req, res, next) => {
  const response = {
    status: 400,
    message: '',
    body: {},
  };
  try {
    const responseFromService = await userService.saveRole(req.body);
    response.status = 200;
    response.message = 'Save Role success';
    response.body = responseFromService;
  } catch (err) {
    console.log('Something went wrong: Controller: Save Role ', err);
    response.message = err.message;
  }
  return res.status(response.status).send(response);
};

module.exports.deleteUser = async (req, res, next) => {
  const response = {
    status: 400,
    message: '',
    body: {},
  };
  try {
    const responseFromService = await userService.deleteUser(req.body);
    response.status = 200;
    response.message = 'Delete user success';
    response.body = responseFromService;
  } catch (err) {
    console.log('Something went wrong: Controller: Delete user ', err);
    response.message = err.message;
  }
  return res.status(response.status).send(response);
}