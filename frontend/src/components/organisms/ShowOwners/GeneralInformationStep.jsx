import React, { useEffect, useState } from "react";
import {jwtDecode} from "jwt-decode";
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button
} from "@mui/material";
import styles from "../../css/AccountSetupPage.module.css";
import { StatesOfIndia } from "../../constants/StatesOfIndia";
import { Banks } from "../../constants/Banks";
import showOwnersApi from "../../services/ShowOwnersApi";

const GeneralInformationStep = ({
  state,
  setState,
  accountType,
  setAccountType,
  selectedBank,
  setSelectedBank,
}) => {
  const [organizationName, setOrganizationName] = useState('');
  const [panCardNumber, setPanCardNumber] = useState('');
  const [organizationAddress, setOrganizationAddress] = useState('');
  const [gstin, setGstin] = useState('');
  const [itrFiled, setItrFiled] = useState('');
  const [beneficiaryName, setBeneficiaryName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [bankIfsc, setBankIfsc] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      const decodedToken = jwtDecode(token);
      const userPhoneNumber = decodedToken.phoneNumber;
      setPhoneNumber(userPhoneNumber);

      const userId = decodedToken.id;
      checkShowOwnerExists(userId);
    }
  }, []);

  const checkShowOwnerExists = async (userId) => {
    try {
      const response = await showOwnersApi.checkShowOwnerExists(userId);
      if (response.exists) {
        fetchShowOwnerDetails(userId);
      } else {
        // Clear all fields except the phone number
        setOrganizationName('');
        setPanCardNumber('');
        setOrganizationAddress('');
        setGstin('');
        setItrFiled(false);
        setState('');
        setBeneficiaryName('');
        setAccountType('');
        setSelectedBank('');
        setAccountNumber('');
        setBankIfsc('');
        setFirstName('');
        setLastName('');
        setEmail('');
        console.error('Show Owner not found for the given userId');
      }
    } catch (error) {
      console.error('Error checking show owner existence:', error);
    }
  };

  const fetchShowOwnerDetails = async (userId) => {
    try {
      const response = await showOwnersApi.getShowOwnerDetails(userId);
      console.log(response);
      const { showOwner, user } = response;
      setOrganizationName(showOwner.OrganizationName);
      setPanCardNumber(showOwner.PANCardNumber);
      setOrganizationAddress(showOwner.OrganizationAddress);
      setGstin(showOwner.GSTIN);
      setItrFiled(showOwner.ITRFiled);
      setState(showOwner.State);
      setBeneficiaryName(showOwner.BeneficiaryName);
      setAccountType(showOwner.AccountType);
      setSelectedBank(showOwner.BankName);
      setAccountNumber(showOwner.AccountNumber);
      setBankIfsc(showOwner.BankIFSC);
      setFirstName(user.FirstName);
      setLastName(user.LastName);
      setEmail(user.Email);
    } catch (error) {
      console.error('Error fetching show owner details:', error);
    }
  };

  const handleStateChange = (event) => {
    setState(event.target.value);
  };

  const handleAccountTypeChange = (event) => {
    setAccountType(event.target.value);
  };

  const handleBankChange = (event) => {
    setSelectedBank(event.target.value);
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      console.error("No token found in localStorage");
      return;
    }
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.id;

    const showOwnerData = {
      UserId: userId,
      OrganizationName: organizationName,
      PANCardNumber: panCardNumber,
      OrganizationAddress: organizationAddress,
      GSTIN: gstin,
      ITRFiled: itrFiled,
      State: state,
      BeneficiaryName: beneficiaryName,
      AccountType: accountType,
      BankName: selectedBank,
      AccountNumber: accountNumber,
      BankIFSC: bankIfsc,
      FirstName: firstName,
      LastName: lastName,
      Email: email
    };

    try {
      const response = await showOwnersApi.createShowOwner(showOwnerData);
      console.log(response);
    } catch (error) {
      console.error('Error creating show owner:', error);
    }
  };

  return (
    <div>
      <h2 className={styles.subheading}>Organisational Details</h2>
      <div className={styles.textFieldContainer}>
        <label className={styles.label}>Organization/Individual Name</label>
        <TextField
          className={`${styles.textField} ${styles.smallTextField} ${styles.placeholderSmall}`}
          placeholder="Enter your organisation name"
          size="small"
          variant="outlined"
          margin="normal"
          value={organizationName}
          onChange={(e) => setOrganizationName(e.target.value)}
        />
      </div>
      <div className={styles.textFieldContainer}>
        <label className={styles.label}>
          Organization/Individual PAN Card Number
        </label>
        <TextField
          className={`${styles.textField} ${styles.smallTextField} ${styles.placeholderSmall}`}
          placeholder="Enter PAN card number"
          size="small"
          variant="outlined"
          margin="normal"
          value={panCardNumber}
          onChange={(e) => setPanCardNumber(e.target.value)}
        />
      </div>
      <div className={styles.textFieldContainer}>
        <label className={styles.label}>Organization/Individual Address</label>
        <TextField
          className={`${styles.textField} ${styles.smallTextField} ${styles.placeholderSmall}`}
          placeholder="Enter your organisation address"
          size="small"
          variant="outlined"
          margin="normal"
          value={organizationAddress}
          onChange={(e) => setOrganizationAddress(e.target.value)}
        />
      </div>

      <div className={styles.radioGroup}>
        <label className={styles.label}>Do you have a GSTIN number?</label>
        <div className={styles.radioOptions}>
          <input 
            type="radio" 
            id="gstYes" 
            name="gst" 
            value="yes" 
            checked={gstin === true}
            onChange={() => setGstin(true)}
          />
          <label htmlFor="gstYes" className="me-5">
            Yes
          </label>
          <input 
            type="radio" 
            id="gstNo" 
            name="gst" 
            value="no" 
            checked={gstin === false}
            onChange={() => setGstin(false)}
          />
          <label htmlFor="gstNo">No</label>
        </div>
      </div>

      <div className={styles.radioGroup}>
        <label className={styles.label}>
          Have you filed last 2 years ITR return?
        </label>
        <div className={styles.radioOptions}>
          <input 
            type="radio" 
            id="itrYes" 
            name="itr" 
            value="yes" 
            checked={itrFiled === true}
            onChange={() => setItrFiled(true)}
          />
          <label className="me-5" htmlFor="itrYes">
            Yes
          </label>
          <input 
            type="radio" 
            id="itrNo" 
            name="itr" 
            value="no" 
            checked={itrFiled === false}
            onChange={() => setItrFiled(false)}
          />
          <label htmlFor="itrNo">No</label>
        </div>
      </div>

      <div className={styles.selectContainer}>
        <FormControl variant="outlined" fullWidth size="small">
          <InputLabel id="state-select-label">State</InputLabel>
          <Select
            labelId="state-select-label"
            id="state-select"
            value={state}
            onChange={handleStateChange}
            label="State"
          >
            <MenuItem value="" disabled>
              Select State
            </MenuItem>
            {StatesOfIndia.map((state) => (
              <MenuItem key={state.code} value={state.code}>
                {state.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <h2 className={styles.subheading}>Contact Person Details</h2>
      <div className={styles.textFieldContainer}>
        <label className={styles.label}>First Name</label>
        <TextField
          className={`${styles.textField} ${styles.smallTextField} ${styles.placeholderSmall}`}
          placeholder="Enter first name"
          size="small"
          variant="outlined"
          margin="normal"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>
      <div className={styles.textFieldContainer}>
        <label className={styles.label}>Last Name</label>
        <TextField
          className={`${styles.textField} ${styles.smallTextField} ${styles.placeholderSmall}`}
          placeholder="Enter last name"
          size="small"
          variant="outlined"
          margin="normal"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      <div className={styles.textFieldContainer}>
        <label className={styles.label}>Email</label>
        <TextField
          className={`${styles.textField} ${styles.smallTextField} ${styles.placeholderSmall}`}
          placeholder="Enter email"
          size="small"
          variant="outlined"
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className={styles.textFieldContainer}>
        <label className={styles.label}>Phone Number</label>
        <TextField
          className={`${styles.textField} ${styles.smallTextField} ${styles.placeholderSmall}`}
          placeholder="Enter phone number"
          size="small"
          variant="outlined"
          margin="normal"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          disabled
        />
      </div>

      <h2 className={styles.subheading}>Bank Account Details</h2>
      <div className={styles.textFieldContainer}>
        <label className={styles.label}>Beneficiary Name</label>
        <TextField
          className={`${styles.textField} ${styles.smallTextField} ${styles.placeholderSmall}`}
          placeholder="Enter beneficiary name"
          size="small"
          variant="outlined"
          margin="normal"
          value={beneficiaryName}
          onChange={(e) => setBeneficiaryName(e.target.value)}
        />
      </div>
      <div className={styles.selectContainer}>
        <FormControl variant="outlined" fullWidth size="small">
          <InputLabel id="account-type-select-label">Account Type</InputLabel>
          <Select
            labelId="account-type-select-label"
            id="account-type-select"
            value={accountType}
            onChange={handleAccountTypeChange}
            label="Account Type"
          >
            <MenuItem value="" disabled>
              Select Account Type
            </MenuItem>
            <MenuItem value="savings">Savings</MenuItem>
            <MenuItem value="current">Current</MenuItem>
            <MenuItem value="nri">NRI</MenuItem>
            <MenuItem value="salary">Salary</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className={styles.selectContainer}>
        <FormControl variant="outlined" fullWidth size="small">
          <InputLabel id="bank-select-label">Bank Name</InputLabel>
          <Select
            labelId="bank-select-label"
            id="bank-select"
            value={selectedBank}
            onChange={handleBankChange}
            label="Bank Name"
          >
            <MenuItem value="" disabled>
              Select Bank
            </MenuItem>
            {Banks.map((bank) => (
              <MenuItem value={bank}>
                {bank}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div className={styles.textFieldContainer}>
        <label className={styles.label}>Account Number</label>
        <TextField
          className={`${styles.textField} ${styles.smallTextField} ${styles.placeholderSmall}`}
          placeholder="Enter account number"
          size="small"
          variant="outlined"
          margin="normal"
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value)}
        />
      </div>
      <div className={styles.textFieldContainer}>
        <label className={styles.label}>Bank IFSC Code</label>
        <TextField
          className={`${styles.textField} ${styles.smallTextField} ${styles.placeholderSmall}`}
          placeholder="Enter IFSC code"
          size="small"
          variant="outlined"
          margin="normal"
          value={bankIfsc}
          onChange={(e) => setBankIfsc(e.target.value)}
        />
      </div>
      <div className="d-flex justify-content-center">
        <Button
          onClick={handleSubmit}
          className={styles.button}
          variant="contained"
          color="primary"
        >
          Save & Continue
        </Button>
      </div>
    </div>
  );
};

export default GeneralInformationStep;
