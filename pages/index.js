import Head from 'next/head'
import { useRouter } from 'next/router'
import { Container, Box } from '@mui/material'
import Header from '../components/Header'
import CalculatorTiles from '../components/CalculatorTiles/CalculatorTiles'
import HomeContent from '../components/HomeContent/HomeContent'
import AdSlot from '../components/Ads/AdSlot'
import Footer from '../components/Footer/Footer'

const siteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Mzda a dan\u011b',
  url: 'https://mzda-dane.cz',
  description: 'Kalkulačky pro výpočet čisté mzdy, ročního zdanění, OSVČ odvodů, návratnosti fotovoltaiky a srovnání EV vs. benzín/nafta.',
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://mzda-dane.cz/?q={search_term_string}',
    'query-input': 'required name=search_term_string',
  },
}

const sitelinksSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Kalkulačky na mzda-dane.cz',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Čistá mzda 2026', url: 'https://mzda-dane.cz/cista-mzda' },
    { '@type': 'ListItem', position: 2, name: 'Roční daně zaměstnance', url: 'https://mzda-dane.cz/rocni-dane' },
    { '@type': 'ListItem', position: 3, name: 'OSVČ – daň a odvody', url: 'https://mzda-dane.cz/osvc' },
    { '@type': 'ListItem', position: 4, name: 'Kalkulačka půjčky', url: 'https://mzda-dane.cz/pujcka' },
    { '@type': 'ListItem', position: 5, name: 'Návratnost FVE 2026', url: 'https://mzda-dane.cz/navratnost-fve' },
    { '@type': 'ListItem', position: 6, name: 'EV vs. benzín/nafta', url: 'https://mzda-dane.cz/ev-vs-spalovak' },
  ],
}

export default function HomePage() {
  const router = useRouter()
  return (
    <>
      <Head>
        <title>Mzda a daně – kalkulačky mezd, daní, FVE a EV 2026</title>
        <meta name="description" content="Kalkulačky pro čistou mzdu 2026, roční daně, OSVČ odvody, návratnost FVE a srovnání EV vs. benzín/nafta. Vše zdarma, bez registrace." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://mzda-dane.cz/" />
        <meta property="og:title" content="Mzda a daně – kalkulačky mezd, daní, FVE a EV 2026" />
        <meta property="og:description" content="Čistá mzda, roční zdanění, OSVČ, půjčka, návratnost FVE i EV vs. benzín/nafta. Jednoduché kalkulačky zdarma." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://mzda-dane.cz" />
        <meta property="og:locale" content="cs_CZ" />
        <meta property="og:image" content="https://mzda-dane.cz/og-image.svg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(siteSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(sitelinksSchema) }} />
      </Head>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Header description="Kalkulačky mezd, daní a odvodů pro rok 2026 · Zdarma" />
        <CalculatorTiles />
        <Box mt={3} mb={3}>
          <AdSlot id="home-bottom" position="bottom" />
        </Box>
        <HomeContent />
        <Footer onNavigate={(page) => router.push(page)} />
      </Container>
    </>
  )
}

export async function getStaticProps() {
  return { props: {} }
}
