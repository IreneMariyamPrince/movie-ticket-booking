import React, { useState } from 'react';
import { Stepper, Step, StepLabel, Button, Box } from '@mui/material';
import styles from '../../css/AccountSetupPage.module.css';
import SignAgreementStep from '../../organisms/ShowOwners/SignAgreementStep';
import UploadDocumentsStep from '../../organisms/ShowOwners/UploadDocumentsStep';
import GeneralInformationStep from '../../organisms/ShowOwners/GeneralInformationStep';
import { useNavigate } from 'react-router-dom';
import ConfirmationDialog from '../../molecules/ConfirmationDialog';

const steps = ['General Information', 'Upload Documents', 'Sign Agreement'];

const AccountSetupPage = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [state, setState] = useState('');
    const [accountType, setAccountType] = useState('');
    const [selectedBank, setSelectedBank] = useState("");
    const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/show/login');
  };

  // Function to handle logout confirmation
  const handleLogoutConfirmation = () => {
    // Show confirmation dialog when logout button is clicked
    return (
      <ConfirmationDialog
        title='Are you sure you want to logout?'
        icon='warning'
        showCancelButton={true}
        confirmButtonColor='#3085d6'
        cancelButtonColor='#d33'
        confirmButtonText='Yes'
        cancelButtonText='No'
        confirmAction={handleLogout}
        feature={{ type: 'icon', className: 'material-icons cursor-pointer fs-4 text-white', content: 'logout'}}
      />
    );
  };


    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    return (
        <>
            <div className={styles.containerFluid}>
                <div className={`container ${styles.containerInner}`}>
                    <div className="d-flex align-items-center">
                        <img src='/assets/logo.png' className={styles.logo} alt='Logo' />
                        <span className={styles.brand}>ShowTimeNow</span>
                    </div>
                    <span className='text-white'>{handleLogoutConfirmation()}</span>
                </div>
            </div>
            <div className='container w-50'>
                <h2 className="text-center pt-3">Account Setup</h2>
                <p className="text-center">Please fill in the below details so that we can set up an account for your organization in our system and give access to the portal for listing your event.</p>

                <Box sx={{ width: '100%' }}>
                    <Stepper activeStep={activeStep} alternativeLabel>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                </Box>

                <div className={styles.formContainer}>
                    {activeStep === 0 && 
                        <GeneralInformationStep 
                        state={state}
                        setState={setState}
                        accountType={accountType}
                        setAccountType={setAccountType}
                        selectedBank={selectedBank}
                        setSelectedBank={setSelectedBank}/>
                    }
                    {activeStep === 1 && 
                        <UploadDocumentsStep/>
                    }
                    {activeStep === 2 && 
                        <SignAgreementStep/>
                    }
                </div>

                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                    <Button
                        color="inherit"
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        sx={{ mr: 1 }}
                    >
                        Back
                    </Button>
                    <Box sx={{ flex: '1 1 auto' }} />
                    <Button onClick={handleNext}>
                        {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                    </Button>
                </Box>
            </div>
        </>
    );
};

export default AccountSetupPage;
