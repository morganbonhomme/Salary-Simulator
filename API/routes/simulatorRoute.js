const express = require('express');

const router = express.Router();
const simulatorController = require('../controllers/simulatorController')
const tokenValidation = require('../middlewares/tokenValidation')

// To render the primary parameters in the form (job, seniority, master, countries, contract)
// router.get('/', tokenValidation.validateToken, simulatorController.getPrimaryParameters);

router.get('/', simulatorController.getPrimaryParameters);

module.exports = router;