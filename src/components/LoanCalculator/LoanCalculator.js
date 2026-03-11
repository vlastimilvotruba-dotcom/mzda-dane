import React, { useState } from 'react';
import {
  Box, TextField, Button, Typography, Divider, Paper,
  Table, TableBody, TableCell, TableRow, Alert,
  Tooltip, IconButton,
} from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { calculateLoan } from '../../logic/loan2026';

// Zelená – analogicky k ostatním kalkulačkám
const PRIMARY = '#2e7d32';
const PRIMARY_HOVER = '#1b5e20';

const initialForm = {
  loanAmount: '',
  interestRate: '',
  loanMonths: '',
};

// ── Helpers ──────────────────────────────────────────────
function Info({ text }) {
  return (
    <Tooltip title={text} arrow placement="top">
      <IconButton size="small" sx={{ ml: 0.5, p: 0, mb: 0.2 }}>
        <InfoOutlinedIcon fontSize="small" color="action" />
      </IconButton>
    </Tooltip>
  );
}

function SectionTitle({ children }) {
  return (
    <Typography variant="subtitle2" fontWeight={700} mb={1.5} mt={1} sx={{ color: PRIMARY }}>
      {children}
    </Typography>
  );
}

function FieldRow({ label, tooltip, children }) {
  return (
    <Box mb={2}>
      <Box display="flex" alignItems="center" mb={0.5}>
        <Typography variant="body2" color="text.secondary">{label}</Typography>
        {tooltip && <Info text={tooltip} />}
      </Box>
      {children}
    </Box>
  );
}

