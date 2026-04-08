import React, { useState } from 'react';
import {
  Box, Typography, Divider, Paper, Chip,
  Accordion, AccordionSummary, AccordionDetails,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

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

      <Section title="Co se změnilo v roce 2026">
        <Typography variant="body1" paragraph>
          Kalkulačka je aktualizována na sazby a limity platné od 1. ledna 2026. Přehled klíčových hodnot pro výpočet čisté mzdy:
        </Typography>
        <Box display="flex" flexWrap="wrap" gap={1} mb={3}>
          <Chip label="Minimální mzda: 20 800 Kč/měs." variant="outlined" size="small" sx={{ borderColor: PRIMARY, color: PRIMARY }} />
          <Chip label="Základní sleva na dani: 2 570 Kč/měs." variant="outlined" size="small" sx={{ borderColor: PRIMARY, color: PRIMARY }} />
          <Chip label="DPP bez odvodů: do 11 999 Kč/měs." variant="outlined" size="small" sx={{ borderColor: PRIMARY, color: PRIMARY }} />
          <Chip label="DPČ bez odvodů: do 4 499 Kč/měs." variant="outlined" size="small" sx={{ borderColor: PRIMARY, color: PRIMARY }} />
          <Chip label="23% daň: nad 1 582 812 Kč/rok" variant="outlined" size="small" sx={{ borderColor: '#e65100', color: '#e65100' }} />
          <Chip label="Strop soc. pojistného: 2 350 416 Kč/rok" variant="outlined" size="small" />
        </Box>
        <Typography variant="body2" color="text.secondary" paragraph>
          <strong>Limity pro dohody:</strong> U DPP se odvody platí od 12 000 Kč měsíčně u jednoho zaměstnavatele – do 11 999 Kč jsou zaměstnanec i zaměstnavatel od odvodů osvobozeni. Platí rovněž povinná evidence všech DPP na ePortálu ČSSZ bez ohledu na výši odměny.
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <strong>Strop sociálního pojistného</strong> platí pro zaměstnance s hrubou mzdou přibližně nad 195 868 Kč měsíčně. Po dosažení ročního stropu 2 350 416 Kč sociální pojistné zaměstnance přestává být odváděno a čistá mzda se na zbývající měsíce zvýší.
        </Typography>
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
        <FaqItem
          question="Kolik odvádí zaměstnavatel navíc nad rámec hrubé mzdy?"
          answer="Zaměstnavatel odvádí za zaměstnance 24,8 % z hrubé mzdy – konkrétně 25 % na sociální pojištění a 9 % na zdravotní pojištění. Celkové náklady zaměstnavatele na zaměstnance s hrubou mzdou 40 000 Kč tak dosahují přibližně 53 680 Kč měsíčně. Tento tzv. superhrubý pohled slouží pro plánování mzdových nákladů."
        />
        <FaqItem
          question="Jak se počítá čistá mzda při studiu (student, vedlejší příjem)?"
          answer="Studenti do 26 let mohou uplatnit slevu na studenta ve výši 335 Kč měsíčně (4 020 Kč ročně), pokud studují denní formou. U DPP do limitu 11 999 Kč se navíc neplatí odvody bez ohledu na to, zda je zaměstnanec student nebo ne. Kalkulačka tuto slevu zahrnuje v kolonce daňových slev."
        />
        <FaqItem
          question="Jaká je minimální mzda v roce 2026?"
          answer="Minimální hrubá mzda v roce 2026 činí 20 800 Kč měsíčně (pro plný pracovní úvazek 40 hodin týdně). Hodinová minimální mzda je 124,40 Kč. Zaměstnavatel nesmí sjednat ani fakticky vyplatit mzdu nižší, než je tento zákonný limit."
        />
        <FaqItem
          question="Jak se liší zdanění u zaměstnanců s podepsaným a nepodepsaným prohlášením?"
          answer="Zaměstnanec s podepsaným prohlášením poplatníka (tiskopis 2320) uplatňuje měsíčně základní slevu 2 570 Kč a zálohu na daň platí nižší. Bez podepsaného prohlášení záloha na daň odpovídá plným 15 % ze základu bez jakýchkoli slev – to typicky nastává u souběhu pracovního poměru u druhého zaměstnavatele nebo u krátkodobých výpomocí."
        />
        <FaqItem
          question="Kdy musím jako zaměstnanec podat daňové přiznání sám?"
          answer="Daňové přiznání musíte podat sami, pokud jste měli v roce 2025 příjmy od více zaměstnavatelů souběžně, vedlejší příjmy (pronájem, podnikání, kapitál) přesahující 20 000 Kč, příjmy ze zahraničí nebo jste uplatnili ztrátu z minulých let. Termín pro vlastní podání je 1. dubna 2026, při podání přes daňového poradce 1. července 2026."
        />
        <FaqItem
          question="Co je průměrná mzda v ČR a jak ovlivňuje odvody?"
          answer="Průměrná hrubá měsíční mzda v ČR pro rok 2025 činí přibližně 45 800 Kč. Tato hodnota se používá pro výpočet maximálního vyměřovacího základu pro sociální pojištění (48násobek průměrné mzdy = přibližně 2 198 400 Kč ročně). Po dosažení tohoto stropu se sociální pojištění přestává platit."
        />
      </Section>

    </Box>
  );
}
