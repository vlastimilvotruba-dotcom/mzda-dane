import React, { useState } from 'react';
import {
  Box, Typography, Accordion, AccordionSummary, AccordionDetails,
  Chip, Divider, Paper, Grid,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

const ACCENT = '#f57f17';

const nzuPrograms = [
  {
    nazev: 'Bezúročná půjčka na FVE (v přípravě)',
    castka: 'plná výše investice',
    podminka: 'Připravovaný nástupce NZÚ dotací – splácení bez úroků po dobu 10–15 let. Podmínky zatím nejsou finalizovány; sledujte novazelenausporam.cz.',
    color: '#e8f5e9',
    chipColor: 'success',
  },
  {
    nazev: 'NZÚ Light – nízkopříjmové domácnosti',
    castka: 'až 100 % nákladů',
    podminka: 'Stále aktivní. Příjem do 170 % životního minima (~28 000 Kč čistého/měs. pro 4-čl. rodinu). Nekombinuje se s NZÚ přímou dotací.',
    color: '#fff8e1',
    chipColor: 'warning',
  },
  {
    nazev: 'NZÚ přímé dotace na FVE (pozastaveno)',
    castka: 'bylo 50–200 000 Kč',
    podminka: 'Přímé dotace pro rodinné domy jsou od r. 2025 pozastaveny – alokace vyčerpána. Aktuální stav sledujte na webu SFŽP.',
    color: '#ffebee',
    chipColor: 'error',
  },
  {
    nazev: 'OPŽP – bytové domy a obce',
    castka: 'individuální',
    podminka: 'Operační program Životní prostředí – stále aktivní pro bytové domy, SVJ a municipality. Výše závisí na projektu a regionu.',
    color: '#f3e5f5',
    chipColor: 'secondary',
  },
];

const faqs = [
  {
    q: 'Kolik elektřiny FVE reálně vyrobí?',
    a: 'V České republice se počítá průměrně 950–1 100 kWh za rok na každý 1 kWp instalovaného výkonu. Záleží na orientaci střechy (jih = nejlepší), sklonu (30–35° je optimum) a zastínění. Kalkulačka počítá s průměrem 1 000 kWh/kWp.',
  },
  {
    q: 'Co je vlastní spotřeba a proč záleží?',
    a: 'Vlastní spotřeba je podíl vyrobené elektřiny, který spotřebujete přímo doma – místo nákupu ze sítě za 5–6 Kč/kWh. Přebytky prodáte dodavateli za ~1–2 Kč/kWh. Čím vyšší vlastní spotřeba, tím rychlejší návratnost. Bez baterie je reálná vlastní spotřeba 50–70 %, s baterií 80–95 %.',
  },
  {
    q: 'Jak funguje výkup přebytků?',
    a: 'Od 1. 1. 2024 platí komunitní energetika – přebytky lze sdílet s ostatními odběrateli nebo prodávat dodavateli. Výkupní cena se liší podle smlouvy, obvykle 1,5–2,5 Kč/kWh. Někteří dodavatelé nabízejí tzv. virtuální baterii – přebytky "uložíte" a čerpáte večer.',
  },
  {
    q: 'Jsou ještě dostupné dotace na FVE z Nové zelené úsporám?',
    a: 'Přímé dotace NZÚ pro rodinné domy na FVE jsou od roku 2025 pozastaveny – alokace byla vyčerpána. Stále je aktivní NZÚ Light pro nízkopříjmové domácnosti a OPŽP pro bytové domy a obce. Vláda připravuje nástupnický program bezúročných půjček, který by měl umožnit financování plné výše investice se splácením bez úroků po dobu 10–15 let. Aktuální stav sledujte na novazelenausporam.cz.',
  },
  {
    q: 'Musím mít stavební povolení na FVE?',
    a: 'FVE do 50 kWp na rodinném domě nevyžaduje stavební povolení ani ohlášení stavby – stačí jen oznámení na distribuční soustavu (ČEZ, E.ON, PRE). Distributor musí do 30 dnů potvrdit připojení. Větší instalace nebo samostatné konstrukce na pozemku mohou povolení vyžadovat.',
  },
  {
    q: 'Potřebuji souhlas sítě (distributora) a jak dlouho to trvá?',
    a: 'Ano – před instalací podáte žádost o připojení k distributorovi. Pokud výkon FVE nepřesáhne rezervovaný příkon (typicky 3×25 A = ~17 kWp), distributor je povinen schválit připojení. Lhůta je 30 dnů. Poté uzavřete smlouvu o připojení a smlouvu o výkupu přebytků.',
  },
  {
    q: 'Jak ovlivní FVE daně – musím přiznat příjem z prodeje přebytků?',
    a: 'Pokud prodáte přebytky za méně než 30 000 Kč ročně, příjem je od daně osvobozen (§ 10 odst. 3 ZDP). Nad 30 000 Kč je nutno uvést do daňového přiznání jako "ostatní příjmy". Pro OSVČ platí jiná pravidla – příjem je součástí příjmů z podnikání.',
  },
  {
    q: 'Vyplatí se baterie k FVE?',
    a: 'Baterie zvýší vlastní spotřebu z ~65 % na ~85–90 % a tím zkrátí dobu návratnosti o 1–3 roky. Cena baterie (4–10 kWh) je 80 000–180 000 Kč. S dotací NZÚ (30 000 Kč/kWh nad 4 kWh) se vyplatí téměř vždy, bez dotace záleží na konkrétních číslech. Kalkulačka vám to spočítá – zadejte vyšší vlastní spotřebu (85–90 %) a přičtěte cenu baterie k instalaci.',
  },
  {
    q: 'Jak dlouho FVE panely vydrží?',
    a: 'Výrobci garantují 80–90 % výkonu po 25–30 letech. Reálná životnost je 30–40 let. Měnič (střídač) má kratší životnost – 10–15 let, výměna stojí 20 000–40 000 Kč. Kalkulačka počítá s 25letým horizontem bez nákladů na servis.',
  },
  {
    q: 'Co je NZÚ Light a kdo na ni má nárok?',
    a: 'NZÚ Light je zjednodušená verze dotačního programu pro nízkopříjmové domácnosti. Nárok mají domácnosti s příjmem do 170 % životního minima (zhruba čistý příjem do ~28 000 Kč/měsíc pro 4-člennou rodinu). Dotace pokrývá až 100 % uznatelných nákladů. Žádost se podává přes krajské pobočky nebo online portál.',
  },
];

export default function FVEContent() {
  const [expanded, setExpanded] = useState(false);
  const toggle = (panel) => (_, isOpen) => setExpanded(isOpen ? panel : false);

  return (
    <Box mt={5}>
      {/* ── Dotační programy ── */}
      <Typography variant="h6" fontWeight={700} color={ACCENT} mb={1}>
        Dotační programy 2026
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={2}>
        Situace s podporou FVE se v roce 2025–2026 změnila – přímé dotace NZÚ jsou pozastaveny z důvodu
        vyčerpání alokace. Stát připravuje nástupnický program bezúročných půjček. Níže je přehled
        aktuálního stavu všech programů.
      </Typography>

      <Grid container spacing={2} mb={4}>
        {nzuPrograms.map((p) => (
          <Grid item xs={12} sm={6} key={p.nazev}>
            <Paper elevation={0} sx={{ p: 2, bgcolor: p.color, borderRadius: 2, height: '100%' }}>
              <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={1}>
                <Typography variant="subtitle2" fontWeight={700} sx={{ flex: 1, mr: 1 }}>
                  {p.nazev}
                </Typography>
                <Chip label={p.castka} color={p.chipColor} size="small" sx={{ fontWeight: 700, flexShrink: 0 }} />
              </Box>
              <Typography variant="body2" color="text.secondary">{p.podminka}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* ── Co se vyplatí / nevyplatí ── */}
      <Divider sx={{ mb: 3 }} />
      <Typography variant="h6" fontWeight={700} color={ACCENT} mb={2}>
        Kdy se FVE vyplatí?
      </Typography>
      <Grid container spacing={2} mb={4}>
        <Grid item xs={12} sm={6}>
          <Paper elevation={0} sx={{ p: 2, bgcolor: '#e8f5e9', borderRadius: 2 }}>
            <Typography variant="subtitle2" fontWeight={700} color="#2e7d32" mb={1}>
              Výhodné podmínky
            </Typography>
            {[
              'Jižní nebo jihozápadní orientace střechy',
              'Sklon střechy 25–40°',
              'Vysoká vlastní spotřeba (tepelné čerpadlo, EV, bojler)',
              'Dotace z NZÚ nebo NZÚ Light',
              'Cena elektřiny ze sítě nad 5 Kč/kWh',
              'Plánujete elektroauto v budoucnu',
            ].map((item) => (
              <Box key={item} display="flex" alignItems="flex-start" gap={1} mb={0.5}>
                <CheckCircleOutlineIcon sx={{ color: '#2e7d32', fontSize: 18, mt: 0.2, flexShrink: 0 }} />
                <Typography variant="body2">{item}</Typography>
              </Box>
            ))}
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper elevation={0} sx={{ p: 2, bgcolor: '#fce4ec', borderRadius: 2 }}>
            <Typography variant="subtitle2" fontWeight={700} color="#c62828" mb={1}>
              Méně výhodné podmínky
            </Typography>
            {[
              'Severní orientace nebo silné zastínění stromů',
              'Nízká vlastní spotřeba (1-2 osoby, málo doma)',
              'Plánujete prodat nemovitost do 5 let',
              'Střecha ve špatném stavu (nutná rekonstrukce)',
              'Nájemní byt bez souhlasu SVJ nebo majitele',
            ].map((item) => (
              <Box key={item} display="flex" alignItems="flex-start" gap={1} mb={0.5}>
                <CancelOutlinedIcon sx={{ color: '#c62828', fontSize: 18, mt: 0.2, flexShrink: 0 }} />
                <Typography variant="body2">{item}</Typography>
              </Box>
            ))}
          </Paper>
        </Grid>
      </Grid>

      {/* ── FAQ ── */}
      <Divider sx={{ mb: 3 }} />
      <Typography variant="h6" fontWeight={700} color={ACCENT} mb={2}>
        Časté otázky o FVE
      </Typography>
      {faqs.map((faq, i) => (
        <Accordion
          key={i}
          expanded={expanded === i}
          onChange={toggle(i)}
          elevation={0}
          sx={{
            border: '1px solid #e0e0e0',
            mb: 1,
            borderRadius: '8px !important',
            '&:before': { display: 'none' },
          }}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="body2" fontWeight={600}>{faq.q}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
              {faq.a}
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}

      <Box mt={3}>
        <Typography variant="caption" color="text.disabled">
          Výpočty jsou orientační. Dotační podmínky se mohou měnit – aktuální informace na{' '}
          <a href="https://novazelenausporam.cz" target="_blank" rel="noopener noreferrer" style={{ color: '#e65100' }}>
            novazelenausporam.cz
          </a>
          . Kalkulačka nezohledňuje náklady na servis, pojištění ani inflaci cen elektřiny.
        </Typography>
      </Box>
    </Box>
  );
}
