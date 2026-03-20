import Head from 'next/head'
import { useRouter } from 'next/router'
import { Container, Box } from '@mui/material'
import Header from '../components/Header'
import CalculatorTiles from '../components/CalculatorTiles/CalculatorTiles'
import HomeContent from '../components/HomeContent/HomeContent'
import AdSlot from '../components/Ads/AdSlot'
import Footer from '../components/Footer/Footer'

export default function HomePage() {
  const router = useRouter()
  return (
    <>
      <Head>
        <title>Mzda a daně – kalkulačky pro mzdu a daně v ČR</title>
        <meta name="description" content="Jednoduché kalkulačky pro mzdu a daně v ČR. Výpočet čisté mzdy 2026, kalkulačka půjčky, roční zúčtování daně zaměstnance a OSVČ paušální daň." />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Mzda a daně – kalkulačky pro mzdu a daně v ČR" />
        <meta property="og:description" content="Výpočet čisté mzdy 2026, kalkulačka půjčky, roční zúčtování daní. Jednoduché a přehledné kalkulačky zdarma." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://mzda-dane.cz" />
        <meta property="og:locale" content="cs_CZ" />
      </Head>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Header showBack={false} />
        <CalculatorTiles />
        <Box mt={2}>
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
