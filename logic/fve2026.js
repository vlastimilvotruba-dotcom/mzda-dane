// Průměrná roční výroba v ČR: ~950–1 100 kWh/kWp, používáme střed 1 000
const KWH_PER_KWP = 1000;
// kg CO2 ušetřeného na 1 kWh (průměrný emisní faktor CZ sítě dle ERÚ)
const CO2_PER_KWH = 0.25;
// Standardní životnost FVE panelů
const ZIVOTNOST_LET = 25;

export function calculateFVE({
  vykonKWp,
  cenaInstalace,
  dotace,
  vlastniSpotrebaPercent,
  cenaElektrinaZeSite,
  vykupniCena,
  rocniSpotrebaKWh = 5000,
  loanMonths = 120,
}) {
  const vykon = Number(vykonKWp) || 0;
  const instalace = Number(cenaInstalace) || 0;
  const dotaceKc = Number(dotace) || 0;
  const spotrebaP = Number(vlastniSpotrebaPercent) || 0;
  const cenaZeSite = Number(cenaElektrinaZeSite) || 0;
  const vykup = Number(vykupniCena) || 0;

  if (vykon <= 0 || instalace <= 0) return null;

  const rocniVyroba = Math.round(vykon * KWH_PER_KWP);
  const vlastniSpotrebaKWh = Math.round(rocniVyroba * (spotrebaP / 100));
  const prebytkyKWh = rocniVyroba - vlastniSpotrebaKWh;

  const usporaElektrina = Math.round(vlastniSpotrebaKWh * cenaZeSite);
  const prijemZPrebytku = Math.round(prebytkyKWh * vykup);
  const celkovaRocniVyhoda = usporaElektrina + prijemZPrebytku;

  const cistinaInvestice = Math.max(0, instalace - dotaceKc);
  const dobaNavratnosti =
    celkovaRocniVyhoda > 0 ? cistinaInvestice / celkovaRocniVyhoda : Infinity;

  const ziskZa25Let = celkovaRocniVyhoda * ZIVOTNOST_LET - cistinaInvestice;
  const co2UsporaRocne = Math.round(rocniVyroba * CO2_PER_KWH);

  // Spotřeba elektřiny – před a po FVE
  const rocniSpotrebaNum = Math.max(0, Number(rocniSpotrebaKWh) || 0);
  const zbyvaZeSiteKWh = Math.max(0, rocniSpotrebaNum - vlastniSpotrebaKWh);
  const nakladyZeSiteRocne = Math.round(zbyvaZeSiteKWh * cenaZeSite);
  const nakladyZeSitePredFVE = Math.round(rocniSpotrebaNum * cenaZeSite);

  // Bezúročná půjčka
  const loanM = Math.max(1, Number(loanMonths) || 120);
  const mesicniSplatka = Math.round(cistinaInvestice / loanM);
  const mesicniUspora = Math.round(celkovaRocniVyhoda / 12);

  return {
    rocniVyroba,
    vlastniSpotrebaKWh,
    prebytkyKWh,
    usporaElektrina,
    prijemZPrebytku,
    celkovaRocniVyhoda,
    cistinaInvestice,
    dobaNavratnosti,
    ziskZa25Let,
    co2UsporaRocne,
    zbyvaZeSiteKWh,
    nakladyZeSiteRocne,
    nakladyZeSitePredFVE,
    mesicniSplatka,
    mesicniUspora,
  };
}
