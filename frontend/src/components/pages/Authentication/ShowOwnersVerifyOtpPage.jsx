import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import styles from '../../css/ShowOwnersLoginPage.module.css';
import { ADMIN_EMAIL } from '../../organisms/Authentication/AdminEmail';
import showOwnersApi from '../../services/ShowOwnersApi';

const ShowOwnersVerifyOtpPage = () => {
    const location = useLocation();
    const { mobileNumber } = location.state || {}; // Access the mobile number from location state
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [resendLoading, setResendLoading] = useState(false);
    const [timer, setTimer] = useState(60); // Initialize timer with 60 seconds
    const [isResendAllowed, setIsResendAllowed] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (timer > 0) {
            const intervalId = setInterval(() => {
                setTimer(prevTimer => prevTimer - 1);
            }, 1000);

            return () => clearInterval(intervalId); // Cleanup the interval on component unmount
        } else {
            setIsResendAllowed(true); // Allow resend when timer reaches 0
        }
    }, [timer]);

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        const fullPhoneNumber = `+91${mobileNumber}`;

        try {
            const response = await showOwnersApi.verifyOtp(fullPhoneNumber, otp, 'show owner', 'pending');
            setMessage(response.message);
            if (response.message === 'OTP verified successfully') {
                localStorage.setItem('authToken', response.token);
                navigate('/show/accountSetup', { state: { mobileNumber: mobileNumber } });
            }
            // Redirect or perform further actions on successful verification
        } catch (error) {
            setMessage(error.response?.data?.error || 'Error verifying OTP');
        } finally {
            setLoading(false);
        }
    };

    const handleResendOtp = async () => {
        setResendLoading(true);
        setMessage('');

        const fullPhoneNumber = `+91${mobileNumber}`;

        try {
            const response = await showOwnersApi.sendOtp(fullPhoneNumber);
            setMessage('OTP resent successfully');
            setTimer(60); // Reset the timer when OTP is resent
            setIsResendAllowed(false); // Disable resend until timer expires
        } catch (error) {
            setMessage(error.response?.data?.error || 'Error resending OTP');
        } finally {
            setResendLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <div className={`${styles.column} ${styles.benefits}`}>
                <h1>Verify Your OTP</h1>
            </div>
            <div className={`${styles.column} ${styles.loginForm}`}>
                <form onSubmit={handleVerifyOtp}>
                    <div className={styles.header}>
                        <img src='/assets/logo.png' className={styles.logo} alt="Logo" />
                        <span className={styles.title}>Do it yourself</span>
                    </div>
                    <div className={styles.formGroup}>
                        <p>We have sent an OTP to +91{mobileNumber}</p>
                        <label className='fw-bolder'>OTP *</label>
                        <TextField
                            id="otp"
                            name="otp"
                            placeholder='Enter your OTP'
                            variant="outlined"
                            fullWidth
                            required
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                        />
                        {isResendAllowed ? (
                            <button
                                type="button"
                                onClick={handleResendOtp}
                                disabled={resendLoading}
                                className={styles.resendLink}
                            >
                                {resendLoading ? 'Resending...' : 'Resend OTP'}
                            </button>
                        ) : (
                            <p className={styles.timer}>Resend OTP in {Math.floor(timer / 60)}:{timer % 60 < 10 ? `0${timer % 60}` : timer % 60}</p>
                        )}
                    </div>
                    <Button variant="contained" color="primary" type="submit" disabled={loading}>
                        {loading ? 'Verifying...' : 'Verify OTP'}
                    </Button>
                </form>
                {message && <p>{message}</p>}
                <Divider className={styles.divider} />
                <div className={styles.footer}>
                    <p>Need to resend OTP? <a href="/show/register">Send Again</a></p>
                    <p>In case of any query, please mail to <a href={`mailto:${ADMIN_EMAIL}`}>{ADMIN_EMAIL}</a></p>
                </div>
            </div>
        </div>
    );
};

export default ShowOwnersVerifyOtpPage;
