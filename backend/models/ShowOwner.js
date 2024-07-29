const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const showOwnerSchema = new Schema({
  UserId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  OrganizationName: {
    type: String,
    required: true
  },
  PANCardNumber: {
    type: String,
    required: true,
    unique: true  // Ensure unique PAN card number
  },
  OrganizationAddress: {
    type: String,
    required: true
  },
  GSTIN: {
    type: String,
    default: null
  },
  ITRFiled: {
    type: Boolean,
    required: true
  },
  State: {
    type: String,
    required: true
  },
  BeneficiaryName: {
    type: String,
    required: true
  },
  AccountType: {
    type: String,
    required: true,
    enum: ['savings', 'salary', 'current', 'nri']
  },
  BankName: {
    type: String,
    required: true
  },
  AccountNumber: {
    type: String,
    required: true,
    unique: true  // Ensure unique account number
  },
  BankIFSC: {
    type: String,
    required: true
  },
  PANCardImage: {
    type: String,
    default: null  // Make optional initially
  },
  CancelledChequeImage: {
    type: String,
    default: null  // Make optional initially
  },
  SignedAgreement: {
    type: String,
    default: null  // Make optional initially
  }
}, { timestamps: true });

const ShowOwner = mongoose.model('ShowOwner', showOwnerSchema);

module.exports = ShowOwner;
