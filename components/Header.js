import { useRouter } from 'next/router'
import { Box, Typography, Button } from '@mui/material'
import CalculateIcon from '@mui/icons-material/Calculate'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'

export default function Header({ showBack, subtitle }) {
  const router = useRouter()
  return (
    <Box mb={3} display="flex" justifyContent="space-between" alignItems="center" ml={2}>
      <Box>
        {!showBack && (
          <>
            <Box display="flex" alignItems="center" gap={1.5} mb={0.5}>
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
            <Typography variant="body2" color="text.secondary" sx={{ ml: '50px' }}>
              Kalkulačky mezd, daní a odvodů pro rok 2026 · Zdarma
            </Typography>
          </>
        )}
        {showBack && (
          <>
            <Box display="flex" alignItems="center" gap={1} sx={{ display: { xs: 'none', sm: 'flex' } }}>
              <Box
                sx={{
                  width: 28,
                  height: 28,
                  borderRadius: '7px',
                  background: 'linear-gradient(135deg, #1565c0 0%, #6a1b9a 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <CalculateIcon sx={{ color: 'white', fontSize: 16 }} />
              </Box>
              <Typography
                variant="h5"
                component="h1"
                sx={{
                  fontWeight: 700,
                  background: 'linear-gradient(90deg, #1565c0 0%, #6a1b9a 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Mzda a daně
              </Typography>
            </Box>
            {subtitle && (
              <Typography variant="body2" color="text.secondary" sx={{ display: { xs: 'none', sm: 'block' }, ml: '36px' }}>
                {subtitle}
              </Typography>
            )}
          </>
        )}
      </Box>
      {showBack && (
        <Button
          variant="outlined"
          size="small"
          onClick={() => router.push('/')}
          startIcon={<ArrowBackIosNewIcon sx={{ fontSize: '0.7rem !important' }} />}
          sx={{
            fontSize: { xs: '0.75rem', sm: '0.8rem' },
            py: { xs: 0.4, sm: 0.6 },
            px: { xs: 1.25, sm: 1.75 },
            fontWeight: 600,
            color: '#1565c0',
            borderRadius: '8px',
            border: '1.5px solid #1565c0',
            '&:hover': {
              border: '1.5px solid #6a1b9a',
              color: '#6a1b9a',
              bgcolor: 'rgba(106,27,154,0.04)',
            },
          }}
        >
          Zpět na úvod
        </Button>
      )}
    </Box>
  )
}
