import React from 'react';
import { Box, Typography, Divider, Paper } from '@mui/material';

const PRIMARY = '#e65100';

function Section({ title, children }) {
  return (
    <Box mt={5}>
      <Typography variant="h5" fontWeight={700} sx={{ color: PRIMARY }} gutterBottom>
        {title}
      </Typography>
      <Divider sx={{ mb: 2 }} />
      {children}
    </Box>
  );
}

function FaqItem({ question, answer }) {
  return (
    <Box mb={3}>
      <Typography variant="subtitle1" fontWeight={700} gutterBottom>
        {question}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {answer}
      </Typography>
    </Box>
  );
}

export default function AnnualTaxContent() {
  return (
    <Box sx={{ maxWidth: 800, mx: 0, mt: 6, px: { xs: 2, sm: 0 } }}>

      <Section title="Jak funguje roční zúčtování daně">
        <Typography variant="body1" paragraph>
          Roční zúčtování daně z příjmu je proces, při kterém se porovná skutečná daňová povinnost zaměstnance za celý rok se zálohámi na daň sraženými zaměstnavatelem během roku. Výsledkem je buď přeplatek (stát vrátí peníze) nebo nedoplatek (zaměstnanec doplatí rozdíl).
        </Typography>
        <Typography variant="subtitle2" fontWeight={700} gutterBottom>
          Kdo podává roční zúčtování?
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          Zaměstnanci, kteří měli příjmy pouze ze závislé činnosti, mohou požádat zaměstnavatele o provedení ročního zúčtování do 15. února. Zaměstnanec s příjmy z více zdrojů najednou, vedlejšími příjmy přesahujícími 20 000 Kč nebo příjmy ze zahraničí musí podat daňové přiznání sám do 1. dubna (při podání přes daňového poradce do 1. července).
        </Typography>
        <Typography variant="subtitle2" fontWeight={700} gutterBottom>
          Nezdanitelné části základu daně (§15 ZDP)
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          Od základu daně lze odečíst: příspěvky na soukromé životní pojištění (max. 24 000 Kč/rok), příspěvky na penzijní spoření přesahující 24 000 Kč (max. odpočet 48 000 Kč), úroky z hypotéky nebo úvěru na bydlení (max. 150 000 Kč/rok) a dary na veřejně prospěšné účely (min. 1 000 Kč nebo 2 % základu, max. 15 % základu).
        </Typography>
        <Typography variant="subtitle2" fontWeight={700} gutterBottom>
          Slevy na dani
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          Základní sleva na poplatníka je 30 840 Kč ročně (2 570 Kč/měsíc). Dále lze uplatnit slevu na manžela/manželku s příjmem do 68 000 Kč ročně (24 840 Kč), slevu na invaliditu (2 520–5 040 Kč/rok), slevu pro držitele ZTP/P (16 140 Kč/rok) a daňové zvýhodnění na děti (15 204 Kč na první dítě, 22 320 Kč na druhé, 27 840 Kč na třetí a každé další).
        </Typography>
      </Section>

      <Section title="Příkladový výpočet ročního zúčtování">
        <Paper variant="outlined" sx={{ p: 3, borderRadius: 2, bgcolor: '#fff3e033' }}>
          <Typography variant="subtitle1" fontWeight={700} gutterBottom>
            Příklad: Roční hrubá mzda 480 000 Kč, jedno dítě, zálohy na daň 42 000 Kč
          </Typography>
          <Box component="table" sx={{ width: '100%', borderCollapse: 'collapse' }}>
            <Box component="tbody">
            {[
              ['Roční hrubá mzda',                 '480 000 Kč'],
              ['Základ daně',                      '480 000 Kč'],
              ['Daň 15 %',                         '72 000 Kč'],
              ['Sleva na poplatníka',              '− 30 840 Kč'],
              ['Daňové zvýhodnění na 1. dítě',     '− 15 204 Kč'],
              ['Výsledná daňová povinnost',         '25 956 Kč'],
              ['Zálohy sražené zaměstnavatelem',    '42 000 Kč'],
              ['Přeplatek na dani',                '≈ 16 044 Kč'],
            ].map(([label, value]) => (
              <Box component="tr" key={label} sx={{ borderBottom: '1px solid #e0e0e0' }}>
                <Box component="td" sx={{ py: 0.75 }}>
                  <Typography variant="body2">{label}</Typography>
                </Box>
                <Box component="td" sx={{ py: 0.75, textAlign: 'right' }}>
                  <Typography variant="body2" fontWeight={700}>{value}</Typography>
                </Box>
              </Box>
            ))}
            </Box>
          </Box>
        </Paper>
      </Section>

      <Section title="Často kladené dotazy">
        <FaqItem
          question="Do kdy musím podat žádost o roční zúčtování?"
          answer="Žádost o roční zúčtování u zaměstnavatele je nutné podat do 15. února roku následujícího po zdaňovacím období. Pro rok 2026 tedy do 15. února 2027. Zaměstnavatel musí zúčtování provést nejpozději při výplatě mzdy za březen."
        />
        <FaqItem
          question="Kdy vzniká přeplatek na dani?"
          answer="Přeplatek vzniká, pokud zálohy na daň sražené zaměstnavatelem v průběhu roku převýšily skutečnou roční daňovou povinnost. Nejčastěji se to stává při uplatnění nezdanitelných částí základu daně (hypotéka, penzijní spoření), při narození dítěte v průběhu roku nebo při nerovnoměrných příjmech během roku."
        />
        <FaqItem
          question="Mohu uplatnit odpočet za hypotéku i jako zaměstnanec?"
          answer="Ano. Zaměstnanec může uplatnit odpočet úroků z hypotéky nebo úvěru ze stavebního spoření až do výše 150 000 Kč ročně. Odpočet se uplatňuje v ročním zúčtování nebo v daňovém přiznání na základě potvrzení od banky o zaplacených úrocích."
        />
        <FaqItem
          question="Co je daňový bonus na děti a jak ho získám?"
          answer="Daňový bonus vzniká, pokud daňové zvýhodnění na děti přesáhne výslednou daňovou povinnost. Stát pak rozdíl vyplatí. Pro nárok na bonus musí příjmy zaměstnance dosáhnout alespoň 6násobku minimální mzdy za rok (v roce 2026 celkem 124 800 Kč). Bonus se uplatňuje v ročním zúčtování nebo daňovém přiznání."
        />
      </Section>

    </Box>
  );
}
