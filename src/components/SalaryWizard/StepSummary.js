import React from 'react';
import {
  Box, Typography, Divider, Button, Paper, Chip, Alert,
  Accordion, AccordionSummary, AccordionDetails, Table,
  TableBody, TableCell, TableRow, Tooltip, IconButton,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

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
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      py={0.4}
      pl={indent ? 2 : 0}
    >
      <Box display="flex" alignItems="center">
        <Typography
          variant="body2"
          fontWeight={bold ? 700 : 400}
          color={color || 'text.primary'}
        >
          {label}
        </Typography>
        {tooltip && <Info text={tooltip} />}
      </Box>
      <Typography
        variant="body2"
        fontWeight={bold ? 700 : 400}
        color={color || 'text.primary'}
      >
        {value}
      </Typography>
    </Box>
  );
}

export default function StepSummary({ form, result, onBack, onRestart }) {
  if (!result) return null;

  const {
    gross, net, taxBase, taxBeforeCredits, tax, childBonus,
    socialEmployee, healthEmployee, socialEmployer, healthEmployer,
    totalEmployerCost, socialCapMonth, credits, srazkova,
  } = result;

  const BG_COLOR = '#e3f2fd';
  const PRIMARY = '#1565c0';

  return (
    <Box display="flex" flexDirection="column" gap={2.5}>

      {/* ── Srážková daň upozornění ── */}
      {srazkova && (
        <Alert severity="warning" variant="outlined">
          Bez podepsaného prohlášení poplatníka se uplatňuje srážková daň 15 %.
          Slevy na dani nelze uplatnit. Daň je konečná.
        </Alert>
      )}

      {/* ── Hlavní výsledek ── */}
      <Paper
        elevation={0}
        sx={{
          bgcolor: BG_COLOR,
          border: '1.5px solid',
          borderColor: PRIMARY,
          borderRadius: 3,
          p: 3,
          textAlign: 'center',
        }}
      >
        <Typography variant="body2" color="text.secondary" mb={0.5}>
          Čistá mzda
        </Typography>
        <Typography variant="h4" fontWeight={900} color={PRIMARY}>
          {fmt(net)}
        </Typography>
        <Typography variant="body2" color="text.secondary" mt={0.5}>
          z hrubé mzdy {fmt(gross)}
        </Typography>
        {childBonus > 0 && (
          <Chip
            label={`Daňový bonus na děti: ${fmt(childBonus)}`}
            color="success"
            size="small"
            sx={{ mt: 1.5 }}
          />
        )}
        {socialCapMonth && (
          <Chip
            label={`Roční strop SP dosažen ~v měsíci ${socialCapMonth}`}
            color="info"
            size="small"
            sx={{ mt: 1, ml: 1 }}
          />
        )}
      </Paper>

      {/* ── Mzda a daň ── */}
      <Paper elevation={2} sx={{ borderRadius: 3, p: 2.5 }}>
        <Typography variant="subtitle2" fontWeight={700} color="primary" mb={1}>
          Mzda a daň
        </Typography>

        <Row label="Hrubá mzda" value={fmt(gross)} bold />
        <Row
          label="Daňový základ"
          value={fmt(taxBase)}
          tooltip="Základ pro výpočet daně – u HPP roven hrubé mzdě."
        />
        <Divider sx={{ my: 1 }} />
        <Row
          label={srazkova ? 'Srážková daň (15 %)' : 'Daň před slevami'}
          value={fmt(taxBeforeCredits)}
        />
        {!srazkova && (
          <Row
            label="Slevy na dani"
            value={`− ${fmt(credits.totalCredits)}`}
            color="text.secondary"
            tooltip="Součet všech uplatněných slev a daňového zvýhodnění."
          />
        )}
        <Row label="Výsledná daň" value={fmt(tax)} />
        {childBonus > 0 && (
          <Row
            label="Daňový bonus na děti"
            value={`+ ${fmt(childBonus)}`}
            color="success.main"
            bold
          />
        )}
        <Divider sx={{ my: 1 }} />
        <Row label="Čistá mzda" value={fmt(net)} bold color={PRIMARY} />
      </Paper>

      {/* ── Pojištění ── */}
      <Paper elevation={2} sx={{ borderRadius: 3, p: 2.5 }}>
        <Typography variant="subtitle2" fontWeight={700} color="primary" mb={1}>
          Pojištění a náklady zaměstnavatele
        </Typography>

        <Typography variant="caption" color="text.secondary" display="block" mb={0.5}>
          Odvody zaměstnance
        </Typography>
        <Row
          label="Sociální pojištění"
          value={fmt(socialEmployee)}
          indent
          tooltip="7,1 % z hrubé mzdy"
        />
        <Row
          label="Zdravotní pojištění"
          value={fmt(healthEmployee)}
          indent
          tooltip="4,5 % z hrubé mzdy"
        />

        <Divider sx={{ my: 1 }} />

        <Typography variant="caption" color="text.secondary" display="block" mb={0.5}>
          Odvody zaměstnavatele
        </Typography>
        <Row
          label="Sociální pojištění"
          value={fmt(socialEmployer)}
          indent
          tooltip="24,8 % z hrubé mzdy"
        />
        <Row
          label="Zdravotní pojištění"
          value={fmt(healthEmployer)}
          indent
          tooltip="9 % z hrubé mzdy"
        />
        <Divider sx={{ my: 1 }} />
        <Row
          label="Celkové mzdové náklady zaměstnavatele"
          value={fmt(totalEmployerCost)}
          bold
          tooltip="Hrubá mzda + odvody zaměstnavatele."
        />

        {socialCapMonth && (
          <Alert severity="info" variant="standard" sx={{ mt: 1.5 }}>
            Při této výši mzdy dosáhnete ročního stropu pro sociální pojištění
            přibližně v <strong>{socialCapMonth}. měsíci</strong>. V dalších
            měsících roku se čistá mzda zvýší o ušetřené sociální pojištění.
          </Alert>
        )}
      </Paper>

      {/* ── Detail slev (Accordion) ── */}
      {!srazkova && (
        <Accordion elevation={2} sx={{ borderRadius: '12px !important' }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="subtitle2" fontWeight={700}>
              Detail slev na dani
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Row
              label="Sleva na poplatníka"
              value={fmt(credits.basicCredit)}
              indent
            />
            {credits.ztpPHoldCredit > 0 && (
              <Row
                label="Sleva – držitel průkazu ZTP/P"
                value={fmt(credits.ztpPHoldCredit)}
                indent
              />
            )}
            {credits.spouseCredit > 0 && (
              <Row
                label="Sleva na manžela/manželku"
                value={fmt(credits.spouseCredit)}
                indent
              />
            )}
            {credits.disabilityCredit > 0 && (
              <Row
                label="Sleva na invaliditu"
                value={fmt(credits.disabilityCredit)}
                indent
              />
            )}
            {credits.childrenTotal > 0 && (
              <>
                <Divider sx={{ my: 1 }} />
                <Typography variant="caption" color="text.secondary" display="block" mb={0.5} pl={2}>
                  Daňové zvýhodnění na děti
                </Typography>
                {credits.child1 > 0 && (
                  <Row label="1. dítě" value={fmt(credits.child1)} indent />
                )}
                {credits.child2 > 0 && (
                  <Row label="2. dítě" value={fmt(credits.child2)} indent />
                )}
                {credits.child3plus > 0 && (
                  <Row label="3. a další děti" value={fmt(credits.child3plus)} indent />
                )}
                {credits.childZtpPBonus > 0 && (
                  <Row
                    label="Příplatek ZTP/P dítě"
                    value={fmt(credits.childZtpPBonus)}
                    indent
                  />
                )}
              </>
            )}
            <Divider sx={{ my: 1 }} />
            <Row
              label="Celkové slevy a zvýhodnění"
              value={fmt(credits.totalCredits)}
              bold
            />
          </AccordionDetails>
        </Accordion>
      )}

      {/* ── Ovládací tlačítka ── */}
      <Box display="flex" justifyContent="space-between" gap={1} mt={1}>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={onBack}
          sx={{ borderRadius: 2 }}
        >
          Zpět
        </Button>
        <Button
          variant="outlined"
          startIcon={<RestartAltIcon />}
          onClick={onRestart}
          sx={{ borderRadius: 2 }}
        >
          Začít znovu
        </Button>
      </Box>

    </Box>
  );
}
