/* eslint-disable no-undef */
import React, { useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

const AuthenticatedRouteProtection = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('authToken');

  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        if (decodedToken) {
          navigate('/admin/dashboard'); // Redirect to dashboard if token is valid
        }
      } catch (error) {
        console.error('Invalid token format');
      }
    }
  }, [navigate, token]);

  return <Outlet />; // Always render the Outlet so the login page can be displayed
};

export default AuthenticatedRouteProtection;
