import React from 'react';
import { Box, Button } from '@mui/material';
import AddStaffForm from '../components/AddStaffForm';
import StaffList from '../components/StaffList';

const StaffPage = ({ 
  staffMembers, 
  isAddStaffOpen, 
  setIsAddStaffOpen, 
  handleAddStaff, 
  handleEditStaff, 
  handleDeleteStaff 
}) => {
  return (
    <Box sx={{ pb: 7 }}> {/* Add padding bottom for navigation bar */}
      <Button 
        variant="contained" 
        color="primary" 
        onClick={() => setIsAddStaffOpen(true)}
        sx={{ mb: 2 }}
      >
        Add Staff Member
      </Button>
      
      <StaffList 
        staffMembers={staffMembers}
        onEdit={handleEditStaff}
        onDelete={handleDeleteStaff}
      />

      <AddStaffForm
        open={isAddStaffOpen}
        onClose={() => setIsAddStaffOpen(false)}
        onSubmit={handleAddStaff}
      />
    </Box>
  );
};

export default StaffPage; 