import React, { useState } from 'react';
import {
  Box, Typography, Divider, Paper, Chip,
  Accordion, AccordionSummary, AccordionDetails,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const PRIMARY = '#6a1b9a';

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

export default function OsvcContent() {
  return (
    <Box sx={{ maxWidth: 800, mx: 0, mt: 6, px: { xs: 2, sm: 0 } }}>
      <Section title="Jak funguje zdanění OSVČ za rok 2025">
        <Typography variant="body1" paragraph>
          U OSVČ se nejprve stanoví zisk jako rozdíl mezi příjmy a výdaji. Výdaje lze uplatnit buď ve skutečné výši,
          nebo procentem z příjmů pomocí výdajového paušálu. Z tohoto výsledku se následně počítá daň z příjmů,
          sociální pojištění a zdravotní pojištění.
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          Pro rok 2025 platí sazba daně 15 % a zvýšená sazba 23 % z části základu daně nad 1 676 052 Kč.
          Sociální pojištění OSVČ činí 29,2 % z vyměřovacího základu a zdravotní pojištění 13,5 %.
          Vyměřovací základ je v běžném případě 50 % dosaženého zisku.
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          U hlavní činnosti se uplatňují minimální odvody. Pro rok 2025 je to minimálně 4 759 Kč měsíčně na sociální
          pojištění (u začínající hlavní OSVČ orientačně 3 399 Kč) a 3 143 Kč měsíčně na zdravotní pojištění.
          U vedlejší činnosti sociální pojištění vzniká až po dosažení rozhodné částky 111 736 Kč za celý rok.
        </Typography>
      </Section>

      <Section title="Paušální daň 2025">
        <Typography variant="body1" paragraph>
          Paušální režim je samostatná možnost, jak si zjednodušit odvody. V roce 2025 činí měsíční platba
          8 716 Kč v 1. pásmu, 16 745 Kč ve 2. pásmu a 27 139 Kč ve 3. pásmu. Kalkulačka proto u výsledku ukazuje i
          orientační srovnání, zda by pro vás mohl být paušální režim výhodnější než standardní výpočet.
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          Pro vstup do paušální daně ale nestačí jen výše příjmů. Je potřeba zároveň splnit i další podmínky Finanční
          správy – například nebýt plátcem DPH, mít příjmy do 2 milionů Kč a nemít nepovolené kombinace dalších příjmů.
        </Typography>
      </Section>

      <Section title="Příkladový výpočet OSVČ">
        <Paper variant="outlined" sx={{ p: 3, borderRadius: 2, bgcolor: '#f3e5f533' }}>
          <Typography variant="subtitle1" fontWeight={700} gutterBottom>
            Příklad: příjmy 1 000 000 Kč, výdajový paušál 60 %, hlavní činnost
          </Typography>
          <Box component="table" sx={{ width: '100%', borderCollapse: 'collapse' }}>
            <Box component="tbody">
              {[
                ['Roční příjmy', '1 000 000 Kč'],
                ['Výdaje paušálem 60 %', '− 600 000 Kč'],
                ['Zisk', '400 000 Kč'],
                ['Sociální pojištění (29,2 % z 50 % zisku)', '≈ 58 400 Kč'],
                ['Zdravotní pojištění (u hlavní činnosti se uplatní minimum)', '≈ 37 716 Kč'],
                ['Daň po slevě na poplatníka', '≈ 29 160 Kč'],
                ['Celkové odvody', '≈ 125 276 Kč'],
                ['Zůstane po odvodech', '≈ 274 724 Kč'],
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

      <Section title="Sazby a limity pro rok 2025">
        <Typography variant="body1" paragraph>
          Kalkulačka OSVČ vychází z legislativy platné pro zdaňovací období 2025. Přehled klíčových sazeb a limitů vstupujících do výpočtu:
        </Typography>
        <Box display="flex" flexWrap="wrap" gap={1} mb={3}>
          <Chip label="Soc. pojistné OSVČ: 29,2 %" variant="outlined" size="small" sx={{ borderColor: PRIMARY, color: PRIMARY }} />
          <Chip label="Zdrav. pojistné OSVČ: 13,5 %" variant="outlined" size="small" sx={{ borderColor: PRIMARY, color: PRIMARY }} />
          <Chip label="Min. zdravotní (hlavní): 3 143 Kč/měs." variant="outlined" size="small" sx={{ borderColor: PRIMARY, color: PRIMARY }} />
          <Chip label="Min. sociální (hlavní): 4 759 Kč/měs." variant="outlined" size="small" />
          <Chip label="Vedlejší OSVČ: rozhodná částka 111 736 Kč" variant="outlined" size="small" />
          <Chip label="23% daň: nad 1 676 052 Kč/rok" variant="outlined" size="small" sx={{ borderColor: '#e65100', color: '#e65100' }} />
          <Chip label="Paušální daň 1. pásmo: 8 716 Kč/měs." variant="outlined" size="small" />
        </Box>
        <Typography variant="body2" color="text.secondary" paragraph>
          <strong>Sazby pojistného OSVČ</strong> (29,2 % sociální + 13,5 % zdravotní) platí z vyměřovacího základu, který je standardně 50 % zisku. OSVČ na rozdíl od zaměstnance platí celé pojistné sama – zaměstnavatel za ni nic nedohrazuje.
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <strong>Minimální zálohy</strong> se platí měsíčně v průběhu roku. Skutečná výše pojistného se vyrovná po odevzdání přehledu ČSSZ a zdravotní pojišťovně – přeplatek pojišťovna vrátí, případný nedoplatek je nutné uhradit do 8 dnů od podání přehledu.
        </Typography>
      </Section>

      <Section title="Často kladené dotazy">
        <FaqItem
          question="Co je pro OSVČ výhodnější – skutečné výdaje, výdajový paušál nebo paušální daň?"
          answer="Záleží na poměru příjmů a nákladů i na tom, zda uplatňujete děti nebo další slevy. Výdajový paušál bývá výhodný při nižších reálných nákladech, zatímco paušální daň je zajímavá hlavně kvůli jednoduchosti a v některých situacích i nižším odvodům."
        />
        <FaqItem
          question="Kdy nemusím u vedlejší činnosti platit sociální pojištění?"
          answer="Pokud byl váš zisk z vedlejší samostatné činnosti za rok 2025 nižší než rozhodná částka 111 736 Kč (případně poměrně krácená při kratší době podnikání), povinné sociální pojištění za daný rok nevzniká."
        />
        <FaqItem
          question="Počítá kalkulačka i minimální odvody pro hlavní činnost?"
          answer="Ano. Pro rok 2025 zohledňuje minimální zdravotní pojistné 3 143 Kč měsíčně a minimální sociální pojistné 4 759 Kč měsíčně, případně orientačně i nižší minimum pro začínající hlavní OSVČ."
        />
        <FaqItem
          question="Je výsledek vhodný i pro daňové přiznání?"
          answer="Ano, kalkulačka je koncipovaná podle pravidel pro zdaňovací období 2025. Pořád jde ale o orientační online výpočet bez všech individuálních výjimek, takže pro finální podání doporučujeme kontrolu podle vašich potvrzení nebo s účetní."
        />
        <FaqItem
          question="Kolik procent z příjmů tvoří paušální výdaj pro různé obory?"
          answer="Výdajový paušál závisí na druhu příjmu: 80 % u zemědělské výroby a řemeslných živností (max. 1 600 000 Kč), 60 % u ostatních živností (max. 1 200 000 Kč), 40 % u jiné samostatné výdělečné činnosti jako jsou lékaři, advokáti nebo umělci (max. 800 000 Kč) a 30 % u příjmů z pronájmu (max. 600 000 Kč). Paušál se vždy počítá z hrubých příjmů, ne ze zisku."
        />
        <FaqItem
          question="Jaká jsou pásma paušální daně v roce 2025 a kdo do nich spadá?"
          answer="1. pásmo (platba 8 716 Kč/měsíc): příjmy do 1 000 000 Kč ročně, libovolný obor. 2. pásmo (16 745 Kč/měsíc): příjmy do 1 500 000 Kč u živností (60% paušál) nebo do 2 000 000 Kč u řemeslných živností (80% paušál). 3. pásmo (27 139 Kč/měsíc): příjmy do 2 000 000 Kč u živností (60% paušál). Do paušálního režimu nelze vstoupit, pokud jste plátce DPH, máte zaměstnance nebo souběžné příjmy ze závislé činnosti přesahující 6násobek minimální mzdy."
        />
        <FaqItem
          question="Jak se přihlásím do paušálního daňového režimu?"
          answer="Oznámení o vstupu do paušálního režimu se podává na Finanční úřad nejpozději do 10. ledna zdaňovacího období, na které se vstup vztahuje. Při zahájení podnikání lze oznámení podat do 10 dnů od registrace k dani z příjmů. Formulář je dostupný na portálu Moje daně a na každém finančním úřadu."
        />
        <FaqItem
          question="Musí OSVČ v paušálním režimu podávat daňové přiznání?"
          answer="Ne – to je hlavní výhoda paušálního režimu. OSVČ, která splnila podmínky a řádně platila měsíční zálohy, nepodává daňové přiznání, přehled pro ČSSZ ani přehled pro zdravotní pojišťovnu. Pokud ale v průběhu roku podmínky poruší (stane se plátcem DPH, překročí příjmový limit apod.), musí za celý rok podat všechna tři podání standardně."
        />
        <FaqItem
          question="Jak ovlivní uplatnění slevy na dítě výslednou daň OSVČ?"
          answer="Daňové zvýhodnění na dítě snižuje výslednou daň přímo. Pokud zvýhodnění přesáhne vypočtenou daň, vzniká daňový bonus, který stát OSVČ vyplatí – ale pouze do výše zaplacených záloh nebo při podání daňového přiznání v řádném termínu. V paušálním režimu slevu na dítě nelze uplatnit – to je jeden z hlavních důvodů, proč rodiče paušální daň mnohdy nevyužívají."
        />
        <FaqItem
          question="Co je vyměřovací základ a proč tvoří 50 % zisku?"
          answer="Vyměřovací základ je částka, ze které OSVČ počítá sociální a zdravotní pojištění. Ze zákona činí 50 % dílčího základu daně z podnikání. Logika spočívá v tom, že OSVČ nese na rozdíl od zaměstnance plné podnikatelské riziko, takže zákon uznává, že část zisku je 'odměna za riziko' nepodléhající pojistným odvodům. Dobrovolně lze zvolit vyšší základ – např. pro vyšší budoucí důchod."
        />
      </Section>
    </Box>
  );
}
