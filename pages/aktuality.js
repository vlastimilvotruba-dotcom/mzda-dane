import fs from 'fs'
import path from 'path'
import Head from 'next/head'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { Container, Box, Typography, Paper, Chip, Divider, Stack, Button } from '@mui/material'
import NextLink from 'next/link'
import Header from '../components/Header'
import Footer from '../components/Footer/Footer'

const PRIMARY = '#1565c0'

const ALL_TAGS = ['Vše', 'Daňové přiznání', 'Nemovitosti', 'OSVČ', 'Zaměstnanci', 'DPH', 'Kontroly']

const TAG_COLORS = {
  'Daňové přiznání': { bg: '#e3f2fd', color: '#1565c0' },
  'Nemovitosti':     { bg: '#e8f5e9', color: '#2e7d32' },
  'OSVČ':            { bg: '#f3e5f5', color: '#6a1b9a' },
  'Zaměstnanci':     { bg: '#fff3e0', color: '#e65100' },
  'DPH':             { bg: '#fce4ec', color: '#c62828' },
  'Kontroly':        { bg: '#f5f5f5', color: '#424242' },
}

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('cs-CZ', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export default function AktualityPage({ aktuality }) {
  const router = useRouter()
  const [activeTag, setActiveTag] = useState('Vše')
  const lastUpdated = aktuality.length > 0 ? formatDate(aktuality[0].date) : null

  const filtered = activeTag === 'Vše'
    ? aktuality
    : aktuality.filter((item) => (item.tags || []).includes(activeTag))

  return (
    <>
      <Head>
        <title>Aktuality – Mzda a daně</title>
        <meta
          name="description"
          content="Aktuality z oblasti daní, mezd a energetiky v Česku – přehled novinek, legislativních změn a komentářů k praktickému dopadu pro zaměstnance a OSVČ."
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

            {/* Redakční komentář měsíce */}
            <Paper
              variant="outlined"
              sx={{
                p: { xs: 2, sm: 3 },
                mb: 3,
                borderLeft: '4px solid #1565c0',
                borderRadius: 2,
                bgcolor: '#f8fbff',
              }}
            >
              <Typography variant="subtitle1" fontWeight={700} gutterBottom>
                Komentář redakce – duben/květen 2026
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.8 }}>
                Daňová sezóna 2026 vrcholí – základní lhůta pro podání přiznání v listinné podobě uplynula
                1. dubna, elektronicky je možné podat ještě do 4. května 2026. Nové pro letošní rok:
                Finanční správa spustila beta verzi AI asistenta pro vyplnění přiznání. Zároveň probíhá
                rozesílání platebních informací k dani z nemovitých věcí (splatnost 31. května) – letos
                s výraznějším nárůstem u řady nemovitostí kvůli celostátní valorizaci. Ke každé novince
                přidáváme praktický komentář s dopadem pro zaměstnance, OSVČ i majitele nemovitostí.
              </Typography>
            </Paper>

            {lastUpdated && (
              <Box mb={2}>
                <Typography variant="body2" color="text.secondary">
                  Poslední aktualizace: {lastUpdated} · Zobrazeno {aktuality.length} zpráv z posledních 2 měsíců
                </Typography>
              </Box>
            )}

            {/* Filtrovací chipy */}
            <Stack direction="row" flexWrap="wrap" gap={1} mb={3}>
              {ALL_TAGS.map((tag) => {
                const colors = TAG_COLORS[tag]
                const isActive = activeTag === tag
                return (
                  <Chip
                    key={tag}
                    label={tag}
                    clickable
                    onClick={() => setActiveTag(tag)}
                    sx={{
                      fontWeight: isActive ? 700 : 400,
                      bgcolor: isActive ? (colors ? colors.bg : '#e3f2fd') : 'transparent',
                      color: isActive ? (colors ? colors.color : PRIMARY) : 'text.secondary',
                      border: '1px solid',
                      borderColor: isActive ? (colors ? colors.color : PRIMARY) : '#e0e0e0',
                      '&:hover': {
                        bgcolor: colors ? colors.bg : '#e3f2fd',
                      },
                    }}
                  />
                )
              })}
            </Stack>

            {filtered.length === 0 ? (
              <Paper elevation={1} sx={{ borderRadius: 3, p: 3, bgcolor: '#f7f8fc' }}>
                <Typography variant="body1" color="text.secondary">
                  V kategorii „{activeTag}" nejsou aktuálně žádné zprávy.
                </Typography>
              </Paper>
            ) : (
              filtered.map((item) => (
                <Paper key={item.link} elevation={1} sx={{ borderRadius: 3, p: { xs: 2, sm: 3 }, mb: 2 }}>
                  {/* Zdroj + datum */}
                  <Box
                    display="flex"
                    flexWrap="wrap"
                    justifyContent="space-between"
                    alignItems="center"
                    gap={1}
                    mb={1}
                  >
                    <Chip
                      label={item.source}
                      size="small"
                      sx={{ bgcolor: '#ede7f6', color: PRIMARY, fontWeight: 700 }}
                    />
                    <Typography variant="caption" color="text.secondary">
                      {formatDate(item.date)}
                    </Typography>
                  </Box>

                  {/* Titulek */}
                  <Typography variant="h6" component="h2" sx={{ fontWeight: 700, mb: 1 }}>
                    {item.title}
                  </Typography>

                  {/* Kategoriové tagy */}
                  {item.tags?.length > 0 && (
                    <Stack direction="row" flexWrap="wrap" gap={0.5} mb={1.5}>
                      {item.tags.map((tag) => {
                        const colors = TAG_COLORS[tag] || { bg: '#f5f5f5', color: '#424242' }
                        return (
                          <Chip
                            key={tag}
                            label={tag}
                            size="small"
                            clickable
                            onClick={() => setActiveTag(tag)}
                            sx={{
                              bgcolor: colors.bg,
                              color: colors.color,
                              fontWeight: 600,
                              fontSize: '0.7rem',
                            }}
                          />
                        )
                      })}
                    </Stack>
                  )}

                  {/* Popis */}
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {item.description}
                  </Typography>

                  {/* Náš komentář – opraveno pro mobilní zobrazení */}
                  {item.comment && (
                    <Box
                      sx={{
                        display: 'block',
                        width: '100%',
                        boxSizing: 'border-box',
                        bgcolor: '#dbeafe',
                        borderLeft: '4px solid #1565c0',
                        borderRadius: '0 6px 6px 0',
                        px: { xs: 1.5, sm: 2 },
                        py: 1.5,
                        mb: 2,
                      }}
                    >
                      <Typography variant="subtitle2" sx={{ color: PRIMARY, fontWeight: 700, mb: 0.5 }}>
                        Náš komentář
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#1a237e', lineHeight: 1.8, wordBreak: 'break-word' }}>
                        {item.comment}
                      </Typography>
                    </Box>
                  )}

                  {/* CTA odkaz na kalkulačku */}
                  {item.calcLink && (
                    <Box mb={1.5}>
                      <Button
                        component={NextLink}
                        href={item.calcLink}
                        variant="outlined"
                        size="small"
                        sx={{
                          borderColor: PRIMARY,
                          color: PRIMARY,
                          fontWeight: 600,
                          textTransform: 'none',
                        }}
                      >
                        {item.calcLabel} →
                      </Button>
                    </Box>
                  )}

                  <Divider sx={{ my: 1 }} />
                  <Typography
                    component="a"
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{ color: PRIMARY, fontWeight: 700, textDecoration: 'none', fontSize: '0.85rem' }}
                  >
                    Číst více na Finanční správě →
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
  const commentsPath = path.join(process.cwd(), 'data', 'aktuality-comments.json')
  let aktuality = []
  let comments = []

  try {
    const raw = fs.readFileSync(filePath, 'utf8')
    aktuality = JSON.parse(raw)
  } catch (error) {
    console.error('Nepodařilo se načíst aktuality:', error)
  }

  try {
    const rawComments = fs.readFileSync(commentsPath, 'utf8')
    comments = JSON.parse(rawComments)
  } catch (error) {
    // Komentáře jsou volitelné, chyba není kritická
  }

  const commentsMap = Object.fromEntries(
    comments.map((c) => [
      c.link,
      {
        comment: c.comment || null,
        tags: c.tags || [],
        calcLink: c.calcLink || null,
        calcLabel: c.calcLabel || null,
      },
    ])
  )

  aktuality.sort((a, b) => new Date(b.date) - new Date(a.date))

  const aktualityWithComments = aktuality.map((item) => ({
    ...item,
    comment: commentsMap[item.link]?.comment || null,
    tags: commentsMap[item.link]?.tags || [],
    calcLink: commentsMap[item.link]?.calcLink || null,
    calcLabel: commentsMap[item.link]?.calcLabel || null,
  }))

  return {
    props: {
      aktuality: aktualityWithComments,
    },
  }
}
