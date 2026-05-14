import { useState } from 'react'
import { Box, IconButton, Tooltip, Typography } from '@mui/material'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import LinkIcon from '@mui/icons-material/Link'
import CheckIcon from '@mui/icons-material/Check'

export default function ShareButtons({ title, url }) {
  const [copied, setCopied] = useState(false)

  const fullUrl = url || (typeof window !== 'undefined' ? window.location.href : '')
  const encoded = encodeURIComponent(fullUrl)
  const encodedTitle = encodeURIComponent(title || '')

  const handleCopy = () => {
    navigator.clipboard.writeText(fullUrl).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <Box display="flex" alignItems="center" gap={0.5}>
      <Typography variant="caption" color="text.disabled" sx={{ mr: 0.5 }}>
        Sdílet:
      </Typography>
      <Tooltip title="Sdílet přes WhatsApp">
        <IconButton
          size="small"
          component="a"
          href={`https://wa.me/?text=${encodedTitle}%20${encoded}`}
          target="_blank"
          rel="noopener noreferrer"
          sx={{ color: '#25d366', '&:hover': { bgcolor: '#25d36618' } }}
        >
          <WhatsAppIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <Tooltip title={copied ? 'Zkopírováno!' : 'Kopírovat odkaz'}>
        <IconButton
          size="small"
          onClick={handleCopy}
          sx={{ color: copied ? '#2e7d32' : 'text.secondary', '&:hover': { bgcolor: 'action.hover' } }}
        >
          {copied ? <CheckIcon fontSize="small" /> : <LinkIcon fontSize="small" />}
        </IconButton>
      </Tooltip>
    </Box>
  )
}
