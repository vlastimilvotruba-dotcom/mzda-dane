import Head from 'next/head'
import { useRouter } from 'next/router'
import { Container, Box } from '@mui/material'
import Header from '../components/Header'
import PrivacyPolicy from '../components/PrivacyPolicy/PrivacyPolicy'
import Footer from '../components/Footer/Footer'

export default function PrivacyPage() {
  const router = useRouter()
  return (
    <>
      <Head>
        <title>Ochrana soukromí – Mzda a daně</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Header showBack />
        <Box mt={4} display="flex" justifyContent="center">
          <Box sx={{ width: '100%', maxWidth: 800 }}>
            <PrivacyPolicy />
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
