import React from 'react';
import {
  Box,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';

function CalculatorTile({ title, description, active, onClick, color }) {
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
        border: active ? '2px solid #1976d2' : '1px solid #b0bec5',
        backgroundColor: active ? color : `${color}77`,
        boxShadow: active ? 4 : 1,
        transition:
          'box-shadow 0.2s, transform 0.1s, border 0.2s, background-color 0.2s',
        '&:hover': {
          boxShadow: 6,
          transform: 'translateY(-1px)',
          backgroundColor: `${color}aa`,
        },
      }}
    >
      <Typography variant="subtitle1">
        {title}
      </Typography>
      <Typography variant="body2" color="text.primary">
        {description}
      </Typography>
    </Paper>
  );
}

function CalculatorTiles({ onSelect }) {
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
            description: 'Výpočet měsíční splátky, celkových nákladů a úroků půjčky nebo hypotéky.',
            color: '#e8f5e9',
        },
        {
            id: 'annual-tax',
            title: 'Roční daně zaměstnance',
            description: 'Roční zúčtování daně z příjmu pro zaměstnance. Připravujeme.',
            color: '#fff3e0',
        },
        {
            id: 'self-employed',
            title: 'OSVČ / Paušální daň',
            description: 'Výpočet odvodů a daní pro osoby samostatně výdělečně činné. Připravujeme.',
            color: '#f3e5f5',
        },
    ];



  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 2,
      }}
    >
      {tiles.map((tile) => (
        <Box
          key={tile.id}
          sx={{
            flexBasis: isSmall ? '100%' : 'calc(50% - 8px)', // 2 sloupce na desktopu, 1 na mobilu
          }}
        >
          <CalculatorTile
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
