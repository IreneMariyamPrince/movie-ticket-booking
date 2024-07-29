import React from 'react';
import ThreeDotsLoader from '../../atoms/ThreeDotsLoader';
import ConfirmationDialog from '../../molecules/ConfirmationDialog';
import Pagination from '../../molecules/Pagination';
import FilterBox from '../../molecules/FilterBox';
import SearchBox from '../../molecules/SearchBox';
import TwoColumnsInfoCards from '../../organisms/Admin/TwoColumnsInfoCards';
import { DateFilterStatus } from '../../constants/FilterData';

const UserList = ({
  users,
  loading,
  count,
  activeCount,
  page,
  rowsPerPage,
  handleChangePage,
  handleChangeRowsPerPage,
  handleSearch,
  handleFilterDate,
  handleDeleteConfirmation,
}) => {
  return (
    <>
      <TwoColumnsInfoCards totalCount={count} totalActive={activeCount} />

      <div className='row'>
        <div className='col-12'>
          <div className='card my-4 mb-0'>
            <div className='card-header p-0 position-relative mt-n4 mx-3 z-index-2'>
              <div className='bg-gradient-primary shadow-primary border-radius-lg pt-4 px-3 pb-3 d-flex align-items-center justify-content-between'>
                <h6 className='text-white text-capitalize ps-3 mb-0'>Users List</h6>
                <button type='button' className='btn btn-white'>
                  Export{' '}
                </button>
              </div>
            </div>
            <div className='d-flex align-items-center justify-content-between px-5'>
              <FilterBox
                filterArray={DateFilterStatus}
                label='Date'
                onChange={handleFilterDate}
              />
              <SearchBox onSearch={handleSearch} />
            </div>
            {loading ? (
              <div
                className='d-flex align-items-center justify-content-center'
                style={{ minHeight: '100px' }}
              >
                <ThreeDotsLoader />
              </div>
            ) : (
              <div className='card-body px-0 pb-2'>
                <div className='table-responsive p-0'>
                  <table className='table align-items-center mb-0'>
                    <thead>
                      <tr>
                        <th className='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>Name</th>
                        <th className='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2'>Contact</th>
                        <th className='text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>Status</th>
                        <th className='text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users?.map((user, index) => {
                        const { FirstName, LastName, Email, UserStatus, PhoneNumber, ProfilePictureUrl } = user;
                        const Status = UserStatus.charAt(0).toUpperCase() + UserStatus.slice(1);
                        return (
                          <tr key={index}>
                            <td>
                              <div className='d-flex px-2 py-1'>
                                <div>
                                  <img src={ProfilePictureUrl} className='avatar avatar-sm me-3 border-radius-lg' alt='user' />
                                </div>
                                <div className='d-flex flex-column justify-content-center'>
                                  <h6 className='mb-0 text-sm'>{FirstName} {LastName}</h6>
                                </div>
                              </div>
                            </td>
                            <td>
                              <p className='text-xs font-weight-bold mb-0'>{PhoneNumber}</p>
                              <p className='text-xs text-secondary mb-0'>{Email}</p>
                            </td>
                            <td className='align-middle text-center text-sm'>
                              <span className={`badge badge-sm ${Status === 'Active' ? 'bg-gradient-success' : Status === 'Pending' ? 'bg-gradient-secondary' : 'bg-gradient-warning'}`}>
                                {Status}
                              </span>
                            </td>
                            <td className='align-middle text-center'>
                              <div className='d-flex align-items-center justify-content-center'>
                                <ConfirmationDialog
                                  title='Are you sure you want to delete this user permanently?'
                                  icon='warning'
                                  showCancelButton={true}
                                  confirmButtonColor='#3085d6'
                                  cancelButtonColor='#d33'
                                  confirmButtonText='Yes, delete it!'
                                  cancelButtonText='Cancel'
                                  confirmAction={() => handleDeleteConfirmation(user._id)}
                                  feature={{
                                    type: 'icon',
                                    className: 'material-icons opacity-10',
                                    content: 'delete',
                                  }}
                                />
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                      {users.length === 0 && (
                        <tr>
                          <td colSpan='4' className='text-center text-sm'>No data found</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
          <div className='d-flex justify-content-end align-items-center paginate'>
            <Pagination
              component='div'
              count={count}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default UserList;
