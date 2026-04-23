import React, { useEffect, useRef, useState } from 'react';
import { Box, useMediaQuery, useTheme } from '@mui/material';

const AD_SLOTS = {
  'home-bottom':    '9213580658',
  'salary-top':     '9613181694',
  'salary-side':    '1263413800',
  'salary-bottom':  '2245827569',
  /* až budou schválené reklamy odkomentovvat
  'loan-top':       '9613181694',
  'loan-side':      '1263413800',
  'loan-bottom':    '2245827569',
  'annual-top':     '9613181694',
  'annual-side':    '1263413800',
  'annual-bottom':  '2245827569',
  'other-top':      '9613181694',
  'other-bottom':   '2245827569',
  */
};

function AdSlot({ id, position }) {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
  const adRef = useRef(null);
  const initialized = useRef(false);
  const [isVisible, setIsVisible] = useState(true);

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

  // Sleduj data-ad-status atribut který AdSense nastavuje: "filled" nebo "unfilled"
  useEffect(() => {
    const ins = adRef.current;
    if (!ins) return;

    let timeoutId;
    let observer;

    const evaluate = () => {
      const status = ins.getAttribute('data-ad-status');
      if (status === 'filled') {
        setIsVisible(true);
      } else if (status === 'unfilled') {
        setIsVisible(false);
      }
    };

    // Sleduj změny atributů na <ins> elementu
    observer = new MutationObserver(evaluate);
    observer.observe(ins, { attributes: true, attributeFilter: ['data-ad-status'] });

    // Fallback: po 5 sekundách pokud není data-ad-status nastaven, skryj
    timeoutId = setTimeout(() => {
      const status = ins.getAttribute('data-ad-status');
      if (!status) setIsVisible(false);
    }, 5000);

    return () => {
      observer.disconnect();
      clearTimeout(timeoutId);
    };
  }, []);

  // Skryj side slot na malých šířkách
  if (position === 'side' && isSmall) {
    return null;
  }

  const slotId = AD_SLOTS[id];

  // Pokud slot ID neexistuje, nic nezobrazuj
  if (!slotId) return null;

  // Pokud se reklama nezobrazila, vrať null (nic)
  if (!isVisible) return null;

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
