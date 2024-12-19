import React from 'react';
import { Paper, Typography, Box, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';

const ShiftContainer = styled(Paper)(({ theme, color }) => ({
  padding: theme.spacing(1),
  margin: theme.spacing(0.5),
  backgroundColor: color || theme.palette.primary.light,
  color: '#ffffff',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderRadius: theme.shape.borderRadius,
  opacity: 0.9,
  '&:hover': {
    opacity: 1,
    boxShadow: '0 1px 2px 0 rgba(60,64,67,0.3), 0 1px 3px 1px rgba(60,64,67,0.15)',
  },
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  color: 'white',
  opacity: 0.9,
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    opacity: 1,
  },
}));

const ShiftBlock = ({ shift, onEdit, onDelete }) => {
  return (
    <ShiftContainer elevation={1} color={shift.staffColor}>
      <Box>
        <Typography variant="caption" display="block">
          {shift.startTime} - {shift.endTime}
        </Typography>
        <Typography variant="body2">
          {shift.employeeName || 'Unassigned'}
        </Typography>
      </Box>
      <Box>
        {onEdit && (
          <StyledIconButton size="small" onClick={() => onEdit(shift)}>
            <EditRoundedIcon fontSize="small" />
          </StyledIconButton>
        )}
        {onDelete && (
          <StyledIconButton size="small" onClick={() => onDelete(shift)}>
            <DeleteRoundedIcon fontSize="small" />
          </StyledIconButton>
        )}
      </Box>
    </ShiftContainer>
  );
};

export default ShiftBlock; 