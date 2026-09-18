import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0F4C4C',
    },
    secondary: {
      main: '#FF8B5E',
    },
    background: {
      default: '#FAF6F0',
      paper: '#FFFFFF',
    },
    success: {
      main: '#2E9E6C',
    },
    error: {
      main: '#E0554F',
    },
  },
  typography: {
    fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
    h1: { fontFamily: "'Fraunces', Georgia, serif", fontWeight: 700, letterSpacing: '-0.04em' },
    h2: { fontFamily: "'Fraunces', Georgia, serif", fontWeight: 700, letterSpacing: '-0.03em' },
    h3: { fontFamily: "'Fraunces', Georgia, serif", fontWeight: 700, letterSpacing: '-0.03em' },
  },
  shape: {
    borderRadius: 16,
  },
});

export default theme;