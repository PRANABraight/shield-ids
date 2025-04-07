import { createTheme } from '@mui/material/styles';
import { purple, blue } from '@mui/material/colors';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: purple[500], // Purple primary color
    },
    secondary: {
      main: blue[500], // Blue secondary color
    },
    background: {
      default: '#121212', // Dark background
      paper: '#1e1e1e', // Dark paper background
    },
    text: {
      primary: '#ffffff', // White text
      secondary: '#b0b0b0', // Light gray text
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#1e1e1e', // Dark AppBar background
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#000000', // Dark Drawer background
        },
      },
    },
  },
});

export default darkTheme;
