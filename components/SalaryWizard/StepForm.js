import React from 'react';
import {
  Box, TextField, MenuItem, Button, Typography, Alert,
  FormControlLabel, Switch, Divider, Tooltip, IconButton,
} from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

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
    <Typography variant="subtitle2" fontWeight={700} color="primary" mb={1.5} mt={1}>
      {children}
    </Typography>
  );
}

function FieldRow({ label, tooltip, children }) {
  return (
    <Box mb={2}>
      <Box display="flex" alignItems="center" mb={0.5}>
        <Typography variant="body2" color="text.secondary">
          {label}
        </Typography>
        {tooltip && <Info text={tooltip} />}
      </Box>
      {children}
    </Box>
  );
}

export default function StepForm({ form, onChange, onCalculate }) {
    const handleChange = (e) => {
    const { name, value } = e.target;
    onChange({ [name]: value });
    };

    const handleSwitch = (e) => {
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
      ? 'Počet dětí ZTP/P nesmí být větší než celkový počet dětí.'
      : null;

  const canCalculate = form.grossSalary !== '' && Number(form.grossSalary) > 0;

  return (
    <Box display="flex" flexDirection="column">

      {/* ── Základní údaje ── */}
      <SectionTitle>Základní údaje</SectionTitle>

      <FieldRow
        label="Typ smlouvy"
        tooltip="HPP = hlavní pracovní poměr. DPP = dohoda o provedení práce. DPČ = dohoda o pracovní činnosti."
      >
        <TextField
          select
          fullWidth
          size="small"
          name="contractType"
          value={form.contractType}
          onChange={handleChange}
        >
          <MenuItem value="HPP">HPP – hlavní pracovní poměr</MenuItem>
          <MenuItem value="DPP">DPP – dohoda o provedení práce</MenuItem>
          <MenuItem value="DPC">DPČ – dohoda o pracovní činnosti</MenuItem>
        </TextField>
      </FieldRow>

      {isDPP && (
        <Alert severity="info" variant="outlined" sx={{ mb: 2 }}>
          U DPP se do 11&nbsp;999&nbsp;Kč u jednoho zaměstnavatele neodvádí
          sociální ani zdravotní pojištění. Při odměně 12&nbsp;000&nbsp;Kč
          a více se pojištění počítá stejně jako u HPP.
        </Alert>
      )}

      {isDPC && (
        <Alert severity="info" variant="outlined" sx={{ mb: 2 }}>
          U DPČ se do 4&nbsp;499&nbsp;Kč měsíčně neodvádí sociální ani
          zdravotní pojištění. Při odměně 4&nbsp;500&nbsp;Kč a více se
          pojištění počítá stejně jako u HPP.
        </Alert>
      )}

      <FieldRow
        label="Hrubá mzda / odměna (Kč / měsíc)"
        tooltip="Hrubá mzda před odečtením daní a odvodů."
      >
        <TextField
          fullWidth
          type="number"
          size="small"
          name="grossSalary"
          value={form.grossSalary}
          onChange={handleChange}
          inputProps={{ min: 0, step: 100 }}
        />
      </FieldRow>

      {/* Prohlášení poplatníka – jen pro DPP/DPČ */}
      {isDohoda && (
        <Box mb={2}>
          <FormControlLabel
            control={
              <Switch
                name="taxDeclaration"
                checked={taxDeclaration}
                onChange={handleSwitch}
                size="small"
                color="primary"
              />
            }
            label={
              <Box display="flex" alignItems="center">
                <Typography variant="body2">
                  Podepsáno prohlášení poplatníka
                </Typography>
                <Info text="Bez podepsaného prohlášení se uplatní srážková daň 15 %. Se prohlášením lze uplatnit slevy na dani." />
              </Box>
            }
          />

          {taxDeclaration && (
            <Alert severity="success" variant="outlined" sx={{ mt: 1 }}>
              Se podepsaným prohlášením se uplatní zálohová daň a slevy –
              základní sleva 2 570 Kč/měs. a další.
            </Alert>
          )}

          {!taxDeclaration && isPodLimitem && (
            <Alert severity="warning" variant="outlined" sx={{ mt: 1 }}>
              Bez prohlášení se z odměny do {limitInfo} sráží srážková daň
              15 %. Slevy na dani nelze uplatnit.
            </Alert>
          )}

          {!taxDeclaration && !isPodLimitem && (
            <Alert severity="info" variant="outlined" sx={{ mt: 1 }}>
              Nad limitem pro odvody se daní zálohově i bez prohlášení,
              slevy však nelze uplatnit.
            </Alert>
          )}
        </Box>
      )}

      <Divider sx={{ my: 2 }} />

      {/* ── Daňové slevy ── */}
      <SectionTitle>Daňové slevy</SectionTitle>

      {isSrazkova && (
        <Alert severity="warning" variant="outlined" sx={{ mb: 2 }}>
          Bez podepsaného prohlášení poplatníka se uplatňuje srážková daň
          15 %. Slevy na dani nelze uplatnit.
        </Alert>
      )}

      <Box mb={2}>
        <FormControlLabel
          control={
            <Switch
              checked
              disabled
              size="small"
            />
          }
          label={
            <Box display="flex" alignItems="center">
              <Typography variant="body2" color="text.secondary">
                Sleva na poplatníka (automaticky 2 570 Kč/měs.)
              </Typography>
              <Info text="Základní sleva na poplatníka je přiznávána automaticky každému zaměstnanci s podepsaným prohlášením." />
            </Box>
          }
        />
      </Box>

      <Box mb={2}>
        <FormControlLabel
          control={
            <Switch
              name="ztpP"
              checked={form.ztpP}
              onChange={handleSwitch}
              size="small"
              disabled={isSrazkova}
            />
          }
          label={
            <Box display="flex" alignItems="center">
              <Typography variant="body2">
                Držitel průkazu ZTP/P
              </Typography>
              <Info text="Měsíční sleva 1 345 Kč dle § 35 odst. 1 písm. c) ZDP." />
            </Box>
          }
        />
      </Box>

      <Box mb={2}>
        <FormControlLabel
          control={
            <Switch
              name="spouseClaim"
              checked={form.spouseClaim}
              onChange={handleSwitch}
              size="small"
              disabled={isSrazkova}
            />
          }
          label={
            <Box display="flex" alignItems="center">
              <Typography variant="body2">
                Sleva na manžela / manželku
              </Typography>
              <Info text="Měsíční sleva 2 070 Kč, pokud příjem manžela/manželky nepřesáhl 68 000 Kč za rok." />
            </Box>
          }
        />
      </Box>

      <FieldRow
        label="Invalidita"
        tooltip="1.–2. stupeň: 210 Kč/měs. 3. stupeň: 420 Kč/měs. dle § 35 ZDP."
      >
        <TextField
          select
          fullWidth
          size="small"
          name="disability"
          value={form.disability}
          onChange={handleChange}
          disabled={isSrazkova}
        >
          <MenuItem value="none">Bez invalidity</MenuItem>
          <MenuItem value="1">1. stupeň (210 Kč/měs.)</MenuItem>
          <MenuItem value="2">2. stupeň (210 Kč/měs.)</MenuItem>
          <MenuItem value="3">3. stupeň (420 Kč/měs.)</MenuItem>
        </TextField>
      </FieldRow>

      <Divider sx={{ my: 2 }} />

      {/* ── Děti ── */}
      <SectionTitle>Daňové zvýhodnění na děti</SectionTitle>

      <FieldRow
        label="Počet dětí celkem"
        tooltip="1. dítě: 1 267 Kč/měs., 2. dítě: 1 860 Kč/měs., 3. a každé další: 2 320 Kč/měs."
      >
        <TextField
          fullWidth
          type="number"
          size="small"
          value={totalChildren}
          onChange={handleChildrenTotal}
          inputProps={{ min: 0, max: 10 }}
          disabled={isSrazkova}
        />
      </FieldRow>

      {totalChildren > 0 && (
        <FieldRow
          label="Z toho dětí s průkazem ZTP/P"
          tooltip="Dítě s průkazem ZTP/P zakládá nárok na dvojnásobné daňové zvýhodnění (§ 35c odst. 7 ZDP)."
        >
          <TextField
            fullWidth
            type="number"
            size="small"
            value={childrenZtpP}
            onChange={handleChildrenZtpP}
            inputProps={{ min: 0, max: totalChildren }}
            disabled={isSrazkova}
          />
        </FieldRow>
      )}

      {childrenWarning && (
        <Alert severity="warning" variant="outlined" sx={{ mb: 2 }}>
          {childrenWarning}
        </Alert>
      )}

      {/* ── Tlačítko Spočítat ── */}
      <Box mt={3}>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          size="large"
          disabled={!canCalculate}
          endIcon={<ArrowForwardIcon />}
          onClick={onCalculate}
          sx={{ borderRadius: 2, py: 1.5, fontWeight: 700 }}
        >
          Spočítat
        </Button>
      </Box>

    </Box>
  );
}
