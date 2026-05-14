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
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation'
import ElectricCarIcon from '@mui/icons-material/ElectricCar'
import TrendingDownIcon from '@mui/icons-material/TrendingDown'
import Header from '../../components/Header'
import Footer from '../../components/Footer/Footer'
import ShareButtons from '../../components/ShareButtons/ShareButtons'

const ARTICLE_URL = 'https://mzda-dane.cz/blog/benzin-nafta-vs-ev-2026'
const ARTICLE_TITLE = 'Benzín a nafta zdražují – kdy se vyplatí přejít na elektro?'
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
        <Typography variant="h6" fontWeight={800} gutterBottom>
          Máte dotaz nebo jiný pohled?
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={2.5}>
          Napište mi – rád odpovím nebo doplním článek o váš postřeh. Odpovídám zpravidla do 48 hodin.
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
              label="Váš dotaz nebo komentář"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              size="small"
              fullWidth
              multiline
              minRows={3}
              required
            />
            <Button type="submit" variant="contained" sx={{ alignSelf: 'flex-start', textTransform: 'none', fontWeight: 700, background: 'linear-gradient(90deg, #1565c0 0%, #6a1b9a 100%)', boxShadow: 'none' }}>
              Otevřít e-mailového klienta
            </Button>
          </Box>
        )}
      </Box>
    </Paper>
  )
}

