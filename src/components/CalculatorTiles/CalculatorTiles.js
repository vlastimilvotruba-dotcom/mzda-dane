import React from 'react';
import { Box, Paper, Typography, useMediaQuery, useTheme } from '@mui/material';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import BadgeIcon from '@mui/icons-material/Badge';

// Barvy titulků a ikon – odpovídají barvě každé dlaždice
const TILE_ACCENT = {
  'salary2026':    '#1565c0',  // modrá  – e3f2fd
  'loan':          '#2e7d32',  // zelená – e8f5e9
  'annual-tax':    '#e65100',  // oranžová – fff3e0
  'self-employed': '#6a1b9a',  // fialová – f3e5f5
};

const TILE_ICON = {
  'salary2026':    AccountBalanceWalletIcon,
  'loan':          AccountBalanceIcon,
  'annual-tax':    ReceiptLongIcon,
  'self-employed': BadgeIcon,
};

function CalculatorTile({ id, title, description, active, onClick, color }) {
  const accent = TILE_ACCENT[id] || '#424242';
  const Icon   = TILE_ICON[id];

  return (
    <Paper
      onClick={onClick}
      elevation={active ? 3 : 1}
      sx={{
        p: 2,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: 1,
        cursor: 'pointer',
        borderRadius: 2,
        border: active ? `2px solid ${accent}` : '1px solid #b0bec5',
        backgroundColor: active ? color : `${color}77`,
        boxShadow: active ? 4 : 1,
        transition: 'box-shadow 0.2s, transform 0.1s, border 0.2s, background-color 0.2s',
        '&:hover': {
          boxShadow: 6,
          transform: 'translateY(-1px)',
          backgroundColor: `${color}aa`,
        },
      }}
    >
      {/* Ikona + Title ve stejné barvě */}
      <Box display="flex" alignItems="center" gap={1}>
        {Icon && (
          <Icon sx={{ color: accent, fontSize: 22, flexShrink: 0 }} />
        )}
        <Typography
          variant="subtitle1"
          fontWeight={700}
          sx={{ color: accent, lineHeight: 1.3 }}
        >
          {title}
        </Typography>
      </Box>

      {/* Popis – standardní */}
      <Typography variant="body2" color="text.primary">
        {description}
      </Typography>
    </Paper>
  );
}

function CalculatorTiles({ onSelect }) {
  const tiles = [
    {
      id:          'salary2026',
      title:       'Čistá mzda 2026',
      description: 'Výpočet čisté mzdy pro HPP, DPP i DPČ včetně odvodů a daňových slev.',
      color:       '#e3f2fd',
    },
    {
      id:          'loan',
      title:       'Kalkulačka půjčky',
      description: 'Výpočet měsíční splátky, celkových nákladů a úroků půjčky nebo hypotéky.',
      color:       '#e8f5e9',
    },
    {
      id:          'annual-tax',
      title:       'Roční daně zaměstnance',
      description: 'Roční zúčtování daně z příjmu pro zaměstnance.',
      color:       '#fff3e0',
    },
    {
      id:          'self-employed',
      title:       'OSVČ / Paušální daň',
      description: 'Výpočet odvodů a daní pro osoby samostatně výdělečně činné. Připravujeme.',
      color:       '#f3e5f5',
    },
  ];

  const theme   = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
      {tiles.map((tile) => (
        <Box
          key={tile.id}
          sx={{ flexBasis: isSmall ? '100%' : 'calc(50% - 8px)' }}
        >
          <CalculatorTile
            id={tile.id}
            title={tile.title}
            description={tile.description}
            color={tile.color}
            active={false}
            onClick={() => onSelect(tile.id, tile.color)}
          />
        </Box>
      ))}
    </Box>
  );
}

export default CalculatorTiles;
