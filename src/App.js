import React, { useState } from 'react';
import { Container, Box, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import BottomNav from './components/BottomNav';
import RotaPage from './pages/RotaPage';
import StaffPage from './pages/StaffPage';
import './App.css';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#81d4fa',
      light: '#b6ffff',
      dark: '#4ba3c7',
    },
    secondary: {
      main: '#ff8a65',
      light: '#ffbb93',
      dark: '#c75b39',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
    text: {
      primary: '#ffffff',
      secondary: 'rgba(255, 255, 255, 0.7)',
    },
    divider: 'rgba(255, 255, 255, 0.12)',
  },
  typography: {
    fontFamily: 'Google Sans, Roboto, Arial, sans-serif',
    h6: {
      fontWeight: 500,
      fontSize: '1.25rem',
      color: '#ffffff',
    },
    body1: {
      fontSize: '0.875rem',
      color: 'rgba(255, 255, 255, 0.87)',
    },
    body2: {
      fontSize: '0.875rem',
      color: 'rgba(255, 255, 255, 0.6)',
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: '#1e1e1e',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 1px 2px 0 rgba(0,0,0,0.3), 0 1px 3px 1px rgba(0,0,0,0.15)',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(129, 212, 250, 0.15)',
          color: '#81d4fa',
        },
      },
    },
  },
});

function App() {
  const [currentPage, setCurrentPage] = useState(0);
  const [shifts, setShifts] = useState([]);
  const [staffMembers, setStaffMembers] = useState([]);
  const [isAddStaffOpen, setIsAddStaffOpen] = useState(false);

  const handleCellClick = (day, hour) => {
    console.log(`Clicked ${day} at ${hour}:00`);
  };

  const handleAddStaff = (newStaffMember) => {
    setStaffMembers([...staffMembers, newStaffMember]);
    setIsAddStaffOpen(false);
  };

  const handleEditStaff = (staffMember) => {
    // Implement edit functionality
    console.log('Edit staff member:', staffMember);
  };

  const handleDeleteStaff = (staffMember) => {
    setStaffMembers(staffMembers.filter(staff => staff.email !== staffMember.email));
  };

  const renderPage = () => {
    switch (currentPage) {
      case 0:
        return (
          <RotaPage 
            shifts={shifts}
            onCellClick={handleCellClick}
          />
        );
      case 1:
        return (
          <StaffPage 
            staffMembers={staffMembers}
            isAddStaffOpen={isAddStaffOpen}
            setIsAddStaffOpen={setIsAddStaffOpen}
            handleAddStaff={handleAddStaff}
            handleEditStaff={handleEditStaff}
            handleDeleteStaff={handleDeleteStaff}
          />
        );
      default:
        return <RotaPage />;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Box sx={{ my: 4 }}>
          {renderPage()}
          <BottomNav 
            value={currentPage}
            onChange={(newValue) => setCurrentPage(newValue)}
          />
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;
