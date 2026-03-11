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
  Checkbox,
  Divider,
} from '@mui/material';

function StepForm({ form, onChange, onCalculate }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange({ [name]: value });
  };

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
    onChange({ childrenCount: total, childrenZtpP: safeZtp });
  };

  const handleChildrenZtpP = (e) => {
    const total = Number(form.childrenCount) || 0;
    let ztp = Number(e.target.value) || 0;
    if (ztp > total) ztp = total;
    if (ztp < 0) ztp = 0;
    onChange({ childrenZtpP: ztp });
  };

  const isDPP = form.contractType === 'DPP';
  const isDPC = form.contractType === 'DPC';
  const isDohoda = isDPP || isDPC;

  const gross = Number(form.grossSalary) || 0;
  const taxDeclaration = form.taxDeclaration ?? true;
  const limitInfo = isDPP ? '12 000 Kč' : '4 500 Kč';
  const isPodLimitem = isDPP ? gross < 12000 : isDPC ? gross < 4500 : false;

  const isSrazkova =
    (isDPP && !taxDeclaration && gross < 12000) ||
    (isDPC && !taxDeclaration && gross < 4500);

  const totalChildren = Number(form.childrenCount) || 0;
  const childrenZtpP = Number(form.childrenZtpP) || 0;

  const childrenWarning =
    childrenZtpP > totalChildren
      ? 'Počet dětí ZTP/P nemůže být větší než celkový počet dětí.'
      : null;

  const canCalculate = form.grossSalary !== '' && Number(form.grossSalary) > 0;

  return (
    <Box display="flex" flexDirection="column" gap={2}>

      {/* Sekce: Základní údaje */}
      <Typography variant="subtitle1" fontWeight={600}>
        Základní údaje
      </Typography>

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
                checked={taxDeclaration}
                onChange={(e) => onChange({ taxDeclaration: e.target.checked })}
                color="primary"
              />
            }
            label="Podepsal/a jsem prohlášení poplatníka"
          />
          {taxDeclaration ? (
            <Alert severity="success" variant="outlined" sx={{ mt: 1 }}>
              {'Se podepsaným prohlášením se uplatní zálohová daň a slevy (základní sleva 2 570 Kč/měs. a další).'}
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

      <Divider />

      {/* Sekce: Daňové slevy */}
      <Typography variant="subtitle1" fontWeight={600}>
        Daňové slevy
      </Typography>

      {isSrazkova ? (
        <Alert severity="warning" variant="outlined">
          Bez podepsaného prohlášení poplatníka se uplatňuje srážková
          daň 15 % – žádné slevy na dani nelze uplatnit.
        </Alert>
      ) : (
        <>
          <FormControlLabel
            control={<Checkbox checked disabled />}
            label="Sleva na poplatníka (automaticky – 2 570 Kč/měs.)"
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

          <TextField
            type="number"
            label="Počet dětí (celkem)"
            value={totalChildren}
            onChange={handleChildrenTotal}
            inputProps={{ min: 0, max: 10 }}
            fullWidth
          />

          {totalChildren > 0 && (
            <TextField
              type="number"
              label="Z toho dětí s průkazem ZTP/P"
              value={childrenZtpP}
              onChange={handleChildrenZtpP}
              inputProps={{ min: 0, max: totalChildren }}
              fullWidth
            />
          )}

          {childrenWarning && (
            <Alert severity="warning" variant="outlined">
              {childrenWarning}
            </Alert>
          )}
        </>
      )}

      <Divider />

      <Box display="flex" justifyContent="flex-end">
        <Button
          variant="contained"
          size="large"
          disabled={!canCalculate}
          onClick={onCalculate}
        >
          Spočítat
        </Button>
      </Box>
    </Box>
  );
}

export default StepForm;
