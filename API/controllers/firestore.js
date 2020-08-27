const Firestore = require('@google-cloud/firestore');
const db = new Firestore({
  projectId: 'modular-source-287611',
  keyFilename: './Dashboard Demo-a062cf793bfe.json',
});


// Get all jobs  
module.exports.getJobs = async () => {
  let jobs = [];
  try {
    const data = await db.collection('base').get();
    data.forEach(doc => {
      const job = {
        name: doc.id,
        factor: doc.data()['salary']
      }
      jobs.push(job);
    })
    return jobs
  } catch (err) {
    console.log(err)
    throw new Error('Something went wrong: Firestore: getJobs', err)
  }
}

// Get seniority 
module.exports.getSeniorities = async () => {
  let seniorities = [];
  try {
    const data = await db.collection('seniority').orderBy('index').get();
    data.forEach(doc => {
      const seniority = {
        name: doc.id,
        factor: doc.data()['factor'],
      }
      seniorities.push(seniority);
    })
    return seniorities
  } catch (err) {
    throw new Error('Something went wrong: Firestore: getSeniorities')
  }
}

// Get master 
module.exports.getMasters = async () => {
  let masterlevels = [];
  try {
    const data = await db.collection('master').orderBy('index').get();
    data.forEach(doc => {
      const master = {
        name: doc.id,
        factor: doc.data()['factor'],
      }
      masterlevels.push(master);
    })
    return masterlevels
  } catch (err) {
    throw new Error('Something went wrong: Firestore: getMasters')
  }
}

// Get contracts 
module.exports.getContracts = async () => {
  let contracts = [];
  try {
    const data = await db.collection('contract').orderBy('index').get();
    data.forEach(doc => {
      const contract = {
        name: doc.id,
        factor: doc.data()['factor']
      }
      contracts.push(contract);
    })
    return contracts
  } catch (err) {
    throw new Error('Something went wrong: Firestore: getContracts')
  }
}
