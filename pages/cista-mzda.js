import Head from 'next/head'
import { useRouter } from 'next/router'
import { Container, Box } from '@mui/material'
import Header from '../components/Header'
import SalaryWizard from '../components/SalaryWizard/SalaryWizard'
import AdSlot from '../components/Ads/AdSlot'
import SalaryContent from '../components/PageContent/SalaryContent'
import Footer from '../components/Footer/Footer'
import CalcTitle from '../components/CalcTitle'

export default function SalaryPage() {
  const router = useRouter()
  return (
    <>
      <Head>
        <title>Kalkulačka čisté mzdy 2026 – Mzda a daně</title>
        <meta name="description" content="Výpočet čisté mzdy zaměstnance včetně odvodů a daňových slev. Kalkulačka mzdy 2026 zdarma." />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Kalkulačka čisté mzdy 2026" />
        <meta property="og:url" content="https://mzda-dane.cz/cista-mzda" />
      </Head>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Header showBack subtitle="Výpočet čisté mzdy zaměstnance včetně odvodů a daňových slev." />
        <Box mt={4}>
          <Box mb={2}><AdSlot id="salary-top" position="top" /></Box>
          <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} gap={2} justifyContent="center">
            <Box sx={{ width: '100%', maxWidth: 800, bgcolor: '#e3f2fd55', borderRadius: 2, p: { xs: 2, sm: 3 }, boxShadow: 2, alignSelf: 'flex-start' }}>
              <CalcTitle id="salary2026" title="Kalkulačka čisté mzdy 2026" />
              <SalaryWizard />
            </Box>
            <Box sx={{ width: { xs: '100%', md: 300 }, flexShrink: 0 }}>
              <AdSlot id="salary-side" position="side" />
            </Box>
          </Box>
          <Box mt={2}><AdSlot id="salary-bottom" position="bottom" /></Box>
        </Box>
        <SalaryContent />
        <Footer onNavigate={(page) => router.push(page)} />
      </Container>
    </>
  )
}

export async function getStaticProps() {
  return { props: {} }
}
