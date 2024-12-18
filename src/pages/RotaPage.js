import React from 'react';
import { Box } from '@mui/material';
import Calendar from '../components/Calendar';

const RotaPage = ({ shifts, onCellClick }) => {
  return (
    <Box sx={{ pb: 7 }}> {/* Add padding bottom for navigation bar */}
      <Calendar 
        shifts={shifts}
        onCellClick={onCellClick}
      />
    </Box>
  );
};

export default RotaPage; 