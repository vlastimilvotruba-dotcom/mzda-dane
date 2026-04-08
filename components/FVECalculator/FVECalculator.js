import React, { useState } from 'react';
import {
  Box, TextField, Typography, Slider, Divider,
  InputAdornment, Alert, Grid, Paper,
} from '@mui/material';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import SavingsIcon from '@mui/icons-material/Savings';
import Co2Icon from '@mui/icons-material/Co2';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { calculateFVE } from '../../logic/fve2026';

const ACCENT = '#f57f17';
const fmtKc = (v) => Math.round(v).toLocaleString('cs-CZ') + ' Kč';
const fmtKwh = (v) => Math.round(v).toLocaleString('cs-CZ') + ' kWh';

const defaultForm = {
  vykonKWp: 6,
  cenaInstalace: 180000,
  dotace: 0,
  vlastniSpotrebaPercent: 65,
  cenaElektrinaZeSite: 5.5,
  vykupniCena: 2.0,
  rocniSpotrebaKWh: 5000,
  loanMonths: 120,
};

function ResultRow({ label, value, bold, color }) {
  return (
    <Box display="flex" justifyContent="space-between" alignItems="center" py={0.6}>
      <Typography variant="body2" color="text.secondary">{label}</Typography>
      <Typography variant="body2" fontWeight={bold ? 700 : 400} color={color || 'text.primary'}>
        {value}
      </Typography>
    </Box>
  );
}

export default function FVECalculator() {
  const [form, setForm] = useState(defaultForm);

  const set = (field) => (e) => {
    const val = e.target ? e.target.value : e;
    setForm((prev) => ({ ...prev, [field]: val }));
  };

  const result = calculateFVE(form);

  const navratnostText = result
    ? result.dobaNavratnosti === Infinity
      ? 'nelze spočítat'
      : result.dobaNavratnosti < 100
      ? result.dobaNavratnosti.toFixed(1).replace('.', ',') + ' let'
      : '> 100 let'
    : null;

  const loanOk = result && result.mesicniUspora >= result.mesicniSplatka;
  const loanNearOk = result && result.mesicniUspora >= result.mesicniSplatka * 0.8;

  return (
    <Box>
      {/* ── Vstupy ── */}
      <Typography variant="subtitle2" fontWeight={700} color={ACCENT} mb={2}>
        Parametry instalace
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Výkon FVE (kWp)"
            type="number"
            size="small"
            fullWidth
            value={form.vykonKWp}
            onChange={set('vykonKWp')}
            inputProps={{ min: 1, max: 50, step: 0.5 }}
            InputProps={{ endAdornment: <InputAdornment position="end">kWp</InputAdornment> }}
            helperText="Typický rodinný dům: 4–10 kWp"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Aktuální roční spotřeba elektřiny"
            type="number"
            size="small"
            fullWidth
            value={form.rocniSpotrebaKWh}
            onChange={set('rocniSpotrebaKWh')}
            inputProps={{ min: 0, step: 100 }}
            InputProps={{ endAdornment: <InputAdornment position="end">kWh/rok</InputAdornment> }}
            helperText="Rodinný dům průměrně: 3 500–7 000 kWh/rok"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Celková cena instalace"
            type="number"
            size="small"
            fullWidth
            value={form.cenaInstalace}
            onChange={set('cenaInstalace')}
            inputProps={{ min: 0, step: 1000 }}
            InputProps={{ endAdornment: <InputAdornment position="end">Kč</InputAdornment> }}
            helperText="Včetně montáže a měniče"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Podpora / dotace"
            type="number"
            size="small"
            fullWidth
            value={form.dotace}
            onChange={set('dotace')}
            inputProps={{ min: 0, step: 1000 }}
            InputProps={{ endAdornment: <InputAdornment position="end">Kč</InputAdornment> }}
            helperText="NZÚ Light (nízkopříjmové), OPŽP nebo 0 bez dotace"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Cena elektřiny ze sítě"
            type="number"
            size="small"
            fullWidth
            value={form.cenaElektrinaZeSite}
            onChange={set('cenaElektrinaZeSite')}
            inputProps={{ min: 0, step: 0.1 }}
            InputProps={{ endAdornment: <InputAdornment position="end">Kč/kWh</InputAdornment> }}
            helperText="Průměr ČR 2026: ~5–6 Kč/kWh"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Výkupní cena přebytků"
            type="number"
            size="small"
            fullWidth
            value={form.vykupniCena}
            onChange={set('vykupniCena')}
            inputProps={{ min: 0, step: 0.1 }}
            InputProps={{ endAdornment: <InputAdornment position="end">Kč/kWh</InputAdornment> }}
            helperText="Komunitní energetika nebo smlouva s dodavatelem"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box px={0.5}>
            <Typography variant="body2" color="text.secondary" mb={0.5}>
              Vlastní spotřeba vyrobené elektřiny: <strong>{form.vlastniSpotrebaPercent} %</strong>
            </Typography>
            <Slider
              value={form.vlastniSpotrebaPercent}
              onChange={(_, v) => setForm((p) => ({ ...p, vlastniSpotrebaPercent: v }))}
              min={10}
              max={100}
              step={5}
              marks={[
                { value: 10, label: '10 %' },
                { value: 50, label: '50 %' },
                { value: 100, label: '100 %' },
              ]}
              sx={{ color: ACCENT }}
            />
            <Typography variant="caption" color="text.secondary">
              Bez baterie ~50–70 %, s baterií ~80–95 %
            </Typography>
          </Box>
        </Grid>

        {/* Slider půjčky – plná šířka, vizuálně oddělený */}
        <Grid item xs={12}>
          <Divider sx={{ mb: 1 }}>
            <Typography variant="caption" color="text.disabled">Simulace financování</Typography>
          </Divider>
          <Box px={0.5}>
            <Typography variant="body2" color="text.secondary" mb={0.5}>
              Délka bezúročné půjčky:{' '}
              <strong>{form.loanMonths} měs. ({Math.round(form.loanMonths / 12)} let)</strong>
            </Typography>
            <Slider
              value={form.loanMonths}
              onChange={(_, v) => setForm((p) => ({ ...p, loanMonths: v }))}
              min={60}
              max={240}
              step={12}
              marks={[
                { value: 60, label: '5 let' },
                { value: 120, label: '10 let' },
                { value: 180, label: '15 let' },
                { value: 240, label: '20 let' },
              ]}
              sx={{ color: '#1565c0' }}
            />
            <Typography variant="caption" color="text.secondary">
              Pro srovnání měsíční splátky s průměrnou úsporou na energii
            </Typography>
          </Box>
        </Grid>
      </Grid>

      {/* ── Výsledky ── */}
      {result && (
        <Box mt={3}>
          <Divider sx={{ mb: 2 }} />
          <Typography variant="subtitle2" fontWeight={700} color={ACCENT} mb={1.5}>
            Výsledky výpočtu
          </Typography>

          {/* Spotřeba – před a po FVE */}
          <Box sx={{ bgcolor: '#f3e5f5', borderRadius: 2, p: 2, mb: 2 }}>
            <Box display="flex" alignItems="center" gap={1} mb={1}>
              <ElectricBoltIcon sx={{ color: '#6a1b9a', fontSize: 20 }} />
              <Typography variant="subtitle2" fontWeight={700}>Spotřeba elektřiny – před a po FVE</Typography>
            </Box>
            <ResultRow label="Aktuální roční odběr ze sítě" value={fmtKwh(form.rocniSpotrebaKWh)} />
            <ResultRow label="Z toho pokryje vlastní výroba FVE" value={fmtKwh(result.vlastniSpotrebaKWh)} bold color="#2e7d32" />
            <ResultRow label="Zbývá odebrat ze sítě po FVE" value={fmtKwh(result.zbyvaZeSiteKWh)} />
            <Divider sx={{ my: 0.5 }} />
            <ResultRow label="Roční náklady na elektřinu nyní" value={fmtKc(result.nakladyZeSitePredFVE)} />
            <ResultRow label="Roční náklady na elektřinu po FVE" value={fmtKc(result.nakladyZeSiteRocne)} bold color="#2e7d32" />
          </Box>

          {/* Výroba */}
          <Box sx={{ bgcolor: '#fff8e1', borderRadius: 2, p: 2, mb: 2 }}>
            <Box display="flex" alignItems="center" gap={1} mb={1}>
              <WbSunnyIcon sx={{ color: '#f57f17', fontSize: 20 }} />
              <Typography variant="subtitle2" fontWeight={700}>Roční výroba elektřiny</Typography>
            </Box>
            <ResultRow label="Celková roční výroba FVE" value={fmtKwh(result.rocniVyroba)} />
            <ResultRow label="Vlastní spotřeba (ze slunce)" value={fmtKwh(result.vlastniSpotrebaKWh)} />
            <ResultRow label="Přebytky prodané do sítě" value={fmtKwh(result.prebytkyKWh)} />
          </Box>

          {/* Úspora */}
          <Box sx={{ bgcolor: '#e8f5e9', borderRadius: 2, p: 2, mb: 2 }}>
            <Box display="flex" alignItems="center" gap={1} mb={1}>
              <SavingsIcon sx={{ color: '#2e7d32', fontSize: 20 }} />
              <Typography variant="subtitle2" fontWeight={700}>Roční finanční výhoda</Typography>
            </Box>
            <ResultRow label="Úspora na elektřině ze sítě" value={fmtKc(result.usporaElektrina)} />
            <ResultRow label="Příjem z prodeje přebytků" value={fmtKc(result.prijemZPrebytku)} />
            <Divider sx={{ my: 0.5 }} />
            <ResultRow
              label="Celková roční výhoda"
              value={fmtKc(result.celkovaRocniVyhoda)}
              bold
              color="#2e7d32"
            />
          </Box>

          {/* Bezúročná půjčka – ZVÝRAZNĚNO */}
          <Paper
            elevation={0}
            sx={{
              borderRadius: 2,
              p: 2,
              mb: 2,
              border: `2px solid ${loanOk ? '#2e7d32' : loanNearOk ? '#f57f17' : '#c62828'}`,
              bgcolor: loanOk ? '#e8f5e9' : loanNearOk ? '#fff8e1' : '#fce4ec',
            }}
          >
            <Box display="flex" alignItems="center" gap={1} mb={1}>
              <AccountBalanceIcon sx={{ color: '#1565c0', fontSize: 20 }} />
              <Typography variant="subtitle2" fontWeight={700}>
                Bezúročná půjčka vs. měsíční úspora
              </Typography>
            </Box>
            <ResultRow label="Čistá investice (po případné podpoře)" value={fmtKc(result.cistinaInvestice)} />
            <ResultRow
              label={`Měsíční splátka bezúročné půjčky (${Math.round(form.loanMonths / 12)} let)`}
              value={fmtKc(result.mesicniSplatka)}
              bold
            />
            <ResultRow
              label="Průměrná měsíční úspora na energii"
              value={fmtKc(result.mesicniUspora)}
              bold
              color="#2e7d32"
            />
            <Divider sx={{ my: 0.5 }} />
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="body2" fontWeight={700}>
                {loanOk
                  ? '✓ Úspora pokryje celou splátku'
                  : loanNearOk
                  ? '~ Úspora téměř pokrývá splátku'
                  : '✗ Splátka převyšuje měsíční úsporu'}
              </Typography>
              <Typography
                variant="body2"
                fontWeight={700}
                color={loanOk ? '#2e7d32' : loanNearOk ? '#f57f17' : '#c62828'}
              >
                {loanOk
                  ? `+ ${fmtKc(result.mesicniUspora - result.mesicniSplatka)}/měs.`
                  : `- ${fmtKc(result.mesicniSplatka - result.mesicniUspora)}/měs.`}
              </Typography>
            </Box>
          </Paper>

          {/* Návratnost */}
          <Box sx={{ bgcolor: '#fce4ec', borderRadius: 2, p: 2, mb: 2 }}>
            <Box display="flex" alignItems="center" gap={1} mb={1}>
              <AccessTimeIcon sx={{ color: '#c62828', fontSize: 20 }} />
              <Typography variant="subtitle2" fontWeight={700}>Investice a návratnost</Typography>
            </Box>
            <ResultRow label="Cena instalace" value={fmtKc(form.cenaInstalace)} />
            <ResultRow label="Podpora / dotace" value={'- ' + fmtKc(form.dotace)} />
            <ResultRow label="Čistá investice po podpoře" value={fmtKc(result.cistinaInvestice)} bold />
            <Divider sx={{ my: 0.5 }} />
            <ResultRow
              label="Doba návratnosti"
              value={navratnostText}
              bold
              color={result.dobaNavratnosti <= 12 ? '#2e7d32' : result.dobaNavratnosti <= 18 ? '#f57f17' : '#c62828'}
            />
            <ResultRow
              label="Čistý zisk za 25 let"
              value={result.ziskZa25Let >= 0 ? fmtKc(result.ziskZa25Let) : '- ' + fmtKc(Math.abs(result.ziskZa25Let))}
              bold
              color={result.ziskZa25Let >= 0 ? '#2e7d32' : '#c62828'}
            />
          </Box>

          {/* CO2 */}
          <Box sx={{ bgcolor: '#e3f2fd', borderRadius: 2, p: 2 }}>
            <Box display="flex" alignItems="center" gap={1} mb={1}>
              <Co2Icon sx={{ color: '#1565c0', fontSize: 20 }} />
              <Typography variant="subtitle2" fontWeight={700}>Ekologický dopad</Typography>
            </Box>
            <ResultRow
              label="Roční úspora CO₂"
              value={result.co2UsporaRocne.toLocaleString('cs-CZ') + ' kg'}
              bold
              color="#1565c0"
            />
            <Typography variant="caption" color="text.secondary">
              Za 25 let ušetříte {(result.co2UsporaRocne * 25 / 1000).toFixed(1).replace('.', ',')} tun CO₂
            </Typography>
          </Box>

          {result.dobaNavratnosti <= 10 && (
            <Alert severity="success" sx={{ mt: 2 }}>
              Výborná investice — návratnost do 10 let je nadprůměrná.
            </Alert>
          )}
          {result.dobaNavratnosti > 20 && result.dobaNavratnosti < Infinity && (
            <Alert severity="warning" sx={{ mt: 2 }}>
              Delší návratnost — zvažte přidání baterie nebo vyšší vlastní spotřebu.
            </Alert>
          )}
        </Box>
      )}
    </Box>
  );
}
