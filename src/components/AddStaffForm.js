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
  Chip,
  Typography,
} from '@mui/material';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const SKILLS = ['Bartender', 'Server', 'Host', 'Kitchen Staff', 'Manager'];

const AddStaffForm = ({ open, onClose, onSubmit }) => {
  const [staffMember, setStaffMember] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    skills: [],
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
      email: '',
      phone: '',
      skills: [],
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
          <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: 'repeat(2, 1fr)' }}>
            <TextField
              required
              label="First Name"
              value={staffMember.firstName}
              onChange={handleChange('firstName')}
            />
            <TextField
              required
              label="Last Name"
              value={staffMember.lastName}
              onChange={handleChange('lastName')}
            />
            <TextField
              required
              type="email"
              label="Email"
              value={staffMember.email}
              onChange={handleChange('email')}
            />
            <TextField
              required
              label="Phone"
              value={staffMember.phone}
              onChange={handleChange('phone')}
            />
            <TextField
              required
              type="number"
              label="Min Hours per Week"
              value={staffMember.minHoursPerWeek}
              onChange={handleChange('minHoursPerWeek')}
            />
            <TextField
              required
              type="number"
              label="Max Hours per Week"
              value={staffMember.maxHoursPerWeek}
              onChange={handleChange('maxHoursPerWeek')}
            />
            
            <FormControl fullWidth>
              <InputLabel>Skills</InputLabel>
              <Select
                multiple
                value={staffMember.skills}
                onChange={handleChange('skills')}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}
              >
                {SKILLS.map((skill) => (
                  <MenuItem key={skill} value={skill}>
                    {skill}
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
              <Box key={day} sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 2, alignItems: 'center' }}>
                <Typography>{day}</Typography>
                <TextField
                  type="time"
                  label="Start Time"
                  value={staffMember.availability[day].startTime}
                  onChange={handleAvailabilityChange(day, 'startTime')}
                  InputLabelProps={{ shrink: true }}
                />
                <TextField
                  type="time"
                  label="End Time"
                  value={staffMember.availability[day].endTime}
                  onChange={handleAvailabilityChange(day, 'endTime')}
                  InputLabelProps={{ shrink: true }}
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