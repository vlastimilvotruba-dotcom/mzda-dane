import Head from 'next/head'
import { useRouter } from 'next/router'
import { Container, Box } from '@mui/material'
import Header from '../components/Header'
import FVECalculator from '../components/FVECalculator/FVECalculator'
import AdSlot from '../components/Ads/AdSlot'
import FVEContent from '../components/PageContent/FVEContent'
import Footer from '../components/Footer/Footer'
import CalcTitle from '../components/CalcTitle'

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Kolik elektřiny FVE reálně vyrobí?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'V České republice se počítá průměrně 950–1 100 kWh za rok na každý 1 kWp instalovaného výkonu. Záleží na orientaci střechy, sklonu (30–35° je optimum) a zastínění.',
      },
    },
    {
      '@type': 'Question',
      name: 'Jaká je dotace z Nové zelené úsporám na FVE?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'FVE bez baterie: až 50 000 Kč. FVE s baterií: 100 000 Kč základ + 30 000 Kč za každý kWh baterie nad 4 kWh, maximálně 200 000 Kč. Pro nízkopříjmové domácnosti existuje NZÚ Light s dotací až 100 % nákladů.',
      },
    },
    {
      '@type': 'Question',
      name: 'Jak dlouho trvá návratnost fotovoltaiky?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Při dotaci NZÚ a průměrné spotřebě vychází návratnost 8–12 let. Bez dotace 12–16 let. Záleží na výkonu systému, ceně elektřiny a podílu vlastní spotřeby.',
      },
    },
    {
      '@type': 'Question',
      name: 'Musím mít stavební povolení na FVE na rodinném domě?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'FVE do 50 kWp na rodinném domě nevyžaduje stavební povolení ani ohlášení. Stačí oznámení distribuční soustavě (ČEZ, E.ON, PRE), která musí do 30 dnů potvrdit připojení.',
      },
    },
    {
      '@type': 'Question',
      name: 'Musím přiznat příjmy z prodeje přebytků ze FVE?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Pokud prodáte přebytky za méně než 30 000 Kč ročně, příjem je od daně osvobozen. Nad 30 000 Kč je nutno uvést do daňového přiznání jako ostatní příjmy.',
      },
    },
  ],
}

export default function FVEPage() {
  const router = useRouter()
  return (
    <>
      <Head>
        <title>Kalkulačka návratnosti FVE 2026 – fotovoltaika zdarma | Mzda a daně</title>
        <meta name="description" content="Spočítejte dobu návratnosti fotovoltaické elektrárny. Zadejte výkon, cenu instalace a dotaci NZÚ – výsledek okamžitě. Kalkulačka FVE 2026 zdarma." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://mzda-dane.cz/navratnost-fve/" />
        <meta property="og:title" content="Kalkulačka návratnosti FVE 2026 – fotovoltaika" />
        <meta property="og:description" content="Spočítejte návratnost fotovoltaiky, výši dotace NZÚ a roční úsporu. Nezávislá kalkulačka FVE 2026 zdarma." />
        <meta property="og:url" content="https://mzda-dane.cz/navratnost-fve" />
        <meta property="og:locale" content="cs_CZ" />
        <meta property="og:image" content="https://mzda-dane.cz/og-image.svg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Úvod', item: 'https://mzda-dane.cz/' },
              { '@type': 'ListItem', position: 2, name: 'Kalkulačka návratnosti FVE', item: 'https://mzda-dane.cz/navratnost-fve' },
            ],
          }) }}
        />
      </Head>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Header showBack subtitle="Výpočet doby návratnosti, roční úspory a dotací pro fotovoltaickou elektrárnu." />
        <Box mt={4}>
          <Box mb={2}><AdSlot id="fve-top" position="top" /></Box>
          <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} gap={2} justifyContent="center">
            <Box sx={{ width: '100%', maxWidth: 800, bgcolor: '#fff8e155', borderRadius: 2, p: { xs: 2, sm: 3 }, boxShadow: 2, alignSelf: 'flex-start' }}>
              <CalcTitle id="fve" title="Kalkulačka návratnosti FVE" />
              <FVECalculator />
            </Box>
            <Box sx={{ width: { xs: '100%', md: 300 }, flexShrink: 0 }}>
              <AdSlot id="fve-side" position="side" />
            </Box>
          </Box>
          <Box mt={2}><AdSlot id="fve-bottom" position="bottom" /></Box>
        </Box>
        <FVEContent />
        <Footer onNavigate={(page) => router.push(page)} />
      </Container>
    </>
  )
}

export async function getStaticProps() {
  return { props: {} }
}
