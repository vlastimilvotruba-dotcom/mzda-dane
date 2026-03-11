// ============================================================
// Roční zúčtování daně zaměstnance – parametry 2026
// ============================================================

// Daňová pásma
export const TAX_RATE_BASIC = 0.15;
export const TAX_RATE_HIGH = 0.23;
// 36× průměrná mzda 2026 (43 967 Kč) = 1 582 812 Kč ročně
export const HIGH_TAX_THRESHOLD_ANNUAL = 1582812;

// Roční slevy na dani
export const BASIC_CREDIT_ANNUAL = 30840;        // poplatník (2 570 × 12)
export const DISABILITY_I_II_ANNUAL = 2520;      // invalidita 1.–2. stupeň (210 × 12)
export const DISABILITY_III_ANNUAL = 5040;       // invalidita 3. stupeň (420 × 12) – pozor: §35 odst.1 písm.b = 5 040
export const DISABILITY_SEVERE_ANNUAL = 16140;   // ZTP/P držitel (1 345 × 12)
export const ZTPP_HOLDER_ANNUAL = 16140;         // §35 odst.1 písm.c
export const SPOUSE_CREDIT_ANNUAL = 24840;       // manžel/ka s příjmem do 68 000 Kč

// Děti – roční zvýhodnění
export const CHILD1_ANNUAL = 15204;              // 1. dítě (1 267 × 12)
export const CHILD2_ANNUAL = 22320;              // 2. dítě (1 860 × 12)
export const CHILD3PLUS_ANNUAL = 27840;          // 3. a každé další (2 320 × 12)

// Minimální příjem pro vznik daňového bonusu (6× min. mzda 2026 = 6 × 20 800)
export const MIN_INCOME_FOR_BONUS = 124800;

// Nezdanitelné části základu daně (§15 ZDP) – roční limity
export const LIFE_INSURANCE_MAX = 24000;
export const PENSION_SAVINGS_BASE = 24000;       // odpočet od částky nad tento limit
export const PENSION_SAVINGS_MAX_DEDUCTION = 48000; // max odečitatelná částka
export const MORTGAGE_INTEREST_MAX = 150000;
export const GIFTS_MAX_RATIO = 0.15;             // max 15 % základu daně
export const GIFTS_MIN = 1000;                   // min 1 000 Kč nebo 2 % základu

// ============================================================
// Hlavní výpočet
// ============================================================

/**
 * @param {object} form
 * @param {number}  form.grossAnnual          - roční hrubá mzda (Kč)
 * @param {number}  form.taxWithheld          - zálohy na daň sražené zaměstnavatelem (Kč)
 * @param {number}  form.lifeInsurance        - platby na živ. pojištění (Kč)
 * @param {number}  form.pensionSavings       - celkové platby na penz. spoření/DPS (Kč)
 * @param {number}  form.mortgageInterest     - úroky z hypotéky (Kč)
 * @param {number}  form.gifts                - dary / bezúplatná plnění (Kč)
 * @param {string}  form.disability           - '0' | '1' | '2' | '3'
 * @param {boolean} form.ztpP                 - držitel průkazu ZTP/P
 * @param {boolean} form.spouseClaim          - uplatňuje slevu na manžela/ku
 * @param {number}  form.childrenCount        - počet dětí celkem (0–10)
 * @param {number}  form.childrenZtpP         - z toho dětí s ZTP/P (0–10)
 */
