/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
const express = require('express');
const { getAllPublicUsers, createUser, getAllProductionCompany, getAllShowOwner, deleteUser } = require('../controllers/UserController');
const { adminLogin, forgotPassword, adminForgotPassword, resetPassword } = require('../controllers/AuthController');
const { createCast, getAllCast, getCastById, updateCast, deleteCast } = require('../controllers/CastController');
const { createCrew, getAllCrew, getCrewById, updateCrew, deleteCrew } = require('../controllers/CrewController');
const { createMovie, getAllMovies, getMovieById, updateMovie, deleteMovie } = require('../controllers/MovieController');
const { sendOtp, verifyOtp } = require('../controllers/OtpController');
const { createShowOwner, updateShowOwner, updateShowOwnerDocuments, updateShowOwnerAgreement, getShowOwnerDetails, checkShowOwnerExists } = require('../controllers/ShowOwnerController');
const router = express.Router();

//Login
router.post('/admin/login', adminLogin);
router.post('/forgotPassword', forgotPassword);
router.post('/resetPassword', resetPassword);
router.post('/admin/forgotPassword', adminForgotPassword);

// Generate and send OTP
router.post('/send-otp', sendOtp);

// Verify OTP
router.post('/verify-otp', verifyOtp);

// Root path
router.get('/users', getAllPublicUsers);
router.get('/productionCompanies', getAllProductionCompany);
router.get('/showOwners', getAllShowOwner);

router.post('/users', createUser);
router.delete('/users/:userId', deleteUser);

router.post('/casts', createCast);
router.get('/casts', getAllCast);
router.get('/casts/:id', getCastById);
router.put('/casts/:id', updateCast);
router.delete('/casts/:id', deleteCast);

router.post('/crew', createCrew);
router.get('/crew', getAllCrew);
router.get('/crew/:id', getCrewById);
router.put('/crew/:id', updateCrew);
router.delete('/crew/:id', deleteCrew);

router.post('/movies', createMovie);
router.get('/movies', getAllMovies);
router.get('/movies/:id', getMovieById);
router.put('/movies/:id', updateMovie);
router.delete('/movies/:id', deleteMovie);

router.post('/show-owner', createShowOwner);
router.get('/show-owner/:userId', getShowOwnerDetails);
router.put('/show-owner/:showOwnerId', updateShowOwner);
router.put('/show-owner/documents/:userId', updateShowOwnerDocuments);
router.put('/show-owner/agreement/:showOwnerId', updateShowOwnerAgreement);
router.get('/show-owner-exists/:userId', checkShowOwnerExists);

module.exports = router;