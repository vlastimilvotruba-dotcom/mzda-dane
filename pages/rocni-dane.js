import Head from 'next/head'
import { useRouter } from 'next/router'
import { Container, Box } from '@mui/material'
import Header from '../components/Header'
import AnnualTaxWizard from '../components/AnnualTax/AnnualTaxWizard'
import AdSlot from '../components/Ads/AdSlot'
import AnnualTaxContent from '../components/PageContent/AnnualTaxContent'
import Footer from '../components/Footer/Footer'
import CalcTitle from '../components/CalcTitle'

export default function AnnualTaxPage() {
  const router = useRouter()
  return (
    <>
      <Head>
        <title>Roční zúčtování daně 2026 – Mzda a daně</title>
        <meta name="description" content="Výpočet přeplatku nebo nedoplatku daně z příjmu zaměstnance. Roční zúčtování daně 2026 zdarma." />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Roční zúčtování daně 2026" />
        <meta property="og:url" content="https://mzda-dane.cz/rocni-dane" />
      </Head>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Header showBack subtitle="Výpočet přeplatku nebo nedoplatku daně z příjmu zaměstnance." />
        <Box mt={4}>
          <Box mb={2}><AdSlot id="annual-top" position="top" /></Box>
          <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} gap={2} justifyContent="center">
            <Box sx={{ width: '100%', maxWidth: 800, bgcolor: '#fff3e055', borderRadius: 2, p: { xs: 2, sm: 3 }, boxShadow: 2, alignSelf: 'flex-start' }}>
              <CalcTitle id="annual-tax" title="Roční zúčtování daně 2026" />
              <AnnualTaxWizard onBack={() => router.push('/')} />
            </Box>
            <Box sx={{ width: { xs: '100%', md: 300 }, flexShrink: 0 }}>
              <AdSlot id="annual-side" position="side" />
            </Box>
          </Box>
          <Box mt={2}><AdSlot id="annual-bottom" position="bottom" /></Box>
        </Box>
        <AnnualTaxContent />
        <Footer onNavigate={(page) => router.push(page)} />
      </Container>
    </>
  )
}

export async function getStaticProps() {
  return { props: {} }
}
