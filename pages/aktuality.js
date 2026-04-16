import fs from 'fs'
import path from 'path'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Container, Box, Typography, Paper, Chip, Divider } from '@mui/material'
import Header from '../components/Header'
import Footer from '../components/Footer/Footer'

const PRIMARY = '#1565c0'

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('cs-CZ', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export default function AktualityPage({ aktuality }) {
  const router = useRouter()
  const lastUpdated = aktuality.length > 0 ? formatDate(aktuality[0].date) : null

  return (
    <>
      <Head>
        <title>Aktuality – Mzda a daně</title>
        <meta
          name="description"
          content="Aktuality z oblasti daní, mezd a energetiky v Česku - přehled novinek, legislativních změn a praktických tipů."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://mzda-dane.cz/aktuality/" />
      </Head>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Header subtitle="Aktuality a novinky z oblasti daní, mezd a energetiky." />

        <Box mt={4} display="flex" justifyContent="center">
          <Box sx={{ width: '100%', maxWidth: 900 }}>
            <Typography
              variant="h4"
              component="h1"
              gutterBottom
              sx={{
                fontWeight: 700,
                background: 'linear-gradient(90deg, #1565c0 0%, #6a1b9a 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Aktuality
            </Typography>

            <Typography variant="body1" color="text.secondary" paragraph>
              Zde najdete nejnovější zprávy a změny ze světa daní, OSVČ a energetiky. Data čerpáme z RSS novinek Finanční správy a pravidelně je obnovujeme do lokálního souboru.
            </Typography>

            {lastUpdated && (
              <Box mb={3}>
                <Typography variant="body2" color="text.secondary">
                  Poslední aktualizace: {lastUpdated}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Zobrazeno {aktuality.length} zpráv z posledních 2 měsíců.
                </Typography>
              </Box>
            )}

            {aktuality.length === 0 ? (
              <Paper elevation={1} sx={{ borderRadius: 3, p: 3, bgcolor: '#f7f8fc' }}>
                <Typography variant="body1" color="text.secondary">
                  Aktuálně zde nejsou žádné novinky. Zkontrolujte prosím později, až bude stránka synchronizována s RSS feedem.
                </Typography>
              </Paper>
            ) : (
              aktuality.map((item) => (
                <Paper key={item.link} elevation={1} sx={{ borderRadius: 3, p: 3, mb: 2 }}>
                  <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems="flex-start" gap={1} mb={1}>
                    <Box>
                      <Typography variant="h6" component="h2" sx={{ fontWeight: 700, mb: 0.5 }}>
                        {item.title}
                      </Typography>
                      <Chip
                        label={item.source}
                        size="small"
                        sx={{ bgcolor: '#ede7f6', color: PRIMARY, fontWeight: 700 }}
                      />
                    </Box>
                    <Chip
                      label={formatDate(item.date)}
                      size="small"
                      sx={{ bgcolor: '#ede7f6', color: PRIMARY, fontWeight: 700 }}
                    />
                  </Box>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {item.description}
                  </Typography>
                  <Divider sx={{ my: 1 }} />
                  <Typography
                    component="a"
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{ color: PRIMARY, fontWeight: 700, textDecoration: 'none' }}
                  >
                    Číst více na Finanční správě
                  </Typography>
                </Paper>
              ))
            )}
          </Box>
        </Box>

        <Footer onNavigate={(page) => router.push(page)} />
      </Container>
    </>
  )
}

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'data', 'aktuality.json')
  let aktuality = []

  try {
    const raw = fs.readFileSync(filePath, 'utf8')
    aktuality = JSON.parse(raw)
  } catch (error) {
    console.error('Nepodařilo se načíst aktuality:', error)
  }

  aktuality.sort((a, b) => new Date(b.date) - new Date(a.date))

  return {
    props: {
      aktuality,
    },
  }
}
