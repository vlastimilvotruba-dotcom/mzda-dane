import React from 'react';
import { Box, Typography, Divider } from '@mui/material';

function HomeContent() {
  return (
    <Box mt={5}>
      <Divider sx={{ mb: 4 }} />

      <Typography variant="h5" gutterBottom fontWeight={600}>
        Jak se počítá čistá mzda v ČR v roce 2026?
      </Typography>
      <Typography variant="body1" paragraph color="text.secondary">
        Čistá mzda je částka, kterou zaměstnanec skutečně obdrží na účet po odečtení všech zákonných odvodů a daní.
        Výpočet vychází z hrubé mzdy, od které se odečítají odvody na sociální pojištění (6,5 %), zdravotní pojištění (4,5 %)
        a daň z příjmu fyzických osob.
      </Typography>
      <Typography variant="body1" paragraph color="text.secondary">
        Daň z příjmu v roce 2026 činí 15 % ze základu daně (superhrubá mzda byla zrušena).
        Základ daně se snižuje o uplatněné slevy – základní sleva na poplatníka činí 30 840 Kč ročně (2 570 Kč měsíčně).
        Zaměstnanec může uplatnit i slevu na manžela/manželku, studenta, invaliditu nebo daňové zvýhodnění na děti.
      </Typography>
      <Typography variant="body1" paragraph color="text.secondary">
        Pokud daňové zvýhodnění na děti převyšuje vypočtenou daň, vzniká tzv. daňový bonus – stát zaměstnanci
        rozdíl vyplatí. To může v praxi znamenat, že čistá mzda bude vyšší než hrubá mzda.
      </Typography>

      <Divider sx={{ my: 4 }} />

      <Typography variant="h5" gutterBottom fontWeight={600}>
        Co na webu mzda-dane.cz najdete?
      </Typography>
      <Typography variant="body1" paragraph color="text.secondary">
        Nabízíme jednoduché a přehledné kalkulačky pro výpočet mzdy a daní v České republice.
        Vše je průběžně aktualizováno podle platné legislativy.
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 2 }}>
        <Typography variant="body1" color="text.secondary">
          <strong>Kalkulačka čisté mzdy 2026</strong>
          {' – zadejte hrubou mzdu, slevy a počet dětí, kalkulačka spočítá odvody, daň a výslednou čistou mzdu.'}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          <strong>Kalkulačka DPP / DPČ</strong>
          {' – výpočet čisté odměny z dohody o provedení práce nebo dohody o pracovní činnosti (připravujeme).'}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          <strong>Roční daně zaměstnance</strong>
          {' – roční zúčtování daně z příjmu pro zaměstnance (připravujeme).'}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          <strong>OSVČ / Paušální daň</strong>
          {' – výpočet odvodů a daní pro osoby samostatně výdělečně činné (připravujeme).'}
        </Typography>
      </Box>

      <Divider sx={{ my: 4 }} />

      <Typography variant="h5" gutterBottom fontWeight={600}>
        Často kladené dotazy
      </Typography>

      <Typography variant="subtitle1" fontWeight={600} mt={2}>
        Je kalkulačka zdarma?
      </Typography>
      <Typography variant="body1" paragraph color="text.secondary">
        Ano, všechny kalkulačky na mzda-dane.cz jsou zcela zdarma a bez nutnosti registrace.
      </Typography>

      <Typography variant="subtitle1" fontWeight={600}>
        Jsou výsledky přesné?
      </Typography>
      <Typography variant="body1" paragraph color="text.secondary">
        Kalkulačka vychází z platné legislativy pro rok 2026. Výsledky mají informativní charakter –
        pro závazné mzdové výpočty doporučujeme konzultaci s účetním nebo mzdovou účtárnou.
      </Typography>

      <Typography variant="subtitle1" fontWeight={600}>
        Co je daňový bonus?
      </Typography>
      <Typography variant="body1" paragraph color="text.secondary">
        Daňový bonus vzniká, když daňové zvýhodnění na děti převyšuje vypočtenou daň z příjmu.
        Zaměstnavatel pak zaměstnanci tento rozdíl vyplatí nad rámec čisté mzdy.
      </Typography>

      <Typography variant="subtitle1" fontWeight={600}>
        Jak se liší DPP od DPČ?
      </Typography>
      <Typography variant="body1" paragraph color="text.secondary">
        Dohoda o provedení práce (DPP) je vhodná pro příležitostnou práci – do 10 000 Kč měsíčně
        se neplatí sociální ani zdravotní pojištění. Dohoda o pracovní činnosti (DPČ) má jiné limity
        a odvody jsou povinné od nižší částky.
      </Typography>
    </Box>
  );
}

export default HomeContent;
