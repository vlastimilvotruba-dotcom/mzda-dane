import Head from 'next/head'
import { useRouter } from 'next/router'
import { Container, Box } from '@mui/material'
import Header from '../components/Header'
import AboutPage from '../components/AboutPage/AboutPage'
import Footer from '../components/Footer/Footer'

export default function AboutPageRoute() {
  const router = useRouter()
  return (
    <>
      <Head>
        <title>O webu – Mzda a daně</title>
        <meta name="description" content="Informace o webu mzda-dane.cz – jednoduché a přehledné kalkulačky pro mzdu a daně v České republice." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://mzda-dane.cz/about/" />
      </Head>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Header />
        <Box mt={4} display="flex" justifyContent="center">
          <Box sx={{ width: '100%', maxWidth: 800 }}>
            <AboutPage />
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
