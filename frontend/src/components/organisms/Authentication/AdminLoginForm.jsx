/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import autheticationApi from '../../services/AuthenticationApi';
import { useNavigate } from 'react-router-dom';
import { ADMIN_EMAIL } from './AdminEmail';

const AdminLoginForm = () => {
    const navigate = useNavigate();
    const initialValues = {
        Email: '',
        Password: '',
        rememberMe: false,
    };

    const validationSchema = Yup.object().shape({
        Email: Yup.string().email('Invalid email').required('Email is required'),
        Password: Yup.string().required('Password is required'),
    });

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        try {
            const response = await autheticationApi.adminLogin(values);
            console.log('API response:', response);
            if (response.token && response.redirectTo) {
                toast.success('Authentication successful', { autoClose: 2000 });
                localStorage.setItem('authToken', response.token);
                navigate(response.redirectTo);
                resetForm();
            } else {
                toast.error(response.message, { autoClose: 2000 });
            }
        } catch (error) {
            toast.error('Login failed.', { autoClose: 2000 });
        } finally {
            setSubmitting(false);
        }
    };

    const handleForgotPassword = async () => {
        try {
            const response = await autheticationApi.adminForgotPassword(`${ADMIN_EMAIL}`);
            if (response.success) {
                toast.success('Check your email for the reset password link', { autoClose: 2000 });
            } else {
                toast.error(response.error || 'Failed to send reset password email', { autoClose: 2000 });
            }
        } catch (error) {
            toast.error('Failed to send reset password email', { autoClose: 2000 });
        }
    };

    const [rememberMe, setRememberMe] = useState(false);

    const handleRememberMeToggle = () => {
        setRememberMe(!rememberMe);
    };

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
                                type='email'
                                name='Email'
                                placeholder='Email'
                                className={`form-control border px-2 ${errors.Email && touched.Email && 'is-invalid'}`}
                            />
                            <ErrorMessage name='Email' component='div' className='invalid-feedback' />
                        </div>

                        <div className='mb-3'>
                            <Field
                                type='password'
                                name='Password'
                                placeholder='Password'
                                className={`form-control border px-2 ${errors.Password && touched.Password && 'is-invalid'}`}
                            />
                            <ErrorMessage name='Password' component='div' className='invalid-feedback' />
                        </div>

                        <div className='mb-3 form-check ps-0'>
                            <input
                                type='checkbox'
                                id='rememberMe'
                                className='form-check-input'
                                checked={rememberMe}
                                onChange={handleRememberMeToggle}
                            />
                            <label htmlFor='rememberMe' className='form-check-label'>
                                Remember me
                            </label>
                        </div>

                        <button type='submit' className='btn btn-primary btn-lg w-100' disabled={isSubmitting}>
                            Sign in
                        </button>
                        <p className='mb-2 text-center text-sm mx-auto'>
                            Forgot your password? &nbsp;
                            <Link
                                to='#'
                                className='text-primary text-gradient font-weight-bold'
                                onClick={handleForgotPassword}
                            >
                                Forgot Password
                            </Link>
                        </p>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default AdminLoginForm;
