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
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';

const StaffListContainer = styled(Paper)(({ theme }) => ({
  margin: theme.spacing(2),
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.divider}`,
  boxShadow: 'none',
}));

const ColorDot = styled(Box)(({ color }) => ({
  width: '12px',
  height: '12px',
  borderRadius: '50%',
  backgroundColor: color,
  marginRight: '8px',
  display: 'inline-block',
  verticalAlign: 'middle',
}));

const StaffList = ({ staffMembers, onEdit, onDelete }) => {
  return (
    <StaffListContainer>
      <Typography variant="h6" gutterBottom>
        Staff Members
      </Typography>
      <List>
        {staffMembers.map((staff, index) => (
          <ListItem key={index} divider>
            <ListItemText
              primary={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <ColorDot color={staff.color} />
                  <Typography>{`${staff.firstName} ${staff.lastName}`}</Typography>
                </Box>
              }
              secondary={
                <Box sx={{ mt: 1 }}>
                  <Chip 
                    label={staff.role}
                    size="small"
                    sx={{
                      backgroundColor: 'rgba(129, 212, 250, 0.15)',
                      color: '#81d4fa',
                      '&:hover': {
                        backgroundColor: 'rgba(129, 212, 250, 0.25)',
                      },
                    }}
                  />
                </Box>
              }
            />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="edit" onClick={() => onEdit(staff)}>
                <EditRoundedIcon />
              </IconButton>
              <IconButton edge="end" aria-label="delete" onClick={() => onDelete(staff)}>
                <DeleteRoundedIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </StaffListContainer>
  );
};

export default StaffList; 