import Head from 'next/head'
import { useRouter } from 'next/router'
import { Container, Box } from '@mui/material'
import Header from '../components/Header'
import OsvcWizard from '../components/OSVC/OsvcWizard'
import OsvcContent from '../components/PageContent/OsvcContent'
import AdSlot from '../components/Ads/AdSlot'
import Footer from '../components/Footer/Footer'
import CalcTitle from '../components/CalcTitle'

export default function OsvcPage() {
  const router = useRouter()

  return (
    <>
      <Head>
        <title>OSVČ kalkulačka 2025 – daň, sociální a zdravotní pojištění</title>
        <meta
          name="description"
          content="Výpočet daně z příjmů, sociálního a zdravotního pojištění pro OSVČ za rok 2025 včetně orientačního srovnání s paušální daní."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://mzda-dane.cz/osvc/" />
        <meta property="og:title" content="OSVČ kalkulačka 2025" />
        <meta property="og:description" content="Spočítejte daň z příjmů, sociální a zdravotní pojištění pro OSVČ za rok 2025. Porovnání s paušální daní – zdarma." />
        <meta property="og:url" content="https://mzda-dane.cz/osvc" />
        <meta property="og:locale" content="cs_CZ" />
        <meta property="og:image" content="https://mzda-dane.cz/og-image.svg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "Co je pro OSV\u010c v\u00fdhodn\u011bj\u0161\u00ed \u2013 skute\u010dn\u00e9 v\u00fddaje, v\u00fddajov\u00fd pau\u0161\u00e1l nebo pau\u0161\u00e1ln\u00ed da\u0148?",
              "acceptedAnswer": { "@type": "Answer", "text": "Z\u00e1le\u017e\u00ed na pom\u011bru p\u0159\u00edjm\u016f a n\u00e1klad\u016f a na tom, zda uplat\u0148ujete slevy na d\u011bti. V\u00fddajov\u00fd pau\u0161\u00e1l b\u00fdv\u00e1 v\u00fdhodn\u00fd p\u0159i ni\u017e\u0161\u00edch re\u00e1ln\u00fdch n\u00e1kladech, zat\u00edmco pau\u0161\u00e1ln\u00ed da\u0148 je zaj\u00edmav\u00e1 kv\u016fli jednoduchosti a ni\u017e\u0161\u00edm odvod\u016fm v n\u011bkter\u00fdch situac\u00edch." }
            },
            {
              "@type": "Question",
              "name": "Kdy neplat\u00edm soci\u00e1ln\u00ed poji\u0161t\u011bn\u00ed u vedlej\u0161\u00ed OSV\u010c?",
              "acceptedAnswer": { "@type": "Answer", "text": "Pokud byl zisk z vedlej\u0161\u00ed samostatn\u00e9 \u010dinnosti za rok 2025 ni\u017e\u0161\u00ed ne\u017e rozhodn\u00e1 \u010d\u00e1stka 111\u00a0736\u00a0K\u010d (p\u0159\u00edpadn\u011b pom\u011brn\u011b kr\u00e1cen\u00e1 p\u0159i krat\u0161\u00ed dob\u011b podnik\u00e1n\u00ed), povinn\u00e9 soci\u00e1ln\u00ed poji\u0161t\u011bn\u00ed za dan\u00fd rok nevznik\u00e1." }
            },
            {
              "@type": "Question",
              "name": "Jak\u00e1 jsou p\u00e1sma pau\u0161\u00e1ln\u00ed dan\u011b v roce 2025?",
              "acceptedAnswer": { "@type": "Answer", "text": "1. p\u00e1smo: 8\u00a0716\u00a0K\u010d/m\u011bs\u00edcn\u011b (p\u0159\u00edjmy do 1\u00a0000\u00a0000\u00a0K\u010d). 2. p\u00e1smo: 16\u00a0745\u00a0K\u010d/m\u011bs\u00edc. 3. p\u00e1smo: 27\u00a0139\u00a0K\u010d/m\u011bs\u00edc. Do pau\u0161\u00e1ln\u00edho re\u017eimu nelze vstoupit jako pl\u00e1tce DPH nebo p\u0159i sou\u010dasn\u00fdch p\u0159\u00edjmech ze z\u00e1visl\u00e9 \u010dinnosti nad z\u00e1konn\u00fd limit." }
            },
            {
              "@type": "Question",
              "name": "Mus\u00ed OSV\u010c v pau\u0161\u00e1ln\u00edm re\u017eimu pod\u00e1vat da\u0148ov\u00e9 p\u0159izn\u00e1n\u00ed?",
              "acceptedAnswer": { "@type": "Answer", "text": "Ne \u2013 to je hlavn\u00ed v\u00fdhoda pau\u0161\u00e1ln\u00edho re\u017eimu. OSV\u010c, kter\u00e1 spln\u011bni podm\u00ednky a \u0159\u00e1dn\u011b platila m\u011bs\u00ed\u010dn\u00ed z\u00e1lohy, nepod\u00e1v\u00e1 da\u0148ov\u00e9 p\u0159izn\u00e1n\u00ed, p\u0159ehled pro \u010cSSZ ani p\u0159ehled pro zdravotn\u00ed poji\u0161\u0165ovnu." }
            },
            {
              "@type": "Question",
              "name": "Jak spo\u010d\u00edt\u00e1m v\u00fddajov\u00fd pau\u0161\u00e1l?",
              "acceptedAnswer": { "@type": "Answer", "text": "V\u00fddajov\u00fd pau\u0161\u00e1l je 80\u00a0% pro zemn\u011bln\u00e9 a \u0159emesln\u00e9 \u017eivnosti (max. 1\u00a0600\u00a0000\u00a0K\u010d), 60\u00a0% pro ostatn\u00ed \u017eivnosti (max. 1\u00a0200\u00a0000\u00a0K\u010d), 40\u00a0% pro svobodn\u00e1 povol\u00e1n\u00ed jako l\u00e9ka\u0159i nebo advo\u00e1ti (max. 800\u00a0000\u00a0K\u010d) a 30\u00a0% z p\u0159\u00edjm\u016f z pron\u00e1jmu (max. 600\u00a0000\u00a0K\u010d)." }
            }
          ]
        }) }} />
      </Head>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Header showBack subtitle="Výpočet daně, sociálního a zdravotního pojištění OSVČ podle pravidel pro rok 2025." />

        <Box mt={4}>
          <Box mb={2}><AdSlot id="osvc-top" position="top" /></Box>
          <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} gap={2} justifyContent="center">
            <Box sx={{ width: '100%', maxWidth: 800, bgcolor: '#f3e5f555', borderRadius: 2, p: { xs: 2, sm: 3 }, boxShadow: 2, alignSelf: 'flex-start' }}>
              <CalcTitle id="self-employed" title="OSVČ – daň a odvody 2025" />
              <OsvcWizard />
            </Box>
            <Box sx={{ width: { xs: '100%', md: 300 }, flexShrink: 0 }}>
              <AdSlot id="osvc-side" position="side" />
            </Box>
          </Box>
          <Box mt={2}><AdSlot id="osvc-bottom" position="bottom" /></Box>
        </Box>

        <OsvcContent />
        <Footer onNavigate={(page) => router.push(page)} />
      </Container>
    </>
  )
}

export async function getStaticProps() {
  return { props: {} }
}
