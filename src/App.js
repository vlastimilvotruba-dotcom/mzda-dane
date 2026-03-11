import React, { useState } from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import SalaryWizard from './components/SalaryWizard/SalaryWizard';
import LoanCalculator from './components/LoanCalculator/LoanCalculator';
import CalculatorTiles from './components/CalculatorTiles/CalculatorTiles';
import HomeContent from './components/HomeContent/HomeContent';
import AdSlot from './components/Ads/AdSlot';
import Footer from './components/Footer/Footer';
import PrivacyPolicy from './components/PrivacyPolicy/PrivacyPolicy';
import AboutPage from './components/AboutPage/AboutPage';

const CALCULATOR_META = {
  salary2026: {
    title: 'Kalkulačka čisté mzdy 2026',
    subtitle: 'Výpočet čisté mzdy zaměstnance včetně odvodů a daňových slev.',
  },
  loan: {
    title: 'Kalkulačka půjčky',
    subtitle: 'Výpočet měsíční splátky, celkových nákladů a úroků půjčky nebo hypotéky.',
  },
  'annual-tax': {
    title: 'Roční daně zaměstnance',
    subtitle: 'Roční zúčtování daně z příjmu pro zaměstnance.',
  },
  'self-employed': {
    title: 'OSVČ / Paušální daň',
    subtitle: 'Výpočet odvodů a daní pro osoby samostatně výdělečně činné.',
  },
  privacy: {
    title: 'Zásady ochrany osobních údajů',
    subtitle: '',
  },
  about: {
    title: 'O webu',
    subtitle: '',
  },
};

