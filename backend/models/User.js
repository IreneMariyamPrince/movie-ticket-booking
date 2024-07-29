const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  UserId: {
    type: Schema.Types.ObjectId,
    required: true,
    auto: true
  },
  FirstName: {
    type: String,
    default: null
  },
  LastName: {
    type: String,
    default: null
  },
  Email: {
    type: String,
    unique: true,  // Ensure unique email
    sparse: true,  // Allow null values to be stored
    default: null
  },
  PhoneNumber: {
    type: String,
    unique: true,  // Ensure unique email
    required: true
  },
  Password: {
    type: String,
    default: null
  },
  UserRole: {
    type: String,
    enum: ['admin', 'user', 'production company', 'show owner'],
    required: true
  },
  UserStatus: {
    type: String,
    enum: ['pending', 'active', 'rejected'],
    required: true
  },
  Address: {
    type: String,
    default: null
  },
  ProfilePictureUrl: {
    type: String,
    default: null
  },
  CreatedAt: {
    type: Date,
    default: Date.now, // Sets the current date when the user is created
  },
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  try {
    if (!this.isModified('Password')) {
      return next();
    }
    const hashedPassword = await bcrypt.hash(this.Password, 10);
    this.Password = hashedPassword;
    return next();
  } catch (err) {
    return next(err);
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;