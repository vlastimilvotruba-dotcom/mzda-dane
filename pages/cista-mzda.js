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
        <link rel="canonical" href="https://mzda-dane.cz/cista-mzda/" />
        <meta property="og:title" content="Kalkulačka čisté mzdy 2026" />
        <meta property="og:description" content="Výpočet čisté mzdy zaměstnance včetně sociálního, zdravotního pojištění a daně z příjmů. Zohledňuje slevy na děti, invaliditu i DPP/DPČ." />
        <meta property="og:url" content="https://mzda-dane.cz/cista-mzda" />
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
              "name": "Jak\u00fd je rozd\u00edl mezi HPP, DPP a DP\u010c?",
              "acceptedAnswer": { "@type": "Answer", "text": "HPP (hlavn\u00ed pracovn\u00ed pom\u011br) je standardn\u00ed pracovn\u00ed smlouva s pln\u00fdmi odvody. DPP (dohoda o proveden\u00ed pr\u00e1ce) \u2013 do 11\u00a0999\u00a0K\u010d m\u011bs\u00ed\u010dn\u011b u jednoho zam\u011bstnavatele se neplat\u00ed soci\u00e1ln\u00ed ani zdravotn\u00ed poji\u0161t\u011bn\u00ed. DP\u010c (dohoda o pracovn\u00ed \u010dinnosti) m\u00e1 limit pro osvobozen\u00ed od odvod\u016f do 4\u00a0499\u00a0K\u010d m\u011bs\u00ed\u010dn\u011b." }
            },
            {
              "@type": "Question",
              "name": "Jak\u00e1 je minim\u00e1ln\u00ed mzda v roce 2026?",
              "acceptedAnswer": { "@type": "Answer", "text": "Minim\u00e1ln\u00ed hrub\u00e1 mzda v roce 2026 \u010din\u00ed 20\u00a0800\u00a0K\u010d m\u011bs\u00ed\u010dn\u011b (pln\u00fd pracovn\u00ed \u00favazek 40 hodin t\u00fddenn\u011b). Hodinov\u00e1 minim\u00e1ln\u00ed mzda je 124,40 K\u010d. Zam\u011bstnavatel nesm\u00ed vyplatit mzdu ni\u017e\u0161\u00ed, ne\u017e je tento z\u00e1konn\u00fd limit." }
            },
            {
              "@type": "Question",
              "name": "Co je da\u0148ov\u00fd bonus na d\u011bti?",
              "acceptedAnswer": { "@type": "Answer", "text": "Pokud da\u0148ov\u00e9 zv\u00fdhodn\u011bn\u00ed na d\u011bti p\u0159es\u00e1hne vypo\u010dtenou da\u0148, vznik\u00e1 da\u0148ov\u00fd bonus \u2013 st\u00e1t zam\u011bstnanci rozd\u00edl vyplat\u00ed. \u010cist\u00e1 mzda m\u016f\u017ee b\u00fdt d\u00edky da\u0148ov\u00e9mu bonusu vy\u0161\u0161\u00ed ne\u017e hrub\u00e1. N\u00e1rok na bonus vznik\u00e1 p\u0159i minim\u00e1ln\u00edm p\u0159\u00edjmu 4\u00a0500\u00a0K\u010d m\u011bs\u00ed\u010dn\u011b." }
            },
            {
              "@type": "Question",
              "name": "Kolik odv\u00e1d\u00ed zam\u011bstnavatel nav\u00edc nad r\u00e1mec hrub\u00e9 mzdy?",
              "acceptedAnswer": { "@type": "Answer", "text": "Zam\u011bstnavatel odv\u00e1d\u00ed za zam\u011bstnance 25\u00a0% na soci\u00e1ln\u00ed poji\u0161t\u011bn\u00ed a 9\u00a0% na zdravotn\u00ed poji\u0161t\u011bn\u00ed z hrub\u00e9 mzdy. Celkov\u00e9 mzdov\u00e9 n\u00e1klady na zam\u011bstnance s hrubou mzdou 40\u00a0000\u00a0K\u010d dosahuji p\u0159ibli\u017en\u011b 53\u00a0680\u00a0K\u010d m\u011bs\u00ed\u010dn\u011b." }
            },
            {
              "@type": "Question",
              "name": "Kdy mus\u00edm jako zam\u011bstnanec podat da\u0148ov\u00e9 p\u0159izn\u00e1n\u00ed s\u00e1m?",
              "acceptedAnswer": { "@type": "Answer", "text": "Da\u0148ov\u00e9 p\u0159izn\u00e1n\u00ed mus\u00edte podat sami, pokud jste m\u011bli sou\u010dasn\u00e9 p\u0159\u00edjmy od v\u00edce zam\u011bstnavatel\u016f, vedlej\u0161\u00ed p\u0159\u00edjmy p\u0159esahuj\u00edc\u00ed 20\u00a0000\u00a0K\u010d nebo p\u0159\u00edjmy ze zahrani\u010d\u00ed. Term\u00edn vlastn\u00edho pod\u00e1n\u00ed je 1. dubna 2026, p\u0159i pod\u00e1n\u00ed p\u0159es da\u0148ov\u00e9ho poradce 1. \u010dervence 2026." }
            }
          ]
        }) }} />
      </Head>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Header subtitle="Výpočet čisté mzdy zaměstnance včetně odvodů a daňových slev." />
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
