import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import InputAdornment from '@mui/material/InputAdornment';
import styles from '../../css/ShowOwnersLoginPage.module.css';
import { ADMIN_EMAIL } from '../../organisms/Authentication/AdminEmail';
import showOwnersApi from '../../services/ShowOwnersApi';
import { toast } from 'react-toastify';

const ShowOwnersRegisterPage = () => {
  const [mobile, setMobile] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const fullPhoneNumber = `+91${mobile}`;

    try {
      const response = await showOwnersApi.sendOtp(fullPhoneNumber);
      setMessage(response.message);
      toast.success(response.message); 
      navigate('/show/verifyOtp', { state: { mobileNumber: mobile } });
    } catch (error) {
      setMessage(error.response?.data?.error || 'Error sending OTP');
      toast.error(error.response?.data?.error || 'Error sending OTP');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={`${styles.column} ${styles.benefits}`}>
        <h1>Benefits of using - Do It Yourself, our new event management tool</h1>
      </div>
      <div className={`${styles.column} ${styles.loginForm}`}>
        <form onSubmit={handleSendOtp}>
          <div className={styles.header}>
            <img src='/assets/logo.png' className={styles.logo} alt="Logo" />
            <span className={styles.title}>Do it yourself</span>
          </div>
          <div className={styles.formGroup}>
            <label className='fw-bolder'>Mobile *</label>
            <TextField
              id="mobile"
              name="mobile"
              placeholder='Enter your mobile number'
              variant="outlined"
              fullWidth
              required
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <img src="/assets/indianFlag.png" alt="India" style={{ width: 20, marginRight: 5 }} />
                    +91
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <Button variant="contained" color="primary" type="submit" disabled={loading || mobile.length !== 10}>
            {loading ? 'Sending...' : 'Send OTP'}
          </Button>
        </form>
        {message && <p>{message}</p>}
        <Divider className={styles.divider} />
        <div className={styles.footer}>
          <p>Have an account? <Link href="/show/login">Sign In</Link></p>
          <p>In case of any query, please mail to <a href={`mailto:${ADMIN_EMAIL}`}>{ADMIN_EMAIL}</a></p>
        </div>
      </div>
    </div>
  );
};

export default ShowOwnersRegisterPage;
