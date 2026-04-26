import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Paper, Link } from '@mui/material';

const CONSENT_KEY = 'cookie_consent';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY);
    if (!stored) setVisible(true);
  }, []);

  const handleAccept = () => {
    localStorage.setItem(CONSENT_KEY, 'accepted');
    setVisible(false);
  };

  const handleReject = () => {
    localStorage.setItem(CONSENT_KEY, 'rejected');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <Paper
      elevation={6}
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        borderRadius: 0,
        px: { xs: 2, sm: 4 },
        py: 2,
        bgcolor: '#1a237e',
        color: '#fff',
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        alignItems: { xs: 'flex-start', sm: 'center' },
        gap: 2,
      }}
    >
      <Typography variant="body2" sx={{ color: '#fff', flex: 1, lineHeight: 1.6 }}>
        Tento web používá cookies pro zobrazování reklam prostřednictvím Google AdSense.{' '}
        <Link href="/privacy" sx={{ color: '#90caf9', textDecorationColor: '#90caf9' }}>
          Zásady ochrany osobních údajů
        </Link>
      </Typography>
      <Box display="flex" gap={1} flexShrink={0}>
        <Button
          variant="outlined"
          size="small"
          onClick={handleReject}
          sx={{
            color: '#fff',
            borderColor: 'rgba(255,255,255,0.5)',
            '&:hover': { borderColor: '#fff', bgcolor: 'rgba(255,255,255,0.1)' },
            whiteSpace: 'nowrap',
          }}
        >
          Odmítnout
        </Button>
        <Button
          variant="contained"
          size="small"
          onClick={handleAccept}
          sx={{
            bgcolor: '#42a5f5',
            '&:hover': { bgcolor: '#1e88e5' },
            whiteSpace: 'nowrap',
          }}
        >
          Přijmout vše
        </Button>
      </Box>
    </Paper>
  );
}
