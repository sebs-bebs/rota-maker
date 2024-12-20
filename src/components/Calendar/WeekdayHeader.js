import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const HeaderContainer = styled(Box)(({ theme }) => ({
  position: 'sticky',
  top: 0,
  zIndex: theme.zIndex.appBar,
  display: 'flex',
  overflowX: 'auto',
  backgroundColor: theme.palette.background.default,
  '&::-webkit-scrollbar': {
    display: 'none'
  },
  scrollbarWidth: 'none',
  msOverflowStyle: 'none',
  padding: theme.spacing(2, 0),
  borderBottom: `1px solid ${theme.palette.divider}`
}));

const DayCell = styled(Box)(({ theme, $isCurrentDay }) => ({
  minWidth: '200px',
  padding: theme.spacing(2),
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: theme.spacing(1),
  position: 'relative'
}));

const DayNumber = styled(Box)(({ theme, $isCurrentDay }) => ({
  width: '60px',
  height: '60px',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: $isCurrentDay ? theme.palette.primary.main : 'transparent',
  color: $isCurrentDay ? theme.palette.primary.contrastText : theme.palette.text.primary,
  fontSize: '2rem',
  fontWeight: $isCurrentDay ? 700 : 400
}));

const WeekdayLabel = styled(Typography)(({ theme, $isCurrentDay }) => ({
  color: $isCurrentDay ? theme.palette.primary.main : theme.palette.text.secondary,
  fontWeight: $isCurrentDay ? 600 : 400
}));

const WeekdayHeader = () => {
  const [currentDate] = useState(new Date());

  const getDayInfo = (offset) => {
    const date = new Date(currentDate);
    date.setDate(currentDate.getDate() + offset);
    return {
      day: date.toLocaleDateString('en-US', { weekday: 'short' }),
      date: date.getDate()
    };
  };

  const days = [-1, 0, 1].map(offset => getDayInfo(offset));

  return (
    <HeaderContainer>
      {days.map((day, index) => (
        <DayCell key={index} $isCurrentDay={index === 1}>
          <WeekdayLabel variant="subtitle1" $isCurrentDay={index === 1}>
            {day.day}
          </WeekdayLabel>
          <DayNumber $isCurrentDay={index === 1}>
            {day.date}
          </DayNumber>
        </DayCell>
      ))}
    </HeaderContainer>
  );
};

export default WeekdayHeader;
