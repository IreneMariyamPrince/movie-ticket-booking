/* eslint-disable no-undef */
import React, { useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const ShowOwnerRouteProtection = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('authToken');

  useEffect(() => {
    if (!token) {
      navigate('/show/login');
    } else {
      try {
        const decodedToken = jwtDecode(token);
        if (decodedToken.userRole !== 'show owner') {
          navigate(-1); // Redirect to the previous location if not an show owner
        }
      } catch (error) {
        console.error('Invalid token format');
        navigate('/show/login');
      }
    }
  }, [navigate, token]);

  return token ? <Outlet /> : null;
};

export default ShowOwnerRouteProtection;
