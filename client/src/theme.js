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
    fontFamily: "'Segoe UI', sans-serif",
  },
  shape: {
    borderRadius: 12,
  },
});

export default theme;