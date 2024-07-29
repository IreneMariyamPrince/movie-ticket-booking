/* eslint-env es6 */

const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

// Function to initialize multer with custom options
const initMulter = (subdirectory, allowedTypes) => {
  // Set up multer storage and file naming
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `img/${subdirectory}/`); // Specify the upload directory
    },
    filename: function (req, file, cb) {
      const uniqueFilename = uuidv4();
      const extension = file.originalname.split('.').pop();
      cb(null, `${uniqueFilename}.${extension}`);; // Use UUID to generate a unique filename
    }
  });

  // Filter for allowed file types
  const fileFilter = (req, file, cb) => {
    // Check if the file type is included in the allowed types
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true); // Accept the file
    } else {
      cb(new Error(`Only ${allowedTypes.join(', ')} files are allowed.`), false); // Reject the file
    }
  };

  // Initialize multer with the storage and file filter options
  return multer({ storage: storage, fileFilter: fileFilter }).fields([
    { name: 'Image', maxCount: 1 },
    { name: 'MovieImage', maxCount: 1 },
    { name: 'resume', maxCount: 1 },
    { name: 'ProfilePictureUrl', maxCount: 1 },
    { name: 'PANCardImage', maxCount: 1 },
    { name: 'CancelledChequeImage', maxCount: 1 }
  ]);
};

module.exports = initMulter;