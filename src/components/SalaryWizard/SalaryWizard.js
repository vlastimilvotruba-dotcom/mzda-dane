// src/components/SalaryWizard/SalaryWizard.js
import React, { useState } from 'react';
import StepBasic from './StepBasic';
import StepTaxCredits from './StepTaxCredits';
import StepSummary from './StepSummary';
import { calculateNetSalary2026 } from '../../logic/salary2026';

const initialForm = {
  contractType: 'HPP',
  grossSalary: '',
  disability: 'none',
  childrenCount: 0,
  spouseClaim: false,
  student: false,
};

function SalaryWizard() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState(initialForm);
  const [result, setResult] = useState(null);

  const updateForm = (partial) => {
    console.log('updateForm called with:', partial);
    setForm((prev) => {
      const next = { ...prev, ...partial };
      console.log('new form state:', next);
      return next;
    });
  };

  const next = () => setStep((s) => Math.min(s + 1, 2));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const handleCalculate = () => {
    const res = calculateNetSalary2026(form);
    setResult(res);
    setStep(2);
  };

  console.log('render SalaryWizard, form.contractType:', form.contractType);

  return (
    <div>
      {step === 0 && (
        <StepBasic
          form={form}
          onChange={updateForm}
          onNext={next}
        />
      )}

      {step === 1 && (
        <StepTaxCredits
          form={form}
          onChange={updateForm}
          onBack={back}
          onNext={handleCalculate}
        />
      )}

      {step === 2 && (
        <StepSummary
          form={form}
          result={result}
          onBack={back}
          onRestart={() => {
            setForm(initialForm);
            setResult(null);
            setStep(0);
          }}
        />
      )}
    </div>
  );
}

export default SalaryWizard;
