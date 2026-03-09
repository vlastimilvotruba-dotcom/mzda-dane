// src/components/SalaryWizard/StepTaxCredits.js
import React from 'react';
import {
  Box,
  Typography,
  FormControlLabel,
  Checkbox,
  TextField,
  Button,
} from '@mui/material';

function StepTaxCredits({ form, onChange, onBack, onNext }) {
  const handleCheckbox = (e) => {
    const { name, checked } = e.target;
    onChange({ [name]: checked });
  };

  const handleChildren = (e) => {
    onChange({ childrenCount: Number(e.target.value) || 0 });
  };

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
        label="Počet dětí"
        value={form.childrenCount}
        onChange={handleChildren}
        inputProps={{ min: 0 }}
      />

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
