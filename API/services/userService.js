const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const key = require('../Dashboard Demo-a062cf793bfe.json')

const Firestore = require('@google-cloud/firestore');
const db = new Firestore({
  projectId: 'modular-source-287611',
  keyFilename: './Dashboard Demo-a062cf793bfe.json',
});

let transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.MAIL,
    pass: process.env.PASSWORD,
}
});

module.exports.create = async (data) => {
  try {
    const newUser = { ...data, 
      active: false, 
      job: '',
      masterRange: '',
      masterValue: 0,
      seniority: '',
      contract: '',
      country: '',
      city: '',
      salary: 0,
      };

    const usersRef = db.collection('users');

    // Check if email is already taken

    const user = await usersRef.where('email', '==', data.email).get();
    if (!user.empty) {
      throw new Error('User already created')
    }  

    console.log('about to send email')
    // Send mail confirmation
    jwt.sign(
      { id: data.email }, 
      process.env.JWT_SECRET_MAIL, 
      { expiresIn: '1d' }, 
      (error, emailToken) => {

        if (error) {
          console.log(error)
          throw new Error(error)
        }
        const url = `https://modular-source-287611.nw.r.appspot.com/user/confirmation/${emailToken}`;
       
        try {
          transporter.sendMail({
            to: data.email,
            subject: "Dashboard - Email confirmation", 
            html: `Click here to activate your account : <a href="${url}">${url}</a>`,
          });
        } catch (error) {
          console.log(error)
          throw new Error(error)
        }
        
      }
    );

    // Save new user
    const res = await usersRef.doc(data.email).set(newUser);
    return res;

  } catch (error) {
    throw new Error(error)
  }
}

module.exports.sendMail = async (email) => {
  try {
    // Send mail confirmation
    jwt.sign(
      { id: email }, 
      process.env.JWT_SECRET_MAIL, 
      { expiresIn: '1d' }, 
      (error, emailToken) => {

        if (error) {
          throw new Error(error)
        }
        const url = `https://modular-source-287611.nw.r.appspot.com/user/confirmation/${emailToken}`;
        
        let info = transporter.sendMail({
          from: key.client_email,
          to: email,
          subject: "Dashboard - Email confirmation", 
          html: `Click here to activate your account : <a href="${url}">${url}</a>`,
        });
      }
    );
  } catch (error) {
    throw new Error(error)
  }
}

module.exports.validateMailGet = async (req, res) => {
  try {
    const usersRef = db.collection('users').doc(res.locals.userMail);
    await usersRef.update({ active : true });
  } catch (error) {
    throw new Error(error)
  }
}

module.exports.validateMailPost = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    const usersRef = db.collection('users').doc(req.body.email);
      await usersRef.update({ password : hashedPassword });
    } catch (error) {
      throw new Error(error)
    }
  }

module.exports.login = async (data) => {
  try {
    // Check if the user exists in database
    const usersRef = db.collection('users');
    const user = await usersRef.doc(data.email).get();
    if (!user.exists) {
      throw new Error('Email not found')
    } 

    // Check password 
    const isValid = await bcrypt.compare(data.password, user.data().password);
    if (!isValid) {
      throw new Error('Incorrect password')
    }

    // Check activity
    const isActive = user.data().active;
    if (!isActive) {
      throw new Error('Please activate your account')
    }

    // Create token
    const token = jwt.sign(({ id: user.data().email }), process.env.JWT_SECRET_KEY)
    return { token, role: user.data().role }

    // const check

  } catch (error) {
    throw new Error (error);
  }
}

module.exports.getUsers = async () => {
  try {
    let userList = [];
    const usersRef = db.collection('users');
    const data = await usersRef.get();
    data.forEach(doc => {
      const user = {
        email: doc.id,
        active: doc.data()['active'],
        firstName: doc.data()['firstName'],
        lastName: doc.data()['lastName'],
        role: doc.data()['role'],
        salary: doc.data()['salary'],
        job: doc.data()['job'],
        masterRange: doc.data()['masterRange'],
        masterValue: doc.data()['masterValue'],
        seniority: doc.data()['seniority'],
        contract: doc.data()['contract'],
        country: doc.data()['country'],
        city: doc.data()['city'],
      }
      userList.push(user);
    })
    return userList
  } catch (error) {
    throw new Error(error)
  }
}

module.exports.getOneUser = async (userID) => {
  try {
    const usersRef = db.collection('users').doc(userID);
    const doc = await usersRef.get();
    const user = {
      firstName: doc.data()['firstName'],
      lastName: doc.data()['lastName'],
      role: doc.data()['role'],
      salary: doc.data()['salary'],
      job: doc.data()['job'],
      masterRange: doc.data()['masterRange'],
      masterValue: doc.data()['masterValue'],
      seniority: doc.data()['seniority'],
      contract: doc.data()['contract'],
      country: doc.data()['country'],
      city: doc.data()['city'],
      }
    return user;
  } catch (error) {
    throw new Error(error)
  }
}

module.exports.saveSalary = async (body) => {
  try {
    const usersRef = db.collection('users');
    const updateUser = {
      salary: body.salary,
      job: body.factors.job,
      masterRange: body.factors.masterRange,
      masterValue: body.factors.masterValue,
      seniority: body.factors.seniority,
      contract: body.factors.contract,
      country: body.factors.country,
      city: body.factors.city,
    }
    await usersRef.doc(body.userID).update(updateUser)
  } catch (error) {
    throw new Error(error)
  }
}

module.exports.saveRole = async (body) => {
  try {
    const usersRef = db.collection('users');
    const updateUser = {
      role: body.role,
    }
    await usersRef.doc(body.userID).update(updateUser)
  } catch (error) {
    throw new Error(error)
  }
}

module.exports.deleteUser = async (body) => {
  try {
    await db.collection('users').doc(body.userID).delete()
  } catch (error) {
    throw new Error(error)
  }
}


