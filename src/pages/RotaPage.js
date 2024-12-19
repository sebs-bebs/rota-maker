import React from 'react';
import { Box } from '@mui/material';
import Calendar from '../components/Calendar';

const RotaPage = ({ shifts, onCellClick }) => {
  return (
    <Box sx={{ 
      pb: 7,
      height: 'calc(100vh - 120px)', // Account for bottom nav and padding
      display: 'flex',
      flexDirection: 'column'
    }}> 
      <Calendar 
        shifts={shifts}
        onCellClick={onCellClick}
      />
    </Box>
  );
};

export default RotaPage; 