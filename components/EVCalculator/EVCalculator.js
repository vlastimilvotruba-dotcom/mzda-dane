import React, { useState } from 'react'
import {
  Box, TextField, Typography, Divider, InputAdornment,
  Grid, Paper, Alert,
} from '@mui/material'
import ElectricCarIcon from '@mui/icons-material/ElectricCar'
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation'
import CompareArrowsIcon from '@mui/icons-material/CompareArrows'
import SavingsIcon from '@mui/icons-material/Savings'
import { calculateEvVsIce } from '../../logic/evVsIce2026'

const ACCENT = '#00897b'
const fmtKc = (v) => Math.round(v).toLocaleString('cs-CZ') + ' Kč'
const fmtKcPrecise = (v) => Number(v).toFixed(2).replace('.', ',') + ' Kč'

const defaultForm = {
  annualKm: 15000,
  evConsumption: 17,
  evElectricityPrice: 4.8,
  petrolConsumption: 6.7,
  petrolPrice: 38.5,
  dieselConsumption: 5.8,
  dieselPrice: 37.2,
}

function ResultRow({ label, value, bold, color }) {
  return (
    <Box display="flex" justifyContent="space-between" alignItems="center" py={0.55} gap={2}>
      <Typography variant="body2" color="text.secondary">{label}</Typography>
      <Typography variant="body2" fontWeight={bold ? 700 : 400} color={color || 'text.primary'} sx={{ textAlign: 'right' }}>
        {value}
      </Typography>
    </Box>
  )
}

function VehicleCard({ title, icon, bg, accent, isBest, costPer100, costPerKm, annualCost, monthlyCost }) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        borderRadius: 2,
        bgcolor: bg,
        border: isBest ? `2px solid ${accent}` : '1px solid #e0e0e0',
        height: '100%',
      }}
    >
      <Box display="flex" alignItems="center" gap={1} mb={1}>
        {icon}
        <Typography variant="subtitle2" fontWeight={700}>{title}</Typography>
      </Box>
      <ResultRow label="Náklad na 100 km" value={fmtKcPrecise(costPer100)} bold color={accent} />
      <ResultRow label="Průměrný náklad na 1 km" value={fmtKcPrecise(costPerKm)} />
      <ResultRow label="Měsíční náklad" value={fmtKc(monthlyCost)} />
      <Divider sx={{ my: 0.5 }} />
      <ResultRow label="Roční náklad" value={fmtKc(annualCost)} bold color={accent} />
      {isBest && (
        <Typography variant="caption" color={accent} sx={{ display: 'block', mt: 1, fontWeight: 700 }}>
          Nejnižší provozní náklad
        </Typography>
      )}
    </Paper>
  )
}

