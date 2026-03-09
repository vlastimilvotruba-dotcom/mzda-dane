// src/App.js – ručně ověř a případně uprav takto
import React from 'react';
import { Container, Typography, Paper } from '@mui/material';
import SalaryWizard from './components/SalaryWizard/SalaryWizard';

function App() {
  return (
    <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Mzda – daně 2026
      </Typography>
      <Paper elevation={3} sx={{ p: 3 }}>
        <SalaryWizard />
      </Paper>
    </Container>
  );
}

export default App;
