import React from 'react';
import {
  Box, TextField, Typography, Divider, FormControlLabel,
  Switch, Tooltip, IconButton, MenuItem, Button, Alert,
} from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AdSlot from '../Ads/AdSlot';

const PRIMARY = '#e65100';

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

export default function AnnualTaxForm({ form, onChange, onCalculate }) {

  const set = (field) => (e) => {
    const val = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    onChange(field, val);
  };

  const handleChildrenCount = (e) => {
    let total = Number(e.target.value) || 0;
    if (total < 0) total = 0;
    if (total > 10) total = 10;
    const currentZtp = Number(form.childrenZtpP) || 0;
    const safeZtp = Math.min(currentZtp, total);
    onChange('childrenCount', String(total));
    onChange('childrenZtpP', String(safeZtp));
  };

  const handleChildrenZtpP = (e) => {
    const total = Number(form.childrenCount) || 0;
    let ztp = Number(e.target.value) || 0;
    if (ztp < 0) ztp = 0;
    if (ztp > total) ztp = total;
    onChange('childrenZtpP', String(ztp));
  };

  const handleCapped = (field, max) => (e) => {
    let val = Number(e.target.value);
    if (isNaN(val)) val = 0;
    if (val < 0) val = 0;
    if (val > max) val = max;
    onChange(field, e.target.value ? String(val) : '');
  };

  const grossAnnual   = Number(form.grossAnnual)   || 0;
  const taxWithheld   = Number(form.taxWithheld)   || 0;
  const totalChildren = Number(form.childrenCount) || 0;
  const childrenZtpP  = Number(form.childrenZtpP)  || 0;
  const pensionRaw    = Number(form.pensionSavings) || 0;
  const giftsVal      = Number(form.gifts)          || 0;

  const taxWithheldWarning =
    taxWithheld > 0 && grossAnnual > 0 && taxWithheld > grossAnnual * 0.5
      ? 'Sražená daň je neobvykle vysoká. Zkontrolujte zadané hodnoty.'
      : null;

  const pensionInfo =
    pensionRaw > 24000
      ? `Odpočet: ${Math.min(pensionRaw - 24000, 48000).toLocaleString('cs-CZ')} Kč`
      : pensionRaw > 0
      ? 'Pro uplatnění odpočtu musí být zaplaceno více než 24 000 Kč.'
      : null;

  const giftsWarning =
    giftsVal > 0 && giftsVal < 1000
      ? 'Minimální výše darů pro uplatnění odpočtu je 1 000 Kč.'
      : null;

  const childrenWarning =
    childrenZtpP > totalChildren
      ? 'Počet dětí ZTP/P nesmí být větší než celkový počet dětí.'
      : null;

  const isValid = grossAnnual > 0 && !childrenWarning;

  return (
    <Box display="flex" flexDirection="column">

      {/* ── SEKCE 1: Příjmy ── */}
      <SectionTitle>Příjmy a sražené zálohy</SectionTitle>

      <FieldRow
        label="Roční hrubá mzda (Kč)"
        tooltip="Součet hrubých mezd ze všech Potvrzení o příjmech za rok 2026."
      >
        <TextField
          type="number" fullWidth size="small"
          value={form.grossAnnual}
          onChange={set('grossAnnual')}
          inputProps={{ min: 0, max: 10000000, step: 1000 }}
        />
      </FieldRow>

      <FieldRow
        label="Zálohy na daň sražené zaměstnavatelem (Kč)"
        tooltip="Celková záloha na daň uvedená na Potvrzení o příjmech ze závislé činnosti."
      >
        <TextField
          type="number" fullWidth size="small"
          value={form.taxWithheld}
          onChange={set('taxWithheld')}
          inputProps={{ min: 0, max: 5000000, step: 100 }}
        />
      </FieldRow>

      {taxWithheldWarning && (
        <Alert severity="warning" variant="outlined" sx={{ mb: 2, mt: -1 }}>
          {taxWithheldWarning}
        </Alert>
      )}

      <Divider sx={{ my: 2 }} />

      {/* ── AD SLOT 1 – mezi Příjmy a Nezdanitelnými částmi ── */}
      <AdSlot id="annual-form-mid1" position="mid" />

      {/* ── SEKCE 2: Nezdanitelné části ── */}
      <SectionTitle>Nezdanitelné části základu daně (§15 ZDP)</SectionTitle>

      <FieldRow
        label="Soukromé životní pojištění (Kč, max 24 000)"
        tooltip="Platby na soukromé životní pojištění splňující podmínky ZDP. Max. odpočet 24 000 Kč/rok."
      >
        <TextField
          type="number" fullWidth size="small"
          value={form.lifeInsurance}
          onChange={handleCapped('lifeInsurance', 24000)}
          inputProps={{ min: 0, max: 24000, step: 100 }}
        />
      </FieldRow>

      <FieldRow
        label="Penzijní spoření / DPS – zaplaceno celkem (Kč)"
        tooltip="Zadejte celkovou zaplacenou částku za rok. Odpočet se počítá z části nad 24 000 Kč, maximálně 48 000 Kč."
      >
        <TextField
          type="number" fullWidth size="small"
          value={form.pensionSavings}
          onChange={set('pensionSavings')}
          inputProps={{ min: 0, max: 120000, step: 100 }}
        />
      </FieldRow>

      {pensionInfo && (
        <Alert
          severity={pensionRaw > 24000 ? 'success' : 'info'}
          variant="outlined"
          sx={{ mb: 2, mt: -1 }}
        >
          {pensionInfo}
        </Alert>
      )}

      <FieldRow
        label="Úroky z hypotéky / úvěru na bydlení (Kč, max 150 000)"
        tooltip="Úroky zaplacené z hypotečního úvěru nebo úvěru ze stavebního spoření. Max. 150 000 Kč/rok."
      >
        <TextField
          type="number" fullWidth size="small"
          value={form.mortgageInterest}
          onChange={handleCapped('mortgageInterest', 150000)}
          inputProps={{ min: 0, max: 150000, step: 100 }}
        />
      </FieldRow>

      <FieldRow
        label="Dary a bezúplatná plnění (Kč)"
        tooltip="Hodnota darů na veřejně prospěšné účely. Musí být min. 1 000 Kč nebo 2 % základu. Max. 15 % základu daně."
      >
        <TextField
          type="number" fullWidth size="small"
          value={form.gifts}
          onChange={set('gifts')}
          inputProps={{ min: 0, max: 1000000, step: 100 }}
        />
      </FieldRow>

      {giftsWarning && (
        <Alert severity="warning" variant="outlined" sx={{ mb: 2, mt: -1 }}>
          {giftsWarning}
        </Alert>
      )}

      <Divider sx={{ my: 2 }} />

      {/* ── AD SLOT 2 – mezi Nezdanitelnými částmi a Slevami ── */}
      <AdSlot id="annual-form-mid2" position="mid" />

      {/* ── SEKCE 3: Slevy na dani ── */}
      <SectionTitle>Slevy na dani a daňové zvýhodnění</SectionTitle>

      <FieldRow
        label="Invalidita"
        tooltip="Sleva dle §35 ZDP: 1./2. stupeň 2 520 Kč/rok, 3. stupeň 5 040 Kč/rok."
      >
        <TextField
          select fullWidth size="small"
          value={form.disability}
          onChange={set('disability')}
        >
          <MenuItem value="0">Bez invalidity</MenuItem>
          <MenuItem value="1">1. stupeň – 2 520 Kč/rok</MenuItem>
          <MenuItem value="2">2. stupeň – 2 520 Kč/rok</MenuItem>
          <MenuItem value="3">3. stupeň – 5 040 Kč/rok</MenuItem>
        </TextField>
      </FieldRow>

      <Box mb={2}>
        <FormControlLabel
          control={
            <Switch
              checked={form.ztpP}
              onChange={set('ztpP')}
              size="small"
            />
          }
          label={
            <Box display="flex" alignItems="center">
              <Typography variant="body2">Držitel průkazu ZTP/P</Typography>
              <Info text="Roční sleva 16 140 Kč dle §35 odst. 1 písm. c) ZDP." />
            </Box>
          }
        />
      </Box>

      <Box mb={2}>
        <FormControlLabel
          control={
            <Switch
              checked={form.spouseClaim}
              onChange={set('spouseClaim')}
              size="small"
            />
          }
          label={
            <Box display="flex" alignItems="center">
              <Typography variant="body2">Sleva na manžela/manželku</Typography>
              <Info text="Roční sleva 24 840 Kč, pokud příjem manžela/manželky nepřesáhl 68 000 Kč za rok." />
            </Box>
          }
        />
      </Box>

      <Divider sx={{ my: 2 }} />

      {/* ── SEKCE 4: Děti ── */}
      <SectionTitle>Daňové zvýhodnění na děti</SectionTitle>

      <FieldRow
        label="Počet dětí celkem"
        tooltip="1. dítě 15 204 Kč/rok, 2. dítě 22 320 Kč/rok, 3. a každé další 27 840 Kč/rok."
      >
        <TextField
          type="number" fullWidth size="small"
          value={form.childrenCount}
          onChange={handleChildrenCount}
          inputProps={{ min: 0, max: 10, step: 1 }}
        />
      </FieldRow>

      {totalChildren > 0 && (
        <FieldRow
          label="Z toho dětí s průkazem ZTP/P"
          tooltip="Dítě s průkazem ZTP/P zakládá nárok na dvojnásobné daňové zvýhodnění (§35c odst. 7 ZDP)."
        >
          <TextField
            type="number" fullWidth size="small"
            value={form.childrenZtpP}
            onChange={handleChildrenZtpP}
            inputProps={{ min: 0, max: totalChildren, step: 1 }}
          />
        </FieldRow>
      )}

      {childrenWarning && (
        <Alert severity="warning" variant="outlined" sx={{ mb: 2 }}>
          {childrenWarning}
        </Alert>
      )}

      {/* ── Tlačítko Spočítat (sjednoceno s Čistou mzdou) ── */}
      <Box mt={3}>
        <Button
          variant="contained"
          fullWidth
          size="large"
          disabled={!isValid}
          endIcon={<ArrowForwardIcon />}
          onClick={onCalculate}
          sx={{
            borderRadius: 2,
            py: 1.5,
            fontWeight: 700,
            bgcolor: PRIMARY,
            '&:hover': { bgcolor: '#bf360c' },
          }}
        >
          Spočítat
        </Button>
      </Box>

    </Box>
  );
}
