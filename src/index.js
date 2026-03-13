import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';

const theme = createTheme({
  palette: {
    text: {
      primary:   '#1a1a1a',
      secondary: '#444444',
    },
  },
  components: {
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: '#111111',          // výchozí – velmi tmavá
          '&.Mui-focused': {
            color: '#000000',        // focus – absolutní černá
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          borderColor: '#888888',    // výchozí border
        },
      },
    },
  },
  typography: {
    body1: { lineHeight: 1.7 },
    body2: { lineHeight: 1.6 },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </HelmetProvider>
  </React.StrictMode>
);