function App() {
  const [activeCalculator, setActiveCalculator] = useState(null);
  const [activeColor, setActiveColor] = useState('#ffffff');

  const handleSelectCalculator = (id, color) => {
    setActiveCalculator(id);
    setActiveColor(color || '#ffffff');
  };

  const handleBackHome = () => {
    setActiveCalculator(null);
    setActiveColor('#ffffff');
  };

  const handleNavigate = (page) => {
    setActiveCalculator(page);
    setActiveColor('#ffffff');
  };

  const meta = activeCalculator ? CALCULATOR_META[activeCalculator] : null;
  const isStaticPage = activeCalculator === 'privacy' || activeCalculator === 'about';

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>

      {/* Header */}
      <Box
        mb={3}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        ml={2}
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
            <Box>
              <Typography
                variant="h6"
                component="h1"
                sx={{ display: { xs: 'none', sm: 'block' } }}
              >
                Mzda a daně
              </Typography>
              {meta?.subtitle && (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ display: { xs: 'none', sm: 'block' } }}
                >
                  {meta.subtitle}
                </Typography>
              )}
            </Box>
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
        <Box>
          <CalculatorTiles onSelect={handleSelectCalculator} />
          <Box mt={2}>
            <AdSlot id="home-bottom" position="bottom" />
          </Box>
          <HomeContent />
        </Box>
      )}

      {/* Kalkulačka čisté mzdy 2026 */}
      {activeCalculator === 'salary2026' && (
        <Box mt={4}>
          <Box mb={2}>
            <AdSlot id="salary-top" position="top" />
          </Box>

          <Box
            display="flex"
            flexDirection={{ xs: 'column', md: 'row' }}
            gap={2}
            justifyContent="center"
          >
            <Box
              sx={{
                width: '100%',
                maxWidth: 800,
                bgcolor: `${activeColor}55`,
                borderRadius: 2,
                p: { xs: 2, sm: 3 },
                boxShadow: 2,
                alignSelf: 'flex-start',
                //flexShrink: 0,
              }}
            >
              <Typography variant="h5" gutterBottom>
                {meta.title}
              </Typography>
              <SalaryWizard />
            </Box>

            <Box sx={{ width: { xs: '100%', md: 300 }, flexShrink: 0 }}>
              <AdSlot id="salary-side" position="side" />
            </Box>
          </Box>

          <Box mt={2}>
            <AdSlot id="salary-bottom" position="bottom" />
          </Box>
        </Box>
      )}

      {/* Kalkulačka půjčky */}
      {activeCalculator === 'loan' && (
        <Box mt={4}>
          <Box mb={2}>
            <AdSlot id="salary-top" position="top" />
          </Box>

          <Box
            display="flex"
            flexDirection={{ xs: 'column', md: 'row' }}
            gap={2}
            justifyContent="center"
          >
            <Box
              sx={{
                width: '100%',
                maxWidth: 800,
                bgcolor: '#e8f5e955',
                borderRadius: 2,
                p: { xs: 2, sm: 3 },
                boxShadow: 2,
                alignSelf: 'flex-start',
              }}
            >
              <Typography variant="h5" gutterBottom>
                Kalkulačka půjčky
              </Typography>
              <LoanCalculator />
            </Box>

            <Box sx={{ width: { xs: '100%', md: 300 }, flexShrink: 0 }}>
              <AdSlot id="salary-side" position="side" />
            </Box>
          </Box>

          <Box mt={2}>
            <AdSlot id="salary-bottom" position="bottom" />
          </Box>
        </Box>
      )}


      {/* Fallback stránky pro ostatní kalkulačky */}
      {activeCalculator &&
        activeCalculator !== 'salary2026' &&
        activeCalculator !== 'loan' &&
        !isStaticPage && (
        <Box mt={4}>
          <Box mb={2}>
            <AdSlot id="other-top" position="top" />
          </Box>

          <Box display="flex" justifyContent="center">
            <Box
              sx={{
                width: '100%',
                maxWidth: 800,
                bgcolor: `${activeColor}55`,
                borderRadius: 2,
                p: { xs: 2, sm: 3 },
                boxShadow: 2,
              }}
            >
              <Typography variant="h5" gutterBottom>
                {meta.title}
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph>
                {'Tato kalkulačka je aktuálně ve vývoji a bude brzy dostupná. Mezitím můžete využít naši kalkulačku čisté mzdy 2026.'}
              </Typography>
              <Typography variant="body1" color="text.secondary" gutterBottom>
                Chystáme výpočty pro:
              </Typography>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75, mt: 1 }}>
                {activeCalculator === 'dpp' && (
                  <>
                    <Typography variant="body2" color="text.secondary">
                      {'• Výpočet čisté odměny z DPP do 10 000 Kč (bez odvodů)'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {'• Výpočet čisté odměny z DPP nad 10 000 Kč (s odvody)'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {'• Výpočet odměny z DPČ včetně odvodů'}
                    </Typography>
                  </>
                )}
                {activeCalculator === 'annual-tax' && (
                  <>
                    <Typography variant="body2" color="text.secondary">
                      {'• Roční zúčtování daně z příjmu zaměstnance'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {'• Výpočet případného přeplatku nebo nedoplatku daně'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {'• Uplatnění ročních slev a odpočtů'}
                    </Typography>
                  </>
                )}
                {activeCalculator === 'self-employed' && (
                  <>
                    <Typography variant="body2" color="text.secondary">
                      {'• Výpočet odvodů OSVČ na sociální a zdravotní pojištění'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {'• Paušální daň a podmínky pro její uplatnění'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {'• Srovnání paušálních výdajů vs. skutečných nákladů'}
                    </Typography>
                  </>
                )}
              </Box>
            </Box>
          </Box>

          <Box mt={2}>
            <AdSlot id="other-bottom" position="bottom" />
          </Box>
        </Box>
      )}

      {/* Statické stránky: O webu, Privacy Policy */}
      {isStaticPage && (
        <Box mt={4} display="flex" justifyContent="center">
          <Box sx={{ width: '100%', maxWidth: 800 }}>
            {activeCalculator === 'privacy' && <PrivacyPolicy />}
            {activeCalculator === 'about' && <AboutPage />}
          </Box>
        </Box>
      )}

      {/* Footer – vždy viditelný */}
      <Footer onNavigate={handleNavigate} />

    </Container>
  );
}

export default App;
