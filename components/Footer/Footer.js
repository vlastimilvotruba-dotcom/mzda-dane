import React from 'react';
import { Box, Container, Typography, Link, Divider } from '@mui/material';

function Footer({ onNavigate, lastUpdated }) {
  return (
    <Box component="footer" mt={8}>
      <Divider />
      <Container maxWidth="lg">
        <Box
          py={3}
          display="flex"
          flexDirection={{ xs: 'column', sm: 'row' }}
          justifyContent="space-between"
          alignItems={{ xs: 'flex-start', sm: 'center' }}
          gap={1}
        >
          <Typography variant="body2" color="text.secondary">
            {'© 2026 mzda-dane.cz – Jednoduché kalkulačky pro mzdu a daně v ČR'}
          </Typography>

          <Box display="flex" gap={2} flexWrap="wrap">
            <Link
              component="button"
              variant="body2"
              color="text.secondary"
              underline="hover"
              onClick={() => onNavigate('/kontakt')}
            >
              Kontakt
            </Link>
            <Link
              component="button"
              variant="body2"
              color="text.secondary"
              underline="hover"
              onClick={() => onNavigate('/about')}
            >
              O webu
            </Link>
            <Link
              href="/privacy"
              variant="body2"
              color="text.secondary"
              underline="hover"
            >
              Zásady ochrany osobních údajů
            </Link>
            <Link
              href="mailto:vov.software@gmail.com"
              variant="body2"
              color="text.secondary"
              underline="hover"
            >
              vov.software@gmail.com
            </Link>
          </Box>
        </Box>
        {lastUpdated && (
          <Typography variant="caption" color="text.disabled" display="block" pb={2}>
            Data aktualizována: {lastUpdated} · Kalkulačky platné pro rok 2026
          </Typography>
        )}
      </Container>
    </Box>
  );
}

export default Footer;
