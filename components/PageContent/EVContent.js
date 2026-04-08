import React, { useState } from 'react'
import {
  Box, Typography, Divider, Paper, Chip,
  Accordion, AccordionSummary, AccordionDetails,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

const PRIMARY = '#00897b'

function Section({ title, children }) {
  return (
    <Box mt={5}>
      <Typography variant="h5" fontWeight={700} sx={{ color: PRIMARY }} gutterBottom>
        {title}
      </Typography>
      <Divider sx={{ mb: 2 }} />
      {children}
    </Box>
  )
}

function FaqItem({ question, answer }) {
  const [expanded, setExpanded] = useState(false)

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
  )
}

export default function EVContent() {
  return (
    <Box sx={{ maxWidth: 800, mx: 0, mt: 6, px: { xs: 2, sm: 0 } }}>
      <Section title="Jak funguje kalkulačka EV vs. spalovací motor">
        <Typography variant="body1" paragraph>
          Kalkulačka porovnává čistě provozní náklady elektroauta, benzínového auta a dieselu.
          Stačí zadat roční nájezd, spotřebu na 100 km a cenu elektřiny nebo pohonných hmot.
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          Výsledek ukáže náklad na 100 km, průměrný náklad na 1 km jízdy a celkové roční i měsíční náklady.
          Díky tomu snadno zjistíte, zda je pro vás při konkrétním využití výhodnější EV, benzín nebo nafta.
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Kalkulačka nezohledňuje pořizovací cenu auta, servis, pojištění ani ztrátu hodnoty vozu.
          Zaměřuje se na provozní stránku, která bývá při ročním nájezdu 10 000–30 000 km nejviditelnější.
        </Typography>
      </Section>

      <Section title="Příklad srovnání nákladů">
        <Paper variant="outlined" sx={{ p: 3, borderRadius: 2, bgcolor: '#e0f2f133' }}>
          <Typography variant="subtitle1" fontWeight={700} gutterBottom>
            Příklad: roční nájezd 15 000 km
          </Typography>
          <Box component="table" sx={{ width: '100%', borderCollapse: 'collapse' }}>
            <Box component="tbody">
              {[
                ['EV – spotřeba 17 kWh/100 km, elektřina 4,8 Kč/kWh', '12 240 Kč / rok'],
                ['Benzín – spotřeba 6,7 l/100 km, cena 38,5 Kč/l', '38 693 Kč / rok'],
                ['Nafta – spotřeba 5,8 l/100 km, cena 37,2 Kč/l', '32 364 Kč / rok'],
                ['Úspora EV oproti benzínu', '≈ 26 453 Kč / rok'],
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

      <Section title="Aktuální orientační sazby v ČR pro rok 2026">
        <Typography variant="body1" paragraph>
          Kalkulačka je předvyplněna běžnými orientačními cenami v ČR. Všechny hodnoty lze upravit podle vaší reality.
        </Typography>
        <Box display="flex" flexWrap="wrap" gap={1} mb={2}>
          <Chip label="Domácí nabíjení: 4,5–6 Kč/kWh" variant="outlined" size="small" sx={{ borderColor: PRIMARY, color: PRIMARY }} />
          <Chip label="Veřejné DC nabíjení: 8–14 Kč/kWh" variant="outlined" size="small" sx={{ borderColor: PRIMARY, color: PRIMARY }} />
          <Chip label="Benzín Natural 95: 38–40 Kč/l" variant="outlined" size="small" />
          <Chip label="Nafta: 36–38 Kč/l" variant="outlined" size="small" />
          <Chip label="EV spotřeba: 14–20 kWh/100 km" variant="outlined" size="small" />
          <Chip label="Benzín: 5,5–8 l/100 km" variant="outlined" size="small" />
        </Box>
        <Typography variant="body2" color="text.secondary">
          Největší vliv na výhodnost EV má cena nabíjení. Pokud nabíjíte doma nebo z vlastní FVE, provozní náklady bývají výrazně nižší.
        </Typography>
      </Section>

      <Section title="Často kladené dotazy">
        <FaqItem
          question="Vyplatí se elektroauto už při malém nájezdu?"
          answer="Z provozního hlediska bývá EV levnější téměř vždy, zvlášť při domácím nabíjení. Při malém nájezdu 5–8 tisíc km ročně ale úspora nemusí stačit na vyrovnání vyšší pořizovací ceny. Při nájezdu nad 12–15 tisíc km ročně je rozdíl v provozu zpravidla výraznější."
        />
        <FaqItem
          question="Kolik stojí 1 km jízdy elektroautem?"
          answer="Při běžné spotřebě 15–18 kWh/100 km a domácí ceně elektřiny 4,5–5 Kč/kWh vychází náklad přibližně na 0,70 až 0,90 Kč za 1 km. U veřejného rychlonabíjení může být cena vyšší, často 1,20 až 2 Kč/km."
        />
        <FaqItem
          question="Jak moc zvyšuje zima spotřebu EV?"
          answer="V zimě může spotřeba EV vzrůst zhruba o 10–30 % kvůli vytápění kabiny a chladnějším bateriím. U krátkých jízd po městě je nárůst vyšší než u delších tras. Proto je dobré pro zimní provoz v kalkulačce navýšit spotřebu o 2–4 kWh/100 km."
        />
        <FaqItem
          question="Je veřejné nabíjení dražší než domácí?"
          answer="Ano. Domácí nabíjení bývá nejlevnější a často rozhoduje o celkové výhodnosti EV. Veřejné AC nabíjení stojí obvykle 6–9 Kč/kWh, rychlé DC nabíjení 8–14 Kč/kWh. Pokud většinu energie čerpáte na veřejných stojanech, rozdíl oproti benzínu se zmenšuje."
        />
        <FaqItem
          question="Jsou u EV nižší servisní náklady?"
          answer="Většinou ano. Elektroauto nemá olej, spojku, výfuk ani klasickou převodovku, takže běžný servis je jednodušší. Stále ale platíte za pneumatiky, brzdy, geometrii, klimatizaci nebo případné opravy podvozku. Kalkulačka tento rozdíl zatím nezapočítává."
        />
        <FaqItem
          question="Pomůže domácí FVE s provozem elektroauta?"
          answer="Ano, a velmi výrazně. Pokud nabíjíte EV z vlastní fotovoltaiky, může být reálná cena energie jen zlomek ceny ze sítě. Kombinace FVE a EV je proto z hlediska provozních nákladů velmi výhodná."
        />
        <FaqItem
          question="Je diesel stále výhodnější na dlouhé trasy?"
          answer="Z hlediska spotřeby bývá diesel úspornější než benzín a při dálkových trasách může být velmi konkurenceschopný. EV ale i tak často vychází levněji na 1 km, pokud se nabíjí převážně doma. Rozhoduje konkrétní spotřeba, styl jízdy a cena energie."
        />
        <FaqItem
          question="Počítá kalkulačka i pořizovací cenu vozu?"
          answer="Ne. Tato verze porovnává jen roční provozní náklady a náklad na 1 km jízdy. Pokud budeš chtít, lze ji později rozšířit i o pořizovací cenu, servis, pojištění a ztrátu hodnoty vozu pro úplné TCO srovnání."
        />
      </Section>
    </Box>
  )
}
