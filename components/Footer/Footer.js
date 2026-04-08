import React from 'react';
import { Box, Container, Typography, Link, Divider } from '@mui/material';

function Footer({ onNavigate }) {
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
              onClick={() => onNavigate('kontakt')}
            >
              Kontakt
            </Link>
            <Link
              component="button"
              variant="body2"
              color="text.secondary"
              underline="hover"
              onClick={() => onNavigate('about')}
            >
              O webu
            </Link>
            <Link
              component="button"
              variant="body2"
              color="text.secondary"
              underline="hover"
              onClick={() => onNavigate('privacy')}
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
      </Container>
    </Box>
  );
}

export default Footer;
