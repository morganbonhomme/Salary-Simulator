const firestore = require('../controllers/firestore');
const constants = require('../constants/constants');
const location = require('../location.json')

module.exports.getPrimaryParameters = async (req, res, next) => {
  let response = { ...constants.defaultServerResponse };
  try { 
    const job = await firestore.getJobs();
    const seniority = await firestore.getSeniorities();
    const master = await firestore.getMasters();
    const contract = await firestore.getContracts();
    const country = location;
    const responseFromService = { job, seniority, master, contract, country };
    response.status = 200;
    response.message = 'Primary Parameters fetched with success'
    response.body = responseFromService;
  } catch (error) {
    console.log('Something went wrong: Controller: getPrimaryParameters', error);
    response.message = error.message;
  }
  return res.status(response.status).send(response);
}

