import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { 
  Paper, 
  Box, 
  Button, 
  FormControl,
  Select,
  MenuItem,
  IconButton, 
  Tooltip,
  Typography,
  Grid 
} from '@mui/material';
import { format, addDays, startOfWeek, endOfWeek, isToday, eachHourOfInterval, set } from 'date-fns';
import NavigateBeforeRoundedIcon from '@mui/icons-material/NavigateBeforeRounded';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';

// Available view options for the calendar
const VIEW_OPTIONS = [
  { value: 'day', label: 'Day' },
  { value: '3days', label: '3 Days' },
  { value: 'week', label: 'Week' },
  { value: '2weeks', label: '2 Weeks' },
  { value: 'month', label: 'Month' },
];

const TimeTableContainer = styled(Paper)(({ theme }) => ({
  overflow: 'auto',
  maxHeight: '80vh',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${theme.palette.divider}`,
  boxShadow: 'none',
  '@media (max-width: 600px)': {
    maxHeight: 'calc(100vh - 200px)',
  },
}));

// ViewControls - Sticky header for calendar navigation and view selection
// Responsive: Uses flex layout and hides certain elements on mobile
const ViewControls = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(2),
  position: 'sticky',
  top: 0,
  backgroundColor: theme.palette.background.paper,
  zIndex: 3, // Higher z-index to stay above grid
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

// TimeCell - Left column showing hours
// Responsive: Fixed width on all devices for consistency
const TimeCell = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
  fontSize: '0.75rem',
  width: '60px',
  textAlign: 'center',
}));

const HOURS = Array.from({ length: 24 }, (_, i) => i);
const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const DAYS_SHORT = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

// Update the calendar grid cell styles
const CalendarContent = styled(Box)(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  // Subtle background color to define grid without borders
  '& > div > div': {
    borderColor: 'transparent', // Remove visible borders
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    }
  }
}));

// HeaderRow - Contains day names, stays sticky while scrolling
// Responsive: Maintains full width on all devices
const HeaderRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  position: 'sticky',
  top: 64, // Height of ViewControls
  backgroundColor: theme.palette.background.paper,
  zIndex: 2,
  '& .header-cell': {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: theme.spacing(0.5), // Space between day name and date
  }
}));

const Calendar = ({ shifts = [], onCellClick }) => {
  const [viewType, setViewType] = useState(() => {
    return window.innerWidth < 600 ? '3days' : 'week';
  });
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 600 && viewType === 'week') {
        setViewType('3days');
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [viewType]);

  const timeSlots = eachHourOfInterval({
    start: set(new Date(), { hours: 0, minutes: 0 }),
    end: set(new Date(), { hours: 23, minutes: 0 }),
  });

  const getDaysToShow = () => {
    const start = startOfWeek(currentDate, { weekStartsOn: 1 });
    const days = [];
    const daysCount = viewType === 'week' ? 7 : viewType === '3days' ? 3 : 1;
    
    for (let i = 0; i < daysCount; i++) {
      days.push(addDays(start, i));
    }
    return days;
  };

  const formatTime = (date) => format(date, 'HH:mm');

  const handleViewChange = (event, newValue) => {
    setViewType(newValue);
  };

  const handleDateChange = (direction) => {
    const days = {
      day: 1,
      '3days': 3,
      week: 7,
      '2weeks': 14,
      month: 30,
    };
    
    setCurrentDate(prevDate => {
      const daysToAdd = days[viewType] * (direction === 'next' ? 1 : -1);
      return addDays(prevDate, daysToAdd);
    });
  };

  const getDateRangeText = () => {
    switch (viewType) {
      case 'day':
        return format(currentDate, 'MMMM d, yyyy');
      case '3days':
        return `${format(currentDate, 'MMM d')} - ${format(addDays(currentDate, 2), 'MMM d')}`;
      case 'week':
        return `${format(startOfWeek(currentDate), 'MMM d')} - ${format(endOfWeek(currentDate), 'MMM d')}`;
      case '2weeks':
        return `${format(currentDate, 'MMM d')} - ${format(addDays(currentDate, 13), 'MMM d')}`;
      case 'month':
        return format(currentDate, 'MMMM yyyy');
      default:
        return '';
    }
  };

  const formatDayHeader = (date) => {
    return format(date, 'EEE').toUpperCase();
  };

  // Helper function to format the day number (e.g., "15")
  const formatDayNumber = (date) => {
    return format(date, 'd');
  };

  return (
    <Box>
      <TimeTableContainer>
        <ViewControls>
          <Box sx={{ 
            display: { xs: 'none', sm: 'flex' },
            alignItems: 'center', 
            gap: 2,
          }}>
            <Button 
              variant="outlined" 
              onClick={() => setCurrentDate(new Date())}
              size="small"
            >
              Today
            </Button>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton onClick={() => handleDateChange('prev')}>
                <NavigateBeforeRoundedIcon />
              </IconButton>
              <IconButton onClick={() => handleDateChange('next')}>
                <NavigateNextRoundedIcon />
              </IconButton>
            </Box>
          </Box>

          <FormControl size="small" sx={{ minWidth: 120 }}>
            <Select
              value={viewType}
              onChange={(e) => setViewType(e.target.value)}
              variant="outlined"
            >
              {VIEW_OPTIONS.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </ViewControls>

        <CalendarContent>
          <HeaderRow>
            <Box sx={{ width: 80, p: 1, borderRight: 1, borderColor: 'divider' }}>
              <Typography variant="subtitle2" sx={{ visibility: 'hidden' }}>
                00:00
              </Typography>
            </Box>

            {getDaysToShow().map((day) => (
              <Box 
                key={day.toString()} 
                sx={{ 
                  flex: 1,
                  p: 1,
                  textAlign: 'center',
                  borderRight: 1,
                  borderColor: 'divider',
                  bgcolor: isToday(day) ? 'action.hover' : 'transparent'
                }}
              >
                <Box className="header-cell">
                  <Typography variant="subtitle2" sx={{ fontWeight: 500 }}>
                    {formatDayHeader(day)}
                  </Typography>
                  <Typography 
                    variant="caption" 
                    sx={{ 
                      opacity: 0.8,
                      fontWeight: isToday(day) ? 600 : 400 // Bold if today
                    }}
                  >
                    {formatDayNumber(day)}
                  </Typography>
                </Box>
              </Box>
            ))}
          </HeaderRow>

          <Box sx={{ display: 'flex' }}>
            <Box sx={{ borderRight: 1, borderColor: 'divider', width: 80 }}>
              {timeSlots.map((time) => (
                <Box 
                  key={time.toString()} 
                  sx={{ 
                    height: 60, 
                    display: 'flex', 
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderBottom: 1,
                    borderColor: 'divider',
                  }}
                >
                  <Typography variant="caption">{formatTime(time)}</Typography>
                </Box>
              ))}
            </Box>

            <Box sx={{ flex: 1, display: 'flex' }}>
              {getDaysToShow().map((day) => (
                <Box 
                  key={day.toString()} 
                  sx={{ 
                    flex: 1, 
                    borderRight: 1, 
                    borderColor: 'divider',
                  }}
                >
                  {timeSlots.map((time) => (
                    <Box 
                      key={time.toString()}
                      onClick={() => onCellClick(day, time)}
                      sx={{ 
                        height: 60, 
                        borderBottom: 1, 
                        borderColor: 'divider',
                        '&:hover': {
                          bgcolor: 'action.hover',
                          cursor: 'pointer'
                        }
                      }}
                    >
                      {/* Render shifts here */}
                    </Box>
                  ))}
                </Box>
              ))}
            </Box>
          </Box>
        </CalendarContent>
      </TimeTableContainer>
    </Box>
  );
};

export default Calendar; 