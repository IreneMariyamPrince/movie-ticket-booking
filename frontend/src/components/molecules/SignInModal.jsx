import React, { useState, useEffect } from 'react';
import { Modal, Box, Button, TextField, Typography, Backdrop, InputAdornment, IconButton } from '@mui/material';
import { styled } from '@mui/system';
import CloseIcon from '@mui/icons-material/Close';

const FlagIcon = styled('img')({
    width: 24,
    height: 16,
    marginRight: 8,
});

const SignInModal = ({ show, handleClose }) => {
    const [mobileNumber, setMobileNumber] = useState('');
    const [isMobileValid, setIsMobileValid] = useState(false);

    useEffect(() => {
        // Check if the mobile number is valid
        const isValid = /^[0-9]{10}$/.test(mobileNumber);
        setIsMobileValid(isValid);
    }, [mobileNumber]);

    const handleMobileChange = (event) => {
        const { value } = event.target;
        // Allow only digits and limit input to 10 digits
        if (/^\d{0,10}$/.test(value)) {
            setMobileNumber(value);
        }
    };

    return (
        <Modal
            open={show}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '80%',
                    maxWidth: 400,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                    outline: 'none',
                }}
            >
                <IconButton
                    sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                    }}
                    onClick={handleClose}
                >
                    <CloseIcon />
                </IconButton>
                <Typography variant="body1" component="p" paddingBottom={'30px'} align="center" gutterBottom>
                    Get Started
                </Typography>
                <Button 
                    variant="outlined" 
                    fullWidth 
                    startIcon={<img src={'/assets/google.png'} alt="Google" style={{ width: 24, height: 24, marginRight: 8 }} />}
                    sx={{ 
                        mb: 2, 
                        p:1,
                        borderColor: 'gray', 
                        color: 'gray', 
                        textTransform: 'none', 
                        '&:hover': { borderColor: 'white', backgroundColor: '#f0f0f0' } 
                    }}
                >
                    Continue with Google
                </Button>
                <Button 
                    variant="outlined" 
                    fullWidth 
                    startIcon={<img src={'/assets/email.jpg'} alt="Email" style={{ width: 24, height: 24, marginRight: 8 }} />}
                    sx={{ 
                        mb: 2, 
                        p:1,
                        borderColor: 'gray', 
                        color: 'gray', 
                        textTransform: 'none', 
                        '&:hover': { borderColor: 'white', backgroundColor: '#f0f0f0' } 
                    }}
                >
                    Continue with Email
                </Button>
                <Button 
                    variant="outlined" 
                    fullWidth 
                    startIcon={<img src={'/assets/apple.png'} alt="Apple" style={{ width: 24, height: 24, marginRight: 8 }} />}
                    sx={{ 
                        mb: 2, 
                        p:1,
                        borderColor: 'gray', 
                        color: 'gray', 
                        textTransform: 'none', 
                        '&:hover': { borderColor: 'white', backgroundColor: '#f0f0f0' } 
                    }}
                >
                    Continue with Apple
                </Button>
                <div style={{ textAlign: 'center', marginBottom: 10 }}>
                    <Typography variant="body2" color="textSecondary">
                        OR
                    </Typography>
                </div>
                <form>
                    <TextField
                        fullWidth
                        id="mobileNumber"
                        placeholder="Continue with mobile number"
                        variant="standard"
                        margin="normal"
                        value={mobileNumber}
                        onChange={handleMobileChange}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <FlagIcon src="/assets/indianFlag.png" alt="India" />
                                    +91
                                </InputAdornment>
                            ),
                        }}
                        error={!isMobileValid && mobileNumber.length > 0}
                        helperText={!isMobileValid && mobileNumber.length > 0 ? "Enter a valid mobile number" : ""}
                    />
                    <Button 
                        variant="contained" 
                        sx={{ 
                            mt: 6, 
                            textTransform: 'none', 
                            backgroundColor: '#F84364', 
                            '&:hover': { backgroundColor: '#F84364' } 
                        }}
                        type="submit" 
                        fullWidth 
                        disabled={!isMobileValid}
                    >
                        Sign In with Mobile Number
                    </Button>
                </form>
            </Box>
        </Modal>
    );
};

export default SignInModal;
