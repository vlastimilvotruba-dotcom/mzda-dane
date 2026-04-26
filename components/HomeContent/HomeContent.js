import React from 'react';
import { Box, Typography, Divider } from '@mui/material';
import Link from 'next/link';

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
        Nabízíme jednoduché a přehledné kalkulačky pro výpočet mzdy, daní, energetických investic i mobility v České republice.
        Vše je průběžně aktualizováno podle platné legislativy a aktuálních sazeb.
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 2 }}>
        <Typography variant="body1" color="text.secondary">
          <Link href="/cista-mzda" style={{ color: '#1565c0', fontWeight: 600 }}>Kalkulačka čisté mzdy 2026</Link>
          {' – zadejte hrubou mzdu, slevy a počet dětí, kalkulačka spočítá odvody, daň a výslednou čistou mzdu pro HPP, DPP i DPČ.'}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          <Link href="/rocni-dane" style={{ color: '#c62828', fontWeight: 600 }}>Roční daně zaměstnance</Link>
          {' – roční zúčtování daně z příjmu, uplatnění odpočtů za penzijní spoření, hypotéku nebo dary.'}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          <Link href="/osvc" style={{ color: '#6a1b9a', fontWeight: 600 }}>OSVČ – daň a odvody 2025</Link>
          {' – výpočet daně z příjmů, sociálního a zdravotního pojištění pro OSVČ včetně srovnání s paušální daní.'}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          <Link href="/pujcka" style={{ color: '#2e7d32', fontWeight: 600 }}>Kalkulačka půjčky</Link>
          {' – výpočet měsíční splátky, celkových nákladů a úroků půjčky nebo hypotéky.'}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          <Link href="/navratnost-fve" style={{ color: '#f57f17', fontWeight: 600 }}>Kalkulačka návratnosti FVE 2026</Link>
          {' – spočítejte dobu návratnosti fotovoltaické elektrárny, roční úsporu na elektřině a výši podpory z Nové zelené úsporám.'}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          <Link href="/ev-vs-spalovak" style={{ color: '#00897b', fontWeight: 600 }}>Kalkulačka EV vs. benzín/nafta</Link>
          {' – porovnejte roční provozní náklady auta a zjistěte cenu za 1 km jízdy u elektroauta, benzínu i dieselu.'}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          <Link href="/aktuality" style={{ color: '#e65100', fontWeight: 600 }}>Aktuality – daně a mzdy 2026</Link>
          {' – přehled aktuálních změn v daních, mzdách a odvodech v ČR s komentářem k dopadu na zaměstnance a OSVČ.'}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          <Link href="/energetika" style={{ color: '#2e7d32', fontWeight: 600 }}>Energetika – elektromobilita a FVE</Link>
          {' – výběr důležitých zpráv o elektromobilech, fotovoltaice a cenách energií v ČR i EU s editorským komentářem.'}
        </Typography>
      </Box>

      <Divider sx={{ my: 4 }} />

      <Typography variant="h5" gutterBottom fontWeight={600}>
        Fotovoltaika 2026 – vyplatí se a jak ji financovat?
      </Typography>
      <Typography variant="body1" paragraph color="text.secondary">
        Zájem o fotovoltaické elektrárny v ČR stále roste. Průměrná instalace pro rodinný dům (6 kWp) vyjde
        na 150 000–220 000 Kč a při vlastní spotřebě kolem 65 % se investice vrátí za 9–13 let.
        Po uplynutí doby návratnosti generuje FVE čistý zisk po celou zbývající životnost systému (25+ let).
      </Typography>
      <Typography variant="body1" paragraph color="text.secondary">
        Přímé dotace NZÚ pro rodinné domy jsou v roce 2026 pozastaveny z důvodu vyčerpání alokace.
        Vláda připravuje náhradní program bezúročných půjček – výhodou je, že měsíční splátka
        bývá nižší nebo srovnatelná s průměrnou měsíční úsporou na elektřině.
        Naše{' '}
        <Link href="/navratnost-fve" style={{ color: '#f57f17', fontWeight: 600 }}>kalkulačka FVE</Link>
        {' '}vám toto srovnání spočítá přímo.
      </Typography>

      <Divider sx={{ my: 4 }} />

      <Typography variant="h5" gutterBottom fontWeight={600}>
        Elektroauto vs. spalovací motor – co je levnější na provoz?
      </Typography>
      <Typography variant="body1" paragraph color="text.secondary">
        Provozní náklady elektroauta bývají při domácím nabíjení výrazně nižší než u benzínu nebo nafty.
        Rozhodující je ale roční nájezd, reálná spotřeba a cena elektřiny. Proto jsme přidali i{' '}
        <Link href="/ev-vs-spalovak" style={{ color: '#00897b', fontWeight: 600 }}>kalkulačku EV vs. spalovák</Link>,
        která porovná náklad na 100 km, cenu za 1 km i celkové roční výdaje.
      </Typography>

      <Divider sx={{ my: 4 }} />

      <Typography variant="h5" gutterBottom fontWeight={600}>
        Aktuality a komentáře
      </Typography>
      <Typography variant="body1" paragraph color="text.secondary">
        Na webu průběžně sledujeme změny v legislativě i dění v oblasti energetiky a mobility.
        V sekci{' '}
        <Link href="/aktuality" style={{ color: '#e65100', fontWeight: 600 }}>Aktuality</Link>
        {' '}komentujeme novinky v daňových sazbách, změny v odvodech a jejich konkrétní dopad na výplatu.
        Sekce{' '}
        <Link href="/energetika" style={{ color: '#2e7d32', fontWeight: 600 }}>Energetika</Link>
        {' '}přináší výběr zpráv o elektromobilech, fotovoltaice a cenách elektřiny – vždy s vazbou na české podmínky a naše kalkulačky.
      </Typography>

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
        Kalkulačky vychází z platné legislativy pro rok 2026. Výsledky mají informativní charakter –
        pro závazné mzdové nebo daňové výpočty doporučujeme konzultaci s účetním nebo daňovým poradcem.
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
        Dohoda o provedení práce (DPP) je vhodná pro příležitostnou práci – do 11 999 Kč měsíčně
        se neplatí sociální ani zdravotní pojištění. Dohoda o pracovní činnosti (DPČ) má limit 4 499 Kč,
        nad který jsou odvody povinné.
      </Typography>

      <Typography variant="subtitle1" fontWeight={600}>
        Kde sledovat změny v daních a mzdách?
      </Typography>
      <Typography variant="body1" paragraph color="text.secondary">
        V sekci{' '}
        <Link href="/aktuality" style={{ color: '#e65100', fontWeight: 600 }}>Aktuality</Link>
        {' '}průběžně komentujeme legislativní novinky – změny sazeb, slev na dani i odvodů. Každá zpráva obsahuje
        konkrétní dopad na zaměstnance nebo OSVČ, ne jen přepis tiskové zprávy.
      </Typography>

      <Typography variant="subtitle1" fontWeight={600}>
        Kde najdu zprávy o elektroautech a fotovoltaice?
      </Typography>
      <Typography variant="body1" paragraph color="text.secondary">
        Sekce{' '}
        <Link href="/energetika" style={{ color: '#2e7d32', fontWeight: 600 }}>Energetika</Link>
        {' '}agreguje výběr zpráv z českých i zahraničních zdrojů (Hybrid.cz, Electrek) přeložených do češtiny.
        Ke každému článku přidáváme komentář s vazbou na český trh a odkaz na příslušnou kalkulačku.
      </Typography>
    </Box>
  );
}

export default HomeContent;
