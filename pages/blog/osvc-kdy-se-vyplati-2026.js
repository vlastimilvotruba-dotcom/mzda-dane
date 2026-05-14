import { useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import {
  Container, Box, Typography, Chip, Paper, Divider,
  Table, TableHead, TableBody, TableRow, TableCell,
  TextField, Button, Alert,
} from '@mui/material'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import PersonIcon from '@mui/icons-material/Person'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import Header from '../../components/Header'
import Footer from '../../components/Footer/Footer'
import ShareButtons from '../../components/ShareButtons/ShareButtons'

const ARTICLE_URL = 'https://mzda-dane.cz/blog/osvc-kdy-se-vyplati-2026'
const ARTICLE_TITLE = 'OSVČ v roce 2026: kdy se vyplatí a kdy je lepší zůstat zaměstnancem?'
const CONTACT_EMAIL = 'vov.software@gmail.com'

function SectionHeading({ icon: Icon, color, children }) {
  return (
    <Box display="flex" alignItems="center" gap={1.5} mt={5} mb={2}>
      <Box sx={{ width: 36, height: 36, borderRadius: '10px', bgcolor: `${color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <Icon sx={{ color, fontSize: 20 }} />
      </Box>
      <Typography variant="h5" fontWeight={800} sx={{ color: '#1a1a2e' }}>
        {children}
      </Typography>
    </Box>
  )
}

function Callout({ color = '#1565c0', children }) {
  return (
    <Box sx={{ borderLeft: `4px solid ${color}`, bgcolor: `${color}0d`, borderRadius: '0 8px 8px 0', px: 2.5, py: 1.75, my: 3 }}>
      <Typography variant="body1" sx={{ lineHeight: 1.8, color: '#333' }}>
        {children}
      </Typography>
    </Box>
  )
}

function DataTable({ headers, rows, caption }) {
  return (
    <Box my={3}>
      {caption && <Typography variant="caption" color="text.secondary" display="block" mb={0.5}>{caption}</Typography>}
      <Paper variant="outlined" sx={{ borderRadius: 2, overflow: 'hidden' }}>
        <Table size="small">
          <TableHead>
            <TableRow sx={{ bgcolor: '#f4f7ff' }}>
              {headers.map((h) => <TableCell key={h} sx={{ fontWeight: 700, fontSize: '0.82rem' }}>{h}</TableCell>)}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, i) => (
              <TableRow key={i} sx={{ bgcolor: i % 2 === 1 ? '#fafafa' : 'white' }}>
                {row.map((cell, j) => <TableCell key={j} sx={{ fontSize: '0.82rem' }}>{cell}</TableCell>)}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  )
}

function ContactForm() {
  const [name, setName] = useState('')
  const [question, setQuestion] = useState('')
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!question.trim()) return
    const subject = encodeURIComponent(`Dotaz k článku: ${ARTICLE_TITLE}`)
    const body = encodeURIComponent(`Jméno: ${name || '(neuvedeno)'}\n\nDotaz:\n${question}`)
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`
    setSent(true)
  }

  return (
    <Paper elevation={0} sx={{ border: '1.5px solid #c5cae9', borderRadius: 3, overflow: 'hidden', mt: 6 }}>
      <Box sx={{ height: 4, background: 'linear-gradient(90deg, #1565c0 0%, #2e7d32 100%)' }} />
      <Box sx={{ p: { xs: 2.5, sm: 3 } }}>
        <Typography variant="h6" fontWeight={800} gutterBottom>Zvažujete přechod na OSVČ?</Typography>
        <Typography variant="body2" color="text.secondary" mb={2.5}>
          Napište mi svůj případ – rád ho zanalyzuji nebo doplním článek. Odpovídám do 48 hodin.
        </Typography>
        {sent ? (
          <Alert severity="success" sx={{ borderRadius: 2 }}>Otevřel se váš e-mailový klient s předvyplněným dotazem. Stačí odeslat.</Alert>
        ) : (
          <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" gap={2}>
            <TextField label="Vaše jméno (nepovinné)" value={name} onChange={(e) => setName(e.target.value)} size="small" fullWidth />
            <TextField label="Váš dotaz nebo situace" value={question} onChange={(e) => setQuestion(e.target.value)} size="small" fullWidth multiline minRows={3} required />
            <Button type="submit" variant="contained" sx={{ alignSelf: 'flex-start', textTransform: 'none', fontWeight: 700, background: 'linear-gradient(90deg, #1565c0 0%, #2e7d32 100%)', boxShadow: 'none' }}>
              Otevřít e-mailového klienta
            </Button>
          </Box>
        )}
      </Box>
    </Paper>
  )
}

export default function ArticleOsvc() {
  const router = useRouter()

  return (
    <>
      <Head>
        <title>{ARTICLE_TITLE} – Mzda a daně</title>
        <meta name="description" content="OSVČ vs. zaměstnanec 2026 – konkrétní výpočty odvodů, paušální daň, kdy se živnostenský list vyplatí a kdy ne. S kalkulačkou pro vaše čísla." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={ARTICLE_URL} />
        <meta property="og:title" content={ARTICLE_TITLE} />
        <meta property="og:description" content="Srovnání OSVČ vs. zaměstnanec s čísly pro rok 2026. Odvody, paušální daň, výhody a rizika podnikání." />
        <meta property="og:url" content={ARTICLE_URL} />
        <meta property="og:type" content="article" />
        <meta property="og:locale" content="cs_CZ" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org', '@type': 'Article',
          headline: ARTICLE_TITLE, datePublished: '2026-03-20', dateModified: '2026-03-20',
          author: { '@type': 'Person', name: 'Vlastimil Votruba', url: 'https://mzda-dane.cz/about' },
          publisher: { '@type': 'Organization', name: 'mzda-dane.cz', url: 'https://mzda-dane.cz' },
          description: 'OSVČ vs. zaměstnanec 2026 – výpočty odvodů, paušální daň a kdy se živnost vyplatí.',
          mainEntityOfPage: { '@type': 'WebPage', '@id': ARTICLE_URL },
        }) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org', '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Domů', item: 'https://mzda-dane.cz' },
            { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://mzda-dane.cz/blog' },
            { '@type': 'ListItem', position: 3, name: ARTICLE_TITLE, item: ARTICLE_URL },
          ]
        }) }} />
      </Head>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Header subtitle="Blog – analýzy a komentáře" />

        <Box mt={4} display="flex" justifyContent="center">
          <Box sx={{ width: '100%', maxWidth: 780 }}>

            <Box display="flex" gap={0.75} flexWrap="wrap" mb={2}>
              {['OSVČ', 'Podnikání', 'Osobní finance'].map((tag) => (
                <Chip key={tag} label={tag} size="small" sx={{ fontSize: '0.72rem', bgcolor: '#e8f5e9', color: '#1b5e20', fontWeight: 600 }} />
              ))}
            </Box>

            <Typography variant="h3" component="h1" fontWeight={900} sx={{ lineHeight: 1.2, mb: 2, color: '#1a1a2e', fontSize: { xs: '1.75rem', sm: '2.25rem' } }}>
              {ARTICLE_TITLE}
            </Typography>

            <Box display="flex" alignItems="center" flexWrap="wrap" gap={2} mb={3}>
              <Box display="flex" alignItems="center" gap={0.75}>
                <PersonIcon sx={{ fontSize: 16, color: 'text.disabled' }} />
                <Typography variant="caption" color="text.secondary" fontWeight={600}>Vlastimil Votruba</Typography>
                <Typography variant="caption" color="text.disabled">· autor a zakladatel mzda-dane.cz</Typography>
              </Box>
              <Box display="flex" alignItems="center" gap={0.75}>
                <CalendarTodayIcon sx={{ fontSize: 14, color: 'text.disabled' }} />
                <Typography variant="caption" color="text.disabled">20. března 2026</Typography>
              </Box>
              <Box display="flex" alignItems="center" gap={0.5}>
                <AccessTimeIcon sx={{ fontSize: 14, color: 'text.disabled' }} />
                <Typography variant="caption" color="text.disabled">8 min čtení</Typography>
              </Box>
              <ShareButtons title={ARTICLE_TITLE} url={ARTICLE_URL} />
            </Box>

            <Divider sx={{ mb: 3 }} />

            <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.85, color: '#444', fontStyle: 'italic', mb: 4 }}>
              „Přejdi na faktury, ušetříš na daních." Tuhle radu slýchá každý druhý zaměstnanec,
              který svému šéfovi navrhne zvýšení platu. Jenže je to opravdu tak jednoduché?
              Spočítal jsem konkrétní čísla pro rok 2026 — a výsledek není černobílý.
            </Typography>

            {/* ===== 1. Odvody ===== */}
            <SectionHeading icon={BusinessCenterIcon} color="#1b5e20">
              Jak se liší odvody zaměstnance a OSVČ?
            </SectionHeading>

            <Typography variant="body1" paragraph sx={{ lineHeight: 1.85 }}>
              Základní rozdíl je v tom, jak stát ke každé formě přistupuje. Zaměstnavatel
              odvádí za zaměstnance sociální a zdravotní pojištění navíc — OSVČ si vše
              platí sám, ale z nižšího vyměřovacího základu.
            </Typography>

            <DataTable
              caption="Srovnání odvodů: zaměstnanec vs. OSVČ s příjmem 80 000 Kč/měsíc (2026)"
              headers={['Položka', 'Zaměstnanec', 'OSVČ (výdaje 60 %)', 'OSVČ (paušální daň)']}
              rows={[
                ['Hrubý příjem / tržby', '80 000 Kč', '80 000 Kč', '80 000 Kč'],
                ['Základ daně', '80 000 Kč', '32 000 Kč (40 %)', 'neřeší se'],
                ['Daň z příjmu 15 %', '~7 865 Kč*', '~4 800 Kč', 'zahrnuto v paušálu'],
                ['Sociální pojištění', '9 920 Kč (12,4 %)', '~7 040 Kč (29,2 % ze základu)', 'zahrnuto v paušálu'],
                ['Zdravotní pojištění', '3 600 Kč (4,5 %)', '~2 800 Kč (13,5 % min.)', 'zahrnuto v paušálu'],
                ['Paušální daň 2026', '—', '—', '~16 870 Kč/měs. (pásmo 1)'],
                ['Celkem odvody', '~21 385 Kč', '~14 640 Kč', '~16 870 Kč'],
                ['Čistý příjem', '~58 615 Kč', '~65 360 Kč', '~63 130 Kč'],
              ]}
            />

            <Typography variant="caption" color="text.secondary" display="block" mt={-1} mb={2}>
              * Po uplatnění slevy na poplatníka 30 840 Kč/rok. Zaměstnavatel navíc platí 33,8 % nad hrubou mzdu — celkový náklad zaměstnavatele = ~107 040 Kč/měs.
            </Typography>

            <Callout color="#1b5e20">
              Na příjmu 80 000 Kč měsíčně si OSVČ s výdajovým paušálem 60 % vezme domů
              přibližně o <strong>6 700 Kč více</strong> než zaměstnanec. Ročně to je ~80 000 Kč.
              Ale tím výhody nekončí — ani rizika.
            </Callout>

            {/* ===== 2. Paušální daň ===== */}
            <SectionHeading icon={TrendingUpIcon} color="#1565c0">
              Paušální daň 2026 — pro koho a za kolik?
            </SectionHeading>

            <Typography variant="body1" paragraph sx={{ lineHeight: 1.85 }}>
              Od roku 2023 mohou OSVČ s obratem do 2 000 000 Kč platit tzv. paušální daň —
              jednu měsíční platbu, která zahrnuje zálohy na daň z příjmů, sociální i zdravotní
              pojištění. Žádné přiznání, žádné přehledy. Pro rok 2026 jsou stanovena tři pásma:
            </Typography>

            <DataTable
              caption="Paušální daň 2026 – pásma a měsíční platby"
              headers={['Pásmo', 'Obrat do', 'Měsíční platba', 'Pro koho typicky']}
              rows={[
                ['1. pásmo', '1 000 000 Kč/rok', '~16 870 Kč/měs.', 'Řemeslníci, IT freelanceři, konzultanti'],
                ['2. pásmo', '1 500 000 Kč/rok', '~23 970 Kč/měs.', 'OSVČ s vyšším obratem'],
                ['3. pásmo', '2 000 000 Kč/rok', '~31 530 Kč/měs.', 'OSVČ těsně pod hranicí DPH'],
              ]}
            />

            <Typography variant="body1" paragraph sx={{ lineHeight: 1.85 }}>
              Paušální daň je výhodná především pro OSVČ, jejichž skutečné výdaje jsou nízké
              (IT, konzultanti, kreativci) — protože paušální výdaj 60 % nebo 80 % nabízí
              vyšší odpočet, než jaké jsou reálné náklady. Naopak pro OSVČ s vysokými
              skutečnými výdaji (řemeslníci s materiálem, obchodníci) se může více vyplatit
              skutečné účetnictví.
            </Typography>

            {/* ===== 3. Kdy se vyplatí ===== */}
            <SectionHeading icon={TrendingUpIcon} color="#2e7d32">
              Od jaké částky se OSVČ vyplatí?
            </SectionHeading>

            <Typography variant="body1" paragraph sx={{ lineHeight: 1.85 }}>
              Není to jen o daních. Přechod na OSVČ znamená vyjednat si od klienta (nebo zaměstnavatele)
              vyšší sazbu, která kompenzuje ztrátu benefitů. Co zaměstnanec dostává zdarma a OSVČ si musí
              platit sám:
            </Typography>

            <Box component="ul" sx={{ pl: 2.5, '& li': { mb: 1.5, lineHeight: 1.8 } }}>
              <li><Typography variant="body1"><strong>Nemocenská</strong> — zaměstnanec dostává od 4. dne nemoci 60 % průměrného platu. OSVČ nemocenské pojištění platí dobrovolně (~216 Kč/měs. minimum), ale nemocenská je výrazně nižší.</Typography></li>
              <li><Typography variant="body1"><strong>Dovolená</strong> — zaměstnanec má zákonný nárok na min. 4 týdny placeného volna. OSVČ: každý den bez práce = bez příjmu.</Typography></li>
              <li><Typography variant="body1"><strong>Důchod</strong> — OSVČ platí nižší sociální odvody, ale odvádí méně na důchodový účet. Nižší příspěvky = nižší důchod. Rozdíl po 30 letech práce může být 3 000–5 000 Kč/měsíc důchodu.</Typography></li>
              <li><Typography variant="body1"><strong>Stravenky, příspěvek na penzijko, benefit karty</strong> — zaměstnanecké benefity OSVČ nemá automaticky.</Typography></li>
              <li><Typography variant="body1"><strong>Administrativa</strong> — přiznání, přehledy pro ČSSZ a ZP, fakturace, případně účetnictví.</Typography></li>
            </Box>

            <DataTable
              caption="Kolik musí OSVČ vydělat, aby si přijela stejně jako zaměstnanec (hrubá mzda 60 000 Kč)"
              headers={['Položka', 'Hodnota']}
              rows={[
                ['Čistá mzda zaměstnance (60 000 Kč hrubého)', '~44 800 Kč/měs.'],
                ['+ Hodnota 20 dní dovolené (60 000 / 20)', '~3 000 Kč/měs. (ekvivalent)'],
                ['+ Příspěvek zaměstnavatele na penzijko (průměr)', '~500 Kč/měs.'],
                ['+ Stravenky / benefit karta (průměr)', '~600 Kč/měs.'],
                ['Celková hodnota balíčku', '~48 900 Kč/měs.'],
                ['OSVČ čistý příjem potřebný pro ekvivalent', '~58 000–62 000 Kč/měs.'],
                ['Fakturovaná cena nutná pro tento výsledek', '~80 000–85 000 Kč/měs.'],
              ]}
            />

            <Callout color="#1565c0">
              Pravidlo palce: <strong>fakturovaná sazba by měla být o 30–40 % vyšší</strong> než
              hrubá mzda, aby OSVČ kompenzovala ztrátu benefitů, vyšší riziko a nutnost
              vlastní administrace. Teprve nad touto hranicí OSVČ skutečně „vydělává".
            </Callout>

            {/* ===== 4. Rizika ===== */}
            <SectionHeading icon={WarningAmberIcon} color="#b71c1c">
              Kdy OSVČ nedává smysl
            </SectionHeading>

            <Typography variant="body1" paragraph sx={{ lineHeight: 1.85 }}>
              OSVČ není vhodná pro každého. Existují situace, kdy je lepší zůstat zaměstnancem:
            </Typography>

            <Box component="ul" sx={{ pl: 2.5, '& li': { mb: 1.5, lineHeight: 1.8 } }}>
              <li><Typography variant="body1"><strong>Švarcsystém</strong> — pokud OSVČ pracuje fakticky jako zaměstnanec (jeden klient, pevná pracovní doba, nástroje klienta), hrozí doměření daní a pokut celé firmě i vám.</Typography></li>
              <li><Typography variant="body1"><strong>Nestabilní příjem</strong> — bez zákazníků není příjem, ale zálohy na pojistné musíte platit bez ohledu na výdělek.</Typography></li>
              <li><Typography variant="body1"><strong>Plánujete hypotéku</strong> — banky hodnotí příjem OSVČ přísněji (průměr 2–3 let daňových přiznání), první rok OSVČ je pro banku zpravidla nedostatečný.</Typography></li>
              <li><Typography variant="body1"><strong>Potřebujete silnou sociální síť</strong> — rodičovská dovolená, mateřská, ošetřovné — vše se pro OSVČ počítá jinak a zpravidla méně výhodně.</Typography></li>
            </Box>

            {/* ===== 5. Osobní pohled ===== */}
            <Box mt={5} mb={2}>
              <Paper elevation={0} sx={{ bgcolor: '#e8f5e9', border: '1.5px solid #a5d6a7', borderRadius: 3, p: { xs: 2, sm: 2.5 } }}>
                <Box display="flex" alignItems="center" gap={1} mb={1.5}>
                  <InfoOutlinedIcon sx={{ color: '#2e7d32', fontSize: 20 }} />
                  <Typography variant="subtitle2" fontWeight={800} color="#1b5e20">Pohled autora</Typography>
                </Box>
                <Typography variant="body2" sx={{ lineHeight: 1.85, color: '#1b5e20' }}>
                  Sám podnikám jako OSVČ a mohu potvrdit: výhoda je reálná, ale přichází
                  s odpovědností, kterou mnozí podceňují. Klíčem je správně nastavená sazba
                  a vědomí, že dovolená, nemoc nebo výpadek zakázky jdou plně za vámi.
                  Kdo si to uvědomí a ocení svobodu, OSVČ si užije. Kdo čeká jen daňovou
                  úsporu bez změny přístupu, bývá zklamaný.
                </Typography>
              </Paper>
            </Box>

            <Typography variant="body2" color="text.secondary" sx={{ mt: 4, lineHeight: 1.8 }}>
              <strong>Chcete si spočítat své konkrétní čísla?</strong>{' '}
              Vyzkoušejte{' '}
              <Box component="span" sx={{ cursor: 'pointer', color: '#1565c0', textDecoration: 'underline' }} onClick={() => router.push('/osvc')}>
                kalkulačku OSVČ 2026
              </Box>
              {' '}na mzda-dane.cz — zadáte příjmy, výdaje a systém vypočítá zálohy na sociální
              a zdravotní pojištění i daň z příjmů.
            </Typography>

            <Divider sx={{ mt: 5, mb: 3 }} />
            <Box display="flex" alignItems="flex-start" gap={2}>
              <Box sx={{ width: 48, height: 48, borderRadius: '50%', bgcolor: '#e8eaf6', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <PersonIcon sx={{ color: '#3949ab', fontSize: 26 }} />
              </Box>
              <Box>
                <Typography variant="subtitle2" fontWeight={800}>Vlastimil Votruba</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                  Autor a zakladatel mzda-dane.cz. Provozuje VOV Software jako OSVČ se zaměřením
                  na praktické finanční nástroje pro český trh. Daňové a odvodové podmínky OSVČ
                  sleduje z první ruky.
                </Typography>
              </Box>
            </Box>

            <ContactForm />
          </Box>
        </Box>

        <Footer onNavigate={(p) => router.push(p)} />
      </Container>
    </>
  )
}