export default function ArticleBenzinVsEv() {
  const router = useRouter()

  return (
    <>
      <Head>
        <title>{ARTICLE_TITLE} – Mzda a daně</title>
        <meta name="description" content="Ceny benzínu a nafty v ČR, vývoj od roku 2022 a výhled do budoucna. Kdy se elektromobil finančně vyplatí? Konkrétní výpočty TCO pro české podmínky." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={ARTICLE_URL} />
        <meta property="og:title" content={ARTICLE_TITLE} />
        <meta property="og:description" content="Ceny benzínu a nafty v ČR, vývoj od 2022 a kdy se vyplatí EV – s konkrétními čísly pro české podmínky." />
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
          description: 'Ceny benzínu a nafty v ČR, vývoj od roku 2022 a výhled do budoucna. Kdy se elektromobil finančně vyplatí? Konkrétní výpočty TCO pro české podmínky.',
          mainEntityOfPage: { '@type': 'WebPage', '@id': ARTICLE_URL },
        }) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Domů', item: 'https://mzda-dane.cz' }, { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://mzda-dane.cz/blog' }, { '@type': 'ListItem', position: 3, name: ARTICLE_TITLE, item: ARTICLE_URL }] }) }} />
      </Head>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Header subtitle="Blog – analýzy a komentáře" />

        <Box mt={4} display="flex" justifyContent="center">
          <Box sx={{ width: '100%', maxWidth: 780 }}>

            {/* Tagy */}
            <Box display="flex" gap={0.75} flexWrap="wrap" mb={2}>
              {['Elektromobily', 'Ceny paliv', 'Osobní finance'].map((tag) => (
                <Chip key={tag} label={tag} size="small" sx={{ fontSize: '0.72rem', bgcolor: '#f3e5f5', color: '#6a1b9a', fontWeight: 600 }} />
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
                <Typography variant="caption" color="text.disabled">8 min čtení</Typography>
              </Box>
              <ShareButtons title={ARTICLE_TITLE} url={ARTICLE_URL} />
            </Box>

            <Divider sx={{ mb: 3 }} />

            {/* Perex */}
            <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.85, color: '#444', fontStyle: 'italic', mb: 4 }}>
              Litr benzínu 95 stál v ČR na jaře 2022 přes 47 Kč. Pak přišel pokles, ale ceny se ustálily
              vysoko — kolem 36–39 Kč. Mnozí z nás se ptají: vyplatí se konečně přejít na elektro?
              Podíval jsem se na čísla z posledních čtyř let, prošel jsem globální data a spočítal konkrétní
              náklady pro průměrného českého řidiče.
            </Typography>

            {/* ===== 1. Ceny paliv ===== */}
            <SectionHeading icon={LocalGasStationIcon} color="#e65100">
              Kde stojíme s cenami paliv?
            </SectionHeading>

            <Typography variant="body1" paragraph sx={{ lineHeight: 1.85 }}>
              Ceny pohonných hmot v ČR prošly od roku 2021 dramatickým vývojem. Před pandemií se benzín
              95 pohyboval okolo 29–31 Kč/litr. Pak přišla série šoků — nejprve obnova poptávky po
              covidu, poté ruská invaze na Ukrajinu v únoru 2022, která vyhnala ropu Brent přes
              120 USD za barel a ceny na pumpách v ČR přes 47 Kč/litr benzínu a 50 Kč/litr nafty.
            </Typography>

            <DataTable
              caption="Průměrné ceny pohonných hmot v ČR (zdroj: CCS, průměr roku)"
              headers={['Rok', 'Benzín 95 (Kč/l)', 'Nafta (Kč/l)', 'Ropa Brent (USD/barel)']}
              rows={[
                ['2020', '27,80', '26,40', '~42'],
                ['2021', '32,50', '31,20', '~71'],
                ['2022', '40,30', '43,10', '~99'],
                ['2023', '38,20', '37,50', '~83'],
                ['2024', '37,60', '35,80', '~80'],
                ['2025–2026', '40–43', '38–42', '~72–82'],
              ]}
            />

            <Typography variant="body1" paragraph sx={{ lineHeight: 1.85 }}>
              Pokles z maxim je reálný, ale ceny zůstávají o 20–30 % výše než před rokem 2021.
              Proč? Odpověď leží z velké části v daňové struktuře: spotřební daň z benzínu
              v ČR činí 12,84 Kč/litr a k tomu se připočítává 21% DPH z celkové ceny.
              Dohromady tvoří daně přibližně 55–58 % konečné ceny na pumpě.
              Ani kdyby ropa zlevnila na 50 USD, benzín by neklesl pod 30 Kč.
            </Typography>

            <Callout color="#e65100">
              <strong>Klíčový fakt:</strong> Z každého litru benzínu za 41 Kč dostane stát přibližně
              23–24 Kč na spotřební dani a DPH. Ropné společnosti a distribuce si rozdělí zbytek.
              Cena ropy ovlivňuje jen cca 40 % konečné ceny na pumpě.
            </Callout>

            {/* ===== 2. Výhled ===== */}
            <SectionHeading icon={TrendingDownIcon} color="#1565c0">
              Kam směřují ceny paliv do budoucna?
            </SectionHeading>

            <Typography variant="body1" paragraph sx={{ lineHeight: 1.85 }}>
              Mezinárodní agentura pro energii (IEA) ve své výroční zprávě World Energy Outlook
              předpovídá, že globální poptávka po ropě dosáhne vrcholu mezi lety 2028 a 2032,
              načež začne klesat vlivem elektromobility a obnovitelných zdrojů. OPEC+ na to reaguje
              řízeným omezováním těžby, čímž se snaží udržet cenu Brentu nad 70–75 USD.
            </Typography>

            <Typography variant="body1" paragraph sx={{ lineHeight: 1.85 }}>
              Pro české řidiče to znamená jednu nepříjemnou zprávu: výrazné zlevnění pohonných hmot
              v příštích 3–5 letech je nepravděpodobné. Daňová složka zůstane, případné zlevnění
              ropy bude tlumeno kursovými pohyby EUR/CZK a snahou vlád zachovat příjmy ze spotřební daně.
              Naopak v Německu či Francii, kde jsou ceny historicky vyšší, by mohl být pokles
              markantnější — tamní vlády mají větší politický prostor ke snížení daní.
            </Typography>

            <Typography variant="body1" paragraph sx={{ lineHeight: 1.85 }}>
              Z pohledu EU hraje klíčovou roli zákaz prodeje nových aut se spalovacím motorem
              od roku 2035. I přes aktuální politické turbulence (části průmyslu lobbují za
              odložení) je tento cíl stále platný. Výrobci do vývoje elektroaut investují desítky
              miliard eur — návrat k čistě spalovacím modelům není realistický.
            </Typography>

            {/* ===== 3. EV kalkulace ===== */}
            <SectionHeading icon={ElectricCarIcon} color="#2e7d32">
              Kdy se elektromobil skutečně vyplatí?
            </SectionHeading>

            <Typography variant="body1" paragraph sx={{ lineHeight: 1.85 }}>
              Pojďme na konkrétní čísla. Srovnám průměrného řidiče, který najede 15 000 km ročně
              a uvažuje mezi moderním kompaktním autem na benzín (např. Škoda Octavia 1.5 TSI)
              a srovnatelným elektromobilem (Škoda Enyaq iV 60 nebo MG4 EV Standard).
            </Typography>

            <DataTable
              caption="Srovnání provozních nákladů za rok (15 000 km, platné pro rok 2026)"
              headers={['Položka', 'Benzín (Octavia 1.5 TSI)', 'Elektro (Enyaq / MG4)']}
              rows={[
                ['Spotřeba', '6,5 l/100km', '17 kWh/100km'],
                ['Cena energie (domácí)', '41 Kč/litr', '3,50 Kč/kWh (noční tarif)'],
                ['Náklady na palivo/rok', '~40 000 Kč', '~8 925 Kč'],
                ['Servis (oleje, filtry, řemeny…)', '~12 000 Kč', '~4 500 Kč'],
                ['Silniční daň, pojištění*', 'cca srovnatelné', 'cca srovnatelné'],
                ['Celkem provozní náklady/rok', '~52 000 Kč', '~13 400 Kč'],
                ['Roční úspora ve prospěch EV', '—', '~38 600 Kč'],
              ]}
            />

            <Typography variant="caption" color="text.secondary" display="block" mt={-1} mb={2}>
              * Pojištění EV může být mírně vyšší kvůli vyšší pořizovací hodnotě vozu.
              Domácí nabíjení předpokládá noční tarif D02d (~2,5–4 Kč/kWh dle dodavatele).
              Veřejné rychlonabíjení (10–15 Kč/kWh) úsporu snižuje.
            </Typography>

            <Callout color="#2e7d32">
              Roční úspora na provozu elektromobilu oproti benzínovému vozu se pohybuje
              kolem <strong>35 000–42 000 Kč</strong> při domácím nabíjení.
              Při výhradně veřejném nabíjení klesá na 15 000–20 000 Kč.
            </Callout>

            <Typography variant="body1" paragraph sx={{ lineHeight: 1.85 }}>
              Problémem zůstává pořizovací cena. Škoda Enyaq iV 60 startuje přibližně od 900 000 Kč,
              MG4 EV Standard od 680 000 Kč. Srovnatelná Octavia 1.5 TSI stojí cca 580 000–650 000 Kč.
              Premium za elektromobil je tedy v nejlepším případě 30 000–50 000 Kč (MG4 vs. levnější
              benzínové auto), v horším 200 000–300 000 Kč (Enyaq vs. střední třída).
            </Typography>

            <DataTable
              caption="Bod zvratu (break-even) – kdy se investice do EV vrátí"
              headers={['Scénář', 'Roční úspora', 'Premium za EV', 'Break-even']}
              rows={[
                ['MG4 EV vs. kompaktní benzín (nízký premium)', '~38 600 Kč', '~30 000–50 000 Kč', '1–2 roky'],
                ['MG4 EV vs. Octavia (střední premium)', '~38 600 Kč', '~80 000 Kč', '~2 roky'],
                ['Enyaq vs. Octavia (vysoký premium)', '~38 600 Kč', '~230 000 Kč', '~6 let'],
                ['Enyaq + veřejné nabíjení', '~17 000 Kč', '~230 000 Kč', '~13–14 let'],
              ]}
            />

            <Typography variant="body1" paragraph sx={{ lineHeight: 1.85 }}>
              Z tabulky jasně plyne: <strong>klíčem je pořizovací cena a způsob nabíjení</strong>.
              Pokud máte možnost domácího nabíjení a vyberete cenově dostupný elektromobil
              (MG4, Citroën ë-C3 za cca 500 000 Kč, připravovaný VW ID.2 nebo BYD Atto 2),
              návratnost může nastat již za 2–3 roky. U prémiovějších modelů
              bez dotace a s převahou veřejného nabíjení se break-even prodlužuje na 7–10 let.
            </Typography>

            {/* ===== 4. Situace v ČR ===== */}
            <SectionHeading icon={ElectricCarIcon} color="#6a1b9a">
              Česká specifika: proč jsme pozadu za zbytkem EU
            </SectionHeading>

            <Typography variant="body1" paragraph sx={{ lineHeight: 1.85 }}>
              ČR je v přechodu na elektromobilitu oproti Německu nebo Francii stále pozadu.
              Hlavní důvody jsou strukturální:
            </Typography>

            <Box component="ul" sx={{ pl: 2.5, '& li': { mb: 1.5, lineHeight: 1.8 } }}>
              <li>
                <Typography variant="body1">
                  <strong>Žádné přímé státní dotace na nákup EV.</strong> Německo mělo program
                  Umweltprämie (až 6 000 EUR), Francie dodnes vyplácí bonus écologique.
                  V ČR dotace na soukromá EV de facto neexistují — výjimkou je program
                  pro firmy a omezeně Operační program Životní prostředí.
                </Typography>
              </li>
              <li>
                <Typography variant="body1">
                  <strong>Nižší průměrné mzdy.</strong> Při průměrné čisté mzdě cca 38 000 Kč
                  je 700 000 Kč za auto proporcionálně větší zátěží než v Německu (průměrná mzda ~2 800 EUR čistě).
                  Finanční bariéra vstupu je tak relativně vyšší.
                </Typography>
              </li>
              <li>
                <Typography variant="body1">
                  <strong>Hustota nabíječek roste, ale nestačí.</strong> Dle dat ERÚ měla ČR
                  na konci roku 2025 přes 5 000 veřejných dobíjecích bodů. To je výrazný
                  nárůst, ale stále méně než v Nizozemsku nebo Norsku na srovnatelnou plochu.
                  Pro majitele bez garáže je nabíjení stále logistická komplikace.
                </Typography>
              </li>
              <li>
                <Typography variant="body1">
                  <strong>Elektrická síť a ceny energie.</strong> Česká republika má díky
                  jadernému mixu relativně stabilní ceny elektřiny, ale ani u nás noční
                  tarif není dostupný všem nájemníkům nebo majitelům bytů bez vlastního
                  parkovacího místa.
                </Typography>
              </li>
            </Box>

            <Typography variant="body1" paragraph sx={{ lineHeight: 1.85 }}>
              I přesto zaznamenal trh s EV v dubnu 2026 rekordní prodeje — nové i dovezené
              elektromobily dosáhly historicky nejvyšších hodnot. Cenově dostupné modely
              jako MG4, BYD Atto 2 a brzy Citroën ë-C3 začínají bourávat cenovou bariéru.
            </Typography>

            {/* ===== 5. Závěr ===== */}
            <SectionHeading icon={TrendingDownIcon} color="#1565c0">
              Shrnutí: pro koho elektromobil dává smysl dnes?
            </SectionHeading>

            <Typography variant="body1" paragraph sx={{ lineHeight: 1.85 }}>
              Na základě čísel výše lze říci, že elektromobil se dnes v ČR vyplatí zejména:
            </Typography>

            <Box component="ol" sx={{ pl: 2.5, '& li': { mb: 1.5, lineHeight: 1.8 } }}>
              <li><Typography variant="body1"><strong>Majitelům domu nebo garáže</strong> s možností noční instalace wallboxu (investice 15 000–30 000 Kč jednorázově).</Typography></li>
              <li><Typography variant="body1"><strong>Řidičům s vyšším nájezdem</strong> (20 000+ km ročně) — úspora roste lineárně s kilometry.</Typography></li>
              <li><Typography variant="body1"><strong>Kupujícím cenově dostupných modelů</strong> (MG4, ë-C3, BYD) oproti novému benzínovému autu ve stejné cenové kategorii.</Typography></li>
              <li><Typography variant="body1"><strong>Firmám a OSVČ,</strong> kteří mohou uplatnit odpisy, DPH a mají přístup k firemním dobíjecím programům.</Typography></li>
            </Box>

            <Typography variant="body1" paragraph sx={{ lineHeight: 1.85 }}>
              Naopak, pro řidiče žijící v bytě bez garáže, sporadicky projíždějícího méně
              než 10 000 km ročně a nakupujícího prémiový EV model, se čísla stále nevychází.
              V takovém případě je racionálnější vyčkat dalšího poklesu cen baterií — ten
              přijde, výrobní náklady baterií klesají zhruba o 10 % ročně.
            </Typography>

            <Callout color="#1565c0">
              Ceny benzínu a nafty v ČR pravděpodobně neklesnou pod 32 Kč/litr v příštích
              5 letech. Elektromobily naopak budou každým rokem cenově dostupnější. Okno pro
              ekonomicky výhodný přechod se každým rokem otevírá trochu více — ale ne
              pro všechny stejně.
            </Callout>

            <Typography variant="body2" color="text.secondary" sx={{ mt: 4, lineHeight: 1.8 }}>
              <strong>Chcete si to spočítat pro svůj případ?</strong> Na mzda-dane.cz najdete
              kalkulačku <Box component="span" sx={{ cursor: 'pointer', color: '#00897b', textDecoration: 'underline' }} onClick={() => router.push('/ev-vs-spalovak')}>EV vs. benzín/nafta</Box>,
              která porovná skutečné roční náklady na základě vašeho nájezdu, cen energie
              a konkrétního vozu. Výsledek dostanete do 30 sekund.
            </Typography>

            {/* Autor */}
            <Divider sx={{ mt: 5, mb: 3 }} />
            <Box display="flex" alignItems="flex-start" gap={2}>
              <Box sx={{ width: 48, height: 48, borderRadius: '50%', bgcolor: '#e8eaf6', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <PersonIcon sx={{ color: '#3949ab', fontSize: 26 }} />
              </Box>
              <Box>
                <Typography variant="subtitle2" fontWeight={800}>Vlastimil Votruba</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                  Autor a zakladatel mzda-dane.cz. Provozuje VOV Software se zaměřením na
                  praktické finanční nástroje pro český trh. Nadšenec do nových technologií
                  s dūrazem na data a konkrétní čísla.
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
