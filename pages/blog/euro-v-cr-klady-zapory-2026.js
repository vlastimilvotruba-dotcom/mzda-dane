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
import EuroIcon from '@mui/icons-material/Euro'
import TrendingDownIcon from '@mui/icons-material/TrendingDown'
import BalanceIcon from '@mui/icons-material/Balance'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import Header from '../../components/Header'
import Footer from '../../components/Footer/Footer'
import ShareButtons from '../../components/ShareButtons/ShareButtons'

const ARTICLE_URL = 'https://mzda-dane.cz/blog/euro-v-cr-klady-zapory-2026'
const ARTICLE_TITLE = 'Euro v České republice: klady, zápory a co nás čeká'
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

function ProConList({ items, color, label }) {
  return (
    <Box>
      <Typography variant="overline" sx={{ color, fontWeight: 700, letterSpacing: 1 }}>{label}</Typography>
      <Box component="ul" sx={{ pl: 2.5, mt: 0.5, '& li': { mb: 1.5, lineHeight: 1.8 } }}>
        {items.map((item, i) => (
          <li key={i}>
            <Typography variant="body1">{item}</Typography>
          </li>
        ))}
      </Box>
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
      <Box sx={{ height: 4, background: 'linear-gradient(90deg, #1565c0 0%, #00897b 100%)' }} />
      <Box sx={{ p: { xs: 2.5, sm: 3 } }}>
        <Typography variant="h6" fontWeight={800} gutterBottom>
          Jaký je váš názor na euro?
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={2.5}>
          Téma je kontroverzní a rád si přečtu váš pohled – ať už pro nebo proti. Napište mi, rád odpovím nebo doplním článek.
        </Typography>
        {sent ? (
          <Alert severity="success" sx={{ borderRadius: 2 }}>
            Otevřel se váš e-mailový klient s předvyplněným dotazem. Stačí odeslat.
          </Alert>
        ) : (
          <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" gap={2}>
            <TextField
              label="Vaše jméno (nepovinné)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              size="small"
              fullWidth
            />
            <TextField
              label="Váš názor nebo dotaz"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              size="small"
              fullWidth
              multiline
              minRows={3}
              required
            />
            <Button type="submit" variant="contained" sx={{ alignSelf: 'flex-start', textTransform: 'none', fontWeight: 700, background: 'linear-gradient(90deg, #1565c0 0%, #00897b 100%)', boxShadow: 'none' }}>
              Otevřít e-mailového klienta
            </Button>
          </Box>
        )}
      </Box>
    </Paper>
  )
}

