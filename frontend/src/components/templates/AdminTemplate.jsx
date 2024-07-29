/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import AdminLayout from '../layouts/AdminLayout';

const AdminTemplate = ({ children }) => {
  return <AdminLayout>{children}</AdminLayout>;
};

export default AdminTemplate;