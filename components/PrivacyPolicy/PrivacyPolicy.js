import React from 'react';
import { Box, Typography, Divider, Link } from '@mui/material';

function PrivacyPolicy() {
  return (
    <Box mt={4}>
      <Typography variant="h4" gutterBottom fontWeight={600}>
        Zásady ochrany osobních údajů
      </Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        Poslední aktualizace: březen 2026
      </Typography>

      <Divider sx={{ my: 3 }} />

      <Typography variant="h6" gutterBottom fontWeight={600}>
        1. Provozovatel webu
      </Typography>
      <Typography variant="body1" paragraph color="text.secondary">
        Tento web provozuje VOV Software. V případě dotazů nás kontaktujte na e-mailu:{' '}
        <Link href="mailto:vov.software@gmail.com" underline="hover" color="primary">
          vov.software@gmail.com
        </Link>
      </Typography>

      <Typography variant="h6" gutterBottom fontWeight={600}>
        2. Jaké údaje zpracováváme
      </Typography>
      <Typography variant="body1" paragraph color="text.secondary">
        Web mzda-dane.cz nevyžaduje registraci ani přihlášení. Veškeré výpočty probíhají
        přímo ve vašem prohlížeči a zadané hodnoty (hrubá mzda, slevy apod.) nejsou
        odesílány na žádný server ani ukládány.
      </Typography>

      <Typography variant="h6" gutterBottom fontWeight={600}>
        3. Cookies a reklamy
      </Typography>
      <Typography variant="body1" paragraph color="text.secondary">
        Web používá službu Google AdSense pro zobrazování reklam. Google AdSense může
        používat soubory cookie (cookies) k personalizaci reklam na základě vašich
        předchozích návštěv tohoto nebo jiných webů. Souhlas se zpracováním cookies
        pro účely personalizace reklam můžete udělit nebo odmítnout prostřednictvím
        banneru, který se zobrazí při první návštěvě webu.
      </Typography>
      <Typography variant="body1" paragraph color="text.secondary">
        {'Více informací o tom, jak Google používá data, naleznete na: '}
        <Link
          href="https://policies.google.com/technologies/ads"
          target="_blank"
          rel="noopener noreferrer"
          underline="hover"
          color="primary"
        >
          policies.google.com/technologies/ads
        </Link>
      </Typography>

      <Typography variant="h6" gutterBottom fontWeight={600}>
        4. Analytické nástroje
      </Typography>
      <Typography variant="body1" paragraph color="text.secondary">
        Web může využívat anonymní statistiky návštěvnosti (např. Google Analytics)
        za účelem zlepšování obsahu a funkčnosti. Tato data jsou anonymizovaná
        a neumožňují identifikaci konkrétního uživatele.
      </Typography>

      <Typography variant="h6" gutterBottom fontWeight={600}>
        5. Práva uživatelů
      </Typography>
      <Typography variant="body1" paragraph color="text.secondary">
        V souladu s GDPR máte právo na přístup ke svým osobním údajům, jejich opravu,
        výmaz nebo omezení zpracování. Vzhledem k tomu, že web nesbírá osobní údaje,
        tato práva se v praxi neuplatní. V případě dotazů nás kontaktujte na{' '}
        <Link href="mailto:vov.software@gmail.com" underline="hover" color="primary">
          vov.software@gmail.com
        </Link>
      </Typography>

      <Typography variant="h6" gutterBottom fontWeight={600}>
        6. Změny zásad
      </Typography>
      <Typography variant="body1" paragraph color="text.secondary">
        Tyto zásady ochrany osobních údajů můžeme příležitostně aktualizovat.
        Aktuální verze je vždy dostupná na této stránce.
      </Typography>
    </Box>
  );
}

export default PrivacyPolicy;
