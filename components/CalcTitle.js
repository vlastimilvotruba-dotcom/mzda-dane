import { Box, Typography } from '@mui/material'
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet'
import AccountBalanceIcon from '@mui/icons-material/AccountBalance'
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong'
import BadgeIcon from '@mui/icons-material/Badge'
import WbSunnyIcon from '@mui/icons-material/WbSunny'
import ElectricCarIcon from '@mui/icons-material/ElectricCar'

const TILE_ACCENT = {
  'salary2026': '#1565c0',
  'loan': '#2e7d32',
  'annual-tax': '#c62828',
  'self-employed': '#6a1b9a',
  'fve': '#f57f17',
  'ev': '#00897b',
}

const TILE_ICON = {
  'salary2026': AccountBalanceWalletIcon,
  'loan': AccountBalanceIcon,
  'annual-tax': ReceiptLongIcon,
  'self-employed': BadgeIcon,
  'fve': WbSunnyIcon,
  'ev': ElectricCarIcon,
}

export default function CalcTitle({ id, title }) {
  const accent = TILE_ACCENT[id]
  const Icon = TILE_ICON[id]
  if (!accent) return <Typography variant="h5" gutterBottom>{title}</Typography>
  return (
    <Box display="flex" alignItems="center" gap={1} mb={1}>
      <Icon sx={{ color: accent, fontSize: 28 }} />
      <Typography variant="h5" fontWeight={700} sx={{ color: accent }}>
        {title}
      </Typography>
    </Box>
  )
}
