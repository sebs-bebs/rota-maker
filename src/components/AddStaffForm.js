import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  RadioGroup,
  Radio,
  FormControlLabel,
} from '@mui/material';
import { styled } from '@mui/material/styles';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const ROLES = ['Bar', 'Events Op', 'Supervisor'];

// Google Calendar-inspired colors
const STAFF_COLORS = [
  { id: 1, name: 'Lavender', value: '#7986cb' },
  { id: 2, name: 'Sage', value: '#33b679' },
  { id: 3, name: 'Grape', value: '#8e24aa' },
  { id: 4, name: 'Flamingo', value: '#e67c73' },
  { id: 5, name: 'Banana', value: '#f6bf26' },
  { id: 6, name: 'Tangerine', value: '#f4511e' },
  { id: 7, name: 'Peacock', value: '#039be5' },
  { id: 8, name: 'Graphite', value: '#616161' },
  { id: 9, name: 'Blueberry', value: '#3f51b5' },
  { id: 10, name: 'Basil', value: '#0b8043' },
  { id: 11, name: 'Tomato', value: '#d50000' },
  { id: 12, name: 'Mandarin', value: '#ef6c00' },
  { id: 13, name: 'Ocean', value: '#01579b' },
  { id: 14, name: 'Forest', value: '#1b5e20' },
  { id: 15, name: 'Raspberry', value: '#ad1457' },
];

const ColorDot = styled(Box)(({ color }) => ({
  width: '20px',
  height: '20px',
  borderRadius: '50%',
  backgroundColor: color,
  marginRight: '8px',
  display: 'inline-block',
  verticalAlign: 'middle',
}));

// AddStaffForm.js - Modal form for adding/editing staff
// Responsive features:
// 1. Uses Grid system for form layout
// 2. Stacks form fields vertically on mobile
// 3. Responsive dialog that adjusts to screen size
// 4. Touch-friendly input fields and controls
const AddStaffForm = ({ open, onClose, onSubmit }) => {
  const [staffMember, setStaffMember] = useState({
    firstName: '',
    lastName: '',
    role: '',
    color: STAFF_COLORS[0].value,
    availability: DAYS.reduce((acc, day) => ({
      ...acc,
      [day]: { available: false, startTime: '09:00', endTime: '17:00' }
    }), {}),
    maxHoursPerWeek: '',
    minHoursPerWeek: '',
  });

  const handleChange = (field) => (event) => {
    setStaffMember({ ...staffMember, [field]: event.target.value });
  };

  const handleAvailabilityChange = (day, field) => (event) => {
    setStaffMember({
      ...staffMember,
      availability: {
        ...staffMember.availability,
        [day]: {
          ...staffMember.availability[day],
          [field]: field === 'available' ? event.target.checked : event.target.value
        }
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(staffMember);
    setStaffMember({
      firstName: '',
      lastName: '',
      role: '',
      color: STAFF_COLORS[0].value,
      availability: DAYS.reduce((acc, day) => ({
        ...acc,
        [day]: { available: false, startTime: '09:00', endTime: '17:00' }
      }), {}),
      maxHoursPerWeek: '',
      minHoursPerWeek: '',
    });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Add New Staff Member</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Box sx={{ 
            display: 'grid', 
            gap: 2,
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)'
            }
          }}>
            <TextField
              required
              label="First Name"
              value={staffMember.firstName}
              onChange={handleChange('firstName')}
              fullWidth
            />
            <TextField
              required
              label="Last Name"
              value={staffMember.lastName}
              onChange={handleChange('lastName')}
              fullWidth
            />
            <TextField
              required
              type="number"
              label="Min Hours per Week"
              value={staffMember.minHoursPerWeek}
              onChange={handleChange('minHoursPerWeek')}
              fullWidth
            />
            <TextField
              required
              type="number"
              label="Max Hours per Week"
              value={staffMember.maxHoursPerWeek}
              onChange={handleChange('maxHoursPerWeek')}
              fullWidth
            />
            
            <FormControl fullWidth required>
              <InputLabel>Role</InputLabel>
              <Select
                value={staffMember.role}
                onChange={handleChange('role')}
                label="Role"
              >
                {ROLES.map((role) => (
                  <MenuItem key={role} value={role}>
                    {role}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth required>
              <InputLabel>Staff Color</InputLabel>
              <Select
                value={staffMember.color}
                onChange={handleChange('color')}
                label="Staff Color"
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <ColorDot color={selected} />
                    {STAFF_COLORS.find(c => c.value === selected)?.name}
                  </Box>
                )}
              >
                {STAFF_COLORS.map((color) => (
                  <MenuItem key={color.id} value={color.value}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <ColorDot color={color.value} />
                      {color.name}
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
            Availability
          </Typography>
          <Box sx={{ display: 'grid', gap: 2 }}>
            {DAYS.map((day) => (
              <Box 
                key={day} 
                sx={{ 
                  display: 'grid',
                  gridTemplateColumns: {
                    xs: '1fr',  // Stack vertically on mobile
                    sm: '1fr 1fr 1fr'  // Three columns on tablet and up
                  },
                  gap: 2,
                  alignItems: 'center'
                }}
              >
                <Typography sx={{ 
                  fontWeight: 500,
                  mb: { xs: 1, sm: 0 }  // Add margin bottom only on mobile
                }}>
                  {day}
                </Typography>
                <TextField
                  type="time"
                  label="Start Time"
                  value={staffMember.availability[day].startTime}
                  onChange={handleAvailabilityChange(day, 'startTime')}
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  sx={{ mb: { xs: 1, sm: 0 } }}  // Add margin bottom only on mobile
                />
                <TextField
                  type="time"
                  label="End Time"
                  value={staffMember.availability[day].endTime}
                  onChange={handleAvailabilityChange(day, 'endTime')}
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                />
              </Box>
            ))}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained" color="primary">
            Add Staff Member
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddStaffForm; 