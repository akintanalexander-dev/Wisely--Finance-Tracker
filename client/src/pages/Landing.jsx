import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box, Container } from '@mui/material';

function Landing() {
  return (
    <Box>
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
          <Typography variant="h6" fontWeight={700}>
            Wisely
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button component={Link} to="/login" color="inherit">
              Log In
            </Button>
            <Button component={Link} to="/signup" variant="contained">
              Sign Up
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Container
        maxWidth="sm"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          py: 12,
        }}
      >
        <Typography variant="h3" fontWeight={700} gutterBottom>
          Take control of your money.
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Wisely helps you track income and expenses so you always know where you stand.
        </Typography>
        <Button component={Link} to="/signup" variant="contained" size="large">
          Get Started
        </Button>
      </Container>
    </Box>
  );
}

export default Landing;