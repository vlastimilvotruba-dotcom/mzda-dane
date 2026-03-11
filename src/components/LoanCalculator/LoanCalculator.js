import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Divider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Alert,
} from '@mui/material';
import { calculateLoan } from '../../logic/loan2026';

const initialForm = {
  loanAmount: '',
  interestRate: '',
  loanMonths: '',
};

function LoanCalculator() {
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

        setForm((prev) => ({ ...prev, [name]: num === 0 && value === '' ? '' : num }));
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

  const years = Math.floor(Number(form.loanMonths) / 12);
  const remainingMonths = Number(form.loanMonths) % 12;

  return (
    <Box display="flex" flexDirection="column" gap={2}>

      {/* Sekce: Parametry půjčky */}
      <Typography variant="subtitle1" fontWeight={600}>
        Parametry půjčky
      </Typography>

        <TextField
        fullWidth
        type="number"
        name="loanAmount"
        label="Výše půjčky (Kč)"
        value={form.loanAmount}
        onChange={handleChange}
        inputProps={{ min: 1000, max: 50000000, step: 1000 }}
        />

        <TextField
        fullWidth
        type="number"
        name="interestRate"
        label="Roční úroková sazba (% p.a.)"
        value={form.interestRate}
        onChange={handleChange}
        inputProps={{ min: 0, max: 50, step: 0.1 }}
        />

        <TextField
        fullWidth
        type="number"
        name="loanMonths"
        label="Doba splácení (počet měsíců)"
        value={form.loanMonths}
        onChange={handleChange}
        inputProps={{ min: 1, max: 360 }}
        />


      {/* Pomocný přepočet měsíců na roky */}
      {Number(form.loanMonths) > 0 && (
        <Typography variant="body2" color="text.secondary">
          {years > 0 && `${years} ${years === 1 ? 'rok' : years < 5 ? 'roky' : 'let'}`}
          {years > 0 && remainingMonths > 0 && ' a '}
          {remainingMonths > 0 && `${remainingMonths} ${remainingMonths === 1 ? 'měsíc' : remainingMonths < 5 ? 'měsíce' : 'měsíců'}`}
        </Typography>
      )}

      <Divider />

      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Button
          variant="text"
          onClick={handleReset}
          disabled={!result}
        >
          Začít znovu
        </Button>
        <Button
          variant="contained"
          size="large"
          disabled={!canCalculate}
          onClick={handleCalculate}
        >
          Spočítat
        </Button>
      </Box>

      {/* Výsledky */}
      {result && (
        <>
          <Divider />

          <Typography variant="subtitle1" fontWeight={600}>
            Výsledek
          </Typography>

          <Paper variant="outlined">
            <Box p={2}>
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
                    <TableCell align="right">
                      {result.annualRate} % p.a.
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Doba splácení</TableCell>
                    <TableCell align="right">
                      {result.months} měsíců
                    </TableCell>
                  </TableRow>

                  <TableRow sx={{ bgcolor: 'action.hover' }}>
                    <TableCell>
                      <strong>Měsíční splátka</strong>
                    </TableCell>
                    <TableCell align="right">
                      <strong>
                        {result.monthlyPayment.toLocaleString('cs-CZ')} Kč
                      </strong>
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
                    <TableCell align="right">
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
            </Box>
          </Paper>

          {result.totalInterest > result.principal && (
            <Alert severity="warning" variant="outlined">
              Celkové úroky převyšují výši půjčky. Zvažte kratší dobu
              splácení nebo nižší úrokovou sazbu.
            </Alert>
          )}

          {result.annualRate === 0 && (
            <Alert severity="info" variant="outlined">
              Zadali jste bezúročnou půjčku – měsíční splátka je prostý
              podíl jistiny a počtu měsíců.
            </Alert>
          )}
        </>
      )}
    </Box>
  );
}

export default LoanCalculator;
