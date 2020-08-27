const express = require('express');

const router = express.Router();
const userController = require('../controllers/userController');
const joiSchemaValidation = require('../middlewares/joiSchemaValidation');
const userSchema = require('../apiSchema/userSchema');
const tokenValidation = require('../middlewares/tokenValidation');

// Create user
router.post('/create', joiSchemaValidation.validateBody(userSchema.create), userController.create);

// Send email again
router.post('/send-mail', tokenValidation.validateToken, userController.sendMail);

// Confirmating email
router.get('/confirmation/:token', tokenValidation.validateMail, userController.validateMailGet);

router.post('/confirmation/:token', userController.validateMailPost);

// Log in
router.post('/login', joiSchemaValidation.validateBody(userSchema.login), userController.login);

// Get all users
router.get('/getusers', tokenValidation.validateToken, userController.getUsers);

// Get one user
router.get('/getuser/:email', tokenValidation.validateToken, userController.getOneUser);

// Save salary
router.post('/savesalary', tokenValidation.validateToken, userController.saveSalary);

// Save role
router.post('/saverole', tokenValidation.validateToken, userController.saveRole);

// Delete user
router.post('/delete', tokenValidation.validateToken, userController.deleteUser);


module.exports = router;