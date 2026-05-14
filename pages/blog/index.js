import fs from 'fs'
import path from 'path'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Container, Box, Typography, Chip, Paper, Divider, Button } from '@mui/material'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import Header from '../../components/Header'
import Footer from '../../components/Footer/Footer'

function formatDate(d) {
  return new Date(d).toLocaleDateString('cs-CZ', { day: 'numeric', month: 'long', year: 'numeric' })
}

const TAG_COLORS = {
  'Elektromobily': { bg: '#e3f2fd', color: '#0277bd' },
  'Ceny paliv':    { bg: '#fff3e0', color: '#e65100' },
  'Osobní finance':{ bg: '#f3e5f5', color: '#6a1b9a' },
}

export default function BlogIndex({ posts }) {
  const router = useRouter()
  return (
    <>
      <Head>
        <title>Blog – Mzda a daně</title>
        <meta name="description" content="Komentáře, analýzy a praktické rady k daním, mzdám, energetice a osobním financím v ČR. Psáno s čísly, ne jen s dojmy." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://mzda-dane.cz/blog" />
        <meta property="og:title" content="Blog – Mzda a daně" />
        <meta property="og:description" content="Analýzy a komentáře k daním, mzdám a energetice v ČR." />
        <meta property="og:url" content="https://mzda-dane.cz/blog" />
        <meta property="og:locale" content="cs_CZ" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Domů', item: 'https://mzda-dane.cz' }, { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://mzda-dane.cz/blog' }] }) }} />
      </Head>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Header subtitle="Komentáře a analýzy k daním, mzdám a energetice." />
        <Box mt={4} display="flex" justifyContent="center">
          <Box sx={{ width: '100%', maxWidth: 860 }}>
            <Box display="flex" alignItems="baseline" gap={2} mb={3}>
              <Typography variant="h4" component="h1" fontWeight={800} sx={{ background: 'linear-gradient(90deg, #1565c0 0%, #6a1b9a 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Blog
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Analýzy a komentáře psané s čísly, ne jen s dojmy
              </Typography>
            </Box>

            <Box display="flex" flexDirection="column" gap={3}>
              {posts.map((post) => (
                <Paper
                  key={post.slug}
                  elevation={0}
                  sx={{ border: '1.5px solid #e0e0e0', borderRadius: 3, p: { xs: 2.5, sm: 3 }, cursor: 'pointer', transition: 'box-shadow 0.2s, transform 0.15s', '&:hover': { boxShadow: 4, transform: 'translateY(-2px)' } }}
                  onClick={() => router.push(`/blog/${post.slug}`)}
                >
                  <Box display="flex" flexWrap="wrap" gap={0.75} mb={1.5}>
                    {post.tags.map((tag) => {
                      const c = TAG_COLORS[tag] || { bg: '#f5f5f5', color: '#424242' }
                      return <Chip key={tag} label={tag} size="small" sx={{ fontSize: '0.72rem', bgcolor: c.bg, color: c.color, fontWeight: 600 }} />
                    })}
                  </Box>
                  <Typography variant="h6" fontWeight={800} gutterBottom sx={{ lineHeight: 1.35 }}>
                    {post.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7, mb: 2 }}>
                    {post.perex}
                  </Typography>
                  <Box display="flex" alignItems="center" justifyContent="space-between" flexWrap="wrap" gap={1}>
                    <Box display="flex" alignItems="center" gap={2}>
                      <Typography variant="caption" color="text.disabled">{post.author}</Typography>
                      <Typography variant="caption" color="text.disabled">·</Typography>
                      <Typography variant="caption" color="text.disabled">{formatDate(post.date)}</Typography>
                      <Box display="flex" alignItems="center" gap={0.5}>
                        <AccessTimeIcon sx={{ fontSize: 14, color: 'text.disabled' }} />
                        <Typography variant="caption" color="text.disabled">{post.readMinutes} min čtení</Typography>
                      </Box>
                    </Box>
                    <Button size="small" endIcon={<ArrowForwardIcon />} sx={{ textTransform: 'none', fontWeight: 700, color: '#1565c0' }}>
                      Číst článek
                    </Button>
                  </Box>
                </Paper>
              ))}
            </Box>
          </Box>
        </Box>
        <Footer onNavigate={(p) => router.push(p)} />
      </Container>
    </>
  )
}

export async function getStaticProps() {
  const posts = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'data/blog.json'), 'utf8'))
  return { props: { posts } }
}
