/* eslint-env es6 */
const nodemailer = require('nodemailer');

const createTransporter=()=> {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    // secure:false, // use SSL
    auth: {
        user: process.env.EMAIL_HOST_USER,
        pass: process.env.EMAIL_HOST_PASSWORD
    }
    
  });
}

module.exports = { createTransporter };