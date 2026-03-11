import React, { useState } from 'react';
import { Box, Typography, LinearProgress } from '@mui/material';
import StepForm from './StepForm';
import StepSummary from './StepSummary';
import { calculateNetSalary2026 } from '../../logic/salary2026';

const initialForm = {
  contractType: 'HPP',
  grossSalary: '',
  disability: 'none',
  childrenCount: 0,
  childrenZtpP: 0,
  spouseClaim: false,
  ztpP: false,
  taxDeclaration: true,
};

export default function SalaryWizard() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState(initialForm);
  const [result, setResult] = useState(null);

  const updateForm = (partial) =>
    setForm((prev) => ({ ...prev, ...partial }));

  const handleCalculate = () => {
    const res = calculateNetSalary2026(form);
    setResult(res);
    setStep(1);
  };

  return (
    <Box>
      {/* ── Progress bar ── */}
      <Box mb={3}>
        <LinearProgress
          variant="determinate"
          value={step === 0 ? 40 : 100}
          sx={{
            height: 4,
            borderRadius: 2,
            bgcolor: 'rgba(21,101,192,0.15)',
            '& .MuiLinearProgress-bar': { bgcolor: '#1565c0' },
          }}
        />
        <Box display="flex" justifyContent="space-between" mt={0.5}>
          <Typography
            variant="caption"
            color={step === 0 ? 'primary' : 'text.disabled'}
            fontWeight={step === 0 ? 700 : 400}
          >
            Zadání údajů
          </Typography>
          <Typography
            variant="caption"
            color={step === 1 ? 'primary' : 'text.disabled'}
            fontWeight={step === 1 ? 700 : 400}
          >
            Výsledek
          </Typography>
        </Box>
      </Box>

      {/* ── Krok 0: Formulář ── */}
      {step === 0 && (
        <StepForm
          form={form}
          onChange={updateForm}
          onCalculate={handleCalculate}
        />
      )}

      {/* ── Krok 1: Výsledek ── */}
      {step === 1 && (
        <StepSummary
          form={form}
          result={result}
          onBack={() => setStep(0)}
          onRestart={() => {
            setForm(initialForm);
            setResult(null);
            setStep(0);
          }}
        />
      )}
    </Box>
  );
}
