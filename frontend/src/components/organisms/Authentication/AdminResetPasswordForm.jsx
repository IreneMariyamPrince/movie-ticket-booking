/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from 'react-toastify';
import autheticationApi from '../../services/AuthenticationApi';

const AdminResetPasswordForm = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [token, setToken] = useState('');

  useEffect(() => {
    // Extract the token from the URL
    const urlParams = new URLSearchParams(location.search);
    const tokenParam = urlParams.get('token');
    setToken(tokenParam);
  }, [location.search]);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await autheticationApi.resetPassword(token, values.newPassword);
      toast.success('Password reset successful', { autoClose: 2000 });
      
      setTimeout(() => {
        navigate('/admin/login');
      }, 1500);
    } catch (error) {
      console.error(error);
      toast.error('Failed to reset password');
    } finally {
      setSubmitting(false);
    }
  };

  const initialValues = {
    newPassword: '',
    confirmPassword: '',
  };

  const validationSchema = Yup.object().shape({
    newPassword: Yup.string().required('New Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
      .required('Confirm Password is required'),
  });

  return (
    <div className='card p-4 shadow-lg rounded-lg'>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, touched, errors }) => (
          <Form>
            <div className='mb-3'>
              <Field
                id='newPassword'
                type='password'
                name='newPassword'
                placeholder='Enter New Password'
                className={`form-control border px-2 ${errors.newPassword && touched.newPassword && 'is-invalid'}`}
              />
              <ErrorMessage name='newPassword' component='div' className='invalid-feedback' />
            </div>

            <div className='mb-3'>
              <Field
                id='confirmPassword'
                type='password'
                name='confirmPassword'
                placeholder='Confirm New Password'
                className={`form-control border px-2 ${errors.confirmPassword && touched.confirmPassword && 'is-invalid'}`}
              />
              <ErrorMessage name='confirmPassword' component='div' className='invalid-feedback' />
            </div>

            <button type='submit' className='btn btn-primary btn-lg w-100' disabled={isSubmitting}>
              Reset Password
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AdminResetPasswordForm;