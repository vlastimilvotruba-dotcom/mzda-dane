import React from 'react';
import { useRouter } from 'next/router';
import { Box, Chip, Divider, Paper, Typography, useMediaQuery, useTheme } from '@mui/material';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import BadgeIcon from '@mui/icons-material/Badge';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import ElectricCarIcon from '@mui/icons-material/ElectricCar';
import PersonIcon from '@mui/icons-material/Person';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import BoltIcon from '@mui/icons-material/Bolt';

const TILE_ACCENT = {
  'salary2026': '#1565c0',
  'annual-tax': '#c62828',
  'self-employed': '#6a1b9a',
  'loan': '#2e7d32',
  'fve': '#f57f17',
  'ev': '#00897b',
};

const TILE_ICON = {
  'salary2026': AccountBalanceWalletIcon,
  'annual-tax': ReceiptLongIcon,
  'self-employed': BadgeIcon,
  'loan': AccountBalanceIcon,
  'fve': WbSunnyIcon,
  'ev': ElectricCarIcon,
};

const TILE_URL = {
  'salary2026': '/cista-mzda',
  'annual-tax': '/rocni-dane',
  'self-employed': '/osvc',
  'loan': '/pujcka',
  'fve': '/navratnost-fve',
  'ev': '/ev-vs-spalovak',
};

const GROUPS = [
  {
    label: 'Zaměstnanci',
    icon: PersonIcon,
    color: '#1565c0',
    tiles: [
      {
        id: 'salary2026',
        title: 'Čistá mzda 2026',
        description: 'Výpočet čisté mzdy pro HPP, DPP i DPČ včetně odvodů a daňových slev.',
        color: '#e3f2fd',
        badge: 'Aktualizováno 2026',
        users: 'Nejpopulárnější kalkulačka',
      },
      {
        id: 'annual-tax',
        title: 'Roční daně zaměstnance',
        description: 'Roční zúčtování daně z příjmu pro zaměstnance – přeplatek nebo nedoplatek.',
        color: '#ffebee',
        badge: 'Aktualizováno 2026',
        users: 'Daňové přiznání i zúčtování',
      },
    ],
  },
  {
    label: 'OSVČ & Firmy',
    icon: BusinessCenterIcon,
    color: '#6a1b9a',
    tiles: [
      {
        id: 'self-employed',
        title: 'OSVČ – daň a odvody 2025',
        description: 'Výpočet daně z příjmů, sociálního a zdravotního pojištění i srovnání s paušální daní.',
        color: '#f3e5f5',
        users: 'Včetně srovnání s paušální daní',
      },
      {
        id: 'loan',
        title: 'Kalkulačka půjčky',
        description: 'Výpočet měsíční splátky, celkových nákladů a doby půjčky nebo hypotéky.',
        color: '#e8f5e9',
        users: 'Půjčka i hypotéka',
      },
    ],
  },
  {
    label: 'Energetika',
    icon: BoltIcon,
    color: '#e65100',
    tiles: [
      {
        id: 'fve',
        title: 'Návratnost FVE 2026',
        description: 'Spočítejte dobu návratnosti fotovoltaiky, roční úsporu a výši dotace z Nové zelené úsporám.',
        color: '#fff8e1',
        badge: 'Aktualizováno 2026',
        users: 'Včetně dotace Nová zelená úsporám',
      },
      {
        id: 'ev',
        title: 'EV vs. benzín/nafta',
        description: 'Porovnejte roční provozní náklady a cenu za 1 km u elektroauta, benzínu a dieselu.',
        color: '#e0f2f1',
        users: 'EV, benzín i diesel',
      },
    ],
  },
];

function CalculatorTile({ id, title, description, color, badge, users }) {
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
      <Box display="flex" alignItems="flex-start" justifyContent="space-between" gap={1}>
        <Box display="flex" alignItems="center" gap={1}>
          <Icon sx={{ color: accent, fontSize: 22, flexShrink: 0 }} />
          <Typography variant="subtitle1" fontWeight={700} sx={{ color: accent, lineHeight: 1.3 }}>
            {title}
          </Typography>
        </Box>
        {badge && (
          <Chip label={badge} size="small" sx={{ fontSize: '0.68rem', height: 20, bgcolor: `${accent}18`, color: accent, fontWeight: 700, flexShrink: 0 }} />
        )}
      </Box>
      <Typography variant="body2" color="text.primary">{description}</Typography>
      {users && (
        <Typography variant="caption" color="text.disabled" sx={{ mt: 0.5 }}>{users}</Typography>
      )}
    </Paper>
  );
}

export default function CalculatorTiles() {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box id="kalkulacky" sx={{ display: 'flex', flexDirection: 'column', gap: 3, scrollMarginTop: '20px' }}>
      {GROUPS.map((group, gi) => {
        const GroupIcon = group.icon;
        return (
          <Box key={group.label}>
            {gi > 0 && <Divider sx={{ mb: 3 }} />}
            <Box display="flex" alignItems="center" gap={1} mb={1.5}>
              <GroupIcon sx={{ color: group.color, fontSize: 20 }} />
              <Typography variant="overline" fontWeight={700} sx={{ color: group.color, letterSpacing: 1.2, lineHeight: 1 }}>
                {group.label}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
              {group.tiles.map((tile) => (
                <Box key={tile.id} sx={{ flexBasis: isSmall ? '100%' : 'calc(50% - 8px)' }}>
                  <CalculatorTile {...tile} />
                </Box>
              ))}
            </Box>
          </Box>
        );
      })}
    </Box>
  );
}
