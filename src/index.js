import React from 'react';
import { hydrateRoot, createRoot } from 'react-dom/client';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';

const theme = createTheme({
  palette: {
    text: {
      primary: '#1a1a1a',
      secondary: '#444444',
    },
  },
  components: {
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: '#111111', // výchozí velmi tmavý
          '&.Mui-focused': {
            color: '#000000', // focus absolutně černý
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          borderColor: '#888888', // výchozí border
        },
      },
    },
  },
  typography: {
    body1: { lineHeight: 1.7 },
    body2: { lineHeight: 1.6 },
  },
});

const app = (
  <React.StrictMode>
    <HelmetProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </HelmetProvider>
  </React.StrictMode>
);

const rootElement = document.getElementById('root');

if (rootElement.hasChildNodes()) {
  hydrateRoot(rootElement, app);
} else {
  createRoot(rootElement).render(app);
}
