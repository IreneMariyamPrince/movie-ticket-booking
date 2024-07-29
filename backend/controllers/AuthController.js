// controllers/authController.js
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { createTransporter } = require('../transporter/emailService');

exports.adminLogin = async (req, res) => {
  const { Email, Password } = req.body;

  // Validate input
  if (!Email || !Password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    // Check if user exists
    const user = await User.findOne({ Email: Email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(Password, user.Password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // Check if user role is 'admin'
    if (user.UserRole !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user.UserId, role: user.UserRole }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Respond with token and redirectTo
    return res.status(200).json({ token, redirectTo: "/admin/dashboard" });
    
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

exports.forgotPassword = async (req, res) => {
  const { Email } = req.body;

  if (!Email) {
    return res.status(400).json({ error: 'Email Address Is Required' });
  }

  try {
    const user = await User.findOne({ Email: Email });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const token = jwt.sign({ Email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    const resetPasswordUrl = `${process.env.BASE_FRONTEND_URL}/resetPassword?token=${token}`;

    const transporter = createTransporter();

    // Send email
    await transporter.sendMail({
      from: process.env.EMAIL_SENDER,
      to: Email,
      subject: 'Password Reset Request',
      html: `
        You are receiving this because you (or someone else) have requested the reset of the password for your account.<br/><br/>
        Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:<br/>
        <a href="${resetPasswordUrl}" target="_blank">Reset Password</a><br/><br/>
        If you did not request this, please ignore this email and your password will remain unchanged.
      `,
    });

    return res.status(200).json({ success: 'Password reset email sent successfully' });

  } catch (error) {
    console.error('Failed to send email:', error);
    return res.status(500).json({ error: 'Failed to send email' });
  }
};

exports.adminForgotPassword = async (req, res) => {

  const { Email } = req.body;

  if (!Email) {
    return res.status(400).json({ error: 'Email Address Is Required' });
  }

  try {
    const user = await User.findOne({ Email: Email });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const token = jwt.sign({ Email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    const resetPasswordUrl = `${process.env.BASE_FRONTEND_URL}/admin/resetPassword?token=${token}`;

    const transporter = createTransporter();

    // Send email
    await transporter.sendMail({
      from: process.env.EMAIL_SENDER,
      to: Email,
      subject: 'Admin Password Reset Request',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
          <h2 style="text-align: center; color: #333;">Admin Password Reset Request</h2>
          <p style="font-size: 16px; color: #333;">
            You are receiving this because you (or someone else) have requested the reset of the password for your admin account.
          </p>
          <p style="font-size: 16px; color: #333;">
            Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:
          </p>
          <div style="text-align: center; margin: 20px 0;">
            <a href="${resetPasswordUrl}" target="_blank" style="display: inline-block; padding: 10px 20px; font-size: 16px; color: #fff; background-color: #007bff; text-decoration: none; border-radius: 5px;">Reset Password</a>
          </div>
          <p style="font-size: 16px; color: #333;">
            If you did not request this, please ignore this email and your password will remain unchanged.
          </p>
          <p style="font-size: 16px; color: #333;">
            Thank you,<br/>
            The Team
          </p>
        </div>
      `,
    });

    return res.status(200).json({ success: 'Password reset email sent successfully' });

  } catch (error) {
    console.error('Failed to send email:', error);
    return res.status(500).json({ error: 'Failed to send email' });
  }
};

exports.resetPassword = async (req, res) => {
  const { token } = req.query;
  const { newPassword } = req.body;

  if (!token) {
    return res.status(400).json({ error: 'Token is required' });
  }

  if (!newPassword) {
    return res.status(400).json({ error: 'New password is required' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const email = decoded.Email;

    const user = await User.findOne({ Email: email });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.Password = newPassword; // The pre-save hook will handle the hashing
    await user.save();

    console.log(`Password for user ${email} has been successfully updated.`); // Logging for confirmation

    return res.status(200).json({ success: 'Password reset successful' });
  } catch (error) {
    console.error('Password reset error:', error);
    return res.status(500).json({ error: 'Failed to reset password' });
  }
};