// Zjednodušená logika pro rok 2026 – sazby a limity je možné dále zpřesnit
// podle oficiálních mzdových kalkulaček. [web:400][web:404][web:410][web:423]

const TAX_RATE_BASIC = 0.15;          // 15 % [web:400][web:417]
const TAX_RATE_HIGH = 0.23;           // 23 % [web:400][web:417]
const HIGH_TAX_THRESHOLD = 146901;    // Kč / měsíc [web:400][web:417]

const SOCIAL_EMPLOYEE_RATE = 0.071;   // 7,1 % HPP [web:404][web:410]
const HEALTH_EMPLOYEE_RATE = 0.045;   // 4,5 % HPP [web:404][web:410]

const SOCIAL_EMPLOYER_RATE = 0.248;   // cca 24,8 % [web:404][web:406]
const HEALTH_EMPLOYER_RATE = 0.09;    // 9 % [web:404]

// Orientační hodnoty slev – lze zpřesnit
const BASIC_TAX_CREDIT = 2570;        // sleva na poplatníka / měsíc [web:409]
const SPOUSE_CREDIT = 2070;           // sleva na manžela/manželku (odhad)
const STUDENT_CREDIT = 335;           // sleva na studenta (odhad)

// DPP / DPČ limity pro SP/ZP
const DPP_INSURANCE_LIMIT = 12000;    // DPP: do 12 000 Kč bez SP/ZP [web:400][web:417][web:423]
const DPC_INSURANCE_LIMIT = 4500;     // DPČ: do 4 500 Kč bez SP/ZP [web:423]

export function calculateNetSalary2026(form) {
  const gross = Number(form.grossSalary) || 0;
  const { contractType } = form;

  const isHPP = contractType === 'HPP';
  const isDPP = contractType === 'DPP';
  const isDPC = contractType === 'DPC';

  // 1) Sociální a zdravotní pojištění zaměstnance + zaměstnavatele
  let socialEmployee = 0;
  let healthEmployee = 0;
  let socialEmployer = 0;
  let healthEmployer = 0;

  if (isHPP) {
    socialEmployee = Math.round(gross * SOCIAL_EMPLOYEE_RATE);
    healthEmployee = Math.round(gross * HEALTH_EMPLOYEE_RATE);
    socialEmployer = Math.round(gross * SOCIAL_EMPLOYER_RATE);
    healthEmployer = Math.round(gross * HEALTH_EMPLOYER_RATE);
  } else if (isDPP) {
    if (gross > DPP_INSURANCE_LIMIT) {
      socialEmployee = Math.round(gross * SOCIAL_EMPLOYEE_RATE);
      healthEmployee = Math.round(gross * HEALTH_EMPLOYEE_RATE);
      socialEmployer = Math.round(gross * SOCIAL_EMPLOYER_RATE);
      healthEmployer = Math.round(gross * HEALTH_EMPLOYER_RATE);
    }
  } else if (isDPC) {
    if (gross > DPC_INSURANCE_LIMIT) {
      socialEmployee = Math.round(gross * SOCIAL_EMPLOYEE_RATE);
      healthEmployee = Math.round(gross * HEALTH_EMPLOYEE_RATE);
      socialEmployer = Math.round(gross * SOCIAL_EMPLOYER_RATE);
      healthEmployer = Math.round(gross * HEALTH_EMPLOYER_RATE);
    }
  }

  // 2) Základ daně – pro zjednodušení hrubá mzda
  const taxBase = gross;

  // 3) Daň před slevami
  let taxBeforeCredits = 0;
  if (taxBase <= HIGH_TAX_THRESHOLD) {
    taxBeforeCredits = Math.round(taxBase * TAX_RATE_BASIC);
  } else {
    const basicPart = HIGH_TAX_THRESHOLD * TAX_RATE_BASIC;
    const highPart = (taxBase - HIGH_TAX_THRESHOLD) * TAX_RATE_HIGH;
    taxBeforeCredits = Math.round(basicPart + highPart);
  }

  // 4) Slevy na dani
  let taxCredit = BASIC_TAX_CREDIT;

  if (form.spouseClaim) {
    taxCredit += SPOUSE_CREDIT;
  }
  if (form.student) {
    taxCredit += STUDENT_CREDIT;
  }

  // TODO: dětské slevy podle form.childrenCount

  let tax = taxBeforeCredits - taxCredit;
  if (tax < 0) tax = 0;

  // 5) Čistá mzda a náklady zaměstnavatele
  const net = gross - socialEmployee - healthEmployee - tax;
  const totalEmployerCost = gross + socialEmployer + healthEmployer;

  return {
    gross,
    tax,
    socialEmployee,
    healthEmployee,
    net,
    socialEmployer,
    healthEmployer,
    totalEmployerCost,
  };
}
