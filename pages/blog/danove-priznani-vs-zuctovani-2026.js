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
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'
import Header from '../../components/Header'
import Footer from '../../components/Footer/Footer'
import ShareButtons from '../../components/ShareButtons/ShareButtons'

const ARTICLE_URL = 'https://mzda-dane.cz/blog/danove-priznani-vs-zuctovani-2026'
const ARTICLE_TITLE = 'Daňové přiznání nebo roční zúčtování? Jak nepřijít o vrácení daně'
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
      <Box sx={{ height: 4, background: 'linear-gradient(90deg, #1565c0 0%, #6a1b9a 100%)' }} />
      <Box sx={{ p: { xs: 2.5, sm: 3 } }}>
        <Typography variant="h6" fontWeight={800} gutterBottom>Máte dotaz k daňovému přiznání?</Typography>
        <Typography variant="body2" color="text.secondary" mb={2.5}>
          Napište mi – rád odpovím nebo doplním článek o váš případ. Odpovídám zpravidla do 48 hodin.
        </Typography>
        {sent ? (
          <Alert severity="success" sx={{ borderRadius: 2 }}>Otevřel se váš e-mailový klient s předvyplněným dotazem. Stačí odeslat.</Alert>
        ) : (
          <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" gap={2}>
            <TextField label="Vaše jméno (nepovinné)" value={name} onChange={(e) => setName(e.target.value)} size="small" fullWidth />
            <TextField label="Váš dotaz nebo komentář" value={question} onChange={(e) => setQuestion(e.target.value)} size="small" fullWidth multiline minRows={3} required />
            <Button type="submit" variant="contained" sx={{ alignSelf: 'flex-start', textTransform: 'none', fontWeight: 700, background: 'linear-gradient(90deg, #1565c0 0%, #6a1b9a 100%)', boxShadow: 'none' }}>
              Otevřít e-mailového klienta
            </Button>
          </Box>
        )}
      </Box>
    </Paper>
  )
}

