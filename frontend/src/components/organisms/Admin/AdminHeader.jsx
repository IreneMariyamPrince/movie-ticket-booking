/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
import React from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import ConfirmationDialog from '../../molecules/ConfirmationDialog';
import Capitalize from '../../utilities/Capitalize';

const AdminHeader = () => {
  const location = useLocation();
  const currentPage = Capitalize(location.pathname.split('/').pop());
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/admin/login');
  };

  // Function to handle logout confirmation
  const handleLogoutConfirmation = () => {
    // Show confirmation dialog when logout button is clicked
    return (
      <ConfirmationDialog
        title='Are you sure you want to logout?'
        icon='warning'
        showCancelButton={true}
        confirmButtonColor='#3085d6'
        cancelButtonColor='#d33'
        confirmButtonText='Yes'
        cancelButtonText='No'
        confirmAction={handleLogout}
        feature={{ type: 'icon', className: 'material-icons cursor-pointer fs-4', content: 'logout' }}
      />
    );
  };

  return (
    <nav
      className='navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl'
      id='navbarBlur'
      data-scroll='true'
    >
      <div className='container-fluid py-1 px-3'>
        <nav aria-label='breadcrumb'>
          <ol className='breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5'>
            <li className='breadcrumb-item text-sm'>
              <Link className='opacity-5 text-dark' to='/'>
                Pages
              </Link>
            </li>
            <li className='breadcrumb-item text-sm text-dark active' aria-current='page'>
              {currentPage}
            </li>
          </ol>
          <h6 className='font-weight-bolder mb-0'>
            {currentPage}
          </h6>
        </nav>
        <div className='collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4 ' id='navbar'>
        <ul className='navbar-nav ms-auto'>
            <li className='nav-item'>
            <Link className='nav-link' to='/admin/profile'>
                <i className="material-icons fs-4">account_circle</i> {/* Material Icon for user */}
              </Link>
            </li>
            <li className='nav-item px-3 d-flex align-items-center'>
              {handleLogoutConfirmation()}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default AdminHeader;