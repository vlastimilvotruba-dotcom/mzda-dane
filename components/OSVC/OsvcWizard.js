import React, { useState, useRef } from 'react';
import { Box, Typography, LinearProgress } from '@mui/material';
import OsvcForm from './OsvcForm';
import OsvcResult from './OsvcResult';
import { calculateOsvc2025 } from '../../logic/osvc2025';

const PROGRESS_COLOR = '#6a1b9a';

const INITIAL_FORM = {
  annualIncome: '',
  expenseMode: 'percent',
  expensePercent: '60',
  actualExpenses: '',
  dominantRate: '60',
  activityType: 'main',
  monthsActive: '12',
  startupRelief: false,
  otherDeductions: '',
  disability: '0',
  ztpP: false,
  spouseClaim: false,
  childrenCount: '0',
  childrenZtpP: '0',
};

export default function OsvcWizard() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [result, setResult] = useState(null);
  const [step, setStep] = useState(0);
  const topRef = useRef(null);

  function handleChange(field, value) {
    setForm((prev) => {
      const next = { ...prev, [field]: value };

      if (field === 'expenseMode' && value === 'percent') {
        next.dominantRate = next.expensePercent || '60';
      }

      if (field === 'expensePercent') {
        next.dominantRate = String(value);
      }

      if (field === 'activityType' && value === 'secondary') {
        next.startupRelief = false;
      }

      if (field === 'childrenCount') {
        const total = Math.max(0, Number(value) || 0);
        const currentZtp = Number(prev.childrenZtpP) || 0;
        next.childrenZtpP = String(Math.min(total, currentZtp));
      }

      return next;
    });
  }

  function handleCalculate() {
    const res = calculateOsvc2025(form);
    setResult(res);
    setStep(1);
    setTimeout(() => {
      topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  }

  function handleBack() {
    setStep(0);
  }

  function handleReset() {
    setForm(INITIAL_FORM);
    setResult(null);
    setStep(0);
  }

  return (
    <Box ref={topRef}>
      <Box mb={3}>
        <LinearProgress
          variant="determinate"
          value={step === 0 ? 45 : 100}
          sx={{
            height: 4,
            borderRadius: 2,
            bgcolor: 'rgba(106,27,154,0.12)',
            '& .MuiLinearProgress-bar': { bgcolor: PROGRESS_COLOR },
          }}
        />
        <Box display="flex" justifyContent="space-between" mt={0.5}>
          <Typography
            variant="caption"
            sx={{
              color: step === 0 ? PROGRESS_COLOR : 'text.disabled',
              fontWeight: step === 0 ? 700 : 400,
            }}
          >
            Zadání údajů
          </Typography>
          <Typography
            variant="caption"
            sx={{
              color: step === 1 ? PROGRESS_COLOR : 'text.disabled',
              fontWeight: step === 1 ? 700 : 400,
            }}
          >
            Výsledek
          </Typography>
        </Box>
      </Box>

      {step === 0 && (
        <OsvcForm
          form={form}
          onChange={handleChange}
          onCalculate={handleCalculate}
        />
      )}

      {step === 1 && (
        <OsvcResult
          result={result}
          onBack={handleBack}
          onReset={handleReset}
        />
      )}
    </Box>
  );
}
