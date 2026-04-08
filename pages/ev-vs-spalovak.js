import Head from 'next/head'
import { useRouter } from 'next/router'
import { Container, Box } from '@mui/material'
import Header from '../components/Header'
import EVCalculator from '../components/EVCalculator/EVCalculator'
import AdSlot from '../components/Ads/AdSlot'
import EVContent from '../components/PageContent/EVContent'
import Footer from '../components/Footer/Footer'
import CalcTitle from '../components/CalcTitle'

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Kolik stojí 1 km jízdy elektroautem?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Při běžné spotřebě 15 až 18 kWh/100 km a domácí ceně elektřiny 4,5 až 5 Kč/kWh vychází náklad přibližně na 0,70 až 0,90 Kč za 1 km. U veřejného rychlonabíjení může být cena vyšší.',
      },
    },
    {
      '@type': 'Question',
      name: 'Vyplatí se EV oproti benzínu a naftě?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Z provozního hlediska bývá EV při domácím nabíjení často nejlevnější. O výhodnosti rozhoduje hlavně roční nájezd, spotřeba, cena elektřiny a podíl veřejného nabíjení.',
      },
    },
    {
      '@type': 'Question',
      name: 'Je veřejné nabíjení dražší než domácí?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ano. Domácí nabíjení je obvykle nejlevnější, často 4,5 až 6 Kč/kWh. Veřejné AC nabíjení bývá 6 až 9 Kč/kWh a rychlé DC nabíjení 8 až 14 Kč/kWh.',
      },
    },
    {
      '@type': 'Question',
      name: 'Počítá kalkulačka i pořizovací cenu auta?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ne. Tato kalkulačka porovnává jen roční provozní náklady a náklady na 1 km. Nezohledňuje pořizovací cenu, servis, pojištění ani ztrátu hodnoty vozu.',
      },
    },
    {
      '@type': 'Question',
      name: 'Jak moc zvyšuje zima spotřebu EV?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'V zimě může spotřeba elektroauta vzrůst přibližně o 10 až 30 procent kvůli vytápění kabiny a chladnějším bateriím. Pro zimní scénář je vhodné v kalkulačce navýšit spotřebu o 2 až 4 kWh na 100 km.',
      },
    },
  ],
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Úvod', item: 'https://mzda-dane.cz/' },
    { '@type': 'ListItem', position: 2, name: 'EV vs. spalovací motor', item: 'https://mzda-dane.cz/ev-vs-spalovak' },
  ],
}

export default function EVPage() {
  const router = useRouter()
  return (
    <>
      <Head>
        <title>Kalkulačka EV vs. benzín/nafta 2026 – náklady na 1 km | Mzda a daně</title>
        <meta name="description" content="Porovnejte provozní náklady elektroauta, benzínu a dieselu. Kalkulačka spočítá roční náklady i cenu za 1 km podle spotřeby a cen energií v ČR." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://mzda-dane.cz/ev-vs-spalovak" />
        <meta property="og:title" content="Kalkulačka EV vs. benzín/nafta 2026" />
        <meta property="og:description" content="Spočítejte si cenu za 1 km a roční náklady elektroauta, benzínu a dieselu. Přehledné srovnání zdarma." />
        <meta property="og:url" content="https://mzda-dane.cz/ev-vs-spalovak" />
        <meta property="og:locale" content="cs_CZ" />
        <meta property="og:image" content="https://mzda-dane.cz/og-image.svg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      </Head>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Header showBack subtitle="Porovnání provozních nákladů elektroauta, benzínu a nafty podle ročního nájezdu." />
        <Box mt={4}>
          <Box mb={2}><AdSlot id="ev-top" position="top" /></Box>
          <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} gap={2} justifyContent="center">
            <Box sx={{ width: '100%', maxWidth: 800, bgcolor: '#e0f2f155', borderRadius: 2, p: { xs: 2, sm: 3 }, boxShadow: 2, alignSelf: 'flex-start' }}>
              <CalcTitle id="ev" title="Kalkulačka EV vs. benzín/nafta" />
              <EVCalculator />
            </Box>
            <Box sx={{ width: { xs: '100%', md: 300 }, flexShrink: 0 }}>
              <AdSlot id="ev-side" position="side" />
            </Box>
          </Box>
          <Box mt={2}><AdSlot id="ev-bottom" position="bottom" /></Box>
        </Box>
        <EVContent />
        <Footer onNavigate={(page) => router.push(page)} />
      </Container>
    </>
  )
}

export async function getStaticProps() {
  return { props: {} }
}
