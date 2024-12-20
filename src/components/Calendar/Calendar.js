import React from 'react';
import { Paper, Box, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';
import WeekdayHeader from './WeekdayHeader';

const CalendarContainer = styled(Paper)(({ theme }) => ({
  width: '100%',
  maxWidth: '100%',
  margin: '0 auto',
  borderRadius: theme.shape.borderRadius,
  overflow: 'hidden',
  backgroundColor: theme.palette.mode === 'dark' ? '#1a1a1a' : '#ffffff',
  position: 'relative'
}));

const ContentContainer = styled(Box)({
  position: 'relative',
  height: '100%'
});

const Calendar = () => {
  const theme = useTheme();

  return (
    <CalendarContainer elevation={0}>
      <ContentContainer>
        <WeekdayHeader />
        {/* Other calendar components will be added here */}
      </ContentContainer>
    </CalendarContainer>
  );
};

export default Calendar;
