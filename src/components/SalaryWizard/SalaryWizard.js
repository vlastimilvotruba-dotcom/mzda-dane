import React, { useState } from 'react';
import StepBasic from './StepBasic';
import StepTaxCredits from './StepTaxCredits';
import StepSummary from './StepSummary';
import { calculateNetSalary2026 } from '../../logic/salary2026';

const initialForm = {
  contractType: 'HPP',
  grossSalary: '',
  disability: 'none',
  // daňové slevy:
  childrenCount: 0,
  childrenZtpP: 0,
  spouseClaim: false,
  student: false,
  ztpP: false, // poplatník držitel průkazu ZTP/P
};

function SalaryWizard() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState(initialForm);
  const [result, setResult] = useState(null);

  const updateForm = (partial) => {
    setForm((prev) => ({ ...prev, ...partial }));
  };

  const next = () => setStep((s) => Math.min(s + 1, 2));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const handleCalculate = () => {
    const res = calculateNetSalary2026(form);
    setResult(res);
    setStep(2);
  };

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
          onBack={() => setStep(1)}
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
