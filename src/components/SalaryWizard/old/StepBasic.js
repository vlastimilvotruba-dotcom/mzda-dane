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
  FormControlLabel,
  Switch,
} from '@mui/material';

function StepBasic({ form, onChange, onNext }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange({ [name]: value });
  };

  const canNext = form.grossSalary !== '' && Number(form.grossSalary) > 0;

  const isDPP = form.contractType === 'DPP';
  const isDPC = form.contractType === 'DPC';
  const isDohoda = isDPP || isDPC;

  // Limit pod který platí srážková daň (pokud není prohlášení)
  const limitInfo = isDPP ? '12 000 Kč' : '4 500 Kč';
  const gross = Number(form.grossSalary) || 0;
  const isPodLimitem = isDPP
    ? gross < 12000
    : isDPC
    ? gross < 4500
    : false;

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
          U DPP se do 11&nbsp;999&nbsp;Kč u jednoho zaměstnavatele
          neodvádí sociální ani zdravotní pojištění. Při odměně
          12&nbsp;000&nbsp;Kč a více se pojištění počítá stejně jako u HPP.
        </Alert>
      )}

      {isDPC && (
        <Alert severity="info" variant="outlined">
          U DPČ se do 4&nbsp;499&nbsp;Kč měsíčně neodvádí sociální ani
          zdravotní pojištění. Při odměně 4&nbsp;500&nbsp;Kč a více
          se pojištění počítá stejně jako u HPP.
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

      {/* Prohlášení poplatníka – jen pro DPP/DPČ */}
      {isDohoda && (
        <Box>
          <FormControlLabel
            control={
              <Switch
                checked={form.taxDeclaration ?? true}
                onChange={(e) => onChange({ taxDeclaration: e.target.checked })}
                color="primary"
              />
            }
            label="Podepsal/a jsem prohlášení poplatníka"
          />
          {/* Informace o dopadu podle situace */}
          {form.taxDeclaration ? (
            <Alert severity="success" variant="outlined" sx={{ mt: 1 }}>
              {'S podepsaným prohlášením se uplatní zálohová daň a slevy (základní sleva 2 570 Kč/měs. a další).'}
            </Alert>
          ) : isPodLimitem ? (
            <Alert severity="warning" variant="outlined" sx={{ mt: 1 }}>
              {`Bez prohlášení se z odměny do ${limitInfo} sráží srážková daň 15 % – slevy na dani nelze uplatnit.`}
            </Alert>
          ) : (
            <Alert severity="info" variant="outlined" sx={{ mt: 1 }}>
              {'Nad limitem pro odvody se daní zálohově i bez prohlášení, slevy však nelze uplatnit.'}
            </Alert>
          )}
        </Box>
      )}

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
