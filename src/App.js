import React, { useState } from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import BadgeIcon from '@mui/icons-material/Badge';
import SalaryWizard from './components/SalaryWizard/SalaryWizard';
import LoanCalculator from './components/LoanCalculator/LoanCalculator';
import AnnualTaxWizard from './components/AnnualTax/AnnualTaxWizard';
import CalculatorTiles from './components/CalculatorTiles/CalculatorTiles';
import HomeContent from './components/HomeContent/HomeContent';
import AdSlot from './components/Ads/AdSlot';
import Footer from './components/Footer/Footer';
import PrivacyPolicy from './components/PrivacyPolicy/PrivacyPolicy';
import AboutPage from './components/AboutPage/AboutPage';

const CALCULATOR_META = {
  'salary2026': {
    title:    'Kalkulačka čisté mzdy 2026',
    subtitle: 'Výpočet čisté mzdy zaměstnance včetně odvodů a daňových slev.',
  },
  'loan': {
    title:    'Kalkulačka půjčky',
    subtitle: 'Výpočet měsíční splátky, celkových nákladů a úroků půjčky nebo hypotéky.',
  },
  'annual-tax': {
    title:    'Roční zúčtování daní 2026',
    subtitle: 'Výpočet přeplatku nebo nedoplatku daně z příjmu zaměstnance.',
  },
  'self-employed': {
    title:    'OSVČ / Paušální daň',
    subtitle: 'Výpočet odvodů a daní pro osoby samostatně výdělečně činné.',
  },
  'privacy': {
    title:    'Zásady ochrany osobních údajů',
    subtitle: '',
  },
  'about': {
    title:    'O webu',
    subtitle: '',
  },
};

// Stejné akcenty a ikony jako v CalculatorTiles
const TILE_ACCENT = {
  'salary2026':    '#1565c0',
  'loan':          '#2e7d32',
  'annual-tax':    '#e65100',
  'self-employed': '#6a1b9a',
};

const TILE_ICON = {
  'salary2026':    AccountBalanceWalletIcon,
  'loan':          AccountBalanceIcon,
  'annual-tax':    ReceiptLongIcon,
  'self-employed': BadgeIcon,
};

function CalcTitle({ id, title }) {
  const accent = TILE_ACCENT[id];
  const Icon   = TILE_ICON[id];

  if (!accent) {
    // Statické stránky (privacy, about) – bez ikony a barvy
    return (
      <Typography variant="h5" gutterBottom>
        {title}
      </Typography>
    );
  }

  return (
    <Box display="flex" alignItems="center" gap={1} mb={1}>
      {Icon && <Icon sx={{ color: accent, fontSize: 28 }} />}
      <Typography variant="h5" fontWeight={700} sx={{ color: accent }}>
        {title}
      </Typography>
    </Box>
  );
}

