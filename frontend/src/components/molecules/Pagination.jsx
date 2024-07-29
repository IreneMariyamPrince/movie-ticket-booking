/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
// Pagination.js
import React from 'react';
import TablePagination from '@mui/material/TablePagination';

const Pagination = ({ count=0, page, onPageChange, rowsPerPage, onRowsPerPageChange }) => {
  return (
    <TablePagination
      component="div"
      count={count}
      page={page}
      onPageChange={onPageChange}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={onRowsPerPageChange}
    />
  );
};

export default Pagination;