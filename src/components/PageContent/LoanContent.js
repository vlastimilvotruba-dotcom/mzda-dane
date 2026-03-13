import React from 'react';
import { Box, Typography, Divider, Paper } from '@mui/material';

const PRIMARY = '#2e7d32';

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

export default function LoanContent() {
  return (
    <Box sx={{ maxWidth: 800, mx: 0, mt: 6, px: { xs: 2, sm: 0 } }}>

      <Section title="Jak funguje kalkulačka půjčky">
        <Typography variant="body1" paragraph>
          Kalkulačka půjčky vypočítá výši měsíční splátky, celkovou zaplacenou částku a celkové úroky pro libovolnou půjčku nebo hypotéku. Výpočet používá standardní anuitní splácení.
        </Typography>
        <Typography variant="subtitle2" fontWeight={700} gutterBottom>
          Co je anuitní splátka?
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          Anuitní splátka je pravidelná měsíční platba, která zůstává po celou dobu splácení stejně vysoká. Na začátku splácení tvoří větší část splátky úroky, postupně se poměr mění ve prospěch splácení jistiny.
        </Typography>
        <Typography variant="subtitle2" fontWeight={700} gutterBottom>
          Co je RPSN?
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          RPSN (roční procentní sazba nákladů) vyjadřuje celkové náklady úvěru za rok včetně všech poplatků, nejen úrokové sazby. Je to nejlepší ukazatel pro srovnání různých půjček. Kalkulačka pracuje s roční úrokovou sazbou p.a., která odpovídá RPSN u půjček bez dalších poplatků.
        </Typography>
        <Typography variant="subtitle2" fontWeight={700} gutterBottom>
          Rozdíl mezi půjčkou a hypotékou
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          Hypotéka je úvěr zajištěný nemovitostí, obvykle s nižší úrokovou sazbou (4–6 % p.a.) a delší dobou splatnosti (15–30 let). Spotřebitelská půjčka není zajištěna, má vyšší sazbu (8–20 % p.a.) a kratší splatnost (1–8 let).
        </Typography>
      </Section>

      <Section title="Příkladový výpočet splátky hypotéky">
        <Paper variant="outlined" sx={{ p: 3, borderRadius: 2, bgcolor: '#e8f5e933' }}>
          <Typography variant="subtitle1" fontWeight={700} gutterBottom>
            Příklad: Hypotéka 3 000 000 Kč, sazba 5 % p.a., splatnost 25 let (300 měsíců)
          </Typography>
          <Box component="table" sx={{ width: '100%', borderCollapse: 'collapse' }}>
            <Box component="tbody">
            {[
              ['Výše půjčky',         '3 000 000 Kč'],
              ['Roční úroková sazba', '5 % p.a.'],
              ['Doba splácení',       '300 měsíců (25 let)'],
              ['Měsíční splátka',     '≈ 17 544 Kč'],
              ['Celkem zaplaceno',    '≈ 5 263 200 Kč'],
              ['Z toho úroky',        '≈ 2 263 200 Kč'],
              ['Z toho jistina',      '3 000 000 Kč'],
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
          question="Jak snížit celkové úroky u hypotéky?"
          answer="Celkové úroky lze snížit zkrácením doby splácení, mimořádnými splátkami jistiny nebo refinancováním při poklesu úrokových sazeb. Každé snížení sazby o 1 % u hypotéky 3 mil. Kč na 25 let ušetří cca 500 000 Kč na úrocích."
        />
        <FaqItem
          question="Co je fixace úrokové sazby?"
          answer="Fixace je období, po které se úroková sazba nemění – typicky 3, 5 nebo 10 let. Po skončení fixace banka nabídne novou sazbu podle aktuálního trhu. Při refixaci je možné hypotéku refinancovat u jiné banky bez sankce."
        />
        <FaqItem
          question="Vyplatí se předčasné splacení půjčky?"
          answer="Předčasné splacení zpravidla ušetří na úrocích, zvláště v prvních letech splácení. U spotřebitelských úvěrů je předčasné splacení ze zákona bezplatné nebo s poplatkem max. 1 % z předčasně splacené částky."
        />
        <FaqItem
          question="Jaká je maximální výše hypotéky?"
          answer="Česká národní banka stanovuje limity: LTV maximálně 80 % hodnoty nemovitosti, DTI nesmí překročit 8,5násobek ročního příjmu a DSTI nesmí přesáhnout 45 % čistého měsíčního příjmu."
        />
      </Section>

    </Box>
  );
}
