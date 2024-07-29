const User = require("../models/User");
const multer = require('multer');
const initMulter = require('../middlewares/multerConfig');
const mongoose = require('mongoose');

// Initialize multer with specific settings for user profile pictures
const upload = initMulter('user', ['image/jpeg', 'image/png', 'image/avif']);

exports.createUser = async (req, res, next) => {
  upload(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ error: err });
    } else if (err) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    const { FirstName, LastName, Email, PhoneNumber, Password, UserRole, UserStatus, Address } = req.body;

    let existingUser;
    try {
      existingUser = await User.findOne({
        $or: [{ Email }, { PhoneNumber }]
      });
    } catch (err) {
      return next(err);
    }

    if (existingUser) {
      return res.status(400).json({ message: "User with this email or phone number already exists!" });
    }

    let ProfilePictureUrl = 'http://localhost:3000/img/default-avatar.avif';
    if (req.files && req.files['ProfilePictureUrl']) {
      ProfilePictureUrl = `http://localhost:3000/img/user/${req.files['ProfilePictureUrl'][0].filename}`;
    }

    const newUser = new User({
      FirstName,
      LastName,
      Email,
      PhoneNumber,
      Password,
      UserRole,
      UserStatus,
      Address,
      ProfilePictureUrl
    });

    try {
      await newUser.save();
    } catch (err) {
      return next(err);
    }

    return res.status(201).json({ user: newUser });
  });
};

exports.getAllPublicUsers = async (req, res, next) => {
  const { search, page = 1, limit = 10, filterDate, filterStatus } = req.query;

  // Ensure page is at least 1
  const pageNumber = Math.max(1, parseInt(page));
  const limitNumber = Math.max(1, parseInt(limit));

  // Build the query object
  let query = { UserRole: 'user' };

  if (search) {
    query = {
      ...query,
      $or: [
        { FirstName: { $regex: search, $options: 'i' } },
        { LastName: { $regex: search, $options: 'i' } },
        { Email: { $regex: search, $options: 'i' } },
        // Add other fields you want to search by
      ]
    };
  }

  // Filter by UserStatus if provided
  if (filterStatus) {
    query.UserStatus = filterStatus;
  }

  try {
    // Set the sorting order based on filterDate
    const sort = {};
    if (filterDate === 'desc') {
      sort.CreatedAt = -1; // Sort by latest
    } else if (filterDate === 'asc') {
      sort.CreatedAt = 1; // Sort by earliest
    }

    const users = await User.find(query)
      .sort(sort) // Apply sorting
      .skip((pageNumber - 1) * limitNumber)
      .limit(limitNumber);

    const updatedUsers = users.map(user => ({
      ...user._doc,
      ProfilePictureUrl: user.ProfilePictureUrl || 'http://localhost:3000/img/default-avatar.avif'
    }));

    const totalCount = await User.countDocuments(query);
    // Count active users
    const activeCount = await User.countDocuments({ ...query, UserStatus: 'active' });

    res.status(200).json({ users: updatedUsers, totalCount, activeCount });
  } catch (err) {
    next(err);
  }
};

exports.deleteUser = async (req, res, next) => {
  const { userId } = req.params;

  // Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    console.error(`Invalid user ID: ${userId}`);
    return res.status(400).json({ message: 'Invalid user ID' });
  }

  try {
    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error('Error deleting user:', err);
    next(err);
  }
};

exports.getAllProductionCompany = async (req, res, next) => {
  const { search, page = 1, limit = 10, filterDate, filterStatus } = req.query;

  // Ensure page is at least 1
  const pageNumber = Math.max(1, parseInt(page));
  const limitNumber = Math.max(1, parseInt(limit));

  // Build the query object
  let query = { UserRole: 'production company' };

  if (search) {
    query = {
      ...query,
      $or: [
        { FirstName: { $regex: search, $options: 'i' } },
        { LastName: { $regex: search, $options: 'i' } },
        { Email: { $regex: search, $options: 'i' } },
        // Add other fields you want to search by
      ]
    };
  }

  // Filter by status if provided
  if (filterStatus) {
    query.UserStatus = filterStatus; // Assuming filterStatus is directly the status value
  }

  try {
    // Set the sorting order based on filterDate
    const sort = {};
    if (filterDate === 'desc') {
      sort.CreatedAt = -1; // Sort by latest
    } else if (filterDate === 'asc') {
      sort.CreatedAt = 1; // Sort by earliest
    }

    const users = await User.find(query)
      .sort(sort) // Apply sorting
      .skip((pageNumber - 1) * limitNumber)
      .limit(limitNumber);

    const updatedUsers = users.map(user => ({
      ...user._doc,
      ProfilePictureUrl: user.ProfilePictureUrl || 'http://localhost:3000/img/default-avatar.avif'
    }));

    const totalCount = await User.countDocuments(query);
    const activeCount = await User.countDocuments({ ...query, UserStatus: 'active' });
    const pendingCount = await User.countDocuments({ ...query, UserStatus: 'pending' });

    res.status(200).json({ users: updatedUsers, totalCount, activeCount, pendingCount });
  } catch (err) {
    next(err);
  }
};

exports.getAllShowOwner = async (req, res, next) => {
  const { search, page = 1, limit = 10, filterDate, filterStatus } = req.query;

  // Ensure page is at least 1
  const pageNumber = Math.max(1, parseInt(page));
  const limitNumber = Math.max(1, parseInt(limit));

  // Build the query object
  let query = { UserRole: 'show owner' };

  if (search) {
    query = {
      ...query,
      $or: [
        { FirstName: { $regex: search, $options: 'i' } },
        { LastName: { $regex: search, $options: 'i' } },
        { Email: { $regex: search, $options: 'i' } },
        // Add other fields you want to search by
      ]
    };
  }

  // Filter by status if provided
  if (filterStatus) {
    query.UserStatus = filterStatus; // Assuming filterStatus is directly the status value
  }

  try {
    // Set the sorting order based on filterDate
    const sort = {};
    if (filterDate === 'desc') {
      sort.CreatedAt = -1; // Sort by latest
    } else if (filterDate === 'asc') {
      sort.CreatedAt = 1; // Sort by earliest
    }

    const users = await User.find(query)
      .sort(sort) // Apply sorting
      .skip((pageNumber - 1) * limitNumber)
      .limit(limitNumber);

    const updatedUsers = users.map(user => ({
      ...user._doc,
      ProfilePictureUrl: user.ProfilePictureUrl || 'http://localhost:3000/img/default-avatar.avif'
    }));

    const totalCount = await User.countDocuments(query);
    const activeCount = await User.countDocuments({ ...query, UserStatus: 'active' });
    const pendingCount = await User.countDocuments({ ...query, UserStatus: 'pending' });

    res.status(200).json({ users: updatedUsers, totalCount, activeCount, pendingCount });
  } catch (err) {
    next(err);
  }
};
