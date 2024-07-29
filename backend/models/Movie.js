const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieSchema = new Schema({
  MovieId: {
    type: Schema.Types.ObjectId,
    required: true,
    auto: true,
    unique: true
  },
  Title: {
    type: String,
    required: true,
    unique: true
  },
  Description: {
    type: String,
    required: true
  },
  MovieImage: {
    type: String,
    required: true
  },
  Genre: {
    type: [String],
    required: true
  },
  ReleaseDate: {
    type: Date,
    required: true
  },
  Languages: {
    type: [String],
    required: true
  },
  Duration: {
    type: String,
    required: true
  },
  Certification: {
    type: String,
    required: true
  },
  Cast: [{
    type: Schema.Types.ObjectId,
    ref: 'Cast'
  }],
  Crew: [{
    type: Schema.Types.ObjectId,
    ref: 'Crew'
  }]
}, { timestamps: true });

const Movie = mongoose.model('Movie', movieSchema);
module.exports = Movie;
