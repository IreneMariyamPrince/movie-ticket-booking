import React, { useState, useEffect } from 'react';
import ThreeColumnsInfoCards from './ThreeColumnsInfoCards';
import FilterBox from '../../molecules/FilterBox';
import SearchBox from '../../molecules/SearchBox';
import ThreeDotsLoader from '../../atoms/ThreeDotsLoader';
import Pagination from '../../molecules/Pagination';
import { DateFilterStatus, UserFilterStatus } from '../../constants/FilterData';
import showOwnersApi from '../../services/ShowOwnersApi';

const ShowOwnerList = () => {
    const [showOwners, setShowOwners] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState('');
    const [count, setCount] = useState(0);
    const [activeCount, setActiveCount] = useState(0);
    const [pendingCount, setPendingCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterDate, setFilterDate] = useState('');

    const fetchShowOwners = async () => {
        setLoading(true);
        try {
            const data = await showOwnersApi.showOwnersList(
                page + 1,
                rowsPerPage,
                searchQuery,
                filterDate,
                selectedStatus // Pass selectedStatus to API
            );
            setShowOwners(data.users);
            setCount(data.totalCount);
            setActiveCount(data.activeCount);
            setPendingCount(data.pendingCount);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching users:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchShowOwners(); 
    }, [page, rowsPerPage, searchQuery, filterDate, selectedStatus]); 

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
      };

      const handleChangeRowsPerPage = async event => {
        const newRowsPerPage = parseInt(event.target.value, 10);
        setRowsPerPage(newRowsPerPage);
        setPage(0);
        await fetchData();
      };

    const handleFilterStatus = (status) => {
        setSelectedStatus(status);
        setPage(0);
    };

    const handleFilterDate = (date) => {
        setFilterDate(date); // Update filterDate state
        setPage(0);
    };

    const handleSearch = query => {
        setSearchQuery(query);
        setPage(0);
      };

      const handleApproveReject = value => {

      }

      const openConfirmationDialog = (userId) => {
        setSelectedUserId(userId);
        setShowDialog(true);
      };

    return (
        <>
            <ThreeColumnsInfoCards
                totalCount={count}
                totalActive={activeCount}
                totalPending={pendingCount}
            />

            <div className='row'>
                <div className='col-12'>
                    <div className='card my-4 mb-0'>
                        <div className='card-header p-0 position-relative mt-n4 mx-3 z-index-2'>
                            <div className='bg-gradient-primary shadow-primary border-radius-lg pt-4 px-3 pb-3 d-flex align-items-center justify-content-between'>
                                <h6 className='text-white text-capitalize ps-3 mb-0'>Show Owners List</h6>
                                <button type='button' className='btn btn-white'>
                                    Export
                                </button>
                            </div>
                        </div>
                        <div className='d-flex align-items-center justify-content-between px-5'>
                            <FilterBox
                                filterArray={DateFilterStatus}
                                label='Date'
                                onChange={handleFilterDate}
                            />
                            <FilterBox
                                filterArray={UserFilterStatus}
                                label='Status'
                                onChange={handleFilterStatus}
                            />
                            <SearchBox onSearch={handleSearch} />
                        </div>
                        {loading ? (
                            <div className='d-flex align-items-center justify-content-center' style={{ minHeight: '100px' }}>
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
                                            {showOwners.map((showOwner, index) => {
                                                const { FirstName, LastName, Email, UserStatus, PhoneNumber, ProfilePictureUrl } = showOwner;
                                                const Status = UserStatus.charAt(0).toUpperCase() + UserStatus.slice(1);
                                                return (
                                                    <tr key={index}>
                                                        <td>
                                                            <div className='d-flex px-2 py-1'>
                                                                <div>
                                                                    <img src={ProfilePictureUrl} className='avatar avatar-sm me-3 border-radius-lg' alt='productionCompany' />
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
                                                            <span className={`badge badge-sm ${Status === 'Active' ? 'bg-gradient-success' : 'bg-gradient-secondary'}`}>
                                                                {Status}
                                                            </span>
                                                        </td>
                                                        <td className='text-center'>
                                                            <div className='dropdown'>
                                                                <button className='btn btn-link text-secondary mb-0' id='dropdownMenuButton' data-bs-toggle='dropdown' aria-expanded='false'>
                                                                    <i className='fa fa-ellipsis-v text-xs'></i>
                                                                </button>
                                                                <ul className='dropdown-menu' aria-labelledby='dropdownMenuButton'>
                                                                    <li>
                                                                        <a className='dropdown-item' href='#' onClick={() => handleApproveReject(productionCompany.id)}>
                                                                            Approve/Reject
                                                                        </a>
                                                                    </li>
                                                                    <li>
                                                                        <a className='dropdown-item' href='#' onClick={() => openConfirmationDialog(productionCompany.id)}>
                                                                            Delete
                                                                        </a>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                            {showOwners.length === 0 && (
                                                <tr>
                                                    <td colSpan='5' className='text-center text-sm'>No data found</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                    </div>
                    {/* Pagination */}
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

export default ShowOwnerList;
