import Head from 'next/head'
import { useRouter } from 'next/router'
import { Container, Box } from '@mui/material'
import Header from '../components/Header'
import LoanCalculator from '../components/LoanCalculator/LoanCalculator'
import AdSlot from '../components/Ads/AdSlot'
import LoanContent from '../components/PageContent/LoanContent'
import Footer from '../components/Footer/Footer'
import CalcTitle from '../components/CalcTitle'

export default function LoanPage() {
  const router = useRouter()
  return (
    <>
      <Head>
        <title>Kalkulačka půjčky a hypotéky 2026 – Mzda a daně</title>
        <meta name="description" content="Výpočet měsíční splátky, celkových nákladů a doby splácení půjčky nebo hypotéky. Kalkulačka půjčky 2026 zdarma." />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Kalkulačka půjčky a hypotéky 2026" />
        <meta property="og:url" content="https://mzda-dane.cz/pujcka" />
      </Head>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Header showBack subtitle="Výpočet měsíční splátky, celkových nákladů a doby půjčky nebo hypotéky." />
        <Box mt={4}>
          <Box mb={2}><AdSlot id="loan-top" position="top" /></Box>
          <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} gap={2} justifyContent="center">
            <Box sx={{ width: '100%', maxWidth: 800, bgcolor: '#e8f5e955', borderRadius: 2, p: { xs: 2, sm: 3 }, boxShadow: 2, alignSelf: 'flex-start' }}>
              <CalcTitle id="loan" title="Kalkulačka půjčky" />
              <LoanCalculator />
            </Box>
            <Box sx={{ width: { xs: '100%', md: 300 }, flexShrink: 0 }}>
              <AdSlot id="loan-side" position="side" />
            </Box>
          </Box>
          <Box mt={2}><AdSlot id="loan-bottom" position="bottom" /></Box>
        </Box>
        <LoanContent />
        <Footer onNavigate={(page) => router.push(page)} />
      </Container>
    </>
  )
}

export async function getStaticProps() {
  return { props: {} }
}
