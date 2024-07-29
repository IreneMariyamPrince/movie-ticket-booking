/* eslint-disable no-undef */ /* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import usersApi from '../../services/UserApi';
import { toast } from 'react-toastify';
import UserList from '../../organisms/Admin/UserList';
import ProductionCompanyList from '../../organisms/Admin/ProductionCompanyList';
import ShowOwnerList from '../../organisms/Admin/ShowOwnerList';

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [count, setCount] = useState(0);
  const [activeCount, setActiveCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterDate, setFilterDate] = useState('');

  useEffect(() => {
    fetchUsers();
  }, [page, rowsPerPage, searchQuery, filterDate]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await usersApi.usersList(page + 1, rowsPerPage, searchQuery, filterDate);
      setUsers(data.users);
      setCount(data.totalCount); // Assuming the API returns a total count of users
      setActiveCount(data.activeCount)
      setLoading(false);
    } catch (error) {
      console.error('Error fetching users:', error);
      setLoading(false);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleSearch = query => {
    setSearchQuery(query);
    setPage(0);
  };
  const handleFilterStatus = value => {
    setFilterStatus(value);
    setPage(0);
  };
  const handleFilterDate = value => {
    setFilterDate(value);
    setPage(0);
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
      await usersApi.deleteUser(id);
      // If deletion is successful, fetch the updated data
      await fetchUsers();
      toast.success('User deleted successfully', { autoClose: 2000 });
    } catch (error) {
      console.error('Error deleting region:', error.message);
      toast.error('Failed to delete user', { autoClose: 2000 });
    }
  };

  const openConfirmationDialog = (userId) => {
    setSelectedUserId(userId);
    setShowDialog(true);
  };

  return (
    <>
      <nav className='mb-4'>
        <div class="nav nav-tabs" id="nav-tab" role="tablist">
          <button class="nav-link active" id="nav-public-tab" data-bs-toggle="tab" data-bs-target="#nav-public" type="button" role="tab" aria-controls="nav-public" aria-selected="true">Public Users</button>
          <button class="nav-link" id="nav-production-tab" data-bs-toggle="tab" data-bs-target="#nav-production" type="button" role="tab" aria-controls="nav-production" aria-selected="false">Production Companies</button>
          <button class="nav-link" id="nav-show-tab" data-bs-toggle="tab" data-bs-target="#nav-show" type="button" role="tab" aria-controls="nav-show" aria-selected="false">Show Owners</button>
        </div>
      </nav>
      <div class="tab-content" id="nav-tabContent">

        <div class="tab-pane fade show active" id="nav-public" role="tabpanel" aria-labelledby="nav-public-tab" tabindex="0">
          <UserList
            users={users}
            loading={loading}
            count={count}
            activeCount={activeCount}
            page={page}
            rowsPerPage={rowsPerPage}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            handleSearch={handleSearch}
            handleFilterStatus={handleFilterStatus}
            handleFilterDate={handleFilterDate}
            handleDeleteConfirmation={handleDeleteConfirmation}
          />
        </div>

        <div class="tab-pane fade" id="nav-production" role="tabpanel" aria-labelledby="nav-production-tab" tabindex="0">
          <ProductionCompanyList />
        </div>

        <div class="tab-pane fade" id="nav-show" role="tabpanel" aria-labelledby="nav-show-tab" tabindex="0">
          <ShowOwnerList />
        </div>
      </div>
    </>
  );
};

export default UsersPage;