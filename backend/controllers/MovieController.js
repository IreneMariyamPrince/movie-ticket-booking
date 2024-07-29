const Movie = require('../models/Movie');
const multer = require('multer');
const initMulter = require('../middlewares/multerConfig');
const mongoose = require('mongoose');

const upload = initMulter('movies', ['image/jpeg', 'image/png', 'image/avif']);

// Create a new movie
exports.createMovie = async (req, res, next) => {
    upload(req, res, async (err) => {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ error: err.message });
      } else if (err) {
        return res.status(500).json({ error: 'File upload error' });
      }
  
      const {
        Title,
        Description,
        Genre,
        ReleaseDate,
        Languages,
        Duration,
        Certification,
        Cast,
        Crew
      } = req.body;
  
      // Check if all required fields are present
      if (!Title || !Description || !Genre || !ReleaseDate || !Languages || !Duration || !Certification) {
        return res.status(400).json({ error: 'All fields are required' });
      }
  
      // Prepare the movie data
      const newMovie = new Movie({
        Title,
        Description,
        MovieImage: req.files && req.files['MovieImage']
          ? `http://localhost:3000/img/movies/${req.files['MovieImage'][0].filename}`
          : null,
        Genre: Genre.split(',').map(item => item.trim()),
        ReleaseDate: new Date(ReleaseDate),
        Languages: Languages.split(',').map(item => item.trim()),
        Duration,
        Certification,
        Cast: Cast.split(','),
        Crew: Crew.split(',')
      });
  
      try {
        const savedMovie = await newMovie.save();
        return res.status(201).json({ movie: savedMovie });
      } catch (err) {
        console.error('Error saving movie:', err); // Log the error details
        return res.status(500).json({ error: 'Internal Server Error', details: err.message });
      }
    });
  };
  
// Read all movies
exports.getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find().populate('Cast').populate('Crew');
    const totalCount = await Movie.countDocuments();
    res.status(200).json({movies: movies, totalCount});
  } catch (error) {
    res.status(500).send(error);
  }
};

// Read a single movie by ID
exports.getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id).populate('Cast').populate('Crew');
    if (!movie) return res.status(404).send('Movie not found');
    res.status(200).send(movie);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Update a movie
exports.updateMovie = async (req, res) => {
  try {
    const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedMovie) return res.status(404).send('Movie not found');
    res.status(200).send(updatedMovie);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Delete a movie
exports.deleteMovie = async (req, res) => {
  try {
    const deletedMovie = await Movie.findByIdAndDelete(req.params.id);
    if (!deletedMovie) return res.status(404).send('Movie not found');
    res.status(200).send(deletedMovie);
  } catch (error) {
    res.status(500).send(error);
  }
};
