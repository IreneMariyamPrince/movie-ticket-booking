/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import React from 'react';
import AdminSideBar from '../organisms/Admin/AdminSidebar';
import AdminHeader from '../organisms/Admin/AdminHeader';

const AdminLayout = ({ children }) => {
  return (
    <>
      <div className='g-sidenav-show  bg-gray-200'>
        <AdminSideBar />
        <main className='main-content position-relative max-height-vh-100 h-100 border-radius-lg '>
          {/* Navbar */}
          <AdminHeader />
          {/* End Navbar */}
          <div className='container-fluid py-4'>
            {children}
          </div>

        </main>
      </div>
    </>
  );
};

export default AdminLayout;