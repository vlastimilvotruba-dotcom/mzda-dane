import React from 'react';
import { Box, Typography, Button, Chip, Paper, useMediaQuery, useTheme } from '@mui/material';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import BoltIcon from '@mui/icons-material/Bolt';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useRouter } from 'next/router';

function PromoCard({ icon: Icon, accent, bg, borderColor, label, headline, description, chips, count, href, ctaLabel }) {
  const router = useRouter();
  return (
    <Paper
      elevation={0}
      sx={{
        flex: 1,
        minWidth: 0,
        border: `1.5px solid ${borderColor}`,
        borderRadius: 3,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        transition: 'box-shadow 0.2s, transform 0.15s',
        '&:hover': { boxShadow: 6, transform: 'translateY(-2px)' },
      }}
    >
      {/* barevný pruh nahoře */}
      <Box sx={{ height: 4, background: `linear-gradient(90deg, ${accent} 0%, ${borderColor} 100%)` }} />

      <Box sx={{ p: { xs: 2.5, sm: 3 }, display: 'flex', flexDirection: 'column', gap: 1.5, flexGrow: 1, bgcolor: bg }}>
        {/* hlavička */}
        <Box display="flex" alignItems="center" justifyContent="space-between" flexWrap="wrap" gap={1}>
          <Box display="flex" alignItems="center" gap={1}>
            <Box
              sx={{
                width: 34, height: 34, borderRadius: '9px',
                background: `linear-gradient(135deg, ${accent} 0%, ${borderColor} 100%)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}
            >
              <Icon sx={{ color: 'white', fontSize: 18 }} />
            </Box>
            <Typography variant="subtitle1" fontWeight={800} sx={{ color: accent }}>
              {label}
            </Typography>
          </Box>
          <Chip
            icon={<AccessTimeIcon sx={{ fontSize: '0.85rem !important' }} />}
            label={`${count} zpráv s komentářem`}
            size="small"
            sx={{ bgcolor: `${accent}18`, color: accent, fontWeight: 600, fontSize: '0.72rem' }}
          />
        </Box>

        {/* nejnovější titulek */}
        {headline && (
          <Box sx={{ bgcolor: `${accent}0d`, borderLeft: `3px solid ${accent}`, borderRadius: '0 6px 6px 0', px: 1.5, py: 1 }}>
            <Typography variant="caption" color="text.secondary" display="block" mb={0.3} fontWeight={600}>
              Nejnovější
            </Typography>
            <Typography variant="body2" fontWeight={600} sx={{ color: accent, lineHeight: 1.4 }}>
              {headline}
            </Typography>
          </Box>
        )}

        {/* popis */}
        <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.65, flexGrow: 1 }}>
          {description}
        </Typography>

        {/* čipy témat */}
        <Box display="flex" flexWrap="wrap" gap={0.75}>
          {chips.map((chip) => (
            <Chip key={chip} label={chip} size="small" sx={{ fontSize: '0.72rem', bgcolor: `${accent}14`, color: accent }} />
          ))}
        </Box>

        {/* CTA */}
        <Button
          variant="contained"
          endIcon={<ArrowForwardIcon />}
          onClick={() => router.push(href)}
          sx={{
            mt: 0.5,
            alignSelf: 'flex-start',
            background: `linear-gradient(90deg, ${accent} 0%, ${borderColor} 100%)`,
            color: 'white',
            fontWeight: 700,
            textTransform: 'none',
            borderRadius: 2,
            px: 2.5,
            boxShadow: 'none',
            '&:hover': { boxShadow: 3, filter: 'brightness(1.08)' },
          }}
        >
          {ctaLabel}
        </Button>
      </Box>
    </Paper>
  );
}

export default function HomePromo({ latestAktualityTitle, latestEnergetikaTitle, aktualityCount, energetikaCount }) {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box mt={4} mb={1}>
      <Typography variant="overline" fontWeight={700} color="text.secondary" sx={{ letterSpacing: 1.2, display: 'block', mb: 1.5 }}>
        Sledujte novinky
      </Typography>
      <Box display="flex" flexDirection={isSmall ? 'column' : 'row'} gap={2}>
        <PromoCard
          icon={NewspaperIcon}
          accent="#1565c0"
          bg="#f0f4ff"
          borderColor="#90caf9"
          label="Aktuality – daně & mzdy"
          headline={latestAktualityTitle}
          count={aktualityCount ?? 12}
          description="Sledujeme změny v legislativě, mzdách a daních. Každou novinku komentujeme s konkrétním dopadem pro zaměstnance i OSVČ – ne jen zpráva, ale i co pro vás znamená."
          chips={['Daňové přiznání', 'OSVČ', 'Zaměstnanci', 'Nemovitosti', 'DPH']}
          href="/aktuality"
          ctaLabel="Číst aktuality"
        />
        <PromoCard
          icon={BoltIcon}
          accent="#1b5e20"
          bg="#f6fbf6"
          borderColor="#81c784"
          label="Energetika – EV & FVE"
          headline={latestEnergetikaTitle}
          count={energetikaCount ?? 15}
          description="Výběr zpráv z elektromobility a fotovoltaiky – vždy s vazbou na české podmínky a naše kalkulačky. Hybrid.cz i světový Electrek, vše česky s editorským komentářem."
          chips={['Elektromobily', 'FVE & Solár', 'Ceny energií', 'EU trh', 'Nabíjení']}
          href="/energetika"
          ctaLabel="Číst energetiku"
        />
      </Box>
    </Box>
  );
}
