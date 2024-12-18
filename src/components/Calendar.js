import React from 'react';
import { styled } from '@mui/material/styles';
import { Paper, Box, Typography } from '@mui/material';
import { format } from 'date-fns';

const TimeTableContainer = styled(Paper)(({ theme }) => ({
  overflow: 'auto',
  maxHeight: '80vh',
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.divider}`,
  boxShadow: 'none',
  '@media (max-width: 600px)': {
    maxHeight: 'calc(100vh - 200px)',
  },
}));

const TimeSlotCell = styled(Box)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  padding: theme.spacing(1),
  minHeight: '60px',
  backgroundColor: theme.palette.background.paper,
  '&:hover': {
    backgroundColor: '#f8f9fa',
    cursor: 'pointer',
  },
}));

const HeaderCell = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1),
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  fontWeight: 500,
  borderBottom: `1px solid ${theme.palette.divider}`,
  position: 'sticky',
  top: 0,
  zIndex: 1,
}));

const TimeCell = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
  fontSize: '0.75rem',
  width: '60px',
  textAlign: 'center',
  borderRight: `1px solid ${theme.palette.divider}`,
}));

const HOURS = Array.from({ length: 24 }, (_, i) => i);
const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const Calendar = ({ shifts = [], onCellClick }) => {
  return (
    <TimeTableContainer>
      <Box sx={{ display: 'grid', gridTemplateColumns: 'auto repeat(7, 1fr)' }}>
        {/* Header row */}
        <HeaderCell /> {/* Empty corner cell */}
        {DAYS.map(day => (
          <HeaderCell key={day}>
            <Typography variant="subtitle2">{day}</Typography>
          </HeaderCell>
        ))}

        {/* Time slots */}
        {HOURS.map(hour => (
          <React.Fragment key={hour}>
            <TimeCell>
              <Typography variant="caption">
                {format(new Date().setHours(hour, 0), 'HH:mm')}
              </Typography>
            </TimeCell>
            {DAYS.map(day => (
              <TimeSlotCell
                key={`${day}-${hour}`}
                onClick={() => onCellClick(day, hour)}
              >
                {/* Render shifts here if they exist for this time slot */}
                {shifts
                  .filter(shift => shift.day === day && shift.hour === hour)
                  .map(shift => (
                    <Box
                      key={shift.id}
                      sx={{
                        backgroundColor: 'primary.light',
                        p: 0.5,
                        borderRadius: 1,
                        mb: 0.5,
                      }}
                    >
                      <Typography variant="caption">
                        {shift.employeeName || 'Unassigned'}
                      </Typography>
                    </Box>
                  ))}
              </TimeSlotCell>
            ))}
          </React.Fragment>
        ))}
      </Box>
    </TimeTableContainer>
  );
};

export default Calendar; 