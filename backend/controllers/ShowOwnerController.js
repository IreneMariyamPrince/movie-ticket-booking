const mongoose = require('mongoose');
const ShowOwner = require('../models/ShowOwner');
const User = require('../models/User');
const multer = require('multer');
const initMulter = require('../middlewares/multerConfig');

const upload = initMulter('showOwners', ['image/jpeg', 'image/png', 'application/pdf']);

exports.createShowOwner = async (req, res) => {
  try {
    const {
      UserId,
      OrganizationName,
      PANCardNumber,
      OrganizationAddress,
      GSTIN,
      ITRFiled,
      State,
      BeneficiaryName,
      AccountType,
      BankName,
      AccountNumber,
      BankIFSC,
      FirstName,
      LastName,
      Email
    } = req.body;

    // Validate UserId
    if (!mongoose.Types.ObjectId.isValid(UserId)) {
      return res.status(400).json({ error: 'Invalid UserId format' });
    }

    // Convert UserId to ObjectId
     const userIdObj = new mongoose.Types.ObjectId(UserId);
     console.log(userIdObj);

     // Check if the user exists
     const user = await User.findOne({ UserId: userIdObj });
     console.log(user);
     if (!user) {
       return res.status(404).json({ error: 'User not found' });
     }

    // Update User details
    user.FirstName = FirstName || user.FirstName;
    user.LastName = LastName || user.LastName;
    user.Email = Email || user.Email;

    await user.save();

    // Find the ShowOwner document by UserId
    let showOwner = await ShowOwner.findOne({ UserId });

    if (showOwner) {
      // Update existing ShowOwner document
      showOwner.OrganizationName = OrganizationName || showOwner.OrganizationName;
      showOwner.PANCardNumber = PANCardNumber || showOwner.PANCardNumber;
      showOwner.OrganizationAddress = OrganizationAddress || showOwner.OrganizationAddress;
      showOwner.GSTIN = GSTIN || showOwner.GSTIN;
      showOwner.ITRFiled = ITRFiled !== undefined ? ITRFiled : showOwner.ITRFiled;
      showOwner.State = State || showOwner.State;
      showOwner.BeneficiaryName = BeneficiaryName || showOwner.BeneficiaryName;
      showOwner.AccountType = AccountType || showOwner.AccountType;
      showOwner.BankName = BankName || showOwner.BankName;
      showOwner.AccountNumber = AccountNumber || showOwner.AccountNumber;
      showOwner.BankIFSC = BankIFSC || showOwner.BankIFSC;
      showOwner.PANCardImage = showOwner.PANCardImage || null;
      showOwner.CancelledChequeImage = showOwner.CancelledChequeImage || null;
      showOwner.SignedAgreement = showOwner.SignedAgreement || null;
    } else {
      // Create a new ShowOwner document
      showOwner = new ShowOwner({
        UserId: userIdObj,
        OrganizationName,
        PANCardNumber,
        OrganizationAddress,
        GSTIN,
        ITRFiled,
        State,
        BeneficiaryName,
        AccountType,
        BankName,
        AccountNumber,
        BankIFSC,
        PANCardImage: null,  // Set default value
        CancelledChequeImage: null,  // Set default value
        SignedAgreement: null  // Set default value
      });
    }

    await showOwner.save();

    return res.status(201).json({ message: 'Show Owner created/updated successfully', showOwner });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getShowOwnerDetails = async (req, res) => {
  try {
    const { userId } = req.params;

    // Ensure the userId is in ObjectId format
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: 'Invalid User ID format' });
    }

    const showOwner = await ShowOwner.findOne({ UserId: new mongoose.Types.ObjectId(userId) });
    const user = await User.findOne({ UserId: new mongoose.Types.ObjectId(userId) });

    if (!showOwner || !user) {
      return res.status(404).json({ error: 'Show Owner or User not found' });
    }

    return res.status(200).json({ showOwner, user });
  } catch (error) {
    console.error('Error fetching show owner details:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.updateShowOwnerDocuments = async (req, res, next) => {
  upload(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ error: err.message });
    } else if (err) {
      return res.status(500).json({ error: 'File upload error' });
    }

    const { userId } = req.params;
    const { PANCardImage, CancelledChequeImage } = req.files;

    // Validate UserId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: 'Invalid User ID format' });
    }

    // Create an object to store the updated fields
    const updateData = {};
    if (PANCardImage) {
      updateData.PANCardImage = PANCardImage[0].path; // Store the file path
    }
    if (CancelledChequeImage) {
      updateData.CancelledChequeImage = CancelledChequeImage[0].path; // Store the file path
    }

    try {
      // Find the ShowOwner by UserId and update the documents
      const showOwner = await ShowOwner.findOneAndUpdate(
        { UserId: new mongoose.Types.ObjectId(userId) },
        updateData,
        { new: true }
      );

      if (!showOwner) {
        return res.status(404).json({ error: 'Show Owner not found' });
      }

      return res.status(200).json({ message: 'Documents updated successfully', showOwner });
    } catch (error) {
      console.error('Error updating show owner:', error);
      return res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
  });
};


exports.updateShowOwnerAgreement = async (req, res) => {
  try {
    const { showOwnerId } = req.params;
    const { SignedAgreement } = req.body;

    const showOwner = await ShowOwner.findByIdAndUpdate(showOwnerId, {
      SignedAgreement,
    }, { new: true });

    if (!showOwner) {
      return res.status(404).json({ error: 'Show Owner not found' });
    }

    return res.status(200).json({ message: 'Agreement updated successfully', showOwner });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.updateShowOwner = async (req, res) => {
  try {
    const { showOwnerId } = req.params;
    const updates = req.body;

    const showOwner = await ShowOwner.findByIdAndUpdate(showOwnerId, updates, { new: true });

    if (!showOwner) {
      return res.status(404).json({ error: 'Show Owner not found' });
    }

    return res.status(200).json({ message: 'Show Owner updated successfully', showOwner });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Check if ShowOwner exists
exports.checkShowOwnerExists = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: 'Invalid User ID format' });
    }

    const showOwnerExists = await ShowOwner.exists({ UserId: new mongoose.Types.ObjectId(userId) });

    if (!showOwnerExists) {
      return res.status(404).json({ error: 'Show Owner not found' });
    }

    return res.status(200).json({ exists: true });
  } catch (error) {
    console.error('Error checking show owner existence:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

