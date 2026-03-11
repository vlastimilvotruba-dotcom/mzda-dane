import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import App from './App';

const theme = createTheme({
  palette: {
    text: {
      primary: '#1a1a1a',       // nadpisy – téměř černá (default je #000)
      secondary: '#444444',     // popisky – tmavší šedá místo defaultní #666
    },
  },
  typography: {
    body1: {
      lineHeight: 1.7,          // o něco více vzdušný text = lépe čitelný
    },
    body2: {
      lineHeight: 1.6,
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
