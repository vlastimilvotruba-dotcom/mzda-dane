import React from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
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
        border: active ? '2px solid #1976d2' : '1px solid #cfd8dc',
        backgroundColor: active ? color : `${color}55`, // méně průhledné
        transition: 'box-shadow 0.2s, transform 0.1s, border 0.2s, background-color 0.2s',
        '&:hover': {
            boxShadow: 4,
            transform: 'translateY(-1px)',
            backgroundColor: `${color}88`,
        },
        }}
    >
      <Typography variant="subtitle1">
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
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
      description: 'Výpočet čisté mzdy zaměstnance v roce 2026.',
      color: '#e3f2fd',
    },
    {
      id: 'dpp',
      title: 'DPP / DPČ',
      description: 'Kalkulačka pro dohody (bude doplněno).',
      color: '#e8f5e9',
    },
    {
      id: 'annual-tax',
      title: 'Roční daně zaměstnance',
      description: 'Roční zúčtování daně (bude doplněno).',
      color: '#fff3e0',
    },
    {
      id: 'self-employed',
      title: 'OSVČ / Paušální daň',
      description: 'Kalkulačka pro OSVČ (bude doplněno).',
      color: '#f3e5f5',
    },
  ];

  return (
    <Box>
      <Grid container spacing={2}>
        {tiles.map((tile) => (
          <Grid key={tile.id} item xs={12} sm={6}>
            <CalculatorTile
              title={tile.title}
              description={tile.description}
              color={tile.color}
              active={false}
              onClick={() => onSelect(tile.id, tile.color)}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default CalculatorTiles;
