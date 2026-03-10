import React from 'react';
import {
  Box,
  Typography,
  FormControlLabel,
  Checkbox,
  TextField,
  Button,
  Alert,
} from '@mui/material';

function StepTaxCredits({ form, onChange, onBack, onNext }) {
  const handleCheckbox = (e) => {
    const { name, checked } = e.target;
    onChange({ [name]: checked });
  };

   const handleChildrenTotal = (e) => {
    let total = Number(e.target.value) || 0;
    if (total < 0) total = 0;
    if (total > 10) total = 10;
    const currentZtp = Number(form.childrenZtpP) || 0;
    const safeZtp = Math.min(currentZtp, total);
    onChange({
        childrenCount: total,
        childrenZtpP: safeZtp,
    });
  };

  const handleChildrenZtpP = (e) => {
    const total = Number(form.childrenCount) || 0;
    let ztp = Number(e.target.value) || 0;
    if (ztp > total) ztp = total;
    if (ztp < 0) ztp = 0;
    onChange({ childrenZtpP: ztp });
  };

  const totalChildren = Number(form.childrenCount) || 0;
  const childrenZtpP = Number(form.childrenZtpP) || 0;

  const childrenWarning =
    childrenZtpP > totalChildren
      ? 'Počet dětí ZTP/P nemůže být větší než celkový počet dětí.'
      : null;

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <Typography variant="h6">Krok 2 – Daňové slevy</Typography>

      <FormControlLabel
        control={<Checkbox checked disabled />}
        label="Sleva na poplatníka (automaticky)"
      />

      <FormControlLabel
        control={
          <Checkbox
            name="ztpP"
            checked={form.ztpP}
            onChange={handleCheckbox}
          />
        }
        label="Držitel průkazu ZTP/P"
      />

      <FormControlLabel
        control={
          <Checkbox
            name="spouseClaim"
            checked={form.spouseClaim}
            onChange={handleCheckbox}
          />
        }
        label="Sleva na manžela/manželku"
      />

      <FormControlLabel
        control={
          <Checkbox
            name="student"
            checked={form.student}
            onChange={handleCheckbox}
          />
        }
        label="Sleva na studenta"
      />

      <TextField
        type="number"
        label="Počet dětí (celkem)"
        value={totalChildren}
        onChange={handleChildrenTotal}
        inputProps={{ min: 0, max: 10 }}
      />

      <TextField
        type="number"
        label="Z toho dětí s průkazem ZTP/P"
        value={childrenZtpP}
        onChange={handleChildrenZtpP}
        inputProps={{ min: 0, max: totalChildren }}
      />

      {childrenWarning && (
        <Alert severity="warning" variant="outlined">
          {childrenWarning}
        </Alert>
      )}

      <Box display="flex" justifyContent="space-between" mt={2}>
        <Button variant="outlined" onClick={onBack}>
          Zpět
        </Button>
        <Button variant="contained" onClick={onNext}>
          Spočítat
        </Button>
      </Box>
    </Box>
  );
}

export default StepTaxCredits;
