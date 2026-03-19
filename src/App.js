import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
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
import SalaryContent from './components/PageContent/SalaryContent';
import LoanContent from './components/PageContent/LoanContent';
import AnnualTaxContent from './components/PageContent/AnnualTaxContent';

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
    return <Typography variant="h5" gutterBottom>{title}</Typography>;
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

function Header({ showBack, subtitle }) {
  const navigate = useNavigate();
  return (
    <Box mb={3} display="flex" justifyContent="space-between" alignItems="center" ml={2}>
      <Box>
        {!showBack && (
          <>
            <Typography variant="h4" component="h1" gutterBottom>
              Mzda a daně
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Jednoduché kalkulačky pro mzdu a daně v ČR.
            </Typography>
          </>
        )}
        {showBack && (
          <Box>
            <Typography variant="h6" component="h1" sx={{ display: { xs: 'none', sm: 'block' } }}>
              Mzda a daně
            </Typography>
            {subtitle && (
              <Typography variant="body2" color="text.secondary" sx={{ display: { xs: 'none', sm: 'block' } }}>
                {subtitle}
              </Typography>
            )}
          </Box>
        )}
      </Box>
      {showBack && (
        <Button
          variant="outlined"
          size="small"
          onClick={() => navigate('/')}
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
  );
}

function HomePage() {
  const navigate = useNavigate();
  return (
    <>
      <Header showBack={false} />
      <CalculatorTiles />
      <Box mt={2}>
        <AdSlot id="home-bottom" position="bottom" />
      </Box>
      <HomeContent />
      <Footer onNavigate={(page) => navigate(`/${page}`)} />
    </>
  );
}

function SalaryPage() {
  const navigate = useNavigate();
  return (
    <>
      <Header showBack subtitle="Výpočet čisté mzdy zaměstnance včetně odvodů a daňových slev." />
      <Box mt={4}>
        <Box mb={2}><AdSlot id="salary-top" position="top" /></Box>
        <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} gap={2} justifyContent="center">
          <Box sx={{ width: '100%', maxWidth: 800, bgcolor: '#e3f2fd55', borderRadius: 2, p: { xs: 2, sm: 3 }, boxShadow: 2, alignSelf: 'flex-start' }}>
            <CalcTitle id="salary2026" title="Kalkulačka čisté mzdy 2026" />
            <SalaryWizard />
          </Box>
          <Box sx={{ width: { xs: '100%', md: 300 }, flexShrink: 0 }}>
            <AdSlot id="salary-side" position="side" />
          </Box>
        </Box>
        <Box mt={2}><AdSlot id="salary-bottom" position="bottom" /></Box>
      </Box>
      <SalaryContent />
      <Footer onNavigate={(page) => navigate(`/${page}`)} />
    </>
  );
}

function LoanPage() {
  const navigate = useNavigate();
  return (
    <>
      <Header showBack subtitle="Výpočet měsíční splátky, celkových nákladů a úroků půjčky nebo hypotéky." />
      <Box mt={4}>
        <Box mb={2}><AdSlot id="loan-top" position="top" /></Box>
        <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} gap={2} justifyContent="center">
          <Box sx={{ width: '100%', maxWidth: 800, bgcolor: '#e8f5e955', borderRadius: 2, p: { xs: 2, sm: 3 }, boxShadow: 2, alignSelf: 'flex-start' }}>
            <CalcTitle id="loan" title="Kalkulačka půjčky" />
            <LoanCalculator />
          </Box>
          <Box sx={{ width: { xs: '100%', md: 300 }, flexShrink: 0 }}>
            <AdSlot id="loan-side" position="side" />
          </Box>
        </Box>
        <Box mt={2}><AdSlot id="loan-bottom" position="bottom" /></Box>
      </Box>
      <LoanContent />
      <Footer onNavigate={(page) => navigate(`/${page}`)} />
    </>
  );
}

