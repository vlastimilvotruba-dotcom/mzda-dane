export function calculateEvVsIce(form) {
  const annualKm = Math.max(0, Number(form.annualKm) || 0)
  const evConsumption = Math.max(0, Number(form.evConsumption) || 0)
  const evElectricityPrice = Math.max(0, Number(form.evElectricityPrice) || 0)
  const petrolConsumption = Math.max(0, Number(form.petrolConsumption) || 0)
  const petrolPrice = Math.max(0, Number(form.petrolPrice) || 0)
  const dieselConsumption = Math.max(0, Number(form.dieselConsumption) || 0)
  const dieselPrice = Math.max(0, Number(form.dieselPrice) || 0)

  if (annualKm <= 0) return null

  const evCostPer100 = evConsumption * evElectricityPrice
  const evCostPerKm = evCostPer100 / 100
  const evAnnualCost = Math.round(annualKm * evCostPerKm)

  const petrolCostPer100 = petrolConsumption * petrolPrice
  const petrolCostPerKm = petrolCostPer100 / 100
  const petrolAnnualCost = Math.round(annualKm * petrolCostPerKm)

  const dieselCostPer100 = dieselConsumption * dieselPrice
  const dieselCostPerKm = dieselCostPer100 / 100
  const dieselAnnualCost = Math.round(annualKm * dieselCostPerKm)

  const options = [
    { id: 'ev', name: 'Elektroauto', annualCost: evAnnualCost },
    { id: 'petrol', name: 'Benzín', annualCost: petrolAnnualCost },
    { id: 'diesel', name: 'Nafta', annualCost: dieselAnnualCost },
  ]

  const cheapest = options.reduce((min, item) =>
    item.annualCost < min.annualCost ? item : min
  )

  return {
    evCostPer100,
    evCostPerKm,
    evAnnualCost,
    evMonthlyCost: Math.round(evAnnualCost / 12),
    petrolCostPer100,
    petrolCostPerKm,
    petrolAnnualCost,
    petrolMonthlyCost: Math.round(petrolAnnualCost / 12),
    dieselCostPer100,
    dieselCostPerKm,
    dieselAnnualCost,
    dieselMonthlyCost: Math.round(dieselAnnualCost / 12),
    evSavingsVsPetrol: petrolAnnualCost - evAnnualCost,
    evSavingsVsDiesel: dieselAnnualCost - evAnnualCost,
    cheapest,
  }
}
