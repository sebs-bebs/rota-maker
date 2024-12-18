import React from 'react';
import { Paper, BottomNavigation, BottomNavigationAction } from '@mui/material';
import { styled } from '@mui/material/styles';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';

const StyledBottomNavigation = styled(BottomNavigation)(({ theme }) => ({
  position: 'fixed',
  bottom: 0,
  left: 0,
  right: 0,
  zIndex: theme.zIndex.appBar,
  borderTop: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.background.paper,
  '& .MuiBottomNavigationAction-root': {
    color: theme.palette.text.secondary,
    '&.Mui-selected': {
      color: theme.palette.primary.main,
    },
  },
}));

const BottomNav = ({ value, onChange }) => {
  return (
    <Paper elevation={3} square>
      <StyledBottomNavigation
        value={value}
        onChange={(event, newValue) => {
          onChange(newValue);
        }}
        showLabels
      >
        <BottomNavigationAction 
          label="Rota" 
          icon={<CalendarMonthRoundedIcon />} 
        />
        <BottomNavigationAction 
          label="Staff" 
          icon={<PeopleAltRoundedIcon />} 
        />
      </StyledBottomNavigation>
    </Paper>
  );
};

export default BottomNav; 