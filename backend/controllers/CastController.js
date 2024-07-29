const Cast = require('../models/Cast');
const multer = require('multer');
const initMulter = require('../middlewares/multerConfig');
const mongoose = require('mongoose');

// Initialize multer with specific settings for user profile pictures
const upload = initMulter('cast', ['image/jpeg', 'image/png', 'image/avif']);

// Create a new cast member
exports.createCast = async (req, res, next) => {
      upload(req, res, async function (err) {
        if (err instanceof multer.MulterError) {
          return res.status(400).json({ error: err });
        } else if (err) {
          return res.status(500).json({ error: 'Internal Server Error' });
        }
    
        const { Name, Role } = req.body;
    
        // Check for existing cast member with the same name
        let existingCastMember;
        try {
          existingCastMember = await Cast.findOne({ Name });
        } catch (err) {
          return next(err);
        }
    
        if (existingCastMember) {
          return res.status(400).json({ message: "Cast member with this name already exists!" });
        }
    
        let ImageUrl = 'http://localhost:3000/img/default-avatar.avif'; // Default image URL
        if (req.files && req.files['Image']) {
          ImageUrl = `http://localhost:3000/img/cast/${req.files['Image'][0].filename}`;
        }
    
        const newCastMember = new Cast({
          Name,
          Role,
          Image: ImageUrl
        });
    
        try {
          await newCastMember.save();
          return res.status(201).json({ cast: newCastMember });
        } catch (err) {
          return next(err);
        }
      });
      };
  

// Read all cast members
exports.getAllCast = async (req, res) => {
    const { search, page = 1, limit = 10, filterDate, filterRole } = req.query;

    // Ensure page is at least 1
    const pageNumber = Math.max(1, parseInt(page));
    const limitNumber = Math.max(1, parseInt(limit));

    // Build the query object
    let query = {};

    if (search) {
        query = {
            ...query,
            $or: [
                { Name: { $regex: search, $options: 'i' } },
                { Role: { $regex: search, $options: 'i' } },
                // Add other fields you want to search by
            ]
        };
    }

    // Filter by Role if provided
    if (filterRole) {
        query.Role = filterRole;
    }

    try {
        // Set the sorting order based on filterDate
        const sort = {};
        if (filterDate === 'desc') {
            sort.createdAt = -1; // Sort by latest
        } else if (filterDate === 'asc') {
            sort.createdAt = 1; // Sort by earliest
        }

        const castMembers = await Cast.find(query)
            .sort(sort) // Apply sorting
            .skip((pageNumber - 1) * limitNumber)
            .limit(limitNumber);

        const totalCount = await Cast.countDocuments(query);

        res.status(200).json({ castMembers, totalCount });
    } catch (error) {
        res.status(500).send(error);
    }
};

// Read a single cast member
exports.getCastById = async (req, res) => {
    try {
        const cast = await Cast.findById(req.params.id);
        if (!cast) return res.status(404).send('Cast member not found');
        res.status(200).send(cast);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Update a cast member
exports.updateCast = async (req, res) => {
    try {
        const cast = await Cast.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!cast) return res.status(404).send('Cast member not found');
        res.status(200).send(cast);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Delete a cast member
exports.deleteCast = async (req, res) => {
    try {
        const cast = await Cast.findByIdAndDelete(req.params.id);
        if (!cast) return res.status(404).send('Cast member not found');
        res.status(200).send(cast);
    } catch (error) {
        res.status(500).send(error);
    }
};