function AnnualTaxPage() {
  const navigate = useNavigate();
  return (
    <>
      <Header showBack subtitle="Výpočet přeplatku nebo nedoplatku daně z příjmu zaměstnance." />
      <Box mt={4}>
        <Box mb={2}><AdSlot id="annual-top" position="top" /></Box>
        <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} gap={2} justifyContent="center">
          <Box sx={{ width: '100%', maxWidth: 800, bgcolor: '#fff3e055', borderRadius: 2, p: { xs: 2, sm: 3 }, boxShadow: 2, alignSelf: 'flex-start' }}>
            <CalcTitle id="annual-tax" title="Roční zúčtování daní 2026" />
            <AnnualTaxWizard onBack={() => navigate('/')} />
          </Box>
          <Box sx={{ width: { xs: '100%', md: 300 }, flexShrink: 0 }}>
            <AdSlot id="annual-side" position="side" />
          </Box>
        </Box>
        <Box mt={2}><AdSlot id="annual-bottom" position="bottom" /></Box>
      </Box>
      <AnnualTaxContent />
      <Footer onNavigate={(page) => navigate(`/${page}`)} />
    </>
  );
}

function OsvcPage() {
  const navigate = useNavigate();
  return (
    <>
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <Header showBack subtitle="Výpočet odvodů a daní pro osoby samostatně výdělečně činné." />
      <Box mt={4} display="flex" justifyContent="center">
        <Box sx={{ width: '100%', maxWidth: 800, bgcolor: '#f3e5f555', borderRadius: 2, p: { xs: 2, sm: 3 }, boxShadow: 2 }}>
          <CalcTitle id="self-employed" title="OSVČ / Paušální daň" />
          <Typography variant="body1" color="text.secondary" paragraph>
            Tato kalkulačka je aktuálně ve vývoji a bude brzy dostupná. Mezitím můžete využít naši kalkulačku čisté mzdy 2026.
          </Typography>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            Chystáme výpočty pro:
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75, mt: 1 }}>
            <Typography variant="body2" color="text.secondary">Výpočet odvodů OSVČ na sociální a zdravotní pojištění</Typography>
            <Typography variant="body2" color="text.secondary">Paušální daň a podmínky pro její uplatnění</Typography>
            <Typography variant="body2" color="text.secondary">Srovnání paušálních výdajů vs. skutečných nákladů</Typography>
          </Box>
        </Box>
      </Box>
      <Footer onNavigate={(page) => navigate(`/${page}`)} />
    </>
  );
}

function PrivacyPage() {
  const navigate = useNavigate();
  return (
    <>
      <Header showBack />
      <Box mt={4} display="flex" justifyContent="center">
        <Box sx={{ width: '100%', maxWidth: 800 }}>
          <PrivacyPolicy />
        </Box>
      </Box>
      <Footer onNavigate={(page) => navigate(`/${page}`)} />
    </>
  );
}

function AboutPageRoute() {
  const navigate = useNavigate();
  return (
    <>
      <Header showBack />
      <Box mt={4} display="flex" justifyContent="center">
        <Box sx={{ width: '100%', maxWidth: 800 }}>
          <AboutPage />
        </Box>
      </Box>
      <Footer onNavigate={(page) => navigate(`/${page}`)} />
    </>
  );
}

function AppRoutes() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Routes>
        <Route path="/"           element={<HomePage />} />
        <Route path="/cista-mzda" element={<SalaryPage />} />
        <Route path="/pujcka"     element={<LoanPage />} />
        <Route path="/rocni-dane" element={<AnnualTaxPage />} />
        <Route path="/osvc"       element={<OsvcPage />} />
        <Route path="/privacy"    element={<PrivacyPage />} />
        <Route path="/about"      element={<AboutPageRoute />} />
      </Routes>
    </Container>
  );
}

export default function App() {
    useEffect(() => {
    document.getElementById('root').classList.add('hydrated');
  }, []);

  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
