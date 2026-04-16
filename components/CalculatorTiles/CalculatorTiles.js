import React from 'react';
import { useRouter } from 'next/router';
import { Box, Paper, Typography, useMediaQuery, useTheme } from '@mui/material';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import BadgeIcon from '@mui/icons-material/Badge';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import ElectricCarIcon from '@mui/icons-material/ElectricCar';

const TILE_ACCENT = {
  'salary2026': '#1565c0',
  'loan': '#2e7d32',
  'annual-tax': '#c62828',
  'self-employed': '#6a1b9a',
  'fve': '#f57f17',
  'ev': '#00897b',
};

const TILE_ICON = {
  'salary2026': AccountBalanceWalletIcon,
  'loan': AccountBalanceIcon,
  'annual-tax': ReceiptLongIcon,
  'self-employed': BadgeIcon,
  'fve': WbSunnyIcon,
  'ev': ElectricCarIcon,
};

const TILE_URL = {
  'salary2026': '/cista-mzda',
  'loan': '/pujcka',
  'annual-tax': '/rocni-dane',
  'self-employed': '/osvc',
  'fve': '/navratnost-fve',
  'ev': '/ev-vs-spalovak',
};

function CalculatorTile({ id, title, description, color }) {
  const router = useRouter();
  const accent = TILE_ACCENT[id] || '#424242';
  const Icon = TILE_ICON[id];
  return (
    <Paper
      onClick={() => router.push(TILE_URL[id])}
      elevation={1}
      sx={{
        p: 2,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: 1,
        cursor: 'pointer',
        borderRadius: 2,
        border: '1px solid #b0bec5',
        backgroundColor: `${color}77`,
        boxShadow: 1,
        transition: 'box-shadow 0.2s, transform 0.1s, background-color 0.2s',
        '&:hover': {
          boxShadow: 6,
          transform: 'translateY(-1px)',
          backgroundColor: `${color}aa`,
        },
      }}
    >
      <Box display="flex" alignItems="center" gap={1}>
        <Icon sx={{ color: accent, fontSize: 22, flexShrink: 0 }} />
        <Typography variant="subtitle1" fontWeight={700} sx={{ color: accent, lineHeight: 1.3 }}>
          {title}
        </Typography>
      </Box>
      <Typography variant="body2" color="text.primary">{description}</Typography>
    </Paper>
  );
}

export default function CalculatorTiles() {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));

  const tiles = [
    {
      id: 'salary2026',
      title: 'Čistá mzda 2026',
      description: 'Výpočet čisté mzdy pro HPP, DPP i DPČ včetně odvodů a daňových slev.',
      color: '#e3f2fd',
    },
    {
      id: 'loan',
      title: 'Kalkulačka půjčky',
      description: 'Výpočet měsíční splátky, celkových nákladů a doby půjčky nebo hypotéky.',
      color: '#e8f5e9',
    },
    {
      id: 'annual-tax',
      title: 'Roční daně zaměstnance',
      description: 'Roční zúčtování daně z příjmu pro zaměstnance.',
      color: '#ffebee',
    },
    {
      id: 'self-employed',
      title: 'OSVČ – daň a odvody 2025',
      description: 'Výpočet daně z příjmů, sociálního a zdravotního pojištění i srovnání s paušální daní.',
      color: '#f3e5f5',
    },
    {
      id: 'fve',
      title: 'Návratnost FVE 2026',
      description: 'Spočítejte dobu návratnosti fotovoltaiky, roční úsporu a výši dotace z Nové zelené úsporám.',
      color: '#fff8e1',
    },
    {
      id: 'ev',
      title: 'EV vs. benzín/nafta',
      description: 'Porovnejte roční provozní náklady a cenu za 1 km u elektroauta, benzínu a dieselu.',
      color: '#e0f2f1',
    },
  ];

  return (
    <Box id="kalkulacky" sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, scrollMarginTop: '20px' }}>
      {tiles.map((tile) => (
        <Box
          key={tile.id}
          sx={{ flexBasis: isSmall ? '100%' : 'calc(50% - 8px)' }}
        >
          <CalculatorTile {...tile} />
        </Box>
      ))}
    </Box>
  );
}
