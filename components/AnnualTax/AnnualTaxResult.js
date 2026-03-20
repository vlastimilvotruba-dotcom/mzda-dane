import React from 'react';
import {
  Box, Typography, Divider, Button, Paper, Chip, Alert,
  Accordion, AccordionSummary, AccordionDetails,
  Tooltip, IconButton,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

const PRIMARY     = '#e65100';
const COLOR_POS   = '#2e7d32';  // přeplatek – zelená
const COLOR_NEG   = '#c62828';  // nedoplatek – červená

function fmt(n) {
  return Math.round(n).toLocaleString('cs-CZ') + ' Kč';
}

function Info({ text }) {
  return (
    <Tooltip title={text} arrow placement="top">
      <IconButton size="small" sx={{ ml: 0.5, p: 0 }}>
        <InfoOutlinedIcon fontSize="small" color="action" />
      </IconButton>
    </Tooltip>
  );
}

function Row({ label, value, bold, color, indent, tooltip }) {
  return (
    <Box display="flex" justifyContent="space-between" alignItems="center" py={0.4} pl={indent ? 2 : 0}>
      <Box display="flex" alignItems="center">
        <Typography variant="body2" fontWeight={bold ? 700 : 400} color={color || 'text.primary'}>
          {label}
        </Typography>
        {tooltip && <Info text={tooltip} />}
      </Box>
      <Typography variant="body2" fontWeight={bold ? 700 : 400} color={color || 'text.primary'}>
        {value}
      </Typography>
    </Box>
  );
}

export default function AnnualTaxResult({ result, onBack, onReset }) {
  if (!result) return null;

  const {
    deductions, credits, taxDiff, isOverpayment, childBonus,
    hasIncomeForBonus, gross, taxWithheld, taxBase,
    taxBeforeCredits, taxAfterBasicCredits, finalTax,
  } = result;

  const diffAbs     = Math.abs(taxDiff);
  const accentColor = isOverpayment ? COLOR_POS : COLOR_NEG;
  const accentBg    = isOverpayment ? '#f1f8e9'  : '#ffebee';

  return (
    <Box display="flex" flexDirection="column" gap={2.5}>

      {/* ── Hlavní výsledek ── */}
      <Paper
        elevation={0}
        sx={{
          bgcolor: accentBg,
          border: '2px solid',
          borderColor: accentColor,
          borderRadius: 3,
          p: 3,
          textAlign: 'center',
        }}
      >
        {/* Ikona + štítek */}
        <Box display="flex" alignItems="center" justifyContent="center" gap={1} mb={0.5}>
          {isOverpayment
            ? <CheckCircleOutlineIcon sx={{ color: COLOR_POS, fontSize: 28 }} />
            : <WarningAmberIcon sx={{ color: COLOR_NEG, fontSize: 28 }} />
          }
          <Typography variant="body2" fontWeight={700} sx={{ color: accentColor }}>
            {isOverpayment ? 'Přeplatek na dani' : 'Nedoplatek na dani'}
          </Typography>
        </Box>

        {/* Hlavní částka */}
        <Typography variant="h4" fontWeight={900} sx={{ color: accentColor }}>
          {fmt(diffAbs)}
        </Typography>

        {/* Popis */}
        <Typography variant="body2" color="text.secondary" mt={1}>
          {isOverpayment
            ? 'Finanční úřad vám vrátí přeplatek do 30 dní od doručení přiznání.'
            : 'Nedoplatek je nutné uhradit do 1. dubna 2027.'}
        </Typography>

        {childBonus > 0 && (
          <Chip
            label={`Daňový bonus na děti ${fmt(childBonus)}`}
            size="small"
            sx={{ mt: 1.5, bgcolor: '#ffe0b2', color: PRIMARY, fontWeight: 700 }}
          />
        )}

        {!hasIncomeForBonus && credits.childrenTotal > 0 && (
          <Alert severity="warning" sx={{ mt: 2, textAlign: 'left' }}>
            Příjem nedosahuje 6× minimální mzdy (124 800 Kč) – nárok na daňový bonus na děti nevzniká.
          </Alert>
        )}
      </Paper>

      {/* ── Přehled výpočtu ── */}
      <Paper elevation={2} sx={{ borderRadius: 3, p: 2.5 }}>
        <Typography variant="subtitle2" fontWeight={700} sx={{ color: PRIMARY }} mb={1}>
          Přehled výpočtu
        </Typography>
        <Row label="Roční hrubá mzda" value={fmt(gross)} bold />
        <Row
          label="Nezdanitelné části základu daně"
          value={`−${fmt(deductions.total)}`}
          color="text.secondary"
          tooltip="Součet všech uplatněných odpočtů dle §15 ZDP."
        />
        <Row
          label="Základ daně (zaokrouhlený)"
          value={fmt(taxBase)}
          tooltip="Základ daně po odečtení nezdanitelných částí, zaokrouhlený dolů na 100 Kč."
        />
        <Divider sx={{ my: 1 }} />
        <Row
          label="Daň před slevami (15 % / 23 %)"
          value={fmt(taxBeforeCredits)}
          tooltip="15 % do 1 582 812 Kč základu daně, 23 % z části nad tento limit."
        />
        <Row
          label="Slevy na dani (bez dětí)"
          value={`−${fmt(credits.creditsWithoutChildren)}`}
          color="text.secondary"
        />
        <Row label="Daň po základních slevách" value={fmt(taxAfterBasicCredits)} />
        {credits.childrenTotal > 0 && (
          <Row
            label="Daňové zvýhodnění na děti"
            value={`−${fmt(credits.childrenTotal)}`}
            color="text.secondary"
          />
        )}
        <Divider sx={{ my: 1 }} />
        <Row label="Výsledná daňová povinnost" value={fmt(finalTax)} bold />
        {childBonus > 0 && (
          <Row
            label="Daňový bonus na děti"
            value={fmt(childBonus)}
            bold
            color="warning.dark"
          />
        )}
        <Divider sx={{ my: 1 }} />
        <Row label="Zálohy sražené zaměstnavatelem" value={fmt(taxWithheld)} />
        <Row
          label={isOverpayment ? 'Přeplatek' : 'Nedoplatek'}
          value={fmt(diffAbs)}
          bold
          color={accentColor}
        />
      </Paper>

      {/* ── Detail odpočtů ── */}
      {deductions.total > 0 && (
        <Accordion elevation={2} sx={{ borderRadius: '12px !important' }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="subtitle2" fontWeight={700}>
              Detail nezdanitelných částí základu daně
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            {deductions.lifeIns > 0 && (
              <Row label="Životní pojištění" value={fmt(deductions.lifeIns)} indent />
            )}
            {deductions.pensionDeduction > 0 && (
              <Row
                label={`Penzijní spoření (zaplaceno ${fmt(deductions.pensionRaw)}, odpočet)`}
                value={fmt(deductions.pensionDeduction)}
                indent
              />
            )}
            {deductions.mortgage > 0 && (
              <Row label="Úroky z hypotéky" value={fmt(deductions.mortgage)} indent />
            )}
            {deductions.gifts > 0 && (
              <Row label="Dary / bezúplatná plnění" value={fmt(deductions.gifts)} indent />
            )}
            <Divider sx={{ my: 1 }} />
            <Row label="Celkem odpočty" value={fmt(deductions.total)} bold />
          </AccordionDetails>
        </Accordion>
      )}

      {/* ── Detail slev ── */}
      <Accordion elevation={2} sx={{ borderRadius: '12px !important' }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="subtitle2" fontWeight={700}>
            Detail slev na dani
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Row label="Sleva na poplatníka" value={fmt(credits.basicCredit)} indent />
          {credits.disabilityCredit > 0 && (
            <Row label="Sleva na invaliditu" value={fmt(credits.disabilityCredit)} indent />
          )}
          {credits.ztpPCredit > 0 && (
            <Row label="Sleva držitel ZTP/P" value={fmt(credits.ztpPCredit)} indent />
          )}
          {credits.spouseCredit > 0 && (
            <Row label="Sleva na manžela/manželku" value={fmt(credits.spouseCredit)} indent />
          )}
          {credits.child1Credit > 0 && (
            <Row label="Zvýhodnění 1. dítě" value={fmt(credits.child1Credit)} indent />
          )}
          {credits.child2Credit > 0 && (
            <Row label="Zvýhodnění 2. dítě" value={fmt(credits.child2Credit)} indent />
          )}
          {credits.child3plusCredit > 0 && (
            <Row label="Zvýhodnění 3. a další děti" value={fmt(credits.child3plusCredit)} indent />
          )}
          {credits.childZtpPBonus > 0 && (
            <Row label="Příplatek ZTP/P děti" value={fmt(credits.childZtpPBonus)} indent />
          )}
          <Divider sx={{ my: 1 }} />
          <Row label="Celkem slevy a zvýhodnění" value={fmt(credits.totalCredits)} bold />
        </AccordionDetails>
      </Accordion>

      {/* ── Ovládací tlačítka – sjednoceno se StepSummary ── */}
      <Box display="flex" justifyContent="space-between" gap={1} mt={1}>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={onBack}
          sx={{
            borderRadius: 2,
            color: PRIMARY,
            borderColor: PRIMARY,
            '&:hover': { borderColor: '#bf360c', bgcolor: '#fff3e0' },
          }}
        >
          Zpět
        </Button>
        <Button
          variant="outlined"
          startIcon={<RestartAltIcon />}
          onClick={onReset}
          sx={{
            borderRadius: 2,
            color: PRIMARY,
            borderColor: PRIMARY,
            '&:hover': { borderColor: '#bf360c', bgcolor: '#fff3e0' },
          }}
        >
          Začít znovu
        </Button>
      </Box>

    </Box>
  );
}
