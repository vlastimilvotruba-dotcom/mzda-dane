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
import SolarPowerIcon from '@mui/icons-material/SolarPower'
import AccountBalanceIcon from '@mui/icons-material/AccountBalance'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'
import AssignmentIcon from '@mui/icons-material/Assignment'
import Header from '../../components/Header'
import Footer from '../../components/Footer/Footer'
import ShareButtons from '../../components/ShareButtons/ShareButtons'

const ARTICLE_URL = 'https://mzda-dane.cz/blog/bezurocny-uver-fve-nzu-2026'
const ARTICLE_TITLE = 'Bezúročná půjčka na fotovoltaiku 2026: Nová zelená úsporám – podmínky, termíny a renovační pas'
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
    <Paper elevation={0} sx={{ border: '1.5px solid #c8e6c9', borderRadius: 3, overflow: 'hidden', mt: 6 }}>
      <Box sx={{ height: 4, background: 'linear-gradient(90deg, #2e7d32 0%, #1565c0 100%)' }} />
      <Box sx={{ p: { xs: 2.5, sm: 3 } }}>
        <Typography variant="h6" fontWeight={800} gutterBottom>Máte dotaz k bezúročnému úvěru nebo FVE?</Typography>
        <Typography variant="body2" color="text.secondary" mb={2.5}>
          Napište mi – rád odpovím nebo doplním článek o váš případ. Odpovídám zpravidla do 48 hodin.
        </Typography>
        {sent ? (
          <Alert severity="success" sx={{ borderRadius: 2 }}>Otevřel se váš e-mailový klient s předvyplněným dotazem. Stačí odeslat.</Alert>
        ) : (
          <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" gap={2}>
            <TextField label="Vaše jméno (nepovinné)" value={name} onChange={(e) => setName(e.target.value)} size="small" fullWidth />
            <TextField label="Váš dotaz nebo komentář" value={question} onChange={(e) => setQuestion(e.target.value)} size="small" fullWidth multiline minRows={3} required />
            <Button type="submit" variant="contained" sx={{ alignSelf: 'flex-start', textTransform: 'none', fontWeight: 700, background: 'linear-gradient(90deg, #2e7d32 0%, #1565c0 100%)', boxShadow: 'none' }}>
              Otevřít e-mailového klienta
            </Button>
          </Box>
        )}
      </Box>
    </Paper>
  )
}

