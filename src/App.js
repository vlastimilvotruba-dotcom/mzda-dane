import React, { useState } from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import SalaryWizard from './components/SalaryWizard/SalaryWizard';
import CalculatorTiles from './components/CalculatorTiles/CalculatorTiles';

function App() {
  const [activeCalculator, setActiveCalculator] = useState(null); 
  const [activeColor, setActiveColor] = useState('#ffffff');

  const handleSelectCalculator = (id, color) => {
    if (id === 'salary2026') {
      setActiveCalculator('salary2026');
      setActiveColor(color || '#ffffff');
    } else {
      alert('Tato kalkulačka bude teprve doplněna.');
    }
  };

  const handleBackHome = () => {
    setActiveCalculator(null);
    setActiveColor('#ffffff');
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box
        mb={3}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box>
          {!activeCalculator && (
            <>
              <Typography variant="h4" component="h1" gutterBottom>
                Mzda a daně
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Jednoduché kalkulačky pro mzdu a daně v ČR.
              </Typography>
            </>
          )}

          {activeCalculator && (
            <Typography
              variant="h6"
              component="h1"
              sx={{ display: { xs: 'none', sm: 'block' } }}
            >
              Mzda a daně
            </Typography>
          )}
        </Box>

        {activeCalculator && (
          <Button
            variant="outlined"
            size="small"
            onClick={handleBackHome}
            sx={{
              fontSize: { xs: '0.75rem', sm: '0.875rem' },
              py: { xs: 0.5, sm: 0.75 },
              px: { xs: 1.25, sm: 2 },
            }}
          >
            Zpět na úvod
          </Button>
        )}
      </Box>

      {/* Úvodní rozcestník */}
      {!activeCalculator && (
        <CalculatorTiles onSelect={handleSelectCalculator} />
      )}

      {/* Stránka kalkulačky čisté mzdy 2026 */}
      {activeCalculator === 'salary2026' && (
        <Box mt={4} display="flex" justifyContent="center">
          <Box
            sx={{
              width: '100%',
              maxWidth: 800,
              bgcolor: `${activeColor}55`, // jemné tónované pozadí
              borderRadius: 2,
              p: { xs: 2, sm: 3 },
            }}
          >
            <Typography variant="h5" gutterBottom>
              Kalkulačka čisté mzdy 2026
            </Typography>
            <SalaryWizard />
          </Box>
        </Box>
      )}
    </Container>
  );
}

export default App;
