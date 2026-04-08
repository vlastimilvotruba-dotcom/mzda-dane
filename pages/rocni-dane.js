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
        <link rel="canonical" href="https://mzda-dane.cz/rocni-dane" />
        <meta property="og:title" content="Roční zúčtování daně 2026" />
        <meta property="og:description" content="Zjistěte, zda vám finanční úřad vrátí přeplatek nebo budete doplácet. Roční zúčtování daně zaměstnance za rok 2025 – zdarma." />
        <meta property="og:url" content="https://mzda-dane.cz/rocni-dane" />
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
              "name": "Do kdy mus\u00edm podat \u017e\u00e1dost o ro\u010dn\u00ed z\u00fa\u010dtov\u00e1n\u00ed?",
              "acceptedAnswer": { "@type": "Answer", "text": "\u017d\u00e1dost o ro\u010dn\u00ed z\u00fa\u010dtov\u00e1n\u00ed u zam\u011bstnavatele je nutn\u00e9 podat do 15. \u00fanora roku n\u00e1sleduj\u00edc\u00edho po zda\u0148ovac\u00edm obdob\u00ed. Pro rok 2026 tedy do 15. \u00fanora 2027. Zam\u011bstnavatel mus\u00ed z\u00fa\u010dtov\u00e1n\u00ed prov\u00e9st nejpozd\u011bji p\u0159i v\u00fdplat\u011b mzdy za b\u0159ezen." }
            },
            {
              "@type": "Question",
              "name": "Kdy vznik\u00e1 p\u0159eplatek na dani?",
              "acceptedAnswer": { "@type": "Answer", "text": "P\u0159eplatek vznik\u00e1, pokud z\u00e1lohy na da\u0148 sra\u017een\u00e9 zam\u011bstnavatelem v pr\u016fb\u011bhu roku p\u0159ev\u00fd\u0161ily skute\u010dnou ro\u010dn\u00ed da\u0148ovou povinnost. Nejb\u011b\u017en\u011bji nast\u00e1v\u00e1 p\u0159i uplatn\u011bn\u00ed nezdaniteln\u00fdch \u010d\u00e1st\u00ed z\u00e1kladu dan\u011b (hypot\u00e9ka, penzijn\u00ed spo\u0159en\u00ed), p\u0159i narozen\u00ed d\u00edt\u011bte nebo p\u0159i nerovnom\u011brn\u00fdch p\u0159\u00edjmech." }
            },
            {
              "@type": "Question",
              "name": "Jak vysok\u00fd odpo\u010det za penzijn\u00ed spo\u0159en\u00ed?",
              "acceptedAnswer": { "@type": "Answer", "text": "Odpo\u010det na penzijn\u00ed p\u0159ipoji\u0161t\u011bn\u00ed nebo dopl\u0148kov\u00e9 penzijn\u00ed spo\u0159en\u00ed tvo\u0159\u00ed \u010d\u00e1stka p\u0159esahuj\u00edc\u00ed 24\u00a0000\u00a0K\u010d ro\u010dn\u011b. Maxim\u00e1ln\u00ed odpo\u010det je 48\u00a0000\u00a0K\u010d ro\u010dn\u011b. P\u0159i ro\u010dn\u00edch platb\u00e1ch 72\u00a0000\u00a0K\u010d (6\u00a0000\u00a0K\u010d m\u011bs\u00ed\u010dn\u011b) ode\u010dtete 48\u00a0000\u00a0K\u010d ze z\u00e1kladu dan\u011b \u2013 da\u0148ov\u00e1 \u00faspora \u010din\u00ed 7\u00a0200\u00a0K\u010d." }
            },
            {
              "@type": "Question",
              "name": "Mohu uplatnit odpo\u010det za hypot\u00e9ku jako zam\u011bstnanec?",
              "acceptedAnswer": { "@type": "Answer", "text": "Ano. Zam\u011bstnanec m\u016f\u017ee uplatnit odpo\u010det \u00farok\u016f z hypot\u00e9ky nebo \u00fav\u011bru ze stavebn\u00edho spo\u0159en\u00ed a\u017e do v\u00fd\u0161e 150\u00a0000\u00a0K\u010d ro\u010dn\u011b. Odpo\u010det se uplat\u0148uje v ro\u010dn\u00edm z\u00fa\u010dtov\u00e1n\u00ed na z\u00e1klad\u011b potvrzen\u00ed od banky o zaplacen\u00fdch \u00farok\u016fch." }
            },
            {
              "@type": "Question",
              "name": "Jak\u00fd je rozd\u00edl mezi ro\u010dn\u00edm z\u00fa\u010dtov\u00e1n\u00edm a da\u0148ov\u00fdm p\u0159izn\u00e1n\u00edm?",
              "acceptedAnswer": { "@type": "Answer", "text": "Ro\u010dn\u00ed z\u00fa\u010dtov\u00e1n\u00ed prov\u00e1d\u00ed zam\u011bstnavatel za zam\u011bstnance \u2013 je jednodu\u0161\u0161\u00ed a bezplatn\u00e9. Da\u0148ov\u00e9 p\u0159izn\u00e1n\u00ed pod\u00e1v\u00e1 poplatn\u00edk s\u00e1m na finan\u010dn\u00ed \u00fa\u0159ad \u2013 je povinn\u00e9 p\u0159i p\u0159\u00edjmech z v\u00edce zdroj\u016f nebo vedlej\u0161\u00ed \u010dinnosti. Ob\u011b cesty vedou ke stejn\u00e9mu v\u00fdsledku (p\u0159eplatek nebo doplatek)." }
            }
          ]
        }) }} />
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