export default function ArticleBezurocnyUverFVE() {
  const router = useRouter()

  return (
    <>
      <Head>
        <title>{ARTICLE_TITLE} – Mzda a daně</title>
        <meta name="description" content="Bezúročná půjčka na fotovoltaiku přes Novou zelenou úsporám 2026: kdo může žádat, jak získat renovační pas, kolik stát zaplatí za úroky a kdy banky začnou úvěry poskytovat." />
        <meta name="keywords" content="bezúročný úvěr fotovoltaika, bezúročná půjčka FVE 2026, Nová zelená úsporám bezúročný úvěr, renovační pas NZÚ, půjčka na fotovoltaiku bez úroků, NZÚ 2026 podmínky" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={ARTICLE_URL} />
        <meta property="og:title" content={ARTICLE_TITLE} />
        <meta property="og:description" content="Nová zelená úsporám 2026 nabídne bezúročný úvěr na FVE i zateplení. Termíny, podmínky, renovační pas a konkrétní příklad, kolik stát zaplatí za vás." />
        <meta property="og:url" content={ARTICLE_URL} />
        <meta property="og:type" content="article" />
        <meta property="og:locale" content="cs_CZ" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: ARTICLE_TITLE,
          datePublished: '2026-05-19',
          dateModified: '2026-05-19',
          author: { '@type': 'Person', name: 'Vlastimil Votruba', url: 'https://mzda-dane.cz/about' },
          publisher: { '@type': 'Organization', name: 'mzda-dane.cz', url: 'https://mzda-dane.cz' },
          description: 'Bezúročná půjčka na fotovoltaiku přes Novou zelenou úsporám 2026: podmínky, termíny, renovační pas a kolik za vás stát zaplatí na úrocích.',
          mainEntityOfPage: { '@type': 'WebPage', '@id': ARTICLE_URL },
          about: [
            { '@type': 'Thing', name: 'Fotovoltaika' },
            { '@type': 'Thing', name: 'Nová zelená úsporám' },
            { '@type': 'Thing', name: 'Bezúročný úvěr' },
          ],
        }) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: [
            {
              '@type': 'Question',
              name: 'Kdo může žádat o bezúročný úvěr NZÚ na fotovoltaiku?',
              acceptedAnswer: { '@type': 'Answer', text: 'Majitelé rodinných domů, společenství vlastníků jednotek (SVJ) a bytová družstva. Žadatel musí být vlastníkem nemovitosti.' },
            },
            {
              '@type': 'Question',
              name: 'Kdy začnou banky poskytovat bezúročný úvěr NZÚ?',
              acceptedAnswer: { '@type': 'Answer', text: 'Od září 2026. Příjem žádostí o schválení projektu na SFŽP ČR bude spuštěn v červnu 2026.' },
            },
            {
              '@type': 'Question',
              name: 'Co je renovační pas a k čemu ho potřebuji?',
              acceptedAnswer: { '@type': 'Answer', text: 'Renovační pas NZÚ je dokument vypracovaný certifikovaným energetickým poradcem. Je povinný pro žadatele o bezúročný úvěr na dílčí renovaci (např. samotná FVE). Pro komplexní renovaci postačí průkaz energetické náročnosti budovy (PENB).' },
            },
            {
              '@type': 'Question',
              name: 'Kolik stát zaplatí za úroky z bezúročného úvěru NZÚ?',
              acceptedAnswer: { '@type': 'Answer', text: 'Stát (prostřednictvím SFŽP ČR) pokryje veškeré úroky po celou dobu splácení. Příklad: úvěr 1 000 000 Kč na 15 let by při současných sazbách stál celkem 1 519 000 Kč – NZÚ zaplatí 519 000 Kč a vy vrátíte jen původní jistinu.' },
            },
          ],
        }) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Domů', item: 'https://mzda-dane.cz' },
            { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://mzda-dane.cz/blog' },
            { '@type': 'ListItem', position: 3, name: ARTICLE_TITLE, item: ARTICLE_URL },
          ],
        }) }} />
      </Head>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Header subtitle="Blog – analýzy a komentáře" />

        <Box mt={4} display="flex" justifyContent="center">
          <Box sx={{ width: '100%', maxWidth: 780 }}>

            {/* Tagy */}
            <Box display="flex" gap={0.75} flexWrap="wrap" mb={2}>
              {['Energetika', 'FVE & Solár', 'Osobní finance', 'Dotace'].map((tag) => (
                <Chip key={tag} label={tag} size="small" sx={{ fontSize: '0.72rem', bgcolor: '#e8f5e9', color: '#2e7d32', fontWeight: 600 }} />
              ))}
            </Box>

            {/* Nadpis H1 */}
            <Typography variant="h3" component="h1" fontWeight={900} sx={{ lineHeight: 1.2, mb: 2, color: '#1a1a2e', fontSize: { xs: '1.65rem', sm: '2.1rem' } }}>
              Bezúročná půjčka na fotovoltaiku 2026: Nová zelená úsporám – podmínky, termíny a renovační pas
            </Typography>

            {/* Meta řádek */}
            <Box display="flex" alignItems="center" flexWrap="wrap" gap={2} mb={3}>
              <Box display="flex" alignItems="center" gap={0.75}>
                <PersonIcon sx={{ fontSize: 16, color: 'text.disabled' }} />
                <Typography variant="caption" color="text.secondary" fontWeight={600}>Vlastimil Votruba</Typography>
                <Typography variant="caption" color="text.disabled">· autor a zakladatel mzda-dane.cz</Typography>
              </Box>
              <Box display="flex" alignItems="center" gap={0.75}>
                <CalendarTodayIcon sx={{ fontSize: 14, color: 'text.disabled' }} />
                <Typography variant="caption" color="text.disabled">19. května 2026</Typography>
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
              Stát za vás zaplatí úroky z půjčky na fotovoltaiku. Přesně to přináší nová etapa programu
              Nová zelená úsporám, která se od září 2026 otevírá majitelům rodinných domů i SVJ.
              Kdo může žádat, co je to renovační pas a co musíte udělat ještě před podáním žádosti u banky?
            </Typography>

            {/* ===== 1. Co je bezúročný úvěr NZÚ ===== */}
            <SectionHeading icon={AccountBalanceIcon} color="#2e7d32">
              Co je bezúročný úvěr Nová zelená úsporám?
            </SectionHeading>

            <Typography variant="body1" paragraph sx={{ lineHeight: 1.85 }}>
              Program Nová zelená úsporám (NZÚ) prochází od roku 2026 zásadní transformací.
              Dosavadní systém přímých dotací pro všechny žadatele skončil koncem roku 2025 —
              od nové etapy jsou <strong>přímé dotace (granty) vyhrazeny pouze pro nízkopříjmové domácnosti</strong>
              v programu NZÚ Light. Pro ostatní domácnosti a SVJ stát připravil jiný nástroj:
              bezúročný úvěr, kde bance vrátíte jen to, co jste si půjčili. <strong>Úroky za vás
              celou dobu splácení hradí Státní fond životního prostředí ČR (SFŽP).</strong>
            </Typography>

            <Typography variant="body1" paragraph sx={{ lineHeight: 1.85 }}>
              Konkrétně to funguje takto: úvěr poskytne banka nebo stavební spořitelna zapojená
              do programu. SFŽP následně bankám kompenzuje úroky, které by jinak platil žadatel.
              Žadatel splácí pouze jistinu plus minimální poplatky za vedení úvěrového účtu.
            </Typography>

            <Callout color="#2e7d32">
              <strong>Příklad z ministerstva:</strong> Úvěr 1 000 000 Kč na 15 let by při současných
              úrokových sazbách stál celkem 1 519 000 Kč. NZÚ zaplatí 519 000 Kč na úrocích.
              Domácnost vrátí bance pouze původní jistinu – tj. 1 000 000 Kč (plus minimální poplatky
              za vedení účtu).
            </Callout>

            <Typography variant="body1" paragraph sx={{ lineHeight: 1.85 }}>
              Splatnost úvěru může být <strong>až 25 let</strong>, takže měsíční splátka jistiny
              je při milionovém úvěru na 25 let přibližně 3 300 Kč — bez jediné koruny navíc na úrocích.
            </Typography>

            {/* ===== 2. Co lze financovat ===== */}
            <SectionHeading icon={SolarPowerIcon} color="#1565c0">
              Na co lze bezúročný úvěr použít?
            </SectionHeading>

            <Typography variant="body1" paragraph sx={{ lineHeight: 1.85 }}>
              Rozsah podporovaných opatření navazuje na předchozí etapy NZÚ. Bezúročný úvěr
              lze použít jak na <strong>komplexní renovaci</strong> (zateplení + nový zdroj tepla + FVE
              najednou), tak na <strong>dílčí opatření</strong> — tedy i samotnou instalaci fotovoltaiky
              bez nutnosti dělat cokoliv dalšího.
            </Typography>

            <DataTable
              caption="Přehled opatření podporovaných bezúročným úvěrem NZÚ 2026"
              headers={['Opatření', 'Poznámka']}
              rows={[
                ['Fotovoltaická elektrárna (FVE)', 'Včetně bateriového úložiště'],
                ['Dobíjecí stanice pro elektromobil', 'Jako součást FVE nebo samostatně'],
                ['Zateplení fasády, střechy, podlahy', 'Komplexní i dílčí zateplení'],
                ['Výměna zdroje tepla', 'Tepelné čerpadlo, kondenzační kotel, biomasa…'],
                ['Větrání s rekuperací tepla', 'Chytré řízeně větrání'],
                ['Úsporný ohřev vody', 'Solární kolektory, tepelné čerpadlo na TV'],
                ['Hospodaření s dešťovou vodou', 'Akumulační nádrže, vsakování'],
                ['Zelené střechy a stěny', 'Extenzivní i intenzivní zelené střechy'],
              ]}
            />

            <Callout color="#1565c0">
              <strong>Fotovoltaika je způsobilé opatření i samostatně.</strong> Nemusíte zároveň
              zateplovat ani měnit kotel. Lze žádat čistě o bezúročný úvěr na FVE systém,
              případně FVE + baterie + wallbox pro elektromobil v jedné žádosti.
            </Callout>

            {/* ===== 3. Kdo může žádat ===== */}
            <SectionHeading icon={CheckCircleOutlineIcon} color="#6a1b9a">
              Kdo může o bezúročný úvěr žádat?
            </SectionHeading>

            <Typography variant="body1" paragraph sx={{ lineHeight: 1.85 }}>
              Okruh žadatelů je definován Státním fondem životního prostředí:
            </Typography>

            <Box component="ul" sx={{ pl: 2.5, '& li': { mb: 1.5, lineHeight: 1.8 } }}>
              <li>
                <Typography variant="body1">
                  <strong>Majitelé rodinných domů</strong> — fyzické osoby, které jsou vlastníky nebo
                  spoluvlastníky rodinného domu.
                </Typography>
              </li>
              <li>
                <Typography variant="body1">
                  <strong>Společenství vlastníků jednotek (SVJ)</strong> — pro renovace bytových domů.
                  SVJ navíc mohou získat finanční bonus na byty ve vlastnictví nízkopříjmových
                  domácností, aby jim nerostl příspěvek do fondu oprav.
                </Typography>
              </li>
              <li>
                <Typography variant="body1">
                  <strong>Bytová družstva</strong> — za stejných podmínek jako SVJ.
                </Typography>
              </li>
            </Box>

            <Typography variant="body1" paragraph sx={{ lineHeight: 1.85 }}>
              Program <strong>není</strong> určen pro komerční nemovitosti, firmy ani pronajímatele
              bytů. Žadatel musí být vlastníkem dotčené nemovitosti. Maximální výše úvěru
              pro konkrétní opatření bude upřesněna v závazných pokynech výzvy (zveřejnění
              plánováno v květnu–červnu 2026).
            </Typography>

            <DataTable
              caption="Srovnání bezúročného úvěru a přímé dotace NZÚ Light"
              headers={['', 'Bezúročný úvěr NZÚ', 'NZÚ Light (dotace)']}
              rows={[
                ['Kdo může žádat', 'Všichni vlastníci RD, SVJ, bytová družstva', 'Pouze nízkopříjmové domácnosti'],
                ['Forma podpory', 'Úhrada úroků po celou dobu splácení', 'Přímá dotace (nevratná)'],
                ['Nutnost renovačního pasu', 'Ano (pro dílčí renovace)', 'Ano (pro všechny žadatele)'],
                ['Příjem žádostí od', 'Červen 2026 (projekt na SFŽP)', 'Červen 2026'],
                ['Úvěr u banky od', 'Září 2026', 'Netýká se'],
                ['Splatnost', 'Až 25 let', 'Nevratné'],
              ]}
            />

            {/* ===== 4. Renovační pas ===== */}
            <SectionHeading icon={AssignmentIcon} color="#e65100">
              Renovační pas NZÚ: co to je a kdy ho potřebujete?
            </SectionHeading>

            <Typography variant="body1" paragraph sx={{ lineHeight: 1.85 }}>
              Renovační pas je nový dokument, který hraje klíčovou roli v nové etapě NZÚ.
              Jde o odborné posouzení vašeho domu a návrh postupu renovace — vypracovává ho
              certifikovaný energetický poradce NZÚ.
            </Typography>

            <Typography variant="body1" paragraph sx={{ lineHeight: 1.85 }}>
              Co renovační pas obsahuje:
            </Typography>

            <Box component="ul" sx={{ pl: 2.5, '& li': { mb: 1.5, lineHeight: 1.8 } }}>
              <li><Typography variant="body1">Posouzení stávajícího energetického stavu domu</Typography></li>
              <li><Typography variant="body1">Návrh efektivní renovace včetně doporučeného <strong>pořadí opatření</strong> pro dosažení parametrů velmi úsporné budovy</Typography></li>
              <li><Typography variant="body1">Vyčíslení předpokládané investice pro každé navrhované opatření</Typography></li>
              <li><Typography variant="body1">Odhad očekávaných energetických úspor v Kč i kWh</Typography></li>
            </Box>

            <Callout color="#e65100">
              <strong>Kdy renovační pas potřebujete:</strong><br />
              ✔ Žádáte o bezúročný úvěr na <strong>dílčí renovaci</strong> (např. samotná FVE)<br />
              ✔ Jste nízkopříjmová domácnost a žádáte o dotaci NZÚ Light<br /><br />
              <strong>Kdy renovační pas nepotřebujete:</strong><br />
              ✘ Žádáte o bezúročný úvěr na <strong>komplexní renovaci</strong> — místo toho doložíte
              průkaz energetické náročnosti budovy (PENB)
            </Callout>

            <Typography variant="body1" paragraph sx={{ lineHeight: 1.85 }}>
              Poradenství NZÚ bylo spuštěno v dubnu 2026. Renovační pas vystaví energetický
              specialista registrovaný jako poradce NZÚ — jejich seznam najdete na{' '}
              <a href="https://www.novazelenausporam.cz/energeticke-poradenstvi/" target="_blank" rel="noopener noreferrer" style={{ color: '#1565c0' }}>
                novazelenausporam.cz/energeticke-poradenstvi
              </a>.
            </Typography>

            <Typography variant="body1" paragraph sx={{ lineHeight: 1.85 }}>
              <strong>Cena renovačního pasu:</strong> Pro nízkopříjmové domácnosti (NZÚ Light) je
              renovační pas zcela zdarma — náklady hradí dotace z Národního plánu obnovy.
              Pro ostatní domácnosti bude cena zvýhodněna (výše příspěvku bude upřesněna
              ve výzvě). Vystavení renovačního pasu probíhá přes novou webovou aplikaci na{' '}
              <a href="https://renovacnipas.novazelenausporam.cz" target="_blank" rel="noopener noreferrer" style={{ color: '#1565c0' }}>
                renovacnipas.novazelenausporam.cz
              </a>.
            </Typography>

            {/* ===== 5. Harmonogram ===== */}
            <SectionHeading icon={CalendarTodayIcon} color="#1565c0">
              Harmonogram: kdy co podávat?
            </SectionHeading>

            <Typography variant="body1" paragraph sx={{ lineHeight: 1.85 }}>
              Vše níže vychází z oficiálního harmonogramu zveřejněného Ministerstvem životního
              prostředí a SFŽP ČR v březnu 2026:
            </Typography>

            <DataTable
              caption="Harmonogram nové etapy NZÚ Bezúročný úvěr (zdroj: MŽP / SFŽP ČR, březen 2026)"
              headers={['Termín', 'Co se stane']}
              rows={[
                ['Duben 2026', 'Spuštění sítě energetických poradců NZÚ, příjem žádostí o dotaci na zpracování renovačního pasu'],
                ['Květen 2026', 'Vyhlášení výzvy NZÚ Bezúročný úvěr – zveřejnění závazných pokynů a podmínek pro RD i BD'],
                ['Červen 2026', 'Otevření příjmu žádostí o posouzení projektu renovace na SFŽP ČR (technická kontrola)'],
                ['Září 2026', 'Banky a stavební spořitelny začínají poskytovat bezúročný úvěr NZÚ'],
              ]}
            />

            <Callout color="#1565c0">
              <strong>Co to znamená pro vás v praxi:</strong> Pokud chcete mít fotovoltaiku
              financovanou bezúročným úvěrem ještě v roce 2026, musíte stihnout zajistit
              renovační pas a podat žádost o posouzení projektu na SFŽP v červnu nebo červenci.
              Po schválení projektu podáte žádost o samotný úvěr u banky od září 2026.
            </Callout>

            {/* ===== 6. Jak postupovat krok za krokem ===== */}
            <SectionHeading icon={CheckCircleOutlineIcon} color="#2e7d32">
              Jak postupovat krok za krokem
            </SectionHeading>

            <Typography variant="body1" paragraph sx={{ lineHeight: 1.85 }}>
              Cesta k bezúročné půjčce na fotovoltaiku má několik jasných kroků:
            </Typography>

            <DataTable
              caption="Postup žádosti o bezúročný úvěr NZÚ na FVE (dílčí renovace)"
              headers={['Krok', 'Co udělat', 'Kdy']}
              rows={[
                ['1', 'Najít certifikovaného poradce NZÚ v seznamu na novazelenausporam.cz', 'Nyní (poradci aktivní od dubna 2026)'],
                ['2', 'Nechat zpracovat renovační pas – poradce posoudí dům a navrhne opatření', 'Nyní – červen 2026'],
                ['3', 'Vybrat dodavatele FVE ze Seznamu výrobků a technologií (SVT) SFŽP', 'Souběžně s krokem 2'],
                ['4', 'Podat žádost o posouzení projektu na SFŽP ČR (technická kontrola)', 'Od června 2026'],
                ['5', 'SFŽP projekt schválí a vydá rozhodnutí o podpoře', 'Průběžně po podání'],
                ['6', 'Podat žádost o bezúročný úvěr u zapojené banky nebo stavební spořitelny', 'Od září 2026'],
                ['7', 'Banka poskytne úvěr, SFŽP jí kompenzuje úroky po celou dobu splácení', 'Po schválení bankou'],
              ]}
            />

            <Typography variant="body1" paragraph sx={{ lineHeight: 1.85 }}>
              Konkrétní seznam zapojených bank a stavebních spořitelen bude zveřejněn
              v závaných pokynech výzvy. Ministerstvo životního prostředí potvrdilo zájem
              a připravenost bankovního sektoru — o spolupráci projevila zájem Česká bankovní
              asociace i konkrétní instituce.
            </Typography>

            {/* ===== 7. Ekonomika FVE s bezúročným úvěrem ===== */}
            <SectionHeading icon={SolarPowerIcon} color="#f57f17">
              Jak vychází ekonomika FVE s bezúročným úvěrem?
            </SectionHeading>

            <Typography variant="body1" paragraph sx={{ lineHeight: 1.85 }}>
              Bezúročný úvěr výrazně zlepšuje návratnost investice do fotovoltaiky oproti
              komerčnímu financování. Srovnání na příkladu typické domácí FVE 10 kWp
              s baterií 10 kWh:
            </Typography>

            <DataTable
              caption="Srovnání financování FVE 10 kWp + baterie 10 kWh (orientační cena 350 000 Kč)"
              headers={['', 'Vlastní prostředky', 'Komerční úvěr (5 %)', 'Bezúročný úvěr NZÚ']}
              rows={[
                ['Investice', '350 000 Kč', '350 000 Kč', '350 000 Kč'],
                ['Délka splácení', '–', '15 let', '15 let'],
                ['Celkem zaplaceno', '350 000 Kč', '~507 000 Kč', '350 000 Kč'],
                ['Úroky celkem', '0 Kč', '~157 000 Kč', '0 Kč (platí SFŽP)'],
                ['Měsíční splátka', '–', '~3 380 Kč', '~1 950 Kč (jen jistina)'],
                ['Orientační návratnost*', '7–9 let', '10–13 let', '7–9 let'],
              ]}
            />

            <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: -1, mb: 3 }}>
              * Návratnost závisí na spotřebě domácnosti, ceně elektřiny, orientaci střechy a výkupu přebytků.
              Přesný výpočet pro vaši situaci: <a href="/navratnost-fve" style={{ color: '#1565c0' }}>kalkulačka návratnosti FVE</a>.
            </Typography>

            <Callout color="#f57f17">
              <strong>Klíčový závěr:</strong> Bezúročný úvěr NZÚ přináší stejnou celkovou cenu
              jako platba z vlastních prostředků — ale nemusíte mít 350 000 Kč naspořeno předem.
              Oproti komerční hypotéce nebo spotřebitelskému úvěru ušetříte desítky až stovky
              tisíc korun na úrocích.
            </Callout>

            <Typography variant="body1" paragraph sx={{ lineHeight: 1.85 }}>
              Chcete vědět, za kolik let se fotovoltaika na vaší střeše zaplatí?
              Zadejte spotřebu, výkon FVE a cenu elektřiny do naší{' '}
              <a href="/navratnost-fve" style={{ color: '#1565c0', fontWeight: 600 }}>
                kalkulačky návratnosti FVE
              </a>{' '}
              — výsledek dostanete za minutu.
            </Typography>

            {/* ===== 8. NZÚ Light pro nízkopříjmové ===== */}
            <SectionHeading icon={WarningAmberIcon} color="#880e4f">
              NZÚ Light: dotace pro nízkopříjmové domácnosti
            </SectionHeading>

            <Typography variant="body1" paragraph sx={{ lineHeight: 1.85 }}>
              Pokud patříte mezi domácnosti s nižšími příjmy, máte nárok na <strong>přímou
              dotaci (nevratný grant)</strong> v rámci programu NZÚ Light — bez nutnosti splácet
              cokoliv bance. Výzva NZÚ Light byla vyhlášena v květnu 2026, příjem žádostí
              se otevírá v červnu 2026.
            </Typography>

            <Typography variant="body1" paragraph sx={{ lineHeight: 1.85 }}>
              Na rozdíl od bezúročného úvěru je renovační pas pro žadatele o NZÚ Light
              povinný vždy a je <strong>zcela zdarma</strong>. Rozsah podporovaných opatření
              zahrnuje zejména zateplení, ale i obnovitelné zdroje energie v kombinaci
              se zateplením. Konkrétní podmínky NZÚ Light (definice nízkopříjmové domácnosti,
              výše dotace na FVE) budou v závazných pokynech výzvy.
            </Typography>

            <Callout color="#880e4f">
              Orientačně: v předchozí etapě NZÚ Light byla za „nízkopříjmovou domácnost"
              považována domácnost, která pobírá příspěvek na bydlení nebo má příjmy
              pod určitou hranicí. Přesné podmínky pro etapu 2026 budou zveřejněny
              ve výzvě — sledujte{' '}
              <a href="https://www.novazelenausporam.cz" target="_blank" rel="noopener noreferrer" style={{ color: '#880e4f' }}>
                novazelenausporam.cz
              </a>.
            </Callout>

            {/* ===== 9. Kde najít poradce a dodavatele ===== */}
            <SectionHeading icon={AccountBalanceIcon} color="#1565c0">
              Kde najít poradce, dodavatele a sledovat novinky
            </SectionHeading>

            <Typography variant="body1" paragraph sx={{ lineHeight: 1.85 }}>
              Všechny klíčové informace spravuje SFŽP ČR:
            </Typography>

            <Box component="ul" sx={{ pl: 2.5, '& li': { mb: 1.5, lineHeight: 1.8 } }}>
              <li>
                <Typography variant="body1">
                  <strong>Seznam poradců NZÚ</strong> (zpracují renovační pas):{' '}
                  <a href="https://www.novazelenausporam.cz/energeticke-poradenstvi/" target="_blank" rel="noopener noreferrer" style={{ color: '#1565c0' }}>
                    novazelenausporam.cz/energeticke-poradenstvi
                  </a>
                </Typography>
              </li>
              <li>
                <Typography variant="body1">
                  <strong>Seznam výrobků a technologií (SVT)</strong> — dodavatel musí být registrován:{' '}
                  <a href="https://svt.sfzp.cz" target="_blank" rel="noopener noreferrer" style={{ color: '#1565c0' }}>
                    svt.sfzp.cz
                  </a>
                </Typography>
              </li>
              <li>
                <Typography variant="body1">
                  <strong>Aplikace renovačního pasu:</strong>{' '}
                  <a href="https://renovacnipas.novazelenausporam.cz" target="_blank" rel="noopener noreferrer" style={{ color: '#1565c0' }}>
                    renovacnipas.novazelenausporam.cz
                  </a>
                </Typography>
              </li>
              <li>
                <Typography variant="body1">
                  <strong>Novinky a aktuální výzvy:</strong>{' '}
                  <a href="https://www.novazelenausporam.cz/novinky-a-akce/" target="_blank" rel="noopener noreferrer" style={{ color: '#1565c0' }}>
                    novazelenausporam.cz/novinky-a-akce
                  </a>
                </Typography>
              </li>
            </Box>

            {/* ===== Shrnutí ===== */}
            <Box sx={{ mt: 5, mb: 3, p: 3, bgcolor: '#f1f8e9', borderRadius: 3, border: '1.5px solid #c5e1a5' }}>
              <Typography variant="h6" fontWeight={800} gutterBottom sx={{ color: '#2e7d32' }}>
                Shrnutí: co si z článku odnést
              </Typography>
              <Box component="ul" sx={{ pl: 2.5, mb: 0, '& li': { mb: 1, lineHeight: 1.8 } }}>
                <li><Typography variant="body2">Bezúročný úvěr NZÚ = banka půjčí peníze, stát zaplatí veškeré úroky. Vy vracíte jen jistinu.</Typography></li>
                <li><Typography variant="body2">FVE (včetně baterie a wallboxu) je způsobilé opatření — i jako samostatná dílčí renovace.</Typography></li>
                <li><Typography variant="body2">Žádat mohou majitelé rodinných domů, SVJ a bytová družstva.</Typography></li>
                <li><Typography variant="body2">Pro dílčí renovaci (jen FVE) je nutný renovační pas od certifikovaného poradce NZÚ.</Typography></li>
                <li><Typography variant="body2">Příjem projektů na SFŽP: červen 2026. Úvěry u bank: září 2026.</Typography></li>
                <li><Typography variant="body2">Nízkopříjmové domácnosti mohou žádat o přímou dotaci NZÚ Light (ne úvěr) — renovační pas zdarma.</Typography></li>
                <li><Typography variant="body2">Maximální výše úvěru a přesné podmínky budou v závazných pokynech výzvy (zveřejnění v květnu–červnu 2026).</Typography></li>
              </Box>
            </Box>

            <Typography variant="body1" sx={{ lineHeight: 1.85, mb: 4 }}>
              Chcete vědět, jestli se FVE na vaší střeše vůbec vyplatí — ještě před tím,
              než zajdete za poradcem? Zkuste naši{' '}
              <a href="/navratnost-fve" style={{ color: '#2e7d32', fontWeight: 700 }}>
                kalkulačku návratnosti FVE
              </a>
              . Zadáte spotřebu, sklon střechy a cenu elektřiny — a za minutu víte orientační
              dobu návratnosti i celkovou úsporu za 20 let.
            </Typography>

            <Divider sx={{ my: 4 }} />

            {/* Autor */}
            <Box display="flex" alignItems="flex-start" gap={2} p={2.5} sx={{ bgcolor: '#fafafa', borderRadius: 2, border: '1px solid #e0e0e0' }}>
              <Box sx={{ width: 44, height: 44, borderRadius: '50%', bgcolor: '#2e7d3218', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <PersonIcon sx={{ color: '#2e7d32', fontSize: 22 }} />
              </Box>
              <Box>
                <Typography variant="body2" fontWeight={700}>Vlastimil Votruba</Typography>
                <Typography variant="caption" color="text.secondary">
                  Autor a zakladatel mzda-dane.cz · Sleduju vývoj dotačních programů a energetické legislativy v ČR.
                  Článek vychází z oficiálních podkladů MŽP, SFŽP ČR a webu Nová zelená úsporám.
                </Typography>
              </Box>
            </Box>

            <ContactForm />

            <Box mt={4} display="flex" justifyContent="center">
              <Button
                variant="outlined"
                onClick={() => router.push('/blog')}
                sx={{ textTransform: 'none', fontWeight: 700, borderRadius: 2, color: '#1565c0', borderColor: '#1565c0' }}
              >
                ← Zpět na blog
              </Button>
            </Box>

          </Box>
        </Box>
        <Footer onNavigate={(p) => router.push(p)} />
      </Container>
    </>
  )
}
