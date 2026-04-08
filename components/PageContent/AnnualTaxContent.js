import React, { useState } from 'react';
import {
  Box, Typography, Divider, Paper, Chip,
  Accordion, AccordionSummary, AccordionDetails,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

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
  const [expanded, setExpanded] = useState(false);

  return (
    <Accordion
      expanded={expanded}
      onChange={(_, isOpen) => setExpanded(isOpen)}
      elevation={0}
      sx={{
        border: '1px solid #e0e0e0',
        mb: 1,
        borderRadius: '8px !important',
        '&:before': { display: 'none' },
      }}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="body2" fontWeight={600}>{question}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
          {answer}
        </Typography>
      </AccordionDetails>
    </Accordion>
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

      <Section title="Co se změnilo v roce 2026">
        <Typography variant="body1" paragraph>
          Pro roční zúčtování za zdaňovací období roku 2026 platí tyto klíčové hodnoty. Přehled uplatnitelných odpočtů a limitů:
        </Typography>
        <Box display="flex" flexWrap="wrap" gap={1} mb={3}>
          <Chip label="23% daň: nad 1 582 812 Kč/rok" variant="outlined" size="small" sx={{ borderColor: PRIMARY, color: PRIMARY }} />
          <Chip label="Sleva na poplatníka: 30 840 Kč/rok" variant="outlined" size="small" sx={{ borderColor: PRIMARY, color: PRIMARY }} />
          <Chip label="Min. příjem pro daňový bonus: 124 800 Kč" variant="outlined" size="small" sx={{ borderColor: PRIMARY, color: PRIMARY }} />
          <Chip label="Penz. spoření: max. odpočet 48 000 Kč" variant="outlined" size="small" />
          <Chip label="Hypotéka: max. odpočet 150 000 Kč" variant="outlined" size="small" />
          <Chip label="Živ. pojištění: max. odpočet 24 000 Kč" variant="outlined" size="small" />
        </Box>
        <Typography variant="body2" color="text.secondary" paragraph>
          <strong>Hranice pro 23% daňovou sazbu</strong> je pro rok 2026 stanovena na 1 582 812 Kč ročně (36násobek průměrné mzdy 43 967 Kč). Tato hranice se každoročně přepočítává – příjmy nad ni podléhají vyšší sazbě, zbývající část základní sazbě 15 %.
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <strong>Nezdanitelné části základu daně</strong> se uplatňují vždy zpětně v ročním zúčtování nebo daňovém přiznání – nelze je promítnout do měsíčních srážek. Odpočet na penzijní spoření, hypotéku nebo dary proto přináší vrácení přeplatku při ročním vyúčtování.
        </Typography>
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
        <FaqItem
          question="Jak vysoký odpočet si mohu odečíst za penzijní spoření?"
          answer="Odpočet na penzijní připojištění nebo doplňkové penzijní spoření činí částku přesahující 24 000 Kč ročně (tj. příspěvky nad 2 000 Kč měsíčně). Maximální odpočet je 48 000 Kč ročně. Pokud tedy platíte 6 000 Kč měsíčně (72 000 Kč ročně), odečtete si ze základu daně 48 000 Kč – daňová úspora činí 7 200 Kč."
        />
        <FaqItem
          question="Co se stane, pokud žádost o roční zúčtování zapomenu podat?"
          answer="Pokud nepodáte žádost do 15. února, zaměstnavatel roční zúčtování neprovede. V tom případě můžete přijít o přeplatek na dani, který by vznikl uplatněním nezdanitelných částí nebo slev. Možností je podat daňové přiznání sami do 1. dubna, kde tyto odpočty uplatníte dodatečně."
        />
        <FaqItem
          question="Mohu v ročním zúčtování uplatnit dary na charitu?"
          answer="Ano. Dary na veřejně prospěšné účely (registrovaným neziskovým organizacím, církvím, obcím apod.) jsou odečitatelnou položkou od základu daně. Minimální dar musí činit 1 000 Kč nebo 2 % ročního základu daně. Celkový odpočet nesmí překročit 15 % základu daně. Pro uplatnění je potřeba potvrzení od příjemce daru."
        />
        <FaqItem
          question="Co je to sleva na manžela/manželku a kdy na ni mám nárok?"
          answer="Slevu na manžela nebo manželku ve výši 24 840 Kč ročně lze uplatnit, pokud váš partner žil ve společné domácnosti a jeho/její vlastní příjmy nepřesáhly 68 000 Kč za rok. Do tohoto limitu se nezapočítávají dávky státní sociální podpory (mateřská, rodičovský příspěvek, přídavky na děti). Sleva se uplatňuje pouze v ročním zúčtování nebo daňovém přiznání, nikoli měsíčně."
        />
        <FaqItem
          question="Jak kalkulačka počítá zálohy na daň sražené zaměstnavatelem?"
          answer="Kalkulačka vychází ze zadané měsíční hrubé mzdy a simuluje standardní výpočet zálohy: z hrubé mzdy odečte sociální (7,1 %) a zdravotní (4,5 %) pojištění, základ zaokrouhlí na stokoruny nahoru, vypočte 15% daň a odečte uplatňované měsíční slevy. Roční zálohy jsou 12× tato částka."
        />
        <FaqItem
          question="Jaký je rozdíl mezi ročním zúčtováním a daňovým přiznáním?"
          answer="Roční zúčtování provádí zaměstnavatel za zaměstnance – je jednodušší a bezplatné. Daňové přiznání podává poplatník sám na finanční úřad – je povinné při příjmech z více zdrojů, vedlejší činnosti nebo příjmech ze zahraničí. Obě cesty vedou ke stejnému výsledku (přeplatek nebo doplatek), liší se procesem a zodpovědností."
        />
      </Section>

    </Box>
  );
}
