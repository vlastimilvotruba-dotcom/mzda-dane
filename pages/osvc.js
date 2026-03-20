import Head from 'next/head'
import { useRouter } from 'next/router'
import { Container, Box, Typography } from '@mui/material'
import Header from '../components/Header'
import Footer from '../components/Footer/Footer'
import CalcTitle from '../components/CalcTitle'

export default function OsvcPage() {
  const router = useRouter()
  return (
    <>
      <Head>
        <title>OSVČ kalkulačka – Mzda a daně</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Header showBack subtitle="Výpočet odvodů a daní pro osoby samostatně výdělečně činné." />
        <Box mt={4} display="flex" justifyContent="center">
          <Box sx={{ width: '100%', maxWidth: 800, bgcolor: '#f3e5f555', borderRadius: 2, p: { xs: 2, sm: 3 }, boxShadow: 2 }}>
            <CalcTitle id="self-employed" title="OSVČ – Paušální daň" />
            <Typography variant="body1" color="text.secondary" paragraph>
              Tato kalkulačka je aktuálně ve vývoji a bude brzy dostupná. Mezitím můžete využít naši kalkulačku čisté mzdy 2026.
            </Typography>
            <Typography variant="body1" color="text.secondary" gutterBottom>
              Chystáme výpočty pro:
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75, mt: 1 }}>
              <Typography variant="body2" color="text.secondary">Výpočet odvodů OSVČ na sociální a zdravotní pojištění</Typography>
              <Typography variant="body2" color="text.secondary">Paušální daň a podmínky pro její uplatnění</Typography>
              <Typography variant="body2" color="text.secondary">Srovnání paušálních výdajů vs. skutečných nákladů</Typography>
            </Box>
          </Box>
        </Box>
        <Footer onNavigate={(page) => router.push(page)} />
      </Container>
    </>
  )
}

export async function getStaticProps() {
  return { props: {} }
}
