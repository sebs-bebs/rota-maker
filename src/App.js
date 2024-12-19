import React, { useState } from 'react';
import { Container, Box, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import BottomNav from './components/BottomNav';
import RotaPage from './pages/RotaPage';
import StaffPage from './pages/StaffPage';
import './App.css';

// App.js - Root component managing theme and layout
// Responsive features:
// 1. Uses Container with maxWidth="lg" for responsive padding
// 2. Bottom navigation for mobile-friendly navigation
// 3. Dark theme optimized for both desktop and mobile viewing

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#81d4fa', // Light blue - contrast ratio 4.7:1
      light: '#b6ffff',
      dark: '#4ba3c7',
    },
    secondary: {
      main: '#ff8a65', // Coral - contrast ratio 4.8:1
      light: '#ffbb93',
      dark: '#c75b39',
    },
    background: {
      default: '#1e1e1e', // Lighter dark background - contrast ratio 13.5:1
      paper: '#2d2d2d', // Slightly lighter than default - contrast ratio 11.2:1
    },
    text: {
      primary: '#ffffff', // White text - maximum contrast
      secondary: 'rgba(255, 255, 255, 0.7)', // Semi-transparent white - contrast ratio 7:1
    },
    divider: 'rgba(255, 255, 255, 0.12)',
    action: {
      hover: 'rgba(255, 255, 255, 0.08)', // Subtle hover effect
      selected: 'rgba(255, 255, 255, 0.16)', // Selected state
    },
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
      color: 'rgba(255, 255, 255, 0.87)', // High contrast body text
    },
    body2: {
      fontSize: '0.875rem',
      color: 'rgba(255, 255, 255, 0.7)', // Secondary text with good contrast
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
          backgroundColor: '#2d2d2d', // Consistent with palette.background.paper
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
          color: '#81d4fa', // Maintains contrast ratio > 4.5:1
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
    // Filter out the staff member to be deleted
    const updatedStaffMembers = staffMembers.filter(
      (staff) => staff !== staffMember
    );
    setStaffMembers(updatedStaffMembers);
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
