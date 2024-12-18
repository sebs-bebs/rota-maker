import React from 'react';
import {
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Chip,
  Box,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';

const StaffListContainer = styled(Paper)(({ theme }) => ({
  margin: theme.spacing(2),
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.divider}`,
  boxShadow: 'none',
}));

const StaffList = ({ staffMembers, onEdit, onDelete }) => {
  return (
    <StaffListContainer>
      <Typography variant="h6" gutterBottom>
        Staff Members
      </Typography>
      <List>
        {staffMembers.map((staff) => (
          <ListItem key={staff.email} divider>
            <ListItemText
              primary={`${staff.firstName} ${staff.lastName}`}
              secondary={
                <Box sx={{ mt: 1 }}>
                  <Typography variant="body2">{staff.email}</Typography>
                  <Typography variant="body2">{staff.phone}</Typography>
                  <Box sx={{ mt: 1, display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {staff.skills.map((skill) => (
                      <Chip 
                        key={skill} 
                        label={skill} 
                        size="small"
                        sx={{
                          backgroundColor: 'rgba(26, 115, 232, 0.08)',
                          color: 'primary.main',
                          '&:hover': {
                            backgroundColor: 'rgba(26, 115, 232, 0.12)',
                          },
                        }}
                      />
                    ))}
                  </Box>
                </Box>
              }
            />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="edit" onClick={() => onEdit(staff)}>
                <span role="img" aria-label="edit">✏️</span>
              </IconButton>
              <IconButton edge="end" aria-label="delete" onClick={() => onDelete(staff)}>
                <span role="img" aria-label="delete">🗑️</span>
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </StaffListContainer>
  );
};

export default StaffList; 