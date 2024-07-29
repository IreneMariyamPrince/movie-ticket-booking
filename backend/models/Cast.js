const mongoose = require('mongoose');

const castSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
    unique: true, // Ensure that each cast member name is unique
  },
  Image: {
    type: String,
    default: null,
  },
  Role: {
    type: String,
    enum: ['actor', 'actress', 'supporting actor', 'supporting actress'], // Add any other roles as needed
    required: true,
  },
}, { timestamps: true });

const Cast = mongoose.model('Cast', castSchema);
module.exports = Cast;
