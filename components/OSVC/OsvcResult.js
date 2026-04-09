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
import PaidIcon from '@mui/icons-material/Paid';

const PRIMARY = '#6a1b9a';
const POSITIVE = '#2e7d32';
const NEGATIVE = '#c62828';

function fmt(n) {
  return Math.round(n).toLocaleString('cs-CZ') + ' Kč';
}

function percent(n) {
  return (n * 100).toFixed(1).replace('.', ',') + ' %';
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

function Row({ label, value, bold, color, tooltip, indent }) {
  return (
    <Box display="flex" justifyContent="space-between" alignItems="center" py={0.45} pl={indent ? 2 : 0} gap={2}>
      <Box display="flex" alignItems="center">
        <Typography variant="body2" fontWeight={bold ? 700 : 400} color={color || 'text.primary'}>
          {label}
        </Typography>
        {tooltip && <Info text={tooltip} />}
      </Box>
      <Typography variant="body2" fontWeight={bold ? 700 : 400} color={color || 'text.primary'} sx={{ textAlign: 'right' }}>
        {value}
      </Typography>
    </Box>
  );
}

export default function OsvcResult({ result, onBack, onReset }) {
  if (!result) return null;

  const flatTaxKnown = result.flatTax.monthlyAmount != null;
  const flatTaxColor = result.flatTax.isFlatTaxCheaper ? POSITIVE : NEGATIVE;

  const hasBonus    = result.childBonus > 0;
  const taxPositive = result.finalTax > 0;
  const heroColor   = hasBonus ? POSITIVE : (taxPositive ? NEGATIVE : PRIMARY);
  const heroBg      = hasBonus ? '#f1f8e9'  : (taxPositive ? '#ffebee' : '#f3e5f5');
  const heroLabel   = hasBonus ? 'Daňový bonus – stát vám vrátí' : 'Daň z příjmů k zaplacení';
  const heroAmount  = hasBonus ? result.childBonus : result.finalTax;
  const heroDesc    = hasBonus
    ? 'Daňový bonus na děti přesáhl daňovou povinnost. Přeplatek vám vyplatí stát.'
    : taxPositive
      ? 'Daň je nutné uhradit do 1. dubna 2026 (nebo spolu s podáním daňového přiznání).'
      : 'Daňová zátěž byla zcela pokryta slevami na dani, daň je nulová.';

  return (
    <Box display="flex" flexDirection="column" gap={2.5}>
      <Paper
        elevation={0}
        sx={{
          bgcolor: heroBg,
          border: '2px solid',
          borderColor: heroColor,
          borderRadius: 3,
          p: 3,
          textAlign: 'center',
        }}
      >
        <Box display="flex" alignItems="center" justifyContent="center" gap={1} mb={0.5}>
          {hasBonus
            ? <CheckCircleOutlineIcon sx={{ color: POSITIVE, fontSize: 28 }} />
            : taxPositive
              ? <WarningAmberIcon sx={{ color: NEGATIVE, fontSize: 28 }} />
              : <CheckCircleOutlineIcon sx={{ color: PRIMARY, fontSize: 28 }} />
          }
          <Typography variant="body2" fontWeight={700} sx={{ color: heroColor }}>
            {heroLabel}
          </Typography>
        </Box>

        <Typography variant="h4" fontWeight={900} sx={{ color: heroColor }}>
          {fmt(heroAmount)}
        </Typography>

        <Typography variant="body2" color="text.secondary" mt={1}>
          {heroDesc}
        </Typography>

        <Box display="flex" justifyContent="center" flexWrap="wrap" gap={1} mt={1.5}>
          <Chip
            label={`Čistý zisk: ${fmt(result.takeHome)} (${fmt(result.monthlyTakeHome)}/měsíc)`}
            size="small"
            sx={{ bgcolor: '#ede7f6', color: PRIMARY, fontWeight: 600 }}
          />
          <Chip
            label={`Celkové odvody: ${fmt(result.totalBurden)}`}
            size="small"
            sx={{ bgcolor: '#ede7f6', color: PRIMARY, fontWeight: 700 }}
          />
        </Box>
      </Paper>

      <Paper elevation={2} sx={{ borderRadius: 3, p: 2.5 }}>
        <Typography variant="subtitle2" fontWeight={700} sx={{ color: PRIMARY }} mb={1}>
          Přehled výpočtu
        </Typography>

        <Row label="Roční příjmy" value={fmt(result.annualIncome)} bold />
        <Row
          label={result.expense.label}
          value={`−${fmt(result.expense.expenses)}`}
          color="text.secondary"
          tooltip="U procentních výdajů kalkulačka respektuje zákonný limit pro uplatnění paušálu."
        />
        <Row label="Zisk před odvody" value={fmt(result.profit)} bold />
        <Divider sx={{ my: 1 }} />
        <Row label="Sociální pojištění" value={`−${fmt(result.social.insurance)}`} color="text.secondary" />
        <Row label="Zdravotní pojištění" value={`−${fmt(result.health.insurance)}`} color="text.secondary" />
        <Row label="Daň z příjmů po slevách" value={`−${fmt(result.finalTax)}`} color="text.secondary" />
        {result.childBonus > 0 && (
          <Row label="Daňový bonus na děti" value={`+${fmt(result.childBonus)}`} bold color={POSITIVE} />
        )}
        <Divider sx={{ my: 1 }} />
        <Row label="Celkové zatížení" value={fmt(result.totalBurden)} bold color={PRIMARY} />
        <Row label="Efektivní zatížení ze zisku" value={percent(result.effectiveRate)} tooltip="Podíl odvodů na zisku po odečtení výdajů." />
      </Paper>

      {result.social.usedMinimum && (
        <Alert severity="info" variant="outlined">
          U sociálního pojištění byl použit zákonný minimální odvod pro hlavní činnost v roce 2025.
        </Alert>
      )}

      {result.health.usedMinimum && (
        <Alert severity="info" variant="outlined">
          U zdravotního pojištění byl použit zákonný minimální odvod pro hlavní činnost v roce 2025.
        </Alert>
      )}

      {result.activityType === 'secondary' && !result.social.participationRequired && (
        <Alert severity="success" variant="outlined">
          U vedlejší činnosti zisk nedosáhl rozhodné částky {fmt(result.social.secondaryThreshold)}, takže sociální pojištění za rok 2025 nevzniká.
        </Alert>
      )}

      <Accordion elevation={2} sx={{ borderRadius: '12px !important' }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="subtitle2" fontWeight={700}>
            Detail daně a slev
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Row label="Daňový základ po odpočtech" value={fmt(result.taxBase)} bold />
          {result.otherDeductions > 0 && (
            <Row label="Uplatněné nezdanitelné odpočty" value={fmt(result.otherDeductions)} indent />
          )}
          <Row label="Daň před slevami" value={fmt(result.taxBeforeCredits)} />
          <Row label="Sleva na poplatníka" value={fmt(result.credits.basicCredit)} indent />
          {result.credits.spouseCredit > 0 && (
            <Row label="Sleva na manžela/manželku" value={fmt(result.credits.spouseCredit)} indent />
          )}
          {result.credits.disabilityCredit > 0 && (
            <Row label="Sleva na invaliditu" value={fmt(result.credits.disabilityCredit)} indent />
          )}
          {result.credits.ztpPCredit > 0 && (
            <Row label="Sleva ZTP/P" value={fmt(result.credits.ztpPCredit)} indent />
          )}
          {result.credits.child1Credit > 0 && (
            <Row label="Zvýhodnění 1. dítě" value={fmt(result.credits.child1Credit)} indent />
          )}
          {result.credits.child2Credit > 0 && (
            <Row label="Zvýhodnění 2. dítě" value={fmt(result.credits.child2Credit)} indent />
          )}
          {result.credits.child3plusCredit > 0 && (
            <Row label="Zvýhodnění 3. a další děti" value={fmt(result.credits.child3plusCredit)} indent />
          )}
          {result.credits.childZtpPBonus > 0 && (
            <Row label="Příplatek za dítě ZTP/P" value={fmt(result.credits.childZtpPBonus)} indent />
          )}
          <Divider sx={{ my: 1 }} />
          <Row label="Celkem slevy a zvýhodnění" value={fmt(result.credits.totalCredits)} bold />
        </AccordionDetails>
      </Accordion>

      <Accordion elevation={2} sx={{ borderRadius: '12px !important' }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="subtitle2" fontWeight={700}>
            Pojistné a navazující zálohy
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Row label="Vyměřovací základ (50 % zisku)" value={fmt(result.assessmentBaseRaw)} />
          <Row label="Sociální pojištění za rok 2025" value={fmt(result.social.insurance)} bold />
          <Row label="Zdravotní pojištění za rok 2025" value={fmt(result.health.insurance)} bold />
          <Divider sx={{ my: 1 }} />
          <Row
            label="Orientační nová měsíční záloha na sociální"
            value={result.social.nextAdvanceMonthly > 0 ? fmt(result.social.nextAdvanceMonthly) : '0 Kč'}
            tooltip="Po podání přehledu bývá nová záloha odvozena od posledního ročního výsledku, minimálně však dle zákonných limitů."
          />
          <Row
            label="Orientační nová měsíční záloha na zdravotní"
            value={result.health.nextAdvanceMonthly > 0 ? fmt(result.health.nextAdvanceMonthly) : '0 Kč'}
            tooltip={
              result.activityType === 'secondary'
                ? 'Vedlejší OSVČ zálohy na ZP neplatí — pojistné uhradí až po podání přehledu o příjmech.'
                : 'Po podání přehledu bude nová záloha odvozena od ročního výsledku, minimlně však 3 306 Kč/měsíč (minimální záloha VZP pro rok 2026).'
            }
          />
        </AccordionDetails>
      </Accordion>

      <Paper elevation={2} sx={{ borderRadius: 3, p: 2.5 }}>
        <Box display="flex" alignItems="center" gap={1} mb={1}>
          <PaidIcon sx={{ color: PRIMARY }} />
          <Typography variant="subtitle2" fontWeight={700} sx={{ color: PRIMARY }}>
            Srovnání s paušální daní 2025
          </Typography>
        </Box>

        {flatTaxKnown ? (
          <>
            <Row label={`Paušální režim – ${result.flatTax.band}. pásmo`} value={`${fmt(result.flatTax.monthlyAmount)} / měsíc`} bold />
            <Row label="Ročně v paušálním režimu" value={fmt(result.flatTax.yearlyAmount)} />
            <Row
              label={result.flatTax.isFlatTaxCheaper ? 'Paušální daň by byla levnější o' : 'Paušální daň by byla dražší o'}
              value={fmt(result.flatTax.cheaperBy)}
              bold
              color={flatTaxColor}
            />
            <Typography variant="body2" color="text.secondary" mt={1}>
              {result.flatTax.note}
            </Typography>
          </>
        ) : (
          <Alert severity="info" variant="outlined">
            {result.flatTax.note}
          </Alert>
        )}
      </Paper>

      {!result.hasIncomeForBonus && result.credits.childrenTotal > 0 && (
        <Alert severity="warning" variant="outlined">
          Pro výplatu daňového bonusu na děti musí roční příjmy dosáhnout alespoň 124 800 Kč.
        </Alert>
      )}

      <Box display="flex" justifyContent="space-between" gap={1} mt={1}>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={onBack}
          sx={{
            borderRadius: 2,
            color: PRIMARY,
            borderColor: PRIMARY,
            '&:hover': { borderColor: '#4a148c', bgcolor: '#f3e5f5' },
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
            '&:hover': { borderColor: '#4a148c', bgcolor: '#f3e5f5' },
          }}
        >
          Začít znovu
        </Button>
      </Box>
    </Box>
  );
}