export default function ArticleDanovePriznani() {
  const router = useRouter()

  return (
    <>
      <Head>
        <title>{ARTICLE_TITLE} – Mzda a daně</title>
        <meta name="description" content="Kdy musíte podat daňové přiznání a kdy stačí požádat zaměstnavatele o roční zúčtování? Termíny, rozdíly a kdy se přiznání vyplatí i dobrovolně." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={ARTICLE_URL} />
        <meta property="og:title" content={ARTICLE_TITLE} />
        <meta property="og:description" content="Daňové přiznání vs. roční zúčtování – kdo musí, kdo může a kdy se vyplatí podat přiznání dobrovolně. S konkrétními příklady pro rok 2026." />
        <meta property="og:url" content={ARTICLE_URL} />
        <meta property="og:type" content="article" />
        <meta property="og:locale" content="cs_CZ" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org', '@type': 'Article',
          headline: ARTICLE_TITLE, datePublished: '2026-04-10', dateModified: '2026-04-10',
          author: { '@type': 'Person', name: 'Vlastimil Votruba', url: 'https://mzda-dane.cz/about' },
          publisher: { '@type': 'Organization', name: 'mzda-dane.cz', url: 'https://mzda-dane.cz' },
          description: 'Kdy musíte podat daňové přiznání a kdy stačí roční zúčtování. Termíny, rozdíly a tipy pro rok 2026.',
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
              {['Daně', 'Zaměstnanci', 'Osobní finance'].map((tag) => (
                <Chip key={tag} label={tag} size="small" sx={{ fontSize: '0.72rem', bgcolor: '#fce4ec', color: '#880e4f', fontWeight: 600 }} />
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
                <Typography variant="caption" color="text.disabled">10. dubna 2026</Typography>
              </Box>
              <Box display="flex" alignItems="center" gap={0.5}>
                <AccessTimeIcon sx={{ fontSize: 14, color: 'text.disabled' }} />
                <Typography variant="caption" color="text.disabled">7 min čtení</Typography>
              </Box>
              <ShareButtons title={ARTICLE_TITLE} url={ARTICLE_URL} />
            </Box>

            <Divider sx={{ mb: 3 }} />

            <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.85, color: '#444', fontStyle: 'italic', mb: 4 }}>
              Každý rok v únoru a březnu se miliony zaměstnanců ptají to samé: musím podat daňové přiznání,
              nebo mi daně vyřídí zaměstnavatel? A co když mám brigádu, příjem z pronájmu nebo jsem
              v průběhu roku změnil práci? Přehledně vysvětlím, kdo co musí, a kdy se přiznání
              vyplatí i tehdy, když povinné není.
            </Typography>

            {/* ===== 1. Základní rozdíl ===== */}
            <SectionHeading icon={ReceiptLongIcon} color="#880e4f">
              Zúčtování vs. přiznání – jaký je rozdíl?
            </SectionHeading>

            <Typography variant="body1" paragraph sx={{ lineHeight: 1.85 }}>
              Oba procesy slouží ke stejnému účelu: zjistit, zda jste během roku odvedli správnou
              výši daně z příjmů, a případný přeplatek vám vrátit (nebo nedoplatek vybrat).
              Liší se tím, <strong>kdo je provádí</strong>.
            </Typography>

            <DataTable
              caption="Srovnání ročního zúčtování a daňového přiznání"
              headers={['', 'Roční zúčtování', 'Daňové přiznání']}
              rows={[
                ['Kdo to dělá', 'Váš zaměstnavatel', 'Vy sami (nebo daňový poradce)'],
                ['Termín žádosti / podání', 'Žádost do 15. 2.', 'Do 1. 4. (papír) / 1. 7. (elektronicky)'],
                ['Složitost', 'Minimum práce pro vás', 'Vyplníte formulář sami'],
                ['Přeplatek', 'Vrácen s březnovou výplatou', 'Vrácen do 30 dnů od zpracování FÚ'],
                ['Lze uplatnit odpočty', 'Ano – hypotéka, dary, penzijko, životko', 'Ano – i širší škála'],
                ['Nutné doklady', 'Potvrzení o příjmech od všech zaměstnavatelů', 'Všechny příjmy, výdaje, doklady'],
              ]}
            />

            <Typography variant="body1" paragraph sx={{ lineHeight: 1.85 }}>
              Klíčový bod: roční zúčtování může provést <strong>jen jeden zaměstnavatel</strong> —
              zpravidla ten, u kterého jste podepsali prohlášení poplatníka (tzv. „růžový papír").
              Pokud jste měli více zaměstnavatelů souběžně nebo postupně a u každého podepsali
              prohlášení, musíte podat daňové přiznání sami.
            </Typography>

            {/* ===== 2. Kdo musí přiznání ===== */}
            <SectionHeading icon={WarningAmberIcon} color="#e65100">
              Kdy MUSÍTE podat daňové přiznání?
            </SectionHeading>

            <Typography variant="body1" paragraph sx={{ lineHeight: 1.85 }}>
              Zákon o daních z příjmů (§ 38g) vám ukládá povinnost podat přiznání v těchto situacích:
            </Typography>

            <Box component="ul" sx={{ pl: 2.5, '& li': { mb: 1.5, lineHeight: 1.8 } }}>
              <li><Typography variant="body1"><strong>Více zaměstnavatelů souběžně</strong> — pracujete pro dvě firmy najednou a u obou máte podepsané prohlášení.</Typography></li>
              <li><Typography variant="body1"><strong>Příjmy ze samostatné výdělečné činnosti</strong> — vedlejší OSVČ, fakturace, příjmy ze živnosti.</Typography></li>
              <li><Typography variant="body1"><strong>Příjem z pronájmu nemovitosti</strong> — stačí i jeden byt pronajímaný část roku.</Typography></li>
              <li><Typography variant="body1"><strong>Příjem z kapitálového majetku</strong> — prodej akcií, kryptoměn, podílových listů (pokud příjem přesáhne 100 000 Kč nebo nesplňuje časový test).</Typography></li>
              <li><Typography variant="body1"><strong>Ostatní příjmy nad 20 000 Kč</strong> — například výhry, příjmy z příležitostné činnosti (§ 10).</Typography></li>
              <li><Typography variant="body1"><strong>Daňová ztráta</strong> — pokud chcete uplatnit ztrátu z minulých let.</Typography></li>
              <li><Typography variant="body1"><strong>Roční příjmy ze zaměstnání přesáhly 1 935 552 Kč</strong> — solidární přirážka (od roku 2021 zrušena, ale limit pro zvýšenou sazbu 23 % trvá).</Typography></li>
            </Box>

            <Callout color="#e65100">
              <strong>Pozor na DPP a DPČ:</strong> Příjem z dohody o provedení práce do 10 000 Kč/měsíc
              u jednoho zaměstnavatele podléhá srážkové dani a do přiznání se nemusí uvádět.
              Pokud ale výdělky z DPP zahrnout chcete (například kvůli vrácení přeplatku), můžete —
              a v tom případě musíte zahrnout vše.
            </Callout>

            {/* ===== 3. Kdy se přiznání vyplatí dobrovolně ===== */}
            <SectionHeading icon={CheckCircleOutlineIcon} color="#2e7d32">
              Kdy se přiznání vyplatí i bez povinnosti?
            </SectionHeading>

            <Typography variant="body1" paragraph sx={{ lineHeight: 1.85 }}>
              Daňové přiznání není jen povinností — může být i příležitostí. Pokud jste v průběhu
              roku nastoupili do zaměstnání a první měsíce jste měli nižší příjmy, zálohy na daň
              mohly být předimenzovány. Nebo jste neuplatnili všechny odpočty. Typické situace,
              kdy se přiznání dobrovolně vyplatí:
            </Typography>

            <DataTable
              caption="Příklady daňových odpočtů a slev pro rok 2026"
              headers={['Odpočet / sleva', 'Max. výše', 'Podmínka']}
              rows={[
                ['Úroky z hypotéky', 'až 300 000 Kč/rok', 'Potvrzení od banky, vlastní bydlení'],
                ['Penzijní připojištění / DPS', 'až 24 000 Kč', 'Příspěvky nad 1 700 Kč/měsíc'],
                ['Životní pojištění', 'až 24 000 Kč', 'Smlouva s výplatou po 60 letech věku'],
                ['Dary (charita, školy…)', 'až 15 % základu daně', 'Min. 1 000 Kč nebo 2 % základu'],
                ['Studium (vlastní)', 'až 1 150 Kč/měsíc', 'Doklad o studiu, max. 28 let věku'],
                ['Sleva na manžela/manželku', '24 840 Kč', 'Partner s příjmem do 68 000 Kč/rok'],
                ['Sleva za umístění dítěte (školka)', 'dle min. mzdy', 'Potvrzení ze školky'],
              ]}
            />

            <Typography variant="body1" paragraph sx={{ lineHeight: 1.85 }}>
              Nejčastějším důvodem pro dobrovolné přiznání jsou <strong>úroky z hypotéky</strong>.
              Při úvěru 3 000 000 Kč v prvních letech splácíte ročně 120 000–160 000 Kč na úrocích.
              Celý tento odpočet si lze uplatnit — daňová úspora pak činí 15 % z odečtené částky
              (sazba 15 % daně), tj. <strong>18 000–24 000 Kč ročně zpět</strong>.
            </Typography>

            <Callout color="#2e7d32">
              Roční zúčtování přes zaměstnavatele tyto odpočty také umožňuje — ale
              pouze pokud zaměstnavateli donesete podklady do 15. února. Daňové přiznání
              dává více času (do 1. dubna, resp. 1. července) a větší kontrolu nad výsledkem.
            </Callout>

            {/* ===== 4. Termíny ===== */}
            <SectionHeading icon={CalendarTodayIcon} color="#1565c0">
              Termíny pro rok 2026 (za rok 2025)
            </SectionHeading>

            <DataTable
              caption="Přehled klíčových termínů daňového roku 2025/2026"
              headers={['Termín', 'Co se děje']}
              rows={[
                ['Do 15. 2. 2026', 'Požádat zaměstnavatele o roční zúčtování + dodat podklady'],
                ['Do 31. 3. 2026', 'Zaměstnavatel provede zúčtování, přeplatek vrátí s březnovou výplatou'],
                ['Do 1. 4. 2026', 'Termín podání papírového daňového přiznání'],
                ['Do 1. 7. 2026', 'Termín podání elektronického přiznání (datová schránka, portál FO)'],
                ['Do 1. 7. 2026', 'Prodloužení termínu při zastoupení daňovým poradcem'],
                ['Do 30 dnů od podání', 'FÚ vrací přeplatek (pokud > 200 Kč)'],
              ]}
            />

            <Typography variant="body1" paragraph sx={{ lineHeight: 1.85 }}>
              Od roku 2023 je <strong>elektronické podání</strong> výrazně dostupnější — stačí
              přihlášení na Portál občana nebo Moje daně přes bankovní identitu nebo datovou schránku.
              Formulář se předvyplní z dat ČSSZ a zaměstnavatelů, takže v mnoha případech
              stačí zkontrolovat a odeslat.
            </Typography>

            {/* ===== 5. Typické situace ===== */}
            <SectionHeading icon={ReceiptLongIcon} color="#6a1b9a">
              Typické situace a jak na ně
            </SectionHeading>

            <DataTable
              caption="Kdo co dělá – přehled nejčastějších situací"
              headers={['Situace', 'Co musíte udělat']}
              rows={[
                ['Zaměstnanec, jeden zaměstnavatel, žádné jiné příjmy', 'Požádat o zúčtování do 15. 2. (nebo nedělat nic – daň odpovídá)'],
                ['Zaměstnanec + pronájem bytu', 'Podat daňové přiznání (povinně)'],
                ['Zaměstnanec + prodej kryptoměn nad 100 tis.', 'Podat daňové přiznání (povinně)'],
                ['Zaměstnanec s hypotékou, jeden zaměstnavatel', 'Zúčtování (donést potvrzení z banky) nebo přiznání'],
                ['Dva zaměstnavatelé souběžně', 'Podat daňové přiznání (povinně)'],
                ['Zaměstnanec + DPP do 10 000 Kč/měs., srážková daň', 'Zúčtování nebo přiznání (DPP nemusí zahrnout)'],
                ['Zaměstnanec + vedlejší OSVČ', 'Podat daňové přiznání (povinně)'],
              ]}
            />

            <Typography variant="body2" color="text.secondary" sx={{ mt: 4, lineHeight: 1.8 }}>
              <strong>Chcete zjistit svou čistou mzdu nebo roční daňovou povinnost?</strong>{' '}
              Na mzda-dane.cz najdete{' '}
              <Box component="span" sx={{ cursor: 'pointer', color: '#1565c0', textDecoration: 'underline' }} onClick={() => router.push('/rocni-dane')}>
                kalkulačku ročního zdanění 2026
              </Box>
              , která zohledňuje všechny slevy a odpočty. Výsledek dostanete okamžitě.
            </Typography>

            <Divider sx={{ mt: 5, mb: 3 }} />
            <Box display="flex" alignItems="flex-start" gap={2}>
              <Box sx={{ width: 48, height: 48, borderRadius: '50%', bgcolor: '#e8eaf6', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <PersonIcon sx={{ color: '#3949ab', fontSize: 26 }} />
              </Box>
              <Box>
                <Typography variant="subtitle2" fontWeight={800}>Vlastimil Votruba</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                  Autor a zakladatel mzda-dane.cz. Provozuje VOV Software se zaměřením na
                  praktické finanční nástroje pro český trh. Sleduje českou daňovou legislativu
                  s důrazem na dopad do osobních financí každého z nás.
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
