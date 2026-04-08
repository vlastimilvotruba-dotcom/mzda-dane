import React from 'react';
import {
  Box, TextField, Typography, Divider, FormControlLabel,
  Switch, Tooltip, IconButton, MenuItem, Button, Alert,
} from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AdSlot from '../Ads/AdSlot';

const PRIMARY = '#6a1b9a';

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

export default function OsvcForm({ form, onChange, onCalculate }) {
  const set = (field) => (e) => {
    const val = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    onChange(field, val);
  };

  const handleAnnualIncome = (e) => {
    let val = Number(e.target.value);
    if (isNaN(val)) val = 0;
    if (val < 0) val = 0;
    onChange('annualIncome', e.target.value ? String(val) : '');
  };

  const handleActualExpenses = (e) => {
    let val = Number(e.target.value);
    if (isNaN(val)) val = 0;
    if (val < 0) val = 0;
    onChange('actualExpenses', e.target.value ? String(val) : '');
  };

  const handleMonths = (e) => {
    let val = Number(e.target.value);
    if (isNaN(val)) val = 12;
    if (val < 1) val = 1;
    if (val > 12) val = 12;
    onChange('monthsActive', String(val));
  };

  const handleChildrenCount = (e) => {
    let total = Number(e.target.value) || 0;
    total = Math.min(Math.max(total, 0), 10);
    const currentZtp = Number(form.childrenZtpP) || 0;
    onChange('childrenCount', String(total));
    onChange('childrenZtpP', String(Math.min(total, currentZtp)));
  };

  const handleChildrenZtpP = (e) => {
    const total = Number(form.childrenCount) || 0;
    let ztp = Number(e.target.value) || 0;
    ztp = Math.min(Math.max(ztp, 0), total);
    onChange('childrenZtpP', String(ztp));
  };

  const annualIncome = Number(form.annualIncome) || 0;
  const actualExpenses = Number(form.actualExpenses) || 0;
  const monthsActive = Number(form.monthsActive) || 12;
  const totalChildren = Number(form.childrenCount) || 0;
  const dominantRate = Number(form.dominantRate) || 60;

  const estimatedExpenses = form.expenseMode === 'percent'
    ? Math.min(
        annualIncome * ((Number(form.expensePercent) || 60) / 100),
        { 80: 1600000, 60: 1200000, 40: 800000, 30: 600000 }[Number(form.expensePercent) || 60]
      )
    : Math.min(actualExpenses, annualIncome);

  const projectedProfit = Math.max(0, annualIncome - estimatedExpenses);
  const capWarning =
    form.expenseMode === 'percent' && annualIncome > 2000000
      ? 'U procentních výdajů se od roku 2025 uplatní strop z příjmů do 2 mil. Kč. Kalkulačka tento limit zohledňuje automaticky.'
      : null;

  const secondaryThreshold = Math.max(0, 111736 - (12 - monthsActive) * Math.ceil(111736 / 12));

  const canCalculate = annualIncome > 0;

  return (
    <Box display="flex" flexDirection="column">
      <SectionTitle>Příjmy a výdaje</SectionTitle>

      <FieldRow
        label="Roční příjmy z podnikání (Kč)"
        tooltip="Součet příjmů za zdaňovací období 2025 před odečtením výdajů."
      >
        <TextField
          type="number"
          fullWidth
          size="small"
          value={form.annualIncome}
          onChange={handleAnnualIncome}
          inputProps={{ min: 0, max: 100000000, step: 1000 }}
        />
      </FieldRow>

      <FieldRow
        label="Způsob uplatnění výdajů"
        tooltip="Vyberte, zda chcete počítat se skutečnými výdaji nebo s výdajovým paušálem."
      >
        <TextField
          select
          fullWidth
          size="small"
          value={form.expenseMode}
          onChange={set('expenseMode')}
        >
          <MenuItem value="percent">Výdajový paušál</MenuItem>
          <MenuItem value="actual">Skutečné výdaje</MenuItem>
        </TextField>
      </FieldRow>

      {form.expenseMode === 'percent' ? (
        <FieldRow
          label="Výdajový paušál"
          tooltip="80 % typicky zemědělství a řemesla, 60 % ostatní živnosti, 40 % svobodná povolání, 30 % nájem a vybrané autorské příjmy."
        >
          <TextField
            select
            fullWidth
            size="small"
            value={form.expensePercent}
            onChange={set('expensePercent')}
          >
            <MenuItem value="80">80 % – řemeslné a zemědělské činnosti</MenuItem>
            <MenuItem value="60">60 % – ostatní živnosti</MenuItem>
            <MenuItem value="40">40 % – svobodná povolání a jiné podnikání</MenuItem>
            <MenuItem value="30">30 % – nájem / vybrané autorské příjmy</MenuItem>
          </TextField>
        </FieldRow>
      ) : (
        <>
          <FieldRow
            label="Skutečné roční výdaje (Kč)"
            tooltip="Zadejte prokazatelné výdaje související s podnikáním."
          >
            <TextField
              type="number"
              fullWidth
              size="small"
              value={form.actualExpenses}
              onChange={handleActualExpenses}
              inputProps={{ min: 0, max: 100000000, step: 1000 }}
            />
          </FieldRow>

          <FieldRow
            label="Převažující typ činnosti pro posouzení paušální daně"
            tooltip="Tento údaj slouží jen pro orientační srovnání s paušální daní, ne pro standardní výpočet."
          >
            <TextField
              select
              fullWidth
              size="small"
              value={form.dominantRate}
              onChange={set('dominantRate')}
            >
              <MenuItem value="80">Převažují činnosti se sazbou 80 %</MenuItem>
              <MenuItem value="60">Převažují činnosti se sazbou 60 %</MenuItem>
              <MenuItem value="40">Převažují činnosti se sazbou 40 %</MenuItem>
              <MenuItem value="30">Převažují činnosti se sazbou 30 %</MenuItem>
            </TextField>
          </FieldRow>
        </>
      )}

      {annualIncome > 0 && (
        <Alert severity="info" variant="outlined" sx={{ mb: 2, mt: -1 }}>
          Orientační zisk před odvody: <strong>{Math.round(projectedProfit).toLocaleString('cs-CZ')} Kč</strong>
          {form.expenseMode === 'percent' && ` (${Number(form.expensePercent)}% paušál)`}
          {form.expenseMode === 'actual' && ' (skutečné výdaje)'}.{' '}
          Pro srovnání s paušální daní se použije převažující sazba <strong>{dominantRate} %</strong>.
        </Alert>
      )}

      {capWarning && (
        <Alert severity="warning" variant="outlined" sx={{ mb: 2, mt: -1 }}>
          {capWarning}
        </Alert>
      )}

      <Divider sx={{ my: 2 }} />
      <AdSlot id="osvc-form-mid1" position="mid" />

      <SectionTitle>Typ činnosti a pojistné</SectionTitle>

      <FieldRow
        label="Druh samostatné činnosti"
        tooltip="Hlavní činnost podléhá minimálním odvodům, vedlejší činnost má pro sociální pojištění rozhodnou částku a pro zdravotní pojištění bez minima."
      >
        <TextField
          select
          fullWidth
          size="small"
          value={form.activityType}
          onChange={set('activityType')}
        >
          <MenuItem value="main">Hlavní činnost</MenuItem>
          <MenuItem value="secondary">Vedlejší činnost</MenuItem>
        </TextField>
      </FieldRow>

      <FieldRow
        label="Počet měsíců podnikání v roce 2025"
        tooltip="Využije se pro krácení minimálních odvodů a rozhodné částky u vedlejší činnosti."
      >
        <TextField
          type="number"
          fullWidth
          size="small"
          value={form.monthsActive}
          onChange={handleMonths}
          inputProps={{ min: 1, max: 12, step: 1 }}
        />
      </FieldRow>

      {form.activityType === 'main' && (
        <Box mb={2}>
          <FormControlLabel
            control={
              <Switch
                checked={form.startupRelief}
                onChange={set('startupRelief')}
                size="small"
              />
            }
            label={
              <Box display="flex" alignItems="center">
                <Typography variant="body2">Začínající OSVČ – snížené minimum sociálního pojištění</Typography>
                <Info text="První 3 roky podnikání (nebo po dlouhé pauze) může být minimální sociální záloha nižší. Pro rok 2025 orientačně 3 399 Kč měsíčně místo 4 759 Kč." />
              </Box>
            }
          />
        </Box>
      )}

      {form.activityType === 'main' ? (
        <Alert severity="info" variant="outlined" sx={{ mb: 2 }}>
          U hlavní činnosti kalkulačka počítá s minimálním zdravotním pojistným <strong>3 143 Kč / měsíc</strong>
          {' '}a se sociálním pojistným <strong>{form.startupRelief ? '3 399 Kč' : '4 759 Kč'} / měsíc</strong> podle režimu pro rok 2025.
        </Alert>
      ) : (
        <Alert severity="info" variant="outlined" sx={{ mb: 2 }}>
          U vedlejší činnosti se sociální pojištění v roce 2025 platí až při zisku od orientační rozhodné částky{' '}
          <strong>{secondaryThreshold.toLocaleString('cs-CZ')} Kč</strong> za zadaný počet měsíců. Zdravotní pojištění zde nemá zákonné minimum.
        </Alert>
      )}

      <FieldRow
        label="Další nezdanitelné odpočty celkem (Kč)"
        tooltip="Součet odpočtů dle §15 ZDP, např. penzijní spoření, životní pojištění, úroky z hypotéky nebo dary. Zadejte už jen skutečně uplatnitelnou částku."
      >
        <TextField
          type="number"
          fullWidth
          size="small"
          value={form.otherDeductions}
          onChange={set('otherDeductions')}
          inputProps={{ min: 0, max: 1000000, step: 100 }}
        />
      </FieldRow>

      <Divider sx={{ my: 2 }} />
      <AdSlot id="osvc-form-mid2" position="mid" />

      <SectionTitle>Slevy na dani a děti</SectionTitle>

      <FieldRow
        label="Invalidita"
        tooltip="Roční sleva: 2 520 Kč při invaliditě 1. nebo 2. stupně a 5 040 Kč při invaliditě 3. stupně."
      >
        <TextField
          select
          fullWidth
          size="small"
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
              <Info text="Roční sleva na dani 16 140 Kč." />
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
              <Info text="Od roku 2025 jen při splnění zákonných podmínek, typicky při péči o dítě do 3 let a příjmu partnera do 68 000 Kč za rok." />
            </Box>
          }
        />
      </Box>

      <FieldRow
        label="Počet vyživovaných dětí"
        tooltip="1. dítě 15 204 Kč/rok, 2. dítě 22 320 Kč/rok, 3. a každé další 27 840 Kč/rok."
      >
        <TextField
          type="number"
          fullWidth
          size="small"
          value={form.childrenCount}
          onChange={handleChildrenCount}
          inputProps={{ min: 0, max: 10, step: 1 }}
        />
      </FieldRow>

      {totalChildren > 0 && (
        <FieldRow
          label="Z toho děti s průkazem ZTP/P"
          tooltip="Na dítě s průkazem ZTP/P se zvýhodnění zdvojnásobuje."
        >
          <TextField
            type="number"
            fullWidth
            size="small"
            value={form.childrenZtpP}
            onChange={handleChildrenZtpP}
            inputProps={{ min: 0, max: totalChildren, step: 1 }}
          />
        </FieldRow>
      )}

      <Box mt={3}>
        <Button
          variant="contained"
          fullWidth
          size="large"
          disabled={!canCalculate}
          endIcon={<ArrowForwardIcon />}
          onClick={onCalculate}
          sx={{
            borderRadius: 2,
            py: 1.5,
            fontWeight: 700,
            bgcolor: PRIMARY,
            '&:hover': { bgcolor: '#4a148c' },
          }}
        >
          Spočítat OSVČ za rok 2025
        </Button>
      </Box>
    </Box>
  );
}
