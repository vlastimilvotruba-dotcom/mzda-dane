import React from 'react';
import { Box, Typography, Divider, Link, Table, TableBody, TableCell, TableRow, TableHead, Paper } from '@mui/material';

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

      <Divider sx={{ my: 3 }} />

      <Typography variant="h6" gutterBottom fontWeight={600}>
        Jak počítáme – zdroje a legislativa
      </Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        Každá kalkulačka vychází z konkrétních zákonů a sazeb platných pro daný rok.
        Níže jsou přehledně uvedeny zdroje pro rok 2026.
      </Typography>

      <Paper variant="outlined" sx={{ mb: 3, borderRadius: 2, overflow: 'hidden' }}>
        <Table size="small">
          <TableHead>
            <TableRow sx={{ bgcolor: '#f4f7ff' }}>
              <TableCell sx={{ fontWeight: 700, width: '28%' }}>Kalkulačka</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Klíčové sazby a legislativní základ</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell sx={{ fontWeight: 600, verticalAlign: 'top' }}>Čistá mzda 2026</TableCell>
              <TableCell>
                <Typography variant="body2" color="text.secondary">
                  Zákoník práce (zákon č. 262/2006 Sb.) · Zákon o daních z příjmů (586/1992 Sb.)
                  · Pojistné na sociální zabezpečení: zaměstnanec 6,5 %, zaměstnavatel 24,8 % (zákon č. 589/1992 Sb.)
                  · Zdravotní pojištění: zaměstnanec 4,5 %, zaměstnavatel 9 % (zákon č. 592/1992 Sb.)
                  · Sleva na poplatníka: 30 840 Kč/rok · Daň z příjmů: 15 % (do 36násobku průměrné mzdy), 23 % (nad tento limit)
                  · Průměrná mzda 2026 pro účely pojistného: 46 557 Kč
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow sx={{ bgcolor: '#fafafa' }}>
              <TableCell sx={{ fontWeight: 600, verticalAlign: 'top' }}>Roční daňové přiznání 2026</TableCell>
              <TableCell>
                <Typography variant="body2" color="text.secondary">
                  Zákon o daních z příjmů (586/1992 Sb.) · Nezdanitelné části základu daně (§ 15)
                  · Slevy na dani: na poplatníka 30 840 Kč, na studenta 4 020 Kč, na invaliditu 2 520 / 5 040 / 16 140 Kč
                  · Daňové zvýhodnění na děti: 1. dítě 15 204 Kč, 2. dítě 22 320 Kč, 3. a další 27 840 Kč
                  · Solidární přirážka 23 % nad limit; lhůty dle pokynů GFŘ D-67
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ fontWeight: 600, verticalAlign: 'top' }}>OSVČ 2026</TableCell>
              <TableCell>
                <Typography variant="body2" color="text.secondary">
                  Zákon o daních z příjmů (586/1992 Sb.) · Zákon č. 589/1992 Sb. (sociální pojistné)
                  · Zákon č. 592/1992 Sb. (zdravotní pojistné)
                  · Výdajové paušály: 80 % (řemeslo), 60 % (živnost), 40 % (svobodná povolání), 30 % (nájem)
                  · Minimální záloha na sociální pojistné 2026: 3 852 Kč/měsíc · Zdravotní: 2 968 Kč/měsíc
                  · Sazba sociálního pojistného OSVČ: 29,2 % z vyměřovacího základu
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow sx={{ bgcolor: '#fafafa' }}>
              <TableCell sx={{ fontWeight: 600, verticalAlign: 'top' }}>Půjčka / úvěr</TableCell>
              <TableCell>
                <Typography variant="body2" color="text.secondary">
                  Výpočet anuitní splátky dle standardního vzorce složeného úrokování
                  · RPSN kalkulováno dle směrnice EU 2008/48/ES a zákona č. 257/2016 Sb. (zákon o spotřebitelském úvěru)
                  · Výsledky jsou orientační; skutečné podmínky závisí na konkrétní smlouvě s poskytovatelem
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ fontWeight: 600, verticalAlign: 'top' }}>Návratnost FVE</TableCell>
              <TableCell>
                <Typography variant="body2" color="text.secondary">
                  Výpočet vychází z průměrného ročního výnosu FVE v ČR (dle dat ERÚ a ČHMÚ)
                  · Ceny elektřiny dle aktuálních nabídek dodavatelů na spotovém trhu OTE
                  · Dotační schéma NZÚ Light (SFŽP) a NZÚ pro rok 2025–2026
                  · Degradace panelů: průměrně 0,5 % ročně dle standardů IEC 61215
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow sx={{ bgcolor: '#fafafa' }}>
              <TableCell sx={{ fontWeight: 600, verticalAlign: 'top' }}>EV vs. spalovací auto</TableCell>
              <TableCell>
                <Typography variant="body2" color="text.secondary">
                  Spotřeba elektrické energie přepočtena dle průměrných domácích a veřejných tarifů v ČR (OTE, ERÚ)
                  · Průměrná cena benzínu/nafty dle aktuálního průměru CCS
                  · Servisní náklady dle dat AAA Auto a ADAC dlouhodobých testů
                  · Odpisy vozidla dle § 26–33 zákona o daních z příjmů (pro podnikatele)
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Paper>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Výpočty jsou průběžně aktualizovány při každé změně legislativy nebo sazeb.
        Poslední aktualizace sazeb: <strong>duben 2026</strong>.
        Zdrojový kód kalkulačních algoritmů je dostupný v adresáři{' '}
        <code>/logic/</code> na GitHubu.
      </Typography>

      <Divider sx={{ my: 3 }} />

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
