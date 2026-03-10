import React from 'react';
import { Box, useMediaQuery, useTheme } from '@mui/material';

function AdSlot({ id, position }) {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));

  // Skryj side slot na malých šířkách
  if (position === 'side' && isSmall) {
    return null;
  }

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: position === 'side' ? 250 : 100,
        bgcolor: '#f5f5f5',
        borderRadius: 1,
        border: '1px dashed #b0bec5',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 12,
        color: '#607d8b',
      }}
    >
      Reklamní blok: {position} ({id})
    </Box>
  );
}

export default AdSlot;