// ── Komponenta ────────────────────────────────────────────
export default function LoanCalculator() {
  const [form, setForm] = useState(initialForm);
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let num = Number(value);
    if (name === 'loanAmount') {
      if (num > 50000000) num = 50000000;
      if (num < 0) num = 0;
    } else if (name === 'interestRate') {
      if (num > 50) num = 50;
      if (num < 0) num = 0;
    } else if (name === 'loanMonths') {
      if (num > 360) num = 360;
      if (num < 0) num = 0;
    }
    setForm((prev) => ({ ...prev, [name]: num === 0 && value ? num : value === '' ? '' : num }));
  };

  const handleCalculate = () => {
    const res = calculateLoan(form);
    setResult(res);
  };

  const handleReset = () => {
    setForm(initialForm);
    setResult(null);
  };

  const canCalculate =
    Number(form.loanAmount) > 0 &&
    Number(form.interestRate) >= 0 &&
    Number(form.loanMonths) > 0;

  const months = Number(form.loanMonths);
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;

  const monthsLabel = (() => {
    if (!months) return null;
    const y = years > 0
      ? `${years} ${years === 1 ? 'rok' : years < 5 ? 'roky' : 'let'}`
      : '';
    const m = remainingMonths > 0
      ? `${remainingMonths} ${remainingMonths === 1 ? 'měsíc' : remainingMonths < 5 ? 'měsíce' : 'měsíců'}`
      : '';
    return [y, m].filter(Boolean).join(' a ');
  })();

  return (
    <Box display="flex" flexDirection="column" gap={2}>

      {/* ── SEKCE: Parametry půjčky ── */}
      <SectionTitle>Parametry půjčky</SectionTitle>

      <FieldRow
        label="Výše půjčky (Kč)"
        tooltip="Celková částka, kterou si chcete půjčit. Maximum je 50 000 000 Kč."
      >
        <TextField
          fullWidth
          type="number"
          name="loanAmount"
          size="small"
          value={form.loanAmount}
          onChange={handleChange}
          inputProps={{ min: 1000, max: 50000000, step: 1000 }}
        />
      </FieldRow>

      <FieldRow
        label="Roční úroková sazba (% p.a.)"
        tooltip="Roční úroková sazba v procentech. Zadejte 0 pro bezúročnou půjčku. Typická sazba hypotéky je 4–6 % p.a."
      >
        <TextField
          fullWidth
          type="number"
          name="interestRate"
          size="small"
          value={form.interestRate}
          onChange={handleChange}
          inputProps={{ min: 0, max: 50, step: 0.1 }}
        />
      </FieldRow>

      <FieldRow
        label="Doba splácení (počet měsíců)"
        tooltip="Délka splácení v měsících. Např. 360 měsíců = 30 let. Hypotéky jsou obvykle na 20–30 let."
      >
        <TextField
          fullWidth
          type="number"
          name="loanMonths"
          size="small"
          value={form.loanMonths}
          onChange={handleChange}
          inputProps={{ min: 1, max: 360 }}
        />
      </FieldRow>

      {/* Pomocný přepočet měsíců na roky */}
      {monthsLabel && (
        <Typography variant="body2" color="text.secondary" sx={{ mt: -1.5, mb: 1 }}>
          = {monthsLabel}
        </Typography>
      )}

      <Divider sx={{ my: 1 }} />

      {/* ── Tlačítka ── */}
      <Box display="flex" flexDirection="column" gap={1.5}>
        <Button
          variant="contained"
          fullWidth
          size="large"
          disabled={!canCalculate}
          endIcon={<ArrowForwardIcon />}
          onClick={handleCalculate}
          sx={{
            borderRadius: 2,
            py: 1.5,
            fontWeight: 700,
            bgcolor: PRIMARY,
            '&:hover': { bgcolor: PRIMARY_HOVER },
          }}
        >
          Spočítat
        </Button>

        <Button
          variant="text"
          fullWidth
          size="small"
          startIcon={<RestartAltIcon />}
          onClick={handleReset}
          disabled={!result}
          sx={{ color: 'text.secondary', textTransform: 'none' }}
        >
          Začít znovu
        </Button>
      </Box>

      {/* ── VÝSLEDKY ── */}
      {result && (
        <>
          <Divider sx={{ my: 1 }} />

          <SectionTitle>Výsledek</SectionTitle>

          {/* Hlavní výsledek – měsíční splátka */}
          <Paper
            elevation={0}
            sx={{
              bgcolor: '#e8f5e9',
              border: '1.5px solid',
              borderColor: PRIMARY,
              borderRadius: 3,
              p: 3,
              textAlign: 'center',
            }}
          >
            <Typography variant="body2" color="text.secondary" mb={0.5}>
              Měsíční splátka
            </Typography>
            <Typography variant="h4" fontWeight={900} sx={{ color: PRIMARY }}>
              {result.monthlyPayment.toLocaleString('cs-CZ')} Kč
            </Typography>
            <Typography variant="body2" color="text.secondary" mt={0.5}>
              po dobu {result.months} měsíců
            </Typography>
          </Paper>

          {/* Detail */}
          <Paper elevation={2} sx={{ borderRadius: 3, p: 2.5 }}>
            <Typography variant="subtitle2" fontWeight={700} sx={{ color: PRIMARY }} mb={1}>
              Přehled splácení
            </Typography>
            <Table size="small">
              <TableBody>
                <TableRow>
                  <TableCell>Výše půjčky</TableCell>
                  <TableCell align="right">
                    {result.principal.toLocaleString('cs-CZ')} Kč
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Roční úroková sazba</TableCell>
                  <TableCell align="right">{result.annualRate} % p.a.</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Doba splácení</TableCell>
                  <TableCell align="right">{result.months} měsíců</TableCell>
                </TableRow>
                <TableRow sx={{ bgcolor: 'action.hover' }}>
                  <TableCell><strong>Měsíční splátka</strong></TableCell>
                  <TableCell align="right">
                    <strong>{result.monthlyPayment.toLocaleString('cs-CZ')} Kč</strong>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Celkem zaplaceno</TableCell>
                  <TableCell align="right">
                    {result.totalPaid.toLocaleString('cs-CZ')} Kč
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Z toho úroky</TableCell>
                  <TableCell align="right" sx={{ color: 'error.main' }}>
                    {result.totalInterest.toLocaleString('cs-CZ')} Kč
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Z toho jistina</TableCell>
                  <TableCell align="right">
                    {result.principal.toLocaleString('cs-CZ')} Kč
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Paper>

          {/* Upozornění */}
          {result.totalInterest > result.principal && (
            <Alert severity="warning" variant="outlined">
              Celkové úroky převyšují výši půjčky. Zvažte kratší dobu splácení nebo nižší úrokovou sazbu.
            </Alert>
          )}
          {result.annualRate === 0 && (
            <Alert severity="info" variant="outlined">
              Zadali jste bezúročnou půjčku – měsíční splátka je prostý podíl jistiny a počtu měsíců.
            </Alert>
          )}
        </>
      )}
    </Box>
  );
}