function App() {
  const [activeCalculator, setActiveCalculator] = useState(null);
  const [activeColor, setActiveColor]           = useState('#ffffff');

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

  const meta          = activeCalculator ? CALCULATOR_META[activeCalculator] : null;
  const isStaticPage  = activeCalculator === 'privacy' || activeCalculator === 'about';
  const isImplemented =
    activeCalculator === 'salary2026' ||
    activeCalculator === 'loan' ||
    activeCalculator === 'annual-tax';

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>

      {/* ── Header ── */}
      <Box mb={3} display="flex" justifyContent="space-between" alignItems="center" ml={2}>
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
              py:       { xs: 0.5,       sm: 0.75 },
              px:       { xs: 1.25,      sm: 2 },
            }}
          >
            Zpět na úvod
          </Button>
        )}
      </Box>

      {/* ── Úvodní rozcestník ── */}
      {!activeCalculator && (
        <Box>
          <CalculatorTiles onSelect={handleSelectCalculator} />
          <Box mt={2}>
            <AdSlot id="home-bottom" position="bottom" />
          </Box>
          <HomeContent />
        </Box>
      )}

      {/* ── Kalkulačka čisté mzdy 2026 ── */}
      {activeCalculator === 'salary2026' && (
        <Box mt={4}>
          <Box mb={2}>
            <AdSlot id="salary-top" position="top" />
          </Box>
          <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} gap={2} justifyContent="center">
            <Box
              sx={{
                width: '100%', maxWidth: 800,
                bgcolor: `${activeColor}55`,
                borderRadius: 2,
                p: { xs: 2, sm: 3 },
                boxShadow: 2,
                alignSelf: 'flex-start',
              }}
            >
              <CalcTitle id="salary2026" title={meta.title} />
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

      {/* ── Kalkulačka půjčky ── */}
      {activeCalculator === 'loan' && (
        <Box mt={4}>
          <Box mb={2}>
            <AdSlot id="loan-top" position="top" />
          </Box>
          <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} gap={2} justifyContent="center">
            <Box
              sx={{
                width: '100%', maxWidth: 800,
                bgcolor: '#e8f5e955',
                borderRadius: 2,
                p: { xs: 2, sm: 3 },
                boxShadow: 2,
                alignSelf: 'flex-start',
              }}
            >
              <CalcTitle id="loan" title={meta.title} />
              <LoanCalculator />
            </Box>
            <Box sx={{ width: { xs: '100%', md: 300 }, flexShrink: 0 }}>
              <AdSlot id="loan-side" position="side" />
            </Box>
          </Box>
          <Box mt={2}>
            <AdSlot id="loan-bottom" position="bottom" />
          </Box>
        </Box>
      )}

      {/* ── Roční zúčtování daní ── */}
      {activeCalculator === 'annual-tax' && (
        <Box mt={4}>
          <Box mb={2}>
            <AdSlot id="annual-top" position="top" />
          </Box>
          <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} gap={2} justifyContent="center">
            <Box
              sx={{
                width: '100%', maxWidth: 800,
                bgcolor: '#fff3e055',
                borderRadius: 2,
                p: { xs: 2, sm: 3 },
                boxShadow: 2,
                alignSelf: 'flex-start',
              }}
            >
              <CalcTitle id="annual-tax" title={meta.title} />
              <AnnualTaxWizard onBack={handleBackHome} />
            </Box>
            <Box sx={{ width: { xs: '100%', md: 300 }, flexShrink: 0 }}>
              <AdSlot id="annual-side" position="side" />
            </Box>
          </Box>
          <Box mt={2}>
            <AdSlot id="annual-bottom" position="bottom" />
          </Box>
        </Box>
      )}

      {/* ── Fallback – kalkulačky ve vývoji ── */}
      {activeCalculator && !isImplemented && !isStaticPage && (
        <Box mt={4}>
          <Box mb={2}>
            <AdSlot id="other-top" position="top" />
          </Box>
          <Box display="flex" justifyContent="center">
            <Box
              sx={{
                width: '100%', maxWidth: 800,
                bgcolor: `${activeColor}55`,
                borderRadius: 2,
                p: { xs: 2, sm: 3 },
                boxShadow: 2,
              }}
            >
              <CalcTitle id={activeCalculator} title={meta.title} />
              <Typography variant="body1" color="text.secondary" paragraph>
                Tato kalkulačka je aktuálně ve vývoji a bude brzy dostupná. Mezitím můžete využít naši kalkulačku čisté mzdy 2026.
              </Typography>
              <Typography variant="body1" color="text.secondary" gutterBottom>
                Chystáme výpočty pro:
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75, mt: 1 }}>
                {activeCalculator === 'self-employed' && (
                  <>
                    <Typography variant="body2" color="text.secondary">
                      Výpočet odvodů OSVČ na sociální a zdravotní pojištění
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Paušální daň a podmínky pro její uplatnění
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Srovnání paušálních výdajů vs. skutečných nákladů
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

      {/* ── Statické stránky ── */}
      {isStaticPage && (
        <Box mt={4} display="flex" justifyContent="center">
          <Box sx={{ width: '100%', maxWidth: 800 }}>
            {activeCalculator === 'privacy' && <PrivacyPolicy />}
            {activeCalculator === 'about'   && <AboutPage />}
          </Box>
        </Box>
      )}

      <Footer onNavigate={handleNavigate} />

    </Container>
  );
}

export default App;
