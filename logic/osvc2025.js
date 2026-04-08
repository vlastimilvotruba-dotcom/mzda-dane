// ============================================================
// OSVČ – daň a odvody za rok 2025
// Legislativní orientační výpočet pro běžné situace bez zaměstnanců
// ============================================================

export const AVERAGE_WAGE_2025 = 46557;

export const TAX_RATE_BASIC = 0.15;
export const TAX_RATE_HIGH = 0.23;
export const HIGH_TAX_THRESHOLD_ANNUAL = 1676052; // 36 × průměrná mzda 2025

export const BASIC_CREDIT_ANNUAL = 30840;
export const SPOUSE_CREDIT_ANNUAL = 24840; // při splnění zákonných podmínek včetně péče o dítě do 3 let
export const DISABILITY_I_II_ANNUAL = 2520;
export const DISABILITY_III_ANNUAL = 5040;
export const ZTPP_HOLDER_ANNUAL = 16140;

export const CHILD1_ANNUAL = 15204;
export const CHILD2_ANNUAL = 22320;
export const CHILD3PLUS_ANNUAL = 27840;
export const MIN_INCOME_FOR_BONUS = 124800; // 6× minimální mzda 2025 (20 800 Kč)

export const SOCIAL_RATE = 0.292;
export const HEALTH_RATE = 0.135;
export const SOCIAL_MAX_BASE = 48 * AVERAGE_WAGE_2025; // 2 234 736 Kč

export const MIN_SOCIAL_MAIN_MONTHLY = 4759;
export const MIN_SOCIAL_MAIN_STARTUP_MONTHLY = 3399;
export const MIN_HEALTH_MAIN_MONTHLY = 3143;
export const MIN_SOCIAL_SECONDARY_ADVANCE = 1496;

export const SECONDARY_DECISIVE_AMOUNT_FULL = 111736;
export const SECONDARY_DECISIVE_REDUCTION_PER_MONTH = Math.ceil(SECONDARY_DECISIVE_AMOUNT_FULL / 12);

export const FLAT_TAX_BANDS_2025 = {
  1: 8716,
  2: 16745,
  3: 27139,
};

const EXPENSE_LIMITS = {
  80: 1600000,
  60: 1200000,
  40: 800000,
  30: 600000,
};

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function roundMoney(value) {
  return Math.round(value);
}

function getExpenseResult(form, annualIncome) {
  const expenseMode = form.expenseMode === 'actual' ? 'actual' : 'percent';
  const chosenPercent = [80, 60, 40, 30].includes(Number(form.expensePercent))
    ? Number(form.expensePercent)
    : 60;

  if (expenseMode === 'actual') {
    const actualExpenses = Math.max(0, Number(form.actualExpenses) || 0);
    return {
      expenseMode,
      expensePercent: null,
      rawExpenses: actualExpenses,
      expenses: Math.min(actualExpenses, annualIncome),
      capApplied: actualExpenses > annualIncome,
      dominantRate: [80, 60, 40, 30].includes(Number(form.dominantRate))
        ? Number(form.dominantRate)
        : 60,
      label: 'Skutečné výdaje',
    };
  }

  const rawExpenses = annualIncome * (chosenPercent / 100);
  const maxAllowed = EXPENSE_LIMITS[chosenPercent];
  const expenses = Math.min(rawExpenses, maxAllowed);

  return {
    expenseMode,
    expensePercent: chosenPercent,
    rawExpenses,
    expenses,
    capApplied: rawExpenses > expenses,
    dominantRate: chosenPercent,
    label: `Výdajový paušál ${chosenPercent} %`,
  };
}

function getChildrenCredits(childrenCount, childrenZtpP) {
  let child1Credit = 0;
  let child2Credit = 0;
  let child3plusCredit = 0;
  let childZtpPBonus = 0;

  for (let i = 0; i < childrenCount; i++) {
    let base = 0;
    if (i === 0) {
      base = CHILD1_ANNUAL;
      child1Credit += base;
    } else if (i === 1) {
      base = CHILD2_ANNUAL;
      child2Credit += base;
    } else {
      base = CHILD3PLUS_ANNUAL;
      child3plusCredit += base;
    }

    if (i < childrenZtpP) {
      childZtpPBonus += base;
    }
  }

  return {
    child1Credit,
    child2Credit,
    child3plusCredit,
    childZtpPBonus,
    childrenTotal: child1Credit + child2Credit + child3plusCredit + childZtpPBonus,
  };
}

