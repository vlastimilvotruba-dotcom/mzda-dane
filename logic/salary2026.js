// Daně a odvody – parametry pro rok 2026
const TAX_RATE_BASIC = 0.15;
const TAX_RATE_HIGH = 0.23;
const HIGH_TAX_THRESHOLD = 146901; // Kč / měsíc

const SOCIAL_EMPLOYEE_RATE = 0.071; // 7,1 %
const HEALTH_EMPLOYEE_RATE = 0.045; // 4,5 %

const SOCIAL_EMPLOYER_RATE = 0.248; // 24,8 %
const HEALTH_EMPLOYER_RATE = 0.09;  // 9 %

// Měsíční slevy na dani – 2026
const BASIC_TAX_CREDIT = 2570;     // poplatník
const ZTPP_HOLDER_CREDIT = 1345;   // držitel průkazu ZTP/P
const SPOUSE_CREDIT = 2070;        // manžel/ka (1/12 z 24 840)
//const STUDENT_CREDIT = 335;        // orientačně

// Děti – základní měsíční zvýhodnění
const CHILD1_CREDIT = 1267;
const CHILD2_CREDIT = 1860;
const CHILD3PLUS_CREDIT = 2320;

// Invalidita – měsíční slevy
const DISABILITY_I_II_MONTHLY = 210;
const DISABILITY_III_MONTHLY = 420;

// DPP / DPČ limity pro SP/ZP a srážkovou daň
const DPP_INSURANCE_LIMIT = 12000; // odvody od 12 000 Kč včetně
const DPC_INSURANCE_LIMIT = 4500;  // odvody od 4 500 Kč včetně

// Roční strop vyměřovacího základu pro SP
const SOCIAL_ANNUAL_CAP = 2350416;

export function calculateNetSalary2026(form) {
  const gross = Number(form.grossSalary) || 0;
  const { contractType } = form;
  const childrenCount = Number(form.childrenCount) || 0;
  const childrenZtpP = Number(form.childrenZtpP) || 0;

  const isHPP = contractType === 'HPP';
  const isDPP = contractType === 'DPP';
  const isDPC = contractType === 'DPC';

  // Prohlášení poplatníka – u HPP vždy true
  const taxDeclaration = isHPP ? true : (form.taxDeclaration ?? true);

  // Srážková daň platí pouze pokud:
  // - jde o DPP/DPČ
  // - prohlášení NENÍ podepsáno
  // - odměna je POD limitem pro odvody
  const isSrazkova =
    (isDPP && !taxDeclaration && gross < DPP_INSURANCE_LIMIT) ||
    (isDPC && !taxDeclaration && gross < DPC_INSURANCE_LIMIT);

  // 1) Sociální a zdravotní pojištění
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
    if (gross >= DPP_INSURANCE_LIMIT) {
      socialEmployee = Math.round(gross * SOCIAL_EMPLOYEE_RATE);
      healthEmployee = Math.round(gross * HEALTH_EMPLOYEE_RATE);
      socialEmployer = Math.round(gross * SOCIAL_EMPLOYER_RATE);
      healthEmployer = Math.round(gross * HEALTH_EMPLOYER_RATE);
    }
  } else if (isDPC) {
    if (gross >= DPC_INSURANCE_LIMIT) {
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

  // 4) Srážková daň – žádné slevy, daň je finální
  if (isSrazkova) {
    const tax = taxBeforeCredits;
    const net = gross - tax;
    const totalEmployerCost = gross;

    return {
      gross,
      taxBase,
      taxBeforeCredits,
      tax,
      childBonus: 0,
      srazkova: true,
      socialEmployee: 0,
      healthEmployee: 0,
      socialEmployer: 0,
      healthEmployer: 0,
      net,
      totalEmployerCost,
      socialCapMonth: null,
      credits: {
        basicCredit: 0,
        ztpPHoldCredit: 0,
        spouseCredit: 0,
        studentCredit: 0,
        disabilityCredit: 0,
        child1: 0,
        child2: 0,
        child3plus: 0,
        childZtpPBonus: 0,
        childrenTotal: 0,
        totalCredits: 0,
      },
    };
  }

  // 5) Zálohová daň – slevy bez dětí
  const basicCredit = BASIC_TAX_CREDIT;
  const ztpPHoldCredit = form.ztpP ? ZTPP_HOLDER_CREDIT : 0;
  const spouseCredit = form.spouseClaim ? SPOUSE_CREDIT : 0;
  //const studentCredit = form.student ? STUDENT_CREDIT : 0;

  let disabilityCredit = 0;
  if (form.disability === '1' || form.disability === '2') {
    disabilityCredit = DISABILITY_I_II_MONTHLY;
  } else if (form.disability === '3') {
    disabilityCredit = DISABILITY_III_MONTHLY;
  }

  // Slevy BEZ dětí – mohou snížit daň max na 0, bonus nevzniká
  const creditsWithoutChildren =
    basicCredit +
    ztpPHoldCredit +
    spouseCredit +
    //studentCredit +
    disabilityCredit;

  let taxAfterBasicCredits = taxBeforeCredits - creditsWithoutChildren;
  if (taxAfterBasicCredits < 0) taxAfterBasicCredits = 0;

  // 6) Daňové zvýhodnění na děti – zde může vzniknout daňový bonus
  const totalChildren = childrenCount;
  const ztpPChildren = Math.min(childrenZtpP, totalChildren);

  let childCredits = [0, 0, 0];
  let childCreditsZtpP = [0, 0, 0];

  for (let i = 0; i < totalChildren; i++) {
    const band = i === 0 ? 0 : i === 1 ? 1 : 2;

    const base =
      band === 0
        ? CHILD1_CREDIT
        : band === 1
        ? CHILD2_CREDIT
        : CHILD3PLUS_CREDIT;

    childCredits[band] += base;

    if (i < ztpPChildren) {
      childCreditsZtpP[band] += base;
    }
  }

  const child1 = childCredits[0];
  const child2 = childCredits[1];
  const child3plus = childCredits[2];

  const childZtpPBonus =
    childCreditsZtpP[0] + childCreditsZtpP[1] + childCreditsZtpP[2];

  const childrenBaseCredits = child1 + child2 + child3plus;
  const childrenCredits = childrenBaseCredits + childZtpPBonus;

  // Daňový bonus vzniká POUZE z daňového zvýhodnění na děti
  let tax = taxAfterBasicCredits - childrenCredits;
  let childBonus = 0;

  if (tax < 0) {
    childBonus = Math.abs(tax);
    tax = 0;
  }

  const totalCredits = creditsWithoutChildren + childrenCredits;

  // 7) Čistá mzda a náklady zaměstnavatele
  const net = gross - socialEmployee - healthEmployee - tax + childBonus;
  const totalEmployerCost = gross + socialEmployer + healthEmployer;

  // 8) Odhad měsíce dosažení ročního stropu SP
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
    srazkova: false,

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
      //studentCredit,
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
