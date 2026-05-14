import { useState, useMemo } from 'react'
import { Box, Typography, TextField, Button, InputAdornment, Divider, Paper } from '@mui/material'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import EastIcon from '@mui/icons-material/East'
import { useRouter } from 'next/router'
import { calculateNetSalary2026 } from '../../logic/salary2026'

function fmt(n) {
  return Math.round(n).toLocaleString('cs-CZ')
}

export default function SalaryWidget() {
  const router = useRouter()
  const [gross, setGross] = useState('')

  const result = useMemo(() => {
    const val = Number(String(gross).replace(/\s/g, '').replace(',', '.'))
    if (!val || val < 1) return null
    return calculateNetSalary2026({ grossSalary: val, contractType: 'HPP', childrenCount: 0, childrenZtpP: 0 })
  }, [gross])

  return (
    <Paper
      elevation={0}
      sx={{
        border: '1.5px solid #c5cae9',
        borderRadius: 3,
        overflow: 'hidden',
        mt: 4,
      }}
    >
      {/* barevný pruh */}
      <Box sx={{ height: 4, background: 'linear-gradient(90deg, #1565c0 0%, #6a1b9a 100%)' }} />

      <Box sx={{ p: { xs: 2.5, sm: 3 } }}>
        <Typography variant="subtitle1" fontWeight={800} color="primary.dark" gutterBottom>
          Rychlý výpočet čisté mzdy 2026
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={2}>
          Zadejte hrubou mzdu a hned uvidíte, kolik dostanete na ruku (HPP, bez dětí).
        </Typography>

        <Box display="flex" alignItems="flex-start" gap={1.5} flexWrap="wrap">
          <TextField
            label="Hrubá mzda"
            value={gross}
            onChange={(e) => setGross(e.target.value)}
            size="small"
            type="number"
            inputProps={{ min: 0, step: 500 }}
            InputProps={{ endAdornment: <InputAdornment position="end">Kč</InputAdornment> }}
            sx={{ width: 180 }}
            placeholder="např. 50 000"
          />

          {result && (
            <Box display="flex" alignItems="center" gap={2} flexWrap="wrap" mt={0.25}>
              <EastIcon sx={{ color: 'text.disabled', fontSize: 20 }} />
              <Box>
                <Typography variant="caption" color="text.secondary" display="block" lineHeight={1}>
                  Čistá mzda
                </Typography>
                <Typography variant="h6" fontWeight={800} color="#1565c0" lineHeight={1.3}>
                  {fmt(result.net)} Kč
                </Typography>
              </Box>

              <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />

              <Box>
                <Typography variant="caption" color="text.secondary" display="block" lineHeight={1}>
                  Náklady zaměstnavatele
                </Typography>
                <Typography variant="body1" fontWeight={700} color="text.secondary" lineHeight={1.3}>
                  {fmt(result.totalEmployerCost)} Kč
                </Typography>
              </Box>
            </Box>
          )}
        </Box>

        {result && (
          <Box display="flex" gap={2} mt={2} flexWrap="wrap">
            <Box sx={{ bgcolor: '#f3e5f5', borderRadius: 1.5, px: 1.5, py: 0.75, minWidth: 110 }}>
              <Typography variant="caption" color="text.secondary" display="block">Sociální (zam.)</Typography>
              <Typography variant="body2" fontWeight={700} color="#6a1b9a">{fmt(result.socialEmployee)} Kč</Typography>
            </Box>
            <Box sx={{ bgcolor: '#e8f5e9', borderRadius: 1.5, px: 1.5, py: 0.75, minWidth: 110 }}>
              <Typography variant="caption" color="text.secondary" display="block">Zdravotní (zam.)</Typography>
              <Typography variant="body2" fontWeight={700} color="#2e7d32">{fmt(result.healthEmployee)} Kč</Typography>
            </Box>
            <Box sx={{ bgcolor: '#fff3e0', borderRadius: 1.5, px: 1.5, py: 0.75, minWidth: 110 }}>
              <Typography variant="caption" color="text.secondary" display="block">Záloha na daň</Typography>
              <Typography variant="body2" fontWeight={700} color="#e65100">{fmt(result.tax)} Kč</Typography>
            </Box>
          </Box>
        )}

        <Box mt={2}>
          <Button
            variant="text"
            size="small"
            endIcon={<ArrowForwardIcon />}
            onClick={() => router.push('/cista-mzda')}
            sx={{ textTransform: 'none', fontWeight: 700, color: '#1565c0', pl: 0 }}
          >
            Plná kalkulačka – DPP, DPČ, bonusy na děti…
          </Button>
        </Box>
      </Box>
    </Paper>
  )
}
