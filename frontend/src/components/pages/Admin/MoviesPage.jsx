/* eslint-disable no-undef */ /* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
// import Modal from '../../molecules/Modal';
import Pagination from '../../molecules/Pagination';
// import regionApi from '../../services/RegionApi';
import { toast } from 'react-toastify';
// import { UserStatus } from '../../constants/Constants';
import { UserFilterStatus, DateFilterStatus } from '../../constants/FilterData';
// import DateFormatter from '../../atoms/DateFormatter';
import ConfirmationDialog from '../../molecules/ConfirmationDialog';
import FilterBox from '../../molecules/FilterBox';
import SearchBox from '../../molecules/SearchBox';
// import exportApi from '../../services/ExportApi';
// import RegionInfoCards from '../../organisms/AdminDashboard/RegionInfoCards';
import ThreeDotsLoader from '../../atoms/ThreeDotsLoader';
import moviesApi from '../../services/MovieApi';

const MoviesPage = () => {
    const [movies, setMovies] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [count, setCount] = useState(0);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState('');
    const [filterDate, setFilterDate] = useState('');
    const [loading, setLoading] = useState(true);
  
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await moviesApi.moviesList(page + 1, rowsPerPage, searchQuery);
        if (response) {
          setMovies(response.movies); // Ensure this matches your API response
          setCount(response.totalCount);
        }
      } catch (error) {
        console.error('Error fetching movies:', error);
        toast.error('Failed to fetch movies');
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      fetchData();
    }, [page, rowsPerPage, searchQuery, filterStatus, filterDate]);
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleSearch = query => setSearchQuery(query);
    const handleFilterStatus = value => setFilterStatus(value);
    const handleFilterDate = value => setFilterDate(value);
  
    const handleChangeRowsPerPage = async event => {
      const newRowsPerPage = parseInt(event.target.value, 10);
      setRowsPerPage(newRowsPerPage);
      setPage(0);
      await fetchData();
    };
  
    const toggleModal = () => setModalOpen(!modalOpen);
  
    const handleDeleteConfirmation = async id => {
      try {
        await moviesApi.deleteMovie(id);
        await fetchData();
        toast.success('Movie deleted successfully', { autoClose: 2000 });
      } catch (error) {
        console.error('Error deleting movie:', error.message);
        toast.error('Failed to delete movie');
      }
    };
  
    return (
      <>
        <div className='row'>
          <div className='col-12'>
            <div className='card my-4 mb-0'>
              <div className='card-header p-0 position-relative mt-n4 mx-3 z-index-2'>
                <div className='bg-gradient-primary shadow-primary border-radius-lg pt-4 px-3 pb-3 d-flex align-items-center justify-content-between'>
                  <h6 className='text-white text-capitalize ps-3 mb-0'>Movies List</h6>
                  <button type='button' className='btn btn-white'>
                    Export
                  </button>
                </div>
              </div>
              <div className='d-flex align-items-center justify-content-between px-5'>
                <FilterBox filterArray={DateFilterStatus} label='Date' filterValue={handleFilterDate} />
                <FilterBox filterArray={UserFilterStatus} label='Status' filterValue={handleFilterStatus} />
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
                          <th className='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>Movie</th>
                          <th className='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2'>Duration & Certification</th>
                          <th className='text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>Cast</th>
                          <th className='text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>Release Date</th>
                          <th className='text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {movies.length === 0 ? (
                          <tr>
                            <td colSpan='5' className='text-center text-sm'>No movies found</td>
                          </tr>
                        ) : (
                          movies.map((movie) => {
                            const { _id, Title, MovieImage, Genre, Duration, Certification, ReleaseDate, Cast } = movie;
                            return (
                              <tr key={_id}>
                                <td>
                                  <div className='d-flex px-2 py-1'>
                                    <img src={MovieImage} className='avatar avatar-sm me-3 border-radius-lg' alt={Title} />
                                    <div className='d-flex flex-column justify-content-center'>
                                      <h6 className='mb-0 text-sm'>{Title}</h6>
                                      <p className='text-xs text-secondary mb-0'>{Genre.join(', ')}</p>
                                    </div>
                                  </div>
                                </td>
                                <td>
                                  <p className='text-xs font-weight-bold mb-0'>{Duration}</p>
                                  <p className='text-xs text-secondary mb-0'>{Certification}</p>
                                </td>
                                <td>
                                  <div className='avatar-group mt-2'>
                                    {Cast.map(castMember => (
                                      <a key={castMember._id} href='#' className='avatar avatar-xs rounded-circle' data-bs-toggle='tooltip' data-bs-placement='bottom' title={castMember.Name}>
                                        <img src={castMember.Image} alt={castMember.Name} className='castAvatar' />
                                      </a>
                                    ))}
                                  </div>
                                </td>
                                <td className='align-middle text-center'>
                                  <span className='text-secondary text-xs font-weight-bold'>
                                    {new Date(ReleaseDate).toLocaleDateString()}
                                  </span>
                                </td>
                                <td className='align-middle text-center'>
                                  <div className='d-flex align-items-center justify-content-center'>
                                    <ConfirmationDialog
                                      title='Are you sure you want to delete this movie permanently?'
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
                          })
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
    
export default MoviesPage;