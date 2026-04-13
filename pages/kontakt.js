import Head from 'next/head'
import { useRouter } from 'next/router'
import { Container, Box } from '@mui/material'
import Header from '../components/Header'
import ContactPage from '../components/ContactPage/ContactPage'
import Footer from '../components/Footer/Footer'

export default function KontaktPage() {
  const router = useRouter()
  return (
    <>
      <Head>
        <title>Kontakt – Mzda a daně</title>
        <meta name="description" content="Kontaktujte nás na vov.software@gmail.com. Dotazy k výpočtům, hlášení chyb nebo návrhy na nové funkce kalkulaček mzda-dane.cz." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://mzda-dane.cz/kontakt/" />
        <meta property="og:title" content="Kontakt – Mzda a daně" />
        <meta property="og:description" content="Kontaktujte nás e-mailem. Dotazy k výpočtům mezd a daní, hlášení chyb nebo návrhy na nové funkce." />
        <meta property="og:url" content="https://mzda-dane.cz/kontakt" />
        <meta property="og:locale" content="cs_CZ" />
      </Head>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Header showBack />
        <Box mt={4} display="flex" justifyContent="center">
          <Box sx={{ width: '100%', maxWidth: 800 }}>
            <ContactPage />
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
