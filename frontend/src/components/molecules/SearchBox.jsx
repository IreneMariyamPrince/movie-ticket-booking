/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */
import * as React from 'react';
import TextField from '@mui/material/TextField';

export default function SearchBox({ onSearch }) {

  const handleSearchChange = (event) => {
    const query = event.target.value;
    onSearch(query);
  };

  return (
    
      <TextField id="standard-basic" label="Search" variant="standard" className='w-25 ms-5'  onChange={handleSearchChange} />
  
  );
}