export default function EVCalculator() {
  const [form, setForm] = useState(defaultForm)
  const set = (field) => (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }))

  const result = calculateEvVsIce(form)

  return (
    <Box>
      <Typography variant="subtitle2" fontWeight={700} color={ACCENT} mb={2}>
        Parametry provozu vozidla
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Roční nájezd"
            type="number"
            size="small"
            fullWidth
            value={form.annualKm}
            onChange={set('annualKm')}
            inputProps={{ min: 1000, step: 500 }}
            InputProps={{ endAdornment: <InputAdornment position="end">km/rok</InputAdornment> }}
            helperText="Průměr v ČR je zhruba 12 000–18 000 km ročně"
          />
        </Grid>

        <Grid item xs={12}>
          <Divider sx={{ mb: 1 }}>
            <Typography variant="caption" color="text.disabled">Zadejte spotřebu a cenu energie / paliva</Typography>
          </Divider>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper variant="outlined" sx={{ p: 2, borderRadius: 2, bgcolor: '#e0f2f1' }}>
            <Box display="flex" alignItems="center" gap={1} mb={1.5}>
              <ElectricCarIcon sx={{ color: ACCENT }} />
              <Typography variant="subtitle2" fontWeight={700}>Elektroauto (EV)</Typography>
            </Box>
            <TextField
              label="Spotřeba EV"
              type="number"
              size="small"
              fullWidth
              value={form.evConsumption}
              onChange={set('evConsumption')}
              inputProps={{ min: 5, step: 0.5 }}
              InputProps={{ endAdornment: <InputAdornment position="end">kWh/100 km</InputAdornment> }}
              sx={{ mb: 1.5 }}
            />
            <TextField
              label="Cena elektřiny"
              type="number"
              size="small"
              fullWidth
              value={form.evElectricityPrice}
              onChange={set('evElectricityPrice')}
              inputProps={{ min: 0, step: 0.1 }}
              InputProps={{ endAdornment: <InputAdornment position="end">Kč/kWh</InputAdornment> }}
              helperText="Domácí nabíjení typicky 4–6 Kč/kWh"
            />
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper variant="outlined" sx={{ p: 2, borderRadius: 2, bgcolor: '#fff3e0' }}>
            <Box display="flex" alignItems="center" gap={1} mb={1.5}>
              <LocalGasStationIcon sx={{ color: '#ef6c00' }} />
              <Typography variant="subtitle2" fontWeight={700}>Benzín</Typography>
            </Box>
            <TextField
              label="Spotřeba benzínu"
              type="number"
              size="small"
              fullWidth
              value={form.petrolConsumption}
              onChange={set('petrolConsumption')}
              inputProps={{ min: 2, step: 0.1 }}
              InputProps={{ endAdornment: <InputAdornment position="end">l/100 km</InputAdornment> }}
              sx={{ mb: 1.5 }}
            />
            <TextField
              label="Cena benzínu"
              type="number"
              size="small"
              fullWidth
              value={form.petrolPrice}
              onChange={set('petrolPrice')}
              inputProps={{ min: 0, step: 0.1 }}
              InputProps={{ endAdornment: <InputAdornment position="end">Kč/l</InputAdornment> }}
              helperText="Natural 95 v ČR kolem 38–40 Kč/l"
            />
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper variant="outlined" sx={{ p: 2, borderRadius: 2, bgcolor: '#eceff1' }}>
            <Box display="flex" alignItems="center" gap={1} mb={1.5}>
              <LocalGasStationIcon sx={{ color: '#546e7a' }} />
              <Typography variant="subtitle2" fontWeight={700}>Nafta</Typography>
            </Box>
            <TextField
              label="Spotřeba nafty"
              type="number"
              size="small"
              fullWidth
              value={form.dieselConsumption}
              onChange={set('dieselConsumption')}
              inputProps={{ min: 2, step: 0.1 }}
              InputProps={{ endAdornment: <InputAdornment position="end">l/100 km</InputAdornment> }}
              sx={{ mb: 1.5 }}
            />
            <TextField
              label="Cena nafty"
              type="number"
              size="small"
              fullWidth
              value={form.dieselPrice}
              onChange={set('dieselPrice')}
              inputProps={{ min: 0, step: 0.1 }}
              InputProps={{ endAdornment: <InputAdornment position="end">Kč/l</InputAdornment> }}
              helperText="Nafta v ČR kolem 36–38 Kč/l"
            />
          </Paper>
        </Grid>
      </Grid>

      {result && (
        <Box mt={3}>
          <Divider sx={{ mb: 2 }} />
          <Typography variant="subtitle2" fontWeight={700} color={ACCENT} mb={1.5}>
            Srovnání nákladů
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <VehicleCard
                title="Elektroauto"
                icon={<ElectricCarIcon sx={{ color: ACCENT }} />}
                bg="#e0f2f1"
                accent={ACCENT}
                isBest={result.cheapest.id === 'ev'}
                costPer100={result.evCostPer100}
                costPerKm={result.evCostPerKm}
                annualCost={result.evAnnualCost}
                monthlyCost={result.evMonthlyCost}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <VehicleCard
                title="Benzín"
                icon={<LocalGasStationIcon sx={{ color: '#ef6c00' }} />}
                bg="#fff3e0"
                accent="#ef6c00"
                isBest={result.cheapest.id === 'petrol'}
                costPer100={result.petrolCostPer100}
                costPerKm={result.petrolCostPerKm}
                annualCost={result.petrolAnnualCost}
                monthlyCost={result.petrolMonthlyCost}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <VehicleCard
                title="Nafta"
                icon={<LocalGasStationIcon sx={{ color: '#546e7a' }} />}
                bg="#eceff1"
                accent="#546e7a"
                isBest={result.cheapest.id === 'diesel'}
                costPer100={result.dieselCostPer100}
                costPerKm={result.dieselCostPerKm}
                annualCost={result.dieselAnnualCost}
                monthlyCost={result.dieselMonthlyCost}
              />
            </Grid>
          </Grid>

          <Paper elevation={0} sx={{ mt: 2, p: 2, borderRadius: 2, bgcolor: '#f5f5f5', border: '1px solid #e0e0e0' }}>
            <Box display="flex" alignItems="center" gap={1} mb={1}>
              <CompareArrowsIcon sx={{ color: ACCENT }} />
              <Typography variant="subtitle2" fontWeight={700}>Shrnutí porovnání</Typography>
            </Box>
            <ResultRow label="Nejlevnější varianta podle zadaných údajů" value={result.cheapest.name} bold color={ACCENT} />
            <ResultRow
              label="Roční rozdíl EV vs. benzín"
              value={result.evSavingsVsPetrol >= 0 ? `ušetříte ${fmtKc(result.evSavingsVsPetrol)}` : `EV je dražší o ${fmtKc(Math.abs(result.evSavingsVsPetrol))}`}
              bold
              color={result.evSavingsVsPetrol >= 0 ? '#2e7d32' : '#c62828'}
            />
            <ResultRow
              label="Roční rozdíl EV vs. nafta"
              value={result.evSavingsVsDiesel >= 0 ? `ušetříte ${fmtKc(result.evSavingsVsDiesel)}` : `EV je dražší o ${fmtKc(Math.abs(result.evSavingsVsDiesel))}`}
              bold
              color={result.evSavingsVsDiesel >= 0 ? '#2e7d32' : '#c62828'}
            />
          </Paper>

          <Alert severity="info" sx={{ mt: 2 }}>
            Kalkulačka porovnává pouze provozní náklady na energii a palivo. Nezahrnuje pořizovací cenu,
            servis, pojištění, dálniční známku ani ztrátu hodnoty vozu.
          </Alert>
          {result.cheapest.id === 'ev' && (
            <Alert severity="success" sx={{ mt: 1.5 }}>
              Při zadaném nájezdu a domácím nabíjení vychází elektroauto provozně nejvýhodněji.
            </Alert>
          )}
        </Box>
      )}
    </Box>
  )
}
