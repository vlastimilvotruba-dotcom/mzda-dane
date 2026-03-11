import React from 'react';
import { Box, Typography, Divider, Link } from '@mui/material';

function AboutPage() {
  return (
    <Box mt={4}>
      <Typography variant="h4" gutterBottom fontWeight={600}>
        O webu
      </Typography>

      <Divider sx={{ my: 3 }} />

      <Typography variant="h6" gutterBottom fontWeight={600}>
        Co je mzda-dane.cz?
      </Typography>
      <Typography variant="body1" paragraph color="text.secondary">
        mzda-dane.cz je bezplatný webový nástroj pro jednoduché a přehledné výpočty
        mzdy a daní v České republice. Naším cílem je poskytnout každému zaměstnanci,
        živnostníkovi nebo účetnímu rychlý a srozumitelný přehled o tom, kolik skutečně
        dostane na účet a jaké odvody platí.
      </Typography>

      <Typography variant="h6" gutterBottom fontWeight={600}>
        Kdo web provozuje?
      </Typography>
      <Typography variant="body1" paragraph color="text.secondary">
        Web provozuje VOV Software – malý vývojářský tým zaměřený na tvorbu praktických
        finančních nástrojů pro český trh. Kromě webových kalkulaček vyvíjíme také
        mobilní aplikace pro platformu Android.
      </Typography>

      <Typography variant="h6" gutterBottom fontWeight={600}>
        Jsou výsledky závazné?
      </Typography>
      <Typography variant="body1" paragraph color="text.secondary">
        Všechny kalkulačky na tomto webu mají informativní charakter. Výpočty vycházejí
        z platné české legislativy a jsou průběžně aktualizovány, avšak pro závazné
        mzdové nebo daňové výpočty doporučujeme konzultaci s kvalifikovaným účetním
        nebo daňovým poradcem.
      </Typography>

      <Typography variant="h6" gutterBottom fontWeight={600}>
        Kontakt
      </Typography>
      <Typography variant="body1" color="text.secondary">
        {'Máte dotaz, návrh na vylepšení nebo jste našli chybu ve výpočtu? Napište nám na '}
        <Link href="mailto:vov.software@gmail.com" underline="hover" color="primary">
          vov.software@gmail.com
        </Link>
        {'. Každý podnět vítáme.'}
      </Typography>
    </Box>
  );
}

export default AboutPage;
