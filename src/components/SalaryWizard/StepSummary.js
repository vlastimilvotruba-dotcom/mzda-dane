// src/components/SalaryWizard/StepSummary.js
import React from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Button,
} from '@mui/material';

function StepSummary({ form, result, onBack, onRestart }) {
  if (!result) {
    return (
      <Box>
        <Typography variant="h6">Výsledek</Typography>
        <Typography variant="body2">
          Nejprve je potřeba provést výpočet.
        </Typography>
        <Box mt={2}>
          <Button variant="outlined" onClick={onBack}>
            Zpět
          </Button>
        </Box>
      </Box>
    );
  }

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <Typography variant="h6">Krok 3 – Výsledek</Typography>

      <Table size="small">
        <TableBody>
          <TableRow>
            <TableCell>Hrubá mzda</TableCell>
            <TableCell align="right">
              {result.gross.toLocaleString('cs-CZ')} Kč
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Daň z příjmu</TableCell>
            <TableCell align="right">
              {result.tax.toLocaleString('cs-CZ')} Kč
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Sociální pojištění (zaměstnanec)</TableCell>
            <TableCell align="right">
              {result.socialEmployee.toLocaleString('cs-CZ')} Kč
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Zdravotní pojištění (zaměstnanec)</TableCell>
            <TableCell align="right">
              {result.healthEmployee.toLocaleString('cs-CZ')} Kč
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <strong>Čistá mzda</strong>
            </TableCell>
            <TableCell align="right">
              <strong>{result.net.toLocaleString('cs-CZ')} Kč</strong>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Celkové náklady zaměstnavatele</TableCell>
            <TableCell align="right">
              {result.totalEmployerCost.toLocaleString('cs-CZ')} Kč
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <Box display="flex" justifyContent="space-between" mt={2}>
        <Button variant="outlined" onClick={onBack}>
          Zpět
        </Button>
        <Button variant="text" onClick={onRestart}>
          Nový výpočet
        </Button>
      </Box>
    </Box>
  );
}

export default StepSummary;
