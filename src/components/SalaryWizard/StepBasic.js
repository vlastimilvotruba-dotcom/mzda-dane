import React from 'react';
import {
  Box,
  TextField,
  MenuItem,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  Alert,
} from '@mui/material';

function StepBasic({ form, onChange, onNext }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange({ [name]: value });
  };

  const canNext = form.grossSalary !== '' && Number(form.grossSalary) > 0;

  const isDPP = form.contractType === 'DPP';
  const isDPC = form.contractType === 'DPC';

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <Typography variant="h6">Krok 1 – Základní údaje</Typography>

      <FormControl fullWidth>
        <InputLabel id="contractType-label">Typ smlouvy</InputLabel>
        <Select
          labelId="contractType-label"
          label="Typ smlouvy"
          name="contractType"
          value={form.contractType}
          onChange={handleChange}
        >
          <MenuItem value="HPP">HPP</MenuItem>
          <MenuItem value="DPP">DPP</MenuItem>
          <MenuItem value="DPC">DPČ</MenuItem>
        </Select>
      </FormControl>

      {isDPP && (
        <Alert severity="info" variant="outlined">
          U DPP se do 12&nbsp;000&nbsp;Kč u jednoho zaměstnavatele
          neodvádí sociální ani zdravotní pojištění. Při vyšší odměně
          se pojištění počítá stejně jako u HPP.
        </Alert>
      )}

      {isDPC && (
        <Alert severity="info" variant="outlined">
          U DPČ se do 4&nbsp;500&nbsp;Kč měsíčně neodvádí sociální ani
          zdravotní pojištění. Při vyšší odměně se pojištění počítá
          stejně jako u HPP.
        </Alert>
      )}

      <TextField
        fullWidth
        type="number"
        name="grossSalary"
        label="Hrubá mzda / odměna (Kč / měsíc)"
        value={form.grossSalary}
        onChange={handleChange}
        inputProps={{ min: 0 }}
      />

      <FormControl fullWidth>
        <InputLabel id="disability-label">Invalidita</InputLabel>
        <Select
          labelId="disability-label"
          label="Invalidita"
          name="disability"
          value={form.disability}
          onChange={handleChange}
        >
          <MenuItem value="none">Žádná</MenuItem>
          <MenuItem value="1">I. stupeň</MenuItem>
          <MenuItem value="2">II. stupeň</MenuItem>
          <MenuItem value="3">III. stupeň</MenuItem>
        </Select>
      </FormControl>

      <Box display="flex" justifyContent="flex-end" mt={2}>
        <Button
          variant="contained"
          disabled={!canNext}
          onClick={onNext}
        >
          Další
        </Button>
      </Box>
    </Box>
  );
}

export default StepBasic;
