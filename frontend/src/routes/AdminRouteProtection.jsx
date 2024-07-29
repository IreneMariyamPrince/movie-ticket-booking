/* eslint-disable no-undef */
import React, { useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const AdminRouteProtection = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('authToken');

  useEffect(() => {
    if (!token) {
      navigate('/admin/login');
    } else {
      try {
        const decodedToken = jwtDecode(token);
        if (decodedToken.role !== 'admin') {
          navigate(-1); // Redirect to the previous location if not an admin
        }
      } catch (error) {
        console.error('Invalid token format');
        navigate('/admin/login');
      }
    }
  }, [navigate, token]);

  return token ? <Outlet /> : null;
};

export default AdminRouteProtection;
