import React from 'react';
import { Box, Typography, Divider, Paper } from '@mui/material';

const PRIMARY = '#1565c0';

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

export default function SalaryContent() {
  return (
    <Box sx={{ maxWidth: 800, mx: 0, mt: 6, px: { xs: 2, sm: 0 } }}>

      <Section title="Jak funguje kalkulačka čisté mzdy">
        <Typography variant="body1" paragraph>
          Kalkulačka čisté mzdy vypočítá, kolik peněz skutečně obdržíte na účet po odečtení všech zákonných odvodů a daní. Výpočet vychází z hrubé mzdy a zohledňuje aktuální sazby platné pro rok 2026.
        </Typography>
        <Typography variant="subtitle2" fontWeight={700} gutterBottom>
          Sociální pojištění zaměstnance
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          Zaměstnanec odvádí 7,1 % z hrubé mzdy na sociální pojištění. Tato částka zahrnuje důchodové pojištění (6,5 %) a příspěvek na státní politiku zaměstnanosti (0,6 %).
        </Typography>
        <Typography variant="subtitle2" fontWeight={700} gutterBottom>
          Zdravotní pojištění zaměstnance
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          Zaměstnanec odvádí 4,5 % z hrubé mzdy na zdravotní pojištění. Zaměstnavatel za zaměstnance odvádí dalších 9 %.
        </Typography>
        <Typography variant="subtitle2" fontWeight={700} gutterBottom>
          Daň z příjmu fyzických osob
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          Daň z příjmu v roce 2026 činí 15 % ze základu daně do 1 582 812 Kč ročně. Z části příjmů přesahující tento limit se platí 23 %. Základ daně je roven hrubé mzdě (superhrubá mzda byla zrušena).
        </Typography>
        <Typography variant="subtitle2" fontWeight={700} gutterBottom>
          Sleva na poplatníka
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          Každý zaměstnanec s podepsaným prohlášením poplatníka má nárok na základní slevu 2 570 Kč měsíčně (30 840 Kč ročně), která snižuje vypočtenou daň.
        </Typography>
      </Section>

      <Section title="Příkladový výpočet čisté mzdy">
        <Paper variant="outlined" sx={{ p: 3, borderRadius: 2, bgcolor: '#e3f2fd33' }}>
          <Typography variant="subtitle1" fontWeight={700} gutterBottom>
            Příklad: HPP, hrubá mzda 40 000 Kč, bezdětný zaměstnanec
          </Typography>
          <Box component="table" sx={{ width: '100%', borderCollapse: 'collapse' }}>
            <Box component="tbody">
            {[
              ['Hrubá mzda',                 '40 000 Kč'],
              ['Sociální pojištění (7,1 %)',  '− 2 840 Kč'],
              ['Zdravotní pojištění (4,5 %)', '− 1 800 Kč'],
              ['Základ daně',                '40 000 Kč'],
              ['Daň před slevami (15 %)',     '6 000 Kč'],
              ['Sleva na poplatníka',         '− 2 570 Kč'],
              ['Výsledná daň',               '3 430 Kč'],
              ['Čistá mzda',                 '≈ 31 930 Kč'],
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
          question="Jaký je rozdíl mezi HPP, DPP a DPČ?"
          answer="HPP (hlavní pracovní poměr) je standardní pracovní smlouva s plnými odvody. DPP (dohoda o provedení práce) umožňuje brigádní práci – do 11 999 Kč měsíčně u jednoho zaměstnavatele se neplatí sociální ani zdravotní pojištění. DPČ (dohoda o pracovní činnosti) má limit pro osvobození od odvodů do 4 499 Kč měsíčně."
        />
        <FaqItem
          question="Co je daňový bonus na děti?"
          answer="Pokud daňové zvýhodnění na děti přesáhne vypočtenou daň, vzniká daňový bonus – stát zaměstnanci rozdíl vyplatí. Čistá mzda může být díky daňovému bonusu vyšší než hrubá. Nárok na bonus vzniká při minimálním příjmu 4 500 Kč měsíčně."
        />
        <FaqItem
          question="Jak ovlivní čistou mzdu invalidita nebo ZTP/P průkaz?"
          answer="Držitel průkazu ZTP/P má nárok na měsíční slevu na dani 1 345 Kč. Sleva na invaliditu 1. a 2. stupně činí 210 Kč měsíčně, pro 3. stupeň invalidity je to 420 Kč měsíčně. Tyto slevy přímo snižují vypočtenou daň, a tím zvyšují čistou mzdu."
        />
        <FaqItem
          question="Kdy se u DPP použije srážková daň?"
          answer="U DPP bez podepsaného prohlášení poplatníka se z odměny do 11 999 Kč uplatňuje srážková daň 15 %. Tato daň je konečná a zaměstnanec již nepodává daňové přiznání. Při odměně 12 000 Kč a více se odvádí záloha na daň stejně jako u HPP."
        />
      </Section>

    </Box>
  );
}
