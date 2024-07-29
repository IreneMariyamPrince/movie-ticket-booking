const { parsePhoneNumberFromString } = require('libphonenumber-js');
const crypto = require('crypto');
const twilio = require('twilio');
const jwt = require('jsonwebtoken');
const OtpModel = require('../models/Otp');
const User = require('../models/User');

require('dotenv').config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

const client = new twilio(accountSid, authToken);

// Generate and send OTP
exports.sendOtp = async (req, res) => {
    let { phoneNumber } = req.body;

    // Validate and format phone number
    const phoneNumberObj = parsePhoneNumberFromString(phoneNumber);
    if (!phoneNumberObj || !phoneNumberObj.isValid()) {
        return res.status(400).json({ error: 'Invalid phone number' });
    }
    phoneNumber = phoneNumberObj.format('E.164'); // Format to E.164

    console.log("Formatted Phone Number:", phoneNumber); // Log the formatted phone number

    // Generate a 6-digit OTP
    const otp = crypto.randomInt(100000, 999999).toString();

    try {
        // Save OTP in the database
        const otpDoc = new OtpModel({ phoneNumber, otp });
        await otpDoc.save();

        // Send OTP via SMS
        const message = await client.messages.create({
            body: `Your OTP is ${otp}`,
            from: twilioPhoneNumber,
            to: phoneNumber
        });

        console.log("Message SID:", message.sid); // Log message SID

        res.status(200).json({ message: 'OTP sent successfully' });
    } catch (error) {
        console.error('Error sending OTP:', error.message, error.code, error.moreInfo);
        res.status(500).json({ error: 'Error sending OTP' });
    }
};

exports.verifyOtp = async (req, res) => {
    const { phoneNumber, otp, userRole, userStatus } = req.body;
  
    try {
      // Validate input
      if (!phoneNumber || !otp || !userRole || !userStatus) {
        return res.status(400).json({ error: 'Missing required fields' });
      }
  
      const otpDoc = await OtpModel.findOne({ phoneNumber, otp });
  
      if (!otpDoc) {
        return res.status(400).json({ error: 'Invalid or expired OTP' });
      }
  
      let user = await User.findOne({ phoneNumber });
  
      if (!user) {
        user = new User({
            PhoneNumber: phoneNumber,
            UserRole: userRole, // Ensure correct field names
            UserStatus: userStatus // Ensure correct field names
          });
        await user.save();
      } else {
        // Update existing user
        user.UserRole = userRole; // Ensure correct field names
        user.UserStatus = userStatus; // Ensure correct field names
        await user.save();
      }
  
      // Generate a token
      const token = jwt.sign(
        {
          id: user.UserId,
          phoneNumber: user.PhoneNumber,
          userRole: user.UserRole,
          userStatus: user.UserStatus
        },
        process.env.JWT_SECRET,
        { expiresIn: '1h' } // Adjust the token expiration time as necessary
      );
  
      res.status(200).json({ message: 'OTP verified successfully', token, user });
    } catch (error) {
      console.error('Error verifying OTP:', error.message);
      res.status(500).json({ error: 'Error verifying OTP' });
    }
  };
  

