/* eslint-disable no-undef */ /* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import Pagination from '../../molecules/Pagination';
import { toast } from 'react-toastify';
import { DateFilterStatus, CastRoleFilterStatus } from '../../constants/FilterData';
import ConfirmationDialog from '../../molecules/ConfirmationDialog';
import FilterBox from '../../molecules/FilterBox';
import SearchBox from '../../molecules/SearchBox';
import ThreeDotsLoader from '../../atoms/ThreeDotsLoader';
import castApi from '../../services/CastApi';
// import DateFormatter from '../../atoms/DateFormatter';

const CastPage = () => {
    const [castData, setCastData] = useState([]);
    const [count, setCount] = useState();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterRole, setFilterRole] = useState('');
    const [filterDate, setFilterDate] = useState('');
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await castApi.castsList(page + 1, rowsPerPage, searchQuery, filterDate, filterRole);
            if (response) {
                setCastData(response.castMembers);
                setCount(response.totalCount);
            } else {
                console.log('Error fetching data');
            }
        } catch (error) {
            console.error('Error fetching cast data:', error);
        } finally {
            setLoading(false); // Set loading state to false when data fetching is complete
        }
    };

    useEffect(() => {
        fetchData(); // Call the async function immediately
    }, [page, rowsPerPage, searchQuery, filterRole, filterDate]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleSearch = query => {
        setSearchQuery(query);
    };
    const handleFilterRole = value => {
        setFilterRole(value);
    };
    const handleFilterDate = value => {
        setFilterDate(value);
    };

    const handleChangeRowsPerPage = async event => {
        const newRowsPerPage = parseInt(event.target.value, 10);
        setRowsPerPage(newRowsPerPage);
        setPage(0);
        await fetchData();
    };

    const handleDeleteConfirmation = async id => {
        try {
            // Call the delete action on confirmation
            await castApi.deleteCast(id);
            // If deletion is successful, fetch the updated data
            await fetchData();
            toast.success('Cast member deleted successfully', { autoClose: 2000 });
        } catch (error) {
            console.error('Error deleting cast member:', error.message);
        }
    };

    return (
        <>
            <div className='row'>
                <div className='col-12'>
                    <div className='card my-4 mb-0'>
                        <div className='card-header p-0 position-relative mt-n4 mx-3 z-index-2'>
                            <div className='bg-gradient-primary shadow-primary border-radius-lg pt-4 px-3 pb-3 d-flex justify-content-between align-items-center'>
                                <h6 className='text-white text-capitalize ps-3 mb-0'>Cast List</h6>
                                <div className='d-flex gap-2'>
                                    <button type='button' className='btn btn-white'>
                                        Add
                                    </button>
                                    <button type='button' className='btn btn-white'>
                                        Export
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className='d-flex align-items-center justify-content-between px-5'>
                            <FilterBox filterArray={DateFilterStatus} label='Date' onChange={handleFilterDate} />
                            <FilterBox filterArray={CastRoleFilterStatus} label='Role' onChange={handleFilterRole} />
                            <SearchBox onSearch={handleSearch} />
                        </div>
                        {loading ? ( // Conditional rendering based on loading state
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
                                                <th className='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>
                                                    Name
                                                </th>
                                                <th className='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2'>
                                                    Role
                                                </th>
                                                <th className='text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>
                                                    Actions
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {castData?.map((cast, index) => {
                                                const { _id, Name, Image, Role } = cast;
                                                const UserRole = Role.charAt(0).toUpperCase() + Role.slice(1);
                                                return (
                                                    <tr key={index}>
                                                        <td>
                                                            <div className='d-flex px-2 py-1'>
                                                                <div>
                                                                    <img
                                                                        src={Image}
                                                                        className='avatar avatar-sm me-3 border-radius-lg'
                                                                        alt='cast'
                                                                    />
                                                                </div>
                                                                <div className='d-flex flex-column justify-content-center'>
                                                                    <h6 className='mb-0 text-sm'>{Name}</h6>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <p className='text-xs font-weight-bold mb-0'>{UserRole}</p>
                                                        </td>
                                                        <td className='align-middle text-center'>
                                                            <div className='d-flex align-items-center justify-content-center'>
                                                                <ConfirmationDialog
                                                                    title='Are you sure you want to delete this cast member permanently?'
                                                                    icon='warning'
                                                                    showCancelButton={true}
                                                                    confirmButtonColor='#3085d6'
                                                                    cancelButtonColor='#d33'
                                                                    confirmButtonText='Yes, delete it!'
                                                                    cancelButtonText='Cancel'
                                                                    confirmAction={() => handleDeleteConfirmation(_id)}
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
                                            {castData && castData.length === 0 && (
                                                <tr>
                                                    <td colSpan='7' className='text-center text-sm'>
                                                        No data found
                                                    </td>
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

export default CastPage;
