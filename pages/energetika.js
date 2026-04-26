import fs from 'fs'
import path from 'path'
import Head from 'next/head'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { Container, Box, Typography, Paper, Chip, Divider, Stack, Button } from '@mui/material'
import NextLink from 'next/link'
import Header from '../components/Header'
import Footer from '../components/Footer/Footer'

const PRIMARY = '#2e7d32'

const ALL_TAGS = ['Vše', 'Elektromobily', 'FVE & Solár', 'Nabíjení', 'Hybridy', 'Ceny energií', 'EU trh']

const TAG_COLORS = {
  'Elektromobily': { bg: '#e3f2fd', color: '#0277bd' },
  'FVE & Solár':   { bg: '#f1f8e9', color: '#558b2f' },
  'Nabíjení':      { bg: '#e0f7fa', color: '#00695c' },
  'Hybridy':       { bg: '#fff8e1', color: '#f57f17' },
  'Ceny energií':  { bg: '#fce4ec', color: '#c62828' },
  'EU trh':        { bg: '#f3e5f5', color: '#6a1b9a' },
}

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('cs-CZ', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export default function EnergetikaPage({ items }) {
  const router = useRouter()
  const [activeTag, setActiveTag] = useState('Vše')
  const lastUpdated = items.length > 0 ? formatDate(items[0].date) : null

  const filtered = activeTag === 'Vše'
    ? items
    : items.filter((item) => (item.tags || []).includes(activeTag))

  return (
    <>
      <Head>
        <title>Energetika – Elektromobily a FVE | Mzda a daně</title>
        <meta
          name="description"
          content="Novinky z oblasti elektromobility, fotovoltaiky a energetiky v ČR – přehled zpráv z Hybrid.cz a světového Electrek s komentáři k dopadu pro české domácnosti."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://mzda-dane.cz/energetika/" />
      </Head>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Header subtitle="Novinky z oblasti elektromobility, fotovoltaiky a energetiky." />

        <Box mt={4} display="flex" justifyContent="center">
          <Box sx={{ width: '100%', maxWidth: 900 }}>
            <Typography
              variant="h4"
              component="h1"
              gutterBottom
              sx={{
                fontWeight: 700,
                background: 'linear-gradient(90deg, #2e7d32 0%, #0277bd 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Energetika
            </Typography>

            {/* Redakční komentář měsíce */}
            <Paper
              variant="outlined"
              sx={{
                p: { xs: 2, sm: 3 },
                mb: 3,
                borderLeft: '4px solid #2e7d32',
                borderRadius: 2,
                bgcolor: '#f9fdf9',
              }}
            >
              <Typography variant="subtitle1" fontWeight={700} gutterBottom>
                Komentář redakce – duben/květen 2026
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.8 }}>
                Registrace nových elektromobilů v ČR v 1. čtvrtletí 2026 meziročně rostou – dle dat CDV
                tvoří BEV přibližně 4 % z nových osobních aut. Ceny elektřiny po zimní stabilizaci mírně
                klesají, což zlepšuje návratnost FVE i nákladový profil nabíjení doma. Nová evropská
                nařízení (AFIR) zavazují čerpací stanice na dálnicích k rychlonabíječům od 2026 – sledujeme
                rozjezd sítě v ČR. Novinky přinášíme česky: ze zdroje Hybrid.cz i z mezinárodního Electrek
                (přeloženo automaticky, originál k dispozici v odkazu).
              </Typography>
            </Paper>

            {lastUpdated && (
              <Box mb={2}>
                <Typography variant="body2" color="text.secondary">
                  Poslední aktualizace: {lastUpdated} · Zobrazeno {items.length} zpráv z posledních 45 dní
                </Typography>
              </Box>
            )}

            {items.length === 0 && (
              <Paper elevation={1} sx={{ borderRadius: 3, p: 3, bgcolor: '#f7f8fc' }}>
                <Typography variant="body1" color="text.secondary">
                  Data se připravují. Spusťte <code>npm run update-energetika</code> pro naplnění feedu.
                </Typography>
              </Paper>
            )}

            {/* Filtrovací chipy */}
            {items.length > 0 && (
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
                        bgcolor: isActive ? (colors ? colors.bg : '#e8f5e9') : 'transparent',
                        color: isActive ? (colors ? colors.color : PRIMARY) : 'text.secondary',
                        border: '1px solid',
                        borderColor: isActive ? (colors ? colors.color : PRIMARY) : '#e0e0e0',
                        '&:hover': {
                          bgcolor: colors ? colors.bg : '#e8f5e9',
                        },
                      }}
                    />
                  )
                })}
              </Stack>
            )}

            {items.length > 0 && filtered.length === 0 && (
              <Paper elevation={1} sx={{ borderRadius: 3, p: 3, bgcolor: '#f7f8fc' }}>
                <Typography variant="body1" color="text.secondary">
                  V kategorii „{activeTag}" nejsou aktuálně žádné zprávy.
                </Typography>
              </Paper>
            )}

            {filtered.map((item) => (
              <Paper key={item.link} elevation={1} sx={{ borderRadius: 3, p: { xs: 2, sm: 3 }, mb: 2 }}>
                {/* Zdroj + EN badge + datum */}
                <Box
                  display="flex"
                  flexWrap="wrap"
                  justifyContent="space-between"
                  alignItems="center"
                  gap={1}
                  mb={1}
                >
                  <Box display="flex" gap={1} alignItems="center" flexWrap="wrap">
                    <Chip
                      label={item.source}
                      size="small"
                      sx={{ bgcolor: '#e8f5e9', color: PRIMARY, fontWeight: 700 }}
                    />
                    {item.language === 'en' && (
                      <Chip
                        label="🇬🇧 EN"
                        size="small"
                        sx={{ bgcolor: '#fff3e0', color: '#e65100', fontWeight: 700, fontSize: '0.7rem' }}
                      />
                    )}
                  </Box>
                  <Typography variant="caption" color="text.secondary">
                    {formatDate(item.date)}
                  </Typography>
                </Box>

                {/* Titulek */}
                <Typography variant="h6" component="h2" sx={{ fontWeight: 700, mb: 0.5 }}>
                  {item.title}
                </Typography>

                {/* Poznámka o překladu u EN článků */}
                {item.language === 'en' && item.originalTitle && (
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ display: 'block', mb: 1, fontStyle: 'italic' }}
                  >
                    Přeloženo z angličtiny · Originál: „{item.originalTitle}"
                  </Typography>
                )}

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

                {/* Náš komentář */}
                {item.comment && (
                  <Box
                    sx={{
                      display: 'block',
                      width: '100%',
                      boxSizing: 'border-box',
                      bgcolor: '#dcedc8',
                      borderLeft: '4px solid #2e7d32',
                      borderRadius: '0 6px 6px 0',
                      px: { xs: 1.5, sm: 2 },
                      py: 1.5,
                      mb: 2,
                    }}
                  >
                    <Typography variant="subtitle2" sx={{ color: PRIMARY, fontWeight: 700, mb: 0.5 }}>
                      Náš komentář
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#1b5e20', lineHeight: 1.8, wordBreak: 'break-word' }}>
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

                {/* Odkaz na originální článek – pro EN je explicitně uvedeno jazyk */}
                <Typography
                  component="a"
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ color: PRIMARY, fontWeight: 700, textDecoration: 'none', fontSize: '0.85rem' }}
                >
                  {item.language === 'en'
                    ? `Číst originál na ${item.source} (článek v angličtině) →`
                    : `Číst více na ${item.source} →`}
                </Typography>
              </Paper>
            ))}
          </Box>
        </Box>

        <Footer onNavigate={(page) => router.push(page)} />
      </Container>
    </>
  )
}

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'data', 'energetika.json')
  const commentsPath = path.join(process.cwd(), 'data', 'energetika-comments.json')
  let items = []
  let comments = []

  try {
    const raw = fs.readFileSync(filePath, 'utf8')
    items = JSON.parse(raw)
  } catch (error) {
    console.error('Nepodařilo se načíst energetika.json:', error)
  }

  try {
    const rawComments = fs.readFileSync(commentsPath, 'utf8')
    comments = JSON.parse(rawComments)
  } catch {
    // Komentáře jsou volitelné
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

  // Automatické CTA podle tagu – manuální zápis v comments.json má vždy přednost
  function autoCalcLink(tags) {
    if (tags.includes('FVE & Solár')) return { calcLink: '/navratnost-fve', calcLabel: 'Kalkulačka návratnosti FVE' }
    if (tags.includes('Elektromobily') || tags.includes('Nabíjení')) return { calcLink: '/ev-vs-spalovak', calcLabel: 'Kalkulačka EV vs. spalovák' }
    return { calcLink: null, calcLabel: null }
  }

  items.sort((a, b) => new Date(b.date) - new Date(a.date))

  const itemsWithComments = items.map((item) => {
    const manual = commentsMap[item.link] || {}
    const tags = manual.tags?.length ? manual.tags : (item.tags || [])
    const { calcLink, calcLabel } = manual.calcLink
      ? { calcLink: manual.calcLink, calcLabel: manual.calcLabel }
      : autoCalcLink(tags)
    return {
      ...item,
      comment: manual.comment || item.autoComment || null,
      tags,
      calcLink,
      calcLabel,
    }
  })

  return {
    props: {
      items: itemsWithComments,
    },
  }
}
