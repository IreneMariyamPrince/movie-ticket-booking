import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import styles from '../../css/ShowOwnersLoginPage.module.css';
import { ADMIN_EMAIL } from '../../organisms/Authentication/AdminEmail';

const ShowOwnersLoginPage = () => {
  return (
    <div className={styles.container}>
      <div className={`${styles.column} ${styles.benefits}`}>
        <h1>Benefits of using - Do It Yourself, our new event management tool</h1>
      </div>
      <div className={`${styles.column} ${styles.loginForm}`}>
        <form>
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
            />
          </div>
          <div className={styles.formGroup}>
            <label className='fw-bolder'>Password *</label>
            <TextField
              id="password"
              name="password"
              placeholder='Enter your password'
              variant="outlined"
              fullWidth
              required
            />
          </div>
          <Button variant="contained" color="primary" type="submit">
            Proceed
          </Button>
        </form>
        <Divider className={styles.divider} />
        <div className={styles.footer}>
          <p>Do not have an account? <Link href="/show/register">Register</Link></p>
          <p>In case of any query, please mail to <a href={`mailto:${ADMIN_EMAIL}`}>{ADMIN_EMAIL}</a></p>
        </div>
      </div>
    </div>
  );
};

export default ShowOwnersLoginPage;
