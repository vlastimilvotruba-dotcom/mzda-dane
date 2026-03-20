export function calculateLoan(form) {
  const principal = Number(form.loanAmount) || 0;
  const annualRate = Number(form.interestRate) || 0;
  const months = Number(form.loanMonths) || 0;

  if (principal <= 0 || months <= 0) return null;

  // Měsíční úroková sazba
  const monthlyRate = annualRate / 100 / 12;

  let monthlyPayment = 0;
  let totalPaid = 0;
  let totalInterest = 0;

  if (monthlyRate === 0) {
    // Bezúročná půjčka
    monthlyPayment = principal / months;
    totalPaid = principal;
    totalInterest = 0;
  } else {
    // Anuitní splátka
    monthlyPayment =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
      (Math.pow(1 + monthlyRate, months) - 1);
    totalPaid = monthlyPayment * months;
    totalInterest = totalPaid - principal;
  }

  return {
    principal,
    annualRate,
    months,
    monthlyPayment: Math.round(monthlyPayment),
    totalPaid: Math.round(totalPaid),
    totalInterest: Math.round(totalInterest),
  };
}