export default function ArticleEuro() {
  const router = useRouter()

  return (
    <>
      <Head>
        <title>{ARTICLE_TITLE} – Mzda a daně</title>
        <meta name="description" content="Přijetí eura v ČR: přehled argumentů pro i proti, srovnání se Slovenskem, dopad na hypotéky a mzdy. Co říkají ekonomická data a co nás čeká?" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={ARTICLE_URL} />
        <meta property="og:title" content={ARTICLE_TITLE} />
        <meta property="og:description" content="Klady a zápory přijetí eura v ČR s konkrétními daty. Srovnání se Slovenskem, dopad na úrokové sazby, mzdy a transparentnost cen." />
        <meta property="og:url" content={ARTICLE_URL} />
        <meta property="og:type" content="article" />
        <meta property="og:locale" content="cs_CZ" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: ARTICLE_TITLE,
          datePublished: '2026-05-14',
          dateModified: '2026-05-14',
          author: { '@type': 'Person', name: 'Vlastimil Votruba', url: 'https://mzda-dane.cz/about' },
          publisher: { '@type': 'Organization', name: 'mzda-dane.cz', url: 'https://mzda-dane.cz' },
          description: 'Přijetí eura v ČR: přehled argumentů pro i proti, srovnání se Slovenskem, dopad na hypotéky a mzdy.',
          mainEntityOfPage: { '@type': 'WebPage', '@id': ARTICLE_URL },
        }) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
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

            {/* Tagy */}
            <Box display="flex" gap={0.75} flexWrap="wrap" mb={2}>
              {['Euro', 'Osobní finance', 'Česká ekonomika'].map((tag) => (
                <Chip key={tag} label={tag} size="small" sx={{ fontSize: '0.72rem', bgcolor: '#e3f2fd', color: '#1565c0', fontWeight: 600 }} />
              ))}
            </Box>

            {/* Nadpis */}
            <Typography variant="h3" component="h1" fontWeight={900} sx={{ lineHeight: 1.2, mb: 2, color: '#1a1a2e', fontSize: { xs: '1.75rem', sm: '2.25rem' } }}>
              {ARTICLE_TITLE}
            </Typography>

            {/* Meta lišta */}
            <Box display="flex" alignItems="center" flexWrap="wrap" gap={2} mb={3}>
              <Box display="flex" alignItems="center" gap={0.75}>
                <PersonIcon sx={{ fontSize: 16, color: 'text.disabled' }} />
                <Typography variant="caption" color="text.secondary" fontWeight={600}>Vlastimil Votruba</Typography>
                <Typography variant="caption" color="text.disabled">· autor a zakladatel mzda-dane.cz</Typography>
              </Box>
              <Box display="flex" alignItems="center" gap={0.75}>
                <CalendarTodayIcon sx={{ fontSize: 14, color: 'text.disabled' }} />
                <Typography variant="caption" color="text.disabled">14. května 2026</Typography>
              </Box>
              <Box display="flex" alignItems="center" gap={0.5}>
                <AccessTimeIcon sx={{ fontSize: 14, color: 'text.disabled' }} />
                <Typography variant="caption" color="text.disabled">9 min čtení</Typography>
              </Box>
              <ShareButtons title={ARTICLE_TITLE} url={ARTICLE_URL} />
            </Box>

            <Divider sx={{ mb: 3 }} />

            {/* Perex */}
            <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.85, color: '#444', fontStyle: 'italic', mb: 4 }}>
              Česká republika je jednou z posledních zemí EU, která dosud nepřijala euro.
              Debata se vrací s každými volbami a letos — po výsledcích parlamentních voleb 2025
              a s pohledem na Slovensko, které euro slaví 17 let — je opět velmi živá.
              Jako zastánce přijetí eura jsem si dal práci a prošel argumenty na obou stranách.
              Čísla mluví jasněji, než si mnozí myslí.
            </Typography>

            {/* ===== 1. Kde stojíme ===== */}
            <SectionHeading icon={EuroIcon} color="#1565c0">
              Kde stojí Česká republika dnes?
            </SectionHeading>

            <Typography variant="body1" paragraph sx={{ lineHeight: 1.85 }}>
              ČR je členem EU od roku 2004 a přistoupením se právně zavázala euro přijmout —
              na rozdíl od Dánska nebo Švédska nemá formální výjimku (opt-out).
              Přijetí je podmíněno splněním tzv. Maastrichtských kritérií a politickým
              rozhodnutím vlády stanovit cílové datum vstupu do ERM II (čekárna eurozóny).
              Žádná česká vláda to dosud neudělala.
            </Typography>

            <DataTable
              caption="Maastrichtská kritéria a stav ČR (2025–2026, zdroj: ČNB, Eurostat)"
              headers={['Kritérium', 'Limit', 'ČR 2025', 'Splněno?']}
              rows={[
                ['Inflace', 'max. referenční hodnota EU +1,5 pp', '~2,8 %', '✓ Ano'],
                ['Dlouhodobé úrokové sazby', 'max. referenční hodnota EU +2 pp', '~4,1 %', '✓ Ano'],
                ['Deficit veřejných financí', 'max. 3 % HDP', '~2,7 % HDP', '✓ Ano'],
                ['Veřejný dluh', 'max. 60 % HDP', '~44 % HDP', '✓ Ano'],
                ['Stabilita kurzu (ERM II)', '±15 % po dobu 2 let', 'Nesplněno – není v ERM II', '✗ Ne'],
              ]}
            />

            <Typography variant="body1" paragraph sx={{ lineHeight: 1.85 }}>
              ČR splňuje čtyři z pěti kritérií. Jediná překážka není ekonomická — je politická.
              Vstup do ERM II je podmíněn vůlí vlády, ne tržními podmínkami. To je klíčový fakt,
              který se v debatě často ztrácí.
            </Typography>

            {/* ===== 2. Klady ===== */}
            <SectionHeading icon={TrendingDownIcon} color="#2e7d32">
              Argumenty pro přijetí eura
            </SectionHeading>

            <Typography variant="body1" paragraph sx={{ lineHeight: 1.85 }}>
              Níže uvádím hlavní ekonomické argumenty, které zazní na každé odborné debatě
              i na webu iniciativy{' '}
              <Box component="a" href="https://www.eurovcesku.eu" target="_blank" rel="noopener noreferrer" sx={{ color: '#1565c0' }}>
                eurovcesku.eu
              </Box>.
            </Typography>

            <Typography variant="h6" fontWeight={700} mt={3} mb={1}>Nižší úrokové sazby a levnější hypotéky</Typography>
            <Typography variant="body1" paragraph sx={{ lineHeight: 1.85 }}>
              Základní sazba ECB se pohybuje výrazně níže než sazba ČNB. V době vrcholu
              inflační krize (2022–2023) zvýšila ČNB repo sazbu až na 7 %, zatímco ECB
              dosáhla maxima 4,5 % a v roce 2024 začala rychleji snižovat. V roce 2026 se
              ECB pohybuje kolem 2,5 %, ČNB kolem 3,75 %.
            </Typography>

            <DataTable
              caption="Srovnání základních sazeb ČNB vs. ECB (přibližné hodnoty)"
              headers={['Rok', 'ČNB repo sazba', 'ECB depozitní sazba', 'Rozdíl']}
              rows={[
                ['2021', '2,75 %', '0,00 %', '+2,75 pp'],
                ['2022 (max)', '7,00 %', '2,50 %', '+4,50 pp'],
                ['2023', '6,75 %', '4,00 %', '+2,75 pp'],
                ['2024', '4,75 %', '3,50 %', '+1,25 pp'],
                ['2026', '~3,75 %', '~2,50 %', '+1,25 pp'],
              ]}
            />

            <Typography variant="body1" paragraph sx={{ lineHeight: 1.85 }}>
              Pro konkrétního člověka s hypotékou 3 000 000 Kč na 25 let znamená rozdíl
              1,5 procentního bodu v sazbě přibližně <strong>2 000–2 500 Kč nižší splátku měsíčně</strong>,
              tedy až 30 000 Kč ročně. Přijetí eura by nepřineslo automaticky sazbu ECB,
              ale historicky sazby v nových členech eurozóny konvergovaly směrem dolů.
            </Typography>

            <Callout color="#2e7d32">
              Slovensko přijalo euro v roce 2009. Průměrné hypoteční sazby na Slovensku
              jsou dlouhodobě o 0,5–1,5 procentního bodu nižší než v ČR při srovnatelné
              výši příjmů a cen nemovitostí.
            </Callout>

            <Typography variant="h6" fontWeight={700} mt={3} mb={1}>Transparentnost cen a konec kurzových ztrát</Typography>
            <Typography variant="body1" paragraph sx={{ lineHeight: 1.85 }}>
              Jedním z nejpodceňovanějších argumentů pro euro je <strong>transparentnost cen</strong>.
              Pokud jdete do Polska, Rakouska nebo Německa nakupovat, nevíte okamžitě,
              zda je zboží za 25 EUR levnější nebo dražší než v ČR za 600 Kč — musíte přepočítávat
              kurzem, který se navíc každý den mění. S eurem byste porovnávali přímo.
            </Typography>
            <Typography variant="body1" paragraph sx={{ lineHeight: 1.85 }}>
              Pro firmy je situace ještě výraznější. Česká ekonomika je silně exportně orientována —
              přes <strong>80 % českého exportu míří do zemí EU</strong>, z toho většina do eurozóny.
              Každá exportní firma platí za zajištění kurzového rizika. Odhady České národní banky
              hovoří o nákladech zajištění v řádu 0,5–1 % z objemu obchodu — pro českou ekonomiku
              jako celek jde o miliardy korun ročně, které by s eurem zmizely.
            </Typography>

            <Typography variant="h6" fontWeight={700} mt={3} mb={1}>Ochrana před spekulativními útoky na korunu</Typography>
            <Typography variant="body1" paragraph sx={{ lineHeight: 1.85 }}>
              Česká koruna je malá měna — obchodní objem CZK na světových trzích je zlomkem
              objemu eura nebo dolaru. To ji činí zranitelnou vůči spekulativním útokům
              v krizových momentech. ČNB musela v minulosti (2013–2017) uměle oslabovat
              korunu devizovými intervencemi za biliony korun, aby udržela ekonomiku v chodu.
              Členové eurozóny toto riziko nemají.
            </Typography>

            <Typography variant="h6" fontWeight={700} mt={3} mb={1}>Příklad Slovenska: 17 let v eurozóně</Typography>
            <Typography variant="body1" paragraph sx={{ lineHeight: 1.85 }}>
              Slovensko přijalo euro 1. 1. 2009 — v době světové finanční krize, což byl
              načasováním risk. Přesto se ukázalo, že členství v eurozóně Slovensko stabilizovalo.
              HDP na obyvatele Slovenska rostl od roku 2009 rychleji než HDP ČR, slovenské
              hypoteční sazby jsou nižší a Slovensko v inflační krizi 2022–2023 zaznamenalo
              rychlejší pokles inflace než ČR s vlastní měnovou politikou — jak dokumentuje
              i iniciativa eurovcesku.eu.
            </Typography>

            {/* ===== 3. Zápory ===== */}
            <SectionHeading icon={BalanceIcon} color="#b71c1c">
              Argumenty proti — a proč nestačí
            </SectionHeading>

            <Typography variant="body1" paragraph sx={{ lineHeight: 1.85 }}>
              Poctivá analýza musí zahrnout i protiargumenty. Odpůrci eura mají několik
              standardních námitek:
            </Typography>

            <ProConList
              label="Nejčastější námitky odpůrců"
              color="#b71c1c"
              items={[
                'Ztráta vlastní měnové politiky — ČNB nemůže nezávisle řídit úrokové sazby.',
                'Riziko zdražení při přechodu — obchodníci mohou využít konverzi k neférovému zaokrouhlování.',
                'Česká ekonomika je jiná než průměr eurozóny — ECB \"šije sazby\" pro Francii a Německo, ne pro ČR.',
                'Neznáme konverzní kurz — špatně nastavený kurz může způsobit ztrátu konkurenceschopnosti.',
                'Psychologický odpor — průzkumy ukazují, že majoritní část Čechů euro stále odmítá.',
              ]}
            />

            <Typography variant="body1" paragraph sx={{ lineHeight: 1.85 }}>
              Tyto námitky nejsou neopodstatněné, ale mají slabá místa.
              Ztráta měnové politiky je reálná, ale jak ukázala inflační krize, ČNB svou
              nezávislou politikou inflaci nezastavila — jen ji oddálila a prodražila
              hypotéky. Riziko zdražení při přechodu je řešitelné zákonnou regulací
              dvojího označování cen a cenovou kontrolou (Slovensko ho zvládlo).
              Psychologický odpor je pochopitelný, ale jeho pokles ukazují aktuální průzkumy
              zejména u mladší generace a podnikatelů.
            </Typography>

            <Callout color="#e65100">
              Nejpoctivější protiargument zní: <strong>načasování záleží</strong>.
              Vstup při nevhodném konverzním kurzu nebo v době ekonomické nestability
              by byl chybou. Ale to je argument pro správné načasování, ne pro
              věčné odkládání.
            </Callout>

            {/* ===== 4. Dopad na mzdy ===== */}
            <SectionHeading icon={EuroIcon} color="#6a1b9a">
              Co by euro znamenalo pro vaši peněženku?
            </SectionHeading>

            <Typography variant="body1" paragraph sx={{ lineHeight: 1.85 }}>
              Přijetí eura by se dotklo každého zaměstnance i podnikatele. Klíčové dopady:
            </Typography>

            <DataTable
              caption="Ilustrativní dopady přijetí eura na průměrného zaměstnance v ČR"
              headers={['Oblast', 'Situace dnes (Kč)', 'Po přijetí eura (€)', 'Dopad']}
              rows={[
                ['Průměrná čistá mzda', '~38 000 Kč', '~1 520 €', 'Neutrální – přepočet kurzem'],
                ['Hypotéka 3 mil. Kč, 25 let, 5,5 %', '~18 400 Kč/měs.', 'Sazba možná 4,0–4,5 %', 'Úspora ~1 500–2 500 Kč/měs.'],
                ['Nákupy v eurozóně', 'Nutný přepočet', 'Přímé srovnání cen', 'Lepší transparentnost'],
                ['Úspory v bankách', 'Ochrana v Kč', 'Ochrana v €', 'Eliminace kurzového rizika'],
                ['Cestování po EU', 'Směnárna / poplatky', 'Žádné poplatky', 'Drobná úspora'],
              ]}
            />

            <Typography variant="body1" paragraph sx={{ lineHeight: 1.85 }}>
              Největší hmatatelný finanční přínos pro běžného člověka by přineslo přijetí eura
              majitelům hypoték — zejména těm, kteří budou podepisovat nové smlouvy nebo refinancovat
              po vstupu do eurozóny. Lidé bez hypotéky a bez úvěrů by změnu pocítili hlavně
              při cestování a nákupech v zahraničí.
            </Typography>

            {/* ===== 5. Výhled ===== */}
            <SectionHeading icon={TrendingDownIcon} color="#1565c0">
              Kdy se euro reálně přiblíží?
            </SectionHeading>

            <Typography variant="body1" paragraph sx={{ lineHeight: 1.85 }}>
              Nová vládní koalice sestavená po volbách 2025 nezahrnula přijetí eura do koaliční
              smlouvy jako prioritu. Debata se sice intenzivně vede — iniciativa{' '}
              <Box component="a" href="https://www.eurovcesku.eu" target="_blank" rel="noopener noreferrer" sx={{ color: '#1565c0' }}>
                eurovcesku.eu
              </Box>{' '}
              aktivně mapuje kandidáty přátelské k euru a pořádá osvětové akce — ale politická
              vůle zatím nestačí.
            </Typography>

            <Typography variant="body1" paragraph sx={{ lineHeight: 1.85 }}>
              Realistický scénář: pokud by se vláda rozhodla vstoupit do ERM II v letech
              2027–2028, mohlo by se euro v ČR zavést nejdříve okolo roku 2030–2031.
              Optimistický scénář (silná koalice pro euro po dalších volbách) by to mohl
              posunout na 2029. Pesimistický scénář (politická paralýza jako dosud) — neurčito.
            </Typography>

            <Callout color="#1565c0">
              ČR splňuje ekonomická kritéria pro euro. Jediná překážka je politická.
              Každý rok odkládání znamená pokračující kurzové náklady pro firmy,
              vyšší hypoteční sazby pro domácnosti a přetrvávající netransparentnost cen
              pro spotřebitele.
            </Callout>

            {/* ===== Osobní pohled ===== */}
            <Box mt={5} mb={2}>
              <Paper elevation={0} sx={{ bgcolor: '#e8f5e9', border: '1.5px solid #a5d6a7', borderRadius: 3, p: { xs: 2, sm: 2.5 } }}>
                <Box display="flex" alignItems="center" gap={1} mb={1.5}>
                  <InfoOutlinedIcon sx={{ color: '#2e7d32', fontSize: 20 }} />
                  <Typography variant="subtitle2" fontWeight={800} color="#1b5e20">Pohled autora</Typography>
                </Box>
                <Typography variant="body2" sx={{ lineHeight: 1.85, color: '#1b5e20' }}>
                  Jsem zastáncem přijetí eura v ČR. Ne proto, že bych chtěl zrušit českou
                  identitu nebo se vzdát suverenity — ale proto, že čísla mluví za sebe.
                  Levnější hypotéky, žádné kurzové riziko pro firmy, přehlednost cen v rámci EU.
                  Slovensko ukázalo, že přechod jde zvládnout. Bojím se, že čím déle budeme
                  čekat, tím více přijdeme o výhody, které ostatní čerpají roky.
                </Typography>
              </Paper>
            </Box>

            {/* Zdroje */}
            <Box mt={4} mb={2}>
              <Typography variant="caption" color="text.secondary" display="block" sx={{ lineHeight: 1.9 }}>
                <strong>Zdroje a doporučené čtení:</strong>{' '}
                <Box component="a" href="https://www.eurovcesku.eu" target="_blank" rel="noopener noreferrer" sx={{ color: '#1565c0' }}>eurovcesku.eu</Box>
                {' · '}
                <Box component="a" href="https://www.cnb.cz" target="_blank" rel="noopener noreferrer" sx={{ color: '#1565c0' }}>ČNB – zprávy o inflaci</Box>
                {' · '}
                <Box component="a" href="https://ec.europa.eu/eurostat" target="_blank" rel="noopener noreferrer" sx={{ color: '#1565c0' }}>Eurostat</Box>
                {' · '}
                <Box component="a" href="https://www.ecb.europa.eu" target="_blank" rel="noopener noreferrer" sx={{ color: '#1565c0' }}>ECB – klíčové sazby</Box>
              </Typography>
            </Box>

            {/* Autor */}
            <Divider sx={{ mt: 4, mb: 3 }} />
            <Box display="flex" alignItems="flex-start" gap={2}>
              <Box sx={{ width: 48, height: 48, borderRadius: '50%', bgcolor: '#e8eaf6', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <PersonIcon sx={{ color: '#3949ab', fontSize: 26 }} />
              </Box>
              <Box>
                <Typography variant="subtitle2" fontWeight={800}>Vlastimil Votruba</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                  Autor a zakladatel mzda-dane.cz. Provozuje VOV Software se zaměřením na
                  praktické finanční nástroje pro český trh. Sleduje českou hospodářskou politiku
                  s důrazem na dopad do osobních financí každého z nás.
                </Typography>
              </Box>
            </Box>

            {/* Kontaktní formulář */}
            <ContactForm />

          </Box>
        </Box>

        <Footer onNavigate={(p) => router.push(p)} />
      </Container>
    </>
  )
}