function getFlatTaxAssessment(annualIncome, dominantRate) {
  if (annualIncome <= 0) {
    return {
      eligible: false,
      band: null,
      monthlyAmount: null,
      yearlyAmount: null,
      note: 'Pro posouzení paušální daně zadejte roční příjmy.',
    };
  }

  if (annualIncome > 2000000) {
    return {
      eligible: false,
      band: null,
      monthlyAmount: null,
      yearlyAmount: null,
      note: 'Příjmy přesahují limit 2 mil. Kč, takže vstup do paušálního režimu není možný.',
    };
  }

  let band = 3;

  if (annualIncome <= 1000000) {
    band = 1;
  } else if (annualIncome <= 1500000) {
    band = dominantRate >= 60 ? 1 : 2;
  } else if (dominantRate === 80) {
    band = 1;
  } else if (dominantRate === 60) {
    band = 2;
  }

  return {
    eligible: true,
    band,
    monthlyAmount: FLAT_TAX_BANDS_2025[band],
    yearlyAmount: FLAT_TAX_BANDS_2025[band] * 12,
    note: 'Jde o orientační zařazení podle výše příjmů a převažujícího typu činnosti. Pro skutečný vstup musíte splnit i další podmínky Finanční správy.',
  };
}

export function calculateOsvc2025(form) {
  const annualIncome = Math.max(0, Number(form.annualIncome) || 0);
  const monthsActive = clamp(Number(form.monthsActive) || 12, 1, 12);
  const activityType = form.activityType === 'secondary' ? 'secondary' : 'main';
  const startupRelief = Boolean(form.startupRelief) && activityType === 'main';
  const otherDeductions = Math.max(0, Number(form.otherDeductions) || 0);

  const childrenCount = clamp(Number(form.childrenCount) || 0, 0, 10);
  const childrenZtpP = clamp(Number(form.childrenZtpP) || 0, 0, childrenCount);

  const expenseResult = getExpenseResult(form, annualIncome);
  const profit = Math.max(0, annualIncome - expenseResult.expenses);

  const assessmentBaseRaw = Math.ceil(profit * 0.5);

  const socialMinimumAnnual =
    activityType === 'main'
      ? (startupRelief ? MIN_SOCIAL_MAIN_STARTUP_MONTHLY : MIN_SOCIAL_MAIN_MONTHLY) * monthsActive
      : 0;

  const healthMinimumAnnual =
    activityType === 'main'
      ? MIN_HEALTH_MAIN_MONTHLY * monthsActive
      : 0;

  const secondaryThreshold = Math.max(
    0,
    SECONDARY_DECISIVE_AMOUNT_FULL - (12 - monthsActive) * SECONDARY_DECISIVE_REDUCTION_PER_MONTH
  );

  const socialParticipationRequired =
    activityType === 'main' || profit >= secondaryThreshold;

  const socialBaseForContribution = Math.min(assessmentBaseRaw, SOCIAL_MAX_BASE);
  const socialInsuranceCalculated = socialParticipationRequired
    ? roundMoney(socialBaseForContribution * SOCIAL_RATE)
    : 0;

  const socialInsurance =
    activityType === 'main'
      ? Math.max(socialInsuranceCalculated, socialMinimumAnnual)
      : socialInsuranceCalculated;

  const healthInsuranceCalculated = roundMoney(assessmentBaseRaw * HEALTH_RATE);
  const healthInsurance =
    activityType === 'main'
      ? Math.max(healthInsuranceCalculated, healthMinimumAnnual)
      : healthInsuranceCalculated;

  const deductionsApplied = Math.min(otherDeductions, profit);
  const taxBaseRaw = Math.max(0, profit - deductionsApplied);
  const taxBase = Math.floor(taxBaseRaw / 100) * 100;

  let taxBeforeCredits = 0;
  if (taxBase <= HIGH_TAX_THRESHOLD_ANNUAL) {
    taxBeforeCredits = roundMoney(taxBase * TAX_RATE_BASIC);
  } else {
    taxBeforeCredits =
      roundMoney(HIGH_TAX_THRESHOLD_ANNUAL * TAX_RATE_BASIC) +
      roundMoney((taxBase - HIGH_TAX_THRESHOLD_ANNUAL) * TAX_RATE_HIGH);
  }

  let disabilityCredit = 0;
  if (form.disability === '1' || form.disability === '2') {
    disabilityCredit = DISABILITY_I_II_ANNUAL;
  } else if (form.disability === '3') {
    disabilityCredit = DISABILITY_III_ANNUAL;
  }

  const basicCredit = BASIC_CREDIT_ANNUAL;
  const spouseCredit = form.spouseClaim ? SPOUSE_CREDIT_ANNUAL : 0;
  const ztpPCredit = form.ztpP ? ZTPP_HOLDER_ANNUAL : 0;

  const creditsWithoutChildren =
    basicCredit + spouseCredit + disabilityCredit + ztpPCredit;

  const taxAfterBasicCredits = Math.max(0, taxBeforeCredits - creditsWithoutChildren);

  const childrenCredits = getChildrenCredits(childrenCount, childrenZtpP);

  let finalTax = taxAfterBasicCredits - childrenCredits.childrenTotal;
  let childBonus = 0;
  const hasIncomeForBonus = annualIncome >= MIN_INCOME_FOR_BONUS;

  if (finalTax < 0) {
    if (hasIncomeForBonus) {
      childBonus = Math.abs(finalTax);
    }
    finalTax = 0;
  }

  const totalCredits = creditsWithoutChildren + childrenCredits.childrenTotal;
  const totalBurden = socialInsurance + healthInsurance + finalTax - childBonus;
  const takeHome = profit - totalBurden;
  const effectiveRate = profit > 0 ? totalBurden / profit : 0;

  const nextSocialAdvanceMonthly = socialParticipationRequired
    ? Math.max(
        Math.ceil(socialInsurance / monthsActive),
        activityType === 'main'
          ? startupRelief
            ? MIN_SOCIAL_MAIN_STARTUP_MONTHLY
            : MIN_SOCIAL_MAIN_MONTHLY
          : MIN_SOCIAL_SECONDARY_ADVANCE
      )
    : 0;

  const nextHealthAdvanceMonthly = Math.max(
    Math.ceil(healthInsurance / monthsActive),
    activityType === 'main' ? MIN_HEALTH_MAIN_MONTHLY : 0
  );

  const flatTax = getFlatTaxAssessment(annualIncome, expenseResult.dominantRate);
  const flatTaxDifference = flatTax.yearlyAmount != null
    ? flatTax.yearlyAmount - totalBurden
    : null;

  return {
    annualIncome,
    monthsActive,
    activityType,
    startupRelief,
    otherDeductions,

    expense: expenseResult,
    profit,
    assessmentBaseRaw,

    social: {
      participationRequired: socialParticipationRequired,
      secondaryThreshold,
      minAnnual: socialMinimumAnnual,
      insurance: socialInsurance,
      calculatedOnly: socialInsuranceCalculated,
      usedMinimum: activityType === 'main' && socialInsurance === socialMinimumAnnual,
      nextAdvanceMonthly: nextSocialAdvanceMonthly,
    },

    health: {
      minAnnual: healthMinimumAnnual,
      insurance: healthInsurance,
      calculatedOnly: healthInsuranceCalculated,
      usedMinimum: activityType === 'main' && healthInsurance === healthMinimumAnnual,
      nextAdvanceMonthly: nextHealthAdvanceMonthly,
    },

    taxBaseRaw,
    taxBase,
    taxBeforeCredits,
    taxAfterBasicCredits,
    finalTax,
    childBonus,
    hasIncomeForBonus,

    credits: {
      basicCredit,
      spouseCredit,
      disabilityCredit,
      ztpPCredit,
      ...childrenCredits,
      creditsWithoutChildren,
      totalCredits,
    },

    totalBurden,
    takeHome,
    monthlyTakeHome: monthsActive > 0 ? roundMoney(takeHome / monthsActive) : 0,
    effectiveRate,

    flatTax: {
      ...flatTax,
      difference: flatTaxDifference,
      cheaperBy: flatTaxDifference == null ? null : Math.abs(flatTaxDifference),
      isFlatTaxCheaper: flatTaxDifference != null ? flatTaxDifference < 0 : false,
    },
  };
}
