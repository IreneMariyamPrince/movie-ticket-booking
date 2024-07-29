const Crew = require('../models/Crew');
const multer = require('multer');
const initMulter = require('../middlewares/multerConfig');
const mongoose = require('mongoose');

// Initialize multer with specific settings for user profile pictures
const upload = initMulter('crew', ['image/jpeg', 'image/png', 'image/avif']);

// Create a new crew member
exports.createCrew = async (req, res, next) => {
    upload(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ error: err });
    } else if (err) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    const { Name, Role } = req.body;

    // Check for existing crew member with the same name
    let existingCrewMember;
    try {
      existingCrewMember = await Crew.findOne({ Name });
    } catch (err) {
      return next(err);
    }

    if (existingCrewMember) {
      return res.status(400).json({ message: "Crew member with this name already exists!" });
    }

    let ImageUrl = 'http://localhost:3000/img/default-avatar.avif'; // Default image URL
    if (req.files && req.files['Image']) {
      ImageUrl = `http://localhost:3000/img/crew/${req.files['Image'][0].filename}`;
    }

    const newCrewMember = new Crew({
      Name,
      Role,
      Image: ImageUrl
    });

    try {
      await newCrewMember.save();
      return res.status(201).json({ crew: newCrewMember });
    } catch (err) {
      return next(err);
    }
  });
  };


// Read all crew members
exports.getAllCrew = async (req, res) => {
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

    const crewMembers = await Crew.find(query)
        .sort(sort) // Apply sorting
        .skip((pageNumber - 1) * limitNumber)
        .limit(limitNumber);

    const totalCount = await Crew.countDocuments(query);

    res.status(200).json({ crewMembers, totalCount });
} catch (error) {
    res.status(500).send(error);
}
};

// Read a single crew member
exports.getCrewById = async (req, res) => {
    try {
        const crew = await Crew.findById(req.params.id);
        if (!crew) return res.status(404).send('Crew member not found');
        res.status(200).send(crew);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Update a crew member
exports.updateCrew = async (req, res) => {
    try {
        const crew = await Crew.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!crew) return res.status(404).send('Crew member not found');
        res.status(200).send(crew);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Delete a crew member
exports.deleteCrew = async (req, res) => {
    try {
        const crew = await Crew.findByIdAndDelete(req.params.id);
        if (!crew) return res.status(404).send('Crew member not found');
        res.status(200).send(crew);
    } catch (error) {
        res.status(500).send(error);
    }
};
