import React from 'react';
import { Container, Box, Typography, Paper, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import Calendar from './components/Calendar/Calendar';

const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
}));

const StyledBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2)
}));

function App() {
  const currentTime = new Date('2024-12-20T04:56:37Z');
  
  return (
    <StyledBox>
      <Container maxWidth="lg">
        <Box sx={{ flexGrow: 1, mt: 4 }}>
          <Typography variant="h3" component="h1" gutterBottom align="center">
            Responsive Web App
          </Typography>
          
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={4}>
              <Item elevation={3}>
                <Typography variant="h6">Current Time</Typography>
                <Typography>{currentTime.toLocaleTimeString()}</Typography>
              </Item>
            </Grid>
            
            <Grid item xs={12} sm={6} md={4}>
              <Item elevation={3}>
                <Typography variant="h6">Current Date</Typography>
                <Typography>{currentTime.toLocaleDateString()}</Typography>
              </Item>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Item elevation={3}>
                <Typography variant="h6">Timezone</Typography>
                <Typography>{Intl.DateTimeFormat().resolvedOptions().timeZone}</Typography>
              </Item>
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ mt: 4 }}>
          <Calendar />
        </Box>
      </Container>
    </StyledBox>
  );
}

export default App;
