import React, { useState } from 'react';
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

function SalaryWizard() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState(initialForm);
  const [result, setResult] = useState(null);

  const updateForm = (partial) => {
    setForm((prev) => ({ ...prev, ...partial }));
  };

  const handleCalculate = () => {
    const res = calculateNetSalary2026(form);
    setResult(res);
    setStep(1);
  };

  return (
    <div>
      {step === 0 && (
        <StepForm
          form={form}
          onChange={updateForm}
          onCalculate={handleCalculate}
        />
      )}

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
    </div>
  );
}

export default SalaryWizard;