export function calculateAnnualTax2026(form) {
  const gross = Number(form.grossAnnual) || 0;
  const taxWithheld = Number(form.taxWithheld) || 0;
  const childrenCount = Math.min(Number(form.childrenCount) || 0, 10);
  const childrenZtpP = Math.min(Number(form.childrenZtpP) || 0, childrenCount);

  // ----------------------------------------------------------
  // 1) Nezdanitelné části základu daně (§15)
  // ----------------------------------------------------------
  const lifeIns = Math.min(Number(form.lifeInsurance) || 0, LIFE_INSURANCE_MAX);

  const pensionRaw = Number(form.pensionSavings) || 0;
  const pensionDeduction = Math.min(
    Math.max(0, pensionRaw - PENSION_SAVINGS_BASE),
    PENSION_SAVINGS_MAX_DEDUCTION
  );

  const mortgage = Math.min(Number(form.mortgageInterest) || 0, MORTGAGE_INTEREST_MAX);

  const giftsRaw = Number(form.gifts) || 0;
  const giftsMax = gross * GIFTS_MAX_RATIO;
  const giftsMin = Math.max(GIFTS_MIN, gross * 0.02);
  const gifts = giftsRaw >= giftsMin ? Math.min(giftsRaw, giftsMax) : 0;

  const totalDeductions = lifeIns + pensionDeduction + mortgage + gifts;

  // ----------------------------------------------------------
  // 2) Základ daně po odpočtech (zaokrouhleno dolů na 100 Kč)
  // ----------------------------------------------------------
  const taxBaseRaw = Math.max(0, gross - totalDeductions);
  const taxBase = Math.floor(taxBaseRaw / 100) * 100;

  // ----------------------------------------------------------
  // 3) Daň před slevami (dvě pásma)
  // ----------------------------------------------------------
  let taxBeforeCredits = 0;
  if (taxBase <= HIGH_TAX_THRESHOLD_ANNUAL) {
    taxBeforeCredits = Math.round(taxBase * TAX_RATE_BASIC);
  } else {
    taxBeforeCredits =
      Math.round(HIGH_TAX_THRESHOLD_ANNUAL * TAX_RATE_BASIC) +
      Math.round((taxBase - HIGH_TAX_THRESHOLD_ANNUAL) * TAX_RATE_HIGH);
  }

  // ----------------------------------------------------------
  // 4) Slevy na dani (nemohou daň dostat pod 0 – kromě dětí)
  // ----------------------------------------------------------
  const basicCredit = BASIC_CREDIT_ANNUAL;

  let disabilityCredit = 0;
  const dis = form.disability || '0';
  if (dis === '1' || dis === '2') disabilityCredit = DISABILITY_I_II_ANNUAL;
  else if (dis === '3') disabilityCredit = DISABILITY_III_ANNUAL;

  const ztpPCredit = form.ztpP ? ZTPP_HOLDER_ANNUAL : 0;
  const spouseCredit = form.spouseClaim ? SPOUSE_CREDIT_ANNUAL : 0;

  const creditsWithoutChildren =
    basicCredit + disabilityCredit + ztpPCredit + spouseCredit;

  let taxAfterBasicCredits = Math.max(0, taxBeforeCredits - creditsWithoutChildren);

  // ----------------------------------------------------------
  // 5) Daňové zvýhodnění na děti (§35c) – může vzniknout bonus
  // ----------------------------------------------------------
  let child1Credit = 0;
  let child2Credit = 0;
  let child3plusCredit = 0;
  let childZtpPBonus = 0;

  for (let i = 0; i < childrenCount; i++) {
    let base = 0;
    if (i === 0) { base = CHILD1_ANNUAL; child1Credit += base; }
    else if (i === 1) { base = CHILD2_ANNUAL; child2Credit += base; }
    else { base = CHILD3PLUS_ANNUAL; child3plusCredit += base; }

    // ZTP/P dítě – nárok na dvojnásobek zvýhodnění (§35c odst. 7)
    if (i < childrenZtpP) childZtpPBonus += base;
  }

  const childrenTotal = child1Credit + child2Credit + child3plusCredit + childZtpPBonus;

  let finalTax = taxAfterBasicCredits - childrenTotal;
  let childBonus = 0;

  const hasIncomeForBonus = gross >= MIN_INCOME_FOR_BONUS;

  if (finalTax < 0) {
    if (hasIncomeForBonus) {
      childBonus = Math.abs(finalTax);
    }
    finalTax = 0;
  }

  const totalCredits = creditsWithoutChildren + childrenTotal;

  // ----------------------------------------------------------
  // 6) Přeplatek (+) / Nedoplatek (-)
  // ----------------------------------------------------------
  // přeplatek = co zaměstnavatel srazil mínus co skutečně dlužíme
  const taxDiff = taxWithheld - finalTax - childBonus;
  // taxDiff > 0 → přeplatek (vrátí FÚ)
  // taxDiff < 0 → nedoplatek (doplatit)

  return {
    // vstupy (pro zobrazení)
    gross,
    taxWithheld,

    // odpočty
    deductions: {
      lifeIns,
      pensionDeduction,
      pensionRaw,
      mortgage,
      gifts,
      total: totalDeductions,
    },

    // základ daně
    taxBaseRaw,
    taxBase,

    // daň
    taxBeforeCredits,

    // slevy
    credits: {
      basicCredit,
      disabilityCredit,
      ztpPCredit,
      spouseCredit,
      child1Credit,
      child2Credit,
      child3plusCredit,
      childZtpPBonus,
      childrenTotal,
      creditsWithoutChildren,
      totalCredits,
    },

    taxAfterBasicCredits,
    finalTax,
    childBonus,
    hasIncomeForBonus,

    // výsledek
    taxDiff,          // > 0 přeplatek, < 0 nedoplatek
    isOverpayment: taxDiff >= 0,
  };
}
