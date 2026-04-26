import { useState } from 'react'
import { useRouter } from 'next/router'
import {
  Box,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Divider,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import CalculateIcon from '@mui/icons-material/Calculate'

const MENU_LINKS = [
  { label: 'Domů', href: '/' },
  { label: 'Kalkulačky', href: '/#kalkulacky' },
  { label: 'Aktuality', href: '/aktuality' },
  { label: 'Energetika', href: '/energetika' },
  { label: 'O webu', href: '/about' },
  { label: 'Kontakt', href: '/kontakt' },
]

export default function Header({ subtitle, description }) {
  const router = useRouter()
  const [drawerOpen, setDrawerOpen] = useState(false)
  const textLine = description ?? subtitle

  const handleNavigate = (href) => {
    setDrawerOpen(false)
    router.push(href)
  }

  return (
    <>
      <Box
        mb={3}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        flexWrap="wrap"
        gap={2}
        ml={2}
      >
        <Box display="flex" flexDirection="column" gap={1} flexGrow={1}>
          <Box display="flex" alignItems="center" gap={1.5} flexWrap="wrap">
            <Box
              sx={{
                width: 38,
                height: 38,
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #1565c0 0%, #6a1b9a 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <CalculateIcon sx={{ color: 'white', fontSize: 22 }} />
            </Box>
            <Typography
              variant="h4"
              component="h1"
              sx={{
                fontWeight: 800,
                letterSpacing: '-0.5px',
                background: 'linear-gradient(90deg, #1565c0 0%, #6a1b9a 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                lineHeight: 1.2,
              }}
            >
              Mzda a daně
            </Typography>
          </Box>

          <Box display="flex" flexDirection="column" gap={0.5}>
            <Typography variant="body2" color="text.secondary">
              {textLine ?? 'Kalkulačky mezd, daní a odvodů pro rok 2026 · Zdarma'}
            </Typography>
          </Box>
        </Box>

        <Box display="flex" alignItems="center" gap={1} sx={{ justifyContent: 'flex-end' }}>
          <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: 1, alignItems: 'center' }}>
            {MENU_LINKS.map((item) => (
              <Button
                key={item.href}
                onClick={() => handleNavigate(item.href)}
                sx={{
                  color: '#1565c0',
                  textTransform: 'none',
                  fontWeight: 700,
                  borderRadius: 2,
                  px: 1.5,
                  py: 0.5,
                  '&:hover': {
                    color: '#6a1b9a',
                    backgroundColor: 'rgba(21,101,192,0.08)',
                  },
                }}
              >
                {item.label}
              </Button>
            ))}
          </Box>

          <IconButton
            onClick={() => setDrawerOpen(true)}
            sx={{ display: { sm: 'none' }, color: '#1565c0' }}
            aria-label="Otevřít menu"
          >
            <MenuIcon />
          </IconButton>
        </Box>
      </Box>

      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: 260, p: 2, bgcolor: '#f4f7ff', minHeight: '100%' }} role="presentation">
          <Typography variant="subtitle1" fontWeight={700} mb={1} color="#1565c0">
            Navigace
          </Typography>
          <Divider sx={{ mb: 1 }} />
          <List>
            {MENU_LINKS.map((item) => (
              <ListItemButton
                key={item.href}
                onClick={() => handleNavigate(item.href)}
                sx={{
                  borderRadius: 2,
                  mb: 0.5,
                  '&:hover': {
                    bgcolor: 'rgba(21,101,192,0.1)',
                  },
                }}
              >
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    fontWeight: 700,
                    color: '#1565c0',
                  }}
                />
              </ListItemButton>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  )
}
