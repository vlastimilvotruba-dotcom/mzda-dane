import { useRouter } from 'next/router'
import { Box, Typography, Button } from '@mui/material'

export default function Header({ showBack, subtitle }) {
  const router = useRouter()
  return (
    <Box mb={3} display="flex" justifyContent="space-between" alignItems="center" ml={2}>
      <Box>
        {!showBack && (
          <>
            <Typography variant="h4" component="h1" gutterBottom>Mzda a daně</Typography>
            <Typography variant="body1" color="text.secondary">
              Jednoduché kalkulačky pro mzdu a daně v ČR.
            </Typography>
          </>
        )}
        {showBack && (
          <>
            <Typography variant="h5" component="h1" sx={{ display: { xs: 'none', sm: 'block' } }}>
              Mzda a daně
            </Typography>
            {subtitle && (
              <Typography variant="body2" color="text.secondary" sx={{ display: { xs: 'none', sm: 'block' } }}>
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
          sx={{
            fontSize: { xs: '0.75rem', sm: '0.875rem' },
            py: { xs: 0.5, sm: 0.75 },
            px: { xs: 1.25, sm: 2 },
          }}
        >
          Zpět na úvod
        </Button>
      )}
    </Box>
  )
}
