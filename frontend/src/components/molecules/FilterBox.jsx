import React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function FilterBox({ filterArray, label, onChange }) {
  const handleChange = event => {
    if (event.target.value !== 'All') {
      onChange(event.target.value);
    } else {
      onChange('');
    }
  };

  return (
    <FormControl variant='standard' sx={{ m: 1, width: 250 }}>
      <InputLabel>{label}</InputLabel>
      <Select onChange={handleChange} defaultValue='All'>
        <MenuItem value='All'>All</MenuItem>
        {filterArray?.map(({ status, value }) => (
          <MenuItem key={value} value={value}>
            {status}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
