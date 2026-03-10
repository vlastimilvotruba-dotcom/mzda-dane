// Daně a odvody – orientační parametry pro rok 2026.[web:400][web:404][web:410]
const TAX_RATE_BASIC = 0.15;
const TAX_RATE_HIGH = 0.23;
const HIGH_TAX_THRESHOLD = 146901; // Kč / měsíc [web:400]

const SOCIAL_EMPLOYEE_RATE = 0.071; // 7,1 % [web:404][web:410]
const HEALTH_EMPLOYEE_RATE = 0.045; // 4,5 % [web:404][web:410]

const SOCIAL_EMPLOYER_RATE = 0.248; // cca 24,8 % [web:404]
const HEALTH_EMPLOYER_RATE = 0.09;  // 9 % [web:404]

// Měsíční slevy na dani – 2025/2026 (model).[web:453][web:483]
const BASIC_TAX_CREDIT = 2570;      // poplatník [web:453]
const ZTPP_HOLDER_CREDIT = 1345;    // držitel průkazu ZTP/P [web:471][web:483]
const SPOUSE_CREDIT = 2070;         // manžel/ka (1/12 z 24 840) [web:485]
const STUDENT_CREDIT = 335;         // orientačně

// Děti – základní měsíční zvýhodnění.[web:475][web:486]
const CHILD1_CREDIT = 1267;
const CHILD2_CREDIT = 1860;
const CHILD3PLUS_CREDIT = 2320;

// Invalidita – měsíční slevy.[web:473]
const DISABILITY_I_II_MONTHLY = 210;
const DISABILITY_III_MONTHLY = 420;

// DPP / DPČ limity pro SP/ZP.[web:400]
const DPP_INSURANCE_LIMIT = 12000;
const DPC_INSURANCE_LIMIT = 4500;

// Roční strop vyměřovacího základu pro SP – orientačně.[web:403][web:420]
const SOCIAL_ANNUAL_CAP = 2350416;

export function calculateNetSalary2026(form) {
  const gross = Number(form.grossSalary) || 0;
  const { contractType } = form;
  const childrenCount = Number(form.childrenCount) || 0;
  const childrenZtpP = Number(form.childrenZtpP) || 0;

  const isHPP = contractType === 'HPP';
  const isDPP = contractType === 'DPP';
  const isDPC = contractType === 'DPC';

  // 1) Sociální a zdravotní pojištění – zaměstnanec + zaměstnavatel
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

  // 2) Základ daně
  const taxBase = gross;

  // 3) Daň před slevami (dvě pásma)
  let taxBeforeCredits = 0;
  if (taxBase <= HIGH_TAX_THRESHOLD) {
    taxBeforeCredits = Math.round(taxBase * TAX_RATE_BASIC);
  } else {
    const basicPart = HIGH_TAX_THRESHOLD * TAX_RATE_BASIC;
    const highPart = (taxBase - HIGH_TAX_THRESHOLD) * TAX_RATE_HIGH;
    taxBeforeCredits = Math.round(basicPart + highPart);
  }

  // 4) Slevy na dani

  // Poplatník + ZTP/P.[web:471][web:483]
  const basicCredit = BASIC_TAX_CREDIT;
  const ztpPHoldCredit = form.ztpP ? ZTPP_HOLDER_CREDIT : 0;

  const spouseCredit = form.spouseClaim ? SPOUSE_CREDIT : 0;
  const studentCredit = form.student ? STUDENT_CREDIT : 0;

  // Sleva za invaliditu
  let disabilityCredit = 0;
  if (form.disability === '1' || form.disability === '2') {
    disabilityCredit = DISABILITY_I_II_MONTHLY;
  } else if (form.disability === '3') {
    disabilityCredit = DISABILITY_III_MONTHLY;
  }

  // Děti + ZTP/P u dětí – „optimistické“ pořadí ZTP/P dětí.[web:475][web:480][web:486]
  const totalChildren = childrenCount;
  const ztpPChildren = Math.min(childrenZtpP, totalChildren);

  let childCredits = [0, 0, 0];      // základní pro 1., 2., 3+ dítě
  let childCreditsZtpP = [0, 0, 0];  // navýšení pro ZTP/P

  for (let i = 0; i < totalChildren; i++) {
    const index = i; // 0 = 1. dítě, 1 = 2., 2+ = 3. a další
    const band = index === 0 ? 0 : index === 1 ? 1 : 2;

    const base =
      band === 0
        ? CHILD1_CREDIT
        : band === 1
        ? CHILD2_CREDIT
        : CHILD3PLUS_CREDIT;

    childCredits[band] += base;

    // ZTP/P přiřadíme od prvního dítěte výš – typicky výhodnější pořadí.[web:480]
    if (i < ztpPChildren) {
      childCreditsZtpP[band] += base; // navíc ×1 → celkem 2×
    }
  }

  const child1 = childCredits[0];
  const child2 = childCredits[1];
  const child3plus = childCredits[2];

  const childZtpPBonus =
    childCreditsZtpP[0] + childCreditsZtpP[1] + childCreditsZtpP[2];

  const childrenBaseCredits = child1 + child2 + child3plus;
  const childrenCredits = childrenBaseCredits + childZtpPBonus;

  const totalCredits =
    basicCredit +
    ztpPHoldCredit +
    spouseCredit +
    studentCredit +
    disabilityCredit +
    childrenCredits;

  let tax = taxBeforeCredits - totalCredits;
  let childBonus = 0;

  if (tax < 0) {
    childBonus = Math.abs(tax);
    tax = 0;
  }

  // 5) Čistá mzda a náklady zaměstnavatele
  const net = gross - socialEmployee - healthEmployee - tax + childBonus;
  const totalEmployerCost = gross + socialEmployer + healthEmployer;

  // 6) Odhad měsíce dosažení ročního stropu SP
  let socialCapMonth = null;
  if (gross > 0) {
    const monthsToCap = SOCIAL_ANNUAL_CAP / gross;
    if (monthsToCap <= 12) {
      socialCapMonth = Math.ceil(monthsToCap);
    }
  }

  return {
    gross,
    taxBase,
    taxBeforeCredits,
    tax,
    childBonus,

    socialEmployee,
    healthEmployee,
    socialEmployer,
    healthEmployer,

    net,
    totalEmployerCost,
    socialCapMonth,

    credits: {
      basicCredit,
      ztpPHoldCredit,
      spouseCredit,
      studentCredit,
      disabilityCredit,
      child1,
      child2,
      child3plus,
      childZtpPBonus,
      childrenTotal: childrenCredits,
      totalCredits,
    },
  };
}
