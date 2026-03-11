import React, { useEffect, useRef } from 'react';
import { Box, useMediaQuery, useTheme } from '@mui/material';

const AD_SLOTS = {
  'home-bottom':    '9213580658',
  'salary-top':     '9613181694',
  'salary-side':    '1263413800',
  'salary-bottom':  '2245827569',
  'other-top':      '9613181694',
  'other-bottom':   '2245827569',
};

function AdSlot({ id, position }) {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
  const adRef = useRef(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    if (!adRef.current) return;

    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      initialized.current = true;
    } catch (e) {
      console.error('AdSense error:', e);
    }
  }, []);

  // Skryj side slot na malých šířkách
  if (position === 'side' && isSmall) {
    return null;
  }

  const slotId = AD_SLOTS[id];

  // Pokud slot ID neexistuje, nic nezobrazuj
  if (!slotId) return null;

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: position === 'side' ? 250 : 90,
        overflow: 'hidden',
      }}
    >
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-9033242502600387"
        data-ad-slot={slotId}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </Box>
  );
}

export default AdSlot;
