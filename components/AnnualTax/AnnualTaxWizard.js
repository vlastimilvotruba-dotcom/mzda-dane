import React, { useState, useRef } from 'react';
import { Box, Typography, LinearProgress } from '@mui/material';
import AnnualTaxForm from './AnnualTaxForm';
import AnnualTaxResult from './AnnualTaxResult';
import { calculateAnnualTax2026 } from '../../logic/annualTax2026';

const PROGRESSCOLOR = '#ef6c00';

const INITIAL_FORM = {
  grossAnnual:      '',
  taxWithheld:      '',
  lifeInsurance:    '',
  pensionSavings:   '',
  mortgageInterest: '',
  gifts:            '',
  disability:       '0',
  ztpP:             false,
  spouseClaim:      false,
  childrenCount:    '0',
  childrenZtpP:     '0',
};

export default function AnnualTaxWizard({ onBack }) {
  const [form, setForm]     = useState(INITIAL_FORM);
  const [result, setResult] = useState(null);
  const [step, setStep]     = useState(0);
  const topRef = useRef(null);

  function handleChange(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function handleCalculate() {
    const res = calculateAnnualTax2026(form);
    setResult(res);
    setStep(1);
    setTimeout(() => {
      topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  }

  // Vrátí uživatele zpět na formulář se zachovanými daty
  function handleBack() {
    setStep(0);
  }

  // Vymaže vše a začne znovu
  function handleReset() {
    setForm(INITIAL_FORM);
    setResult(null);
    setStep(0);
  }

  return (
    <Box ref={topRef}>

      {/* ── Progress bar ── */}
      <Box mb={3}>
        <LinearProgress
          variant="determinate"
          value={step === 0 ? 40 : 100}
          sx={{
            height: 4,
            borderRadius: 2,
            bgcolor: 'rgba(230,81,0,0.12)',
            '& .MuiLinearProgress-bar': { bgcolor: PROGRESSCOLOR },
          }}
        />
        <Box display="flex" justifyContent="space-between" mt={0.5}>
          <Typography
            variant="caption"
            sx={{
              color:      step === 0 ? PROGRESSCOLOR : 'text.disabled',
              fontWeight: step === 0 ? 700 : 400,
            }}
          >
            Zadání údajů
          </Typography>
          <Typography
            variant="caption"
            sx={{
              color:      step === 1 ? PROGRESSCOLOR : 'text.disabled',
              fontWeight: step === 1 ? 700 : 400,
            }}
          >
            Výsledek
          </Typography>
        </Box>
      </Box>

      {/* ── Krok 0: Formulář ── */}
      {step === 0 && (
        <AnnualTaxForm
          form={form}
          onChange={handleChange}
          onCalculate={handleCalculate}
        />
      )}

      {/* ── Krok 1: Výsledek ── */}
      {step === 1 && (
        <AnnualTaxResult
          result={result}
          onBack={handleBack}
          onReset={handleReset}
        />
      )}

    </Box>
  );
}
