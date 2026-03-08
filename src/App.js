import React, { useState } from 'react';
import './App.css';

function App() {
  const [gross, setGross] = useState('');
  const [net, setNet] = useState(null);
  const [taxBase, setTaxBase] = useState(null);
  const [social, setSocial] = useState(null);
  const [health, setHealth] = useState(null);

  const handleCalculate = (e) => {
    e.preventDefault();

    const g = Number(gross);
    if (Number.isNaN(g) || g <= 0) {
      setNet(null);
      setTaxBase(null);
      setSocial(null);
      setHealth(null);
      return;
    }

    // Zjednodušený model HPP – jen pro první verzi UI
    const socialEmployee = g * 0.065;
    const healthEmployee = g * 0.045;
    const taxBaseRounded = Math.round(g); // pro začátek bez slev
    const tax = taxBaseRounded * 0.15;

    const netWage = g - socialEmployee - healthEmployee - tax;

    setSocial(Math.round(socialEmployee));
    setHealth(Math.round(healthEmployee));
    setTaxBase(taxBaseRounded);
    setNet(Math.round(netWage));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Mzdová kalkulačka 2026</h1>
        <p>Jednoduchý výpočet čisté mzdy (HPP, bez slev) – první verze.</p>
      </header>

      <main className="App-main">
        <form className="wage-form" onSubmit={handleCalculate}>
          <label>
            Hrubá mzda (Kč)
            <input
              type="number"
              value={gross}
              onChange={(e) => setGross(e.target.value)}
              min="0"
              step="100"
              placeholder="např. 35000"
            />
          </label>

          <button type="submit">Spočítat čistou mzdu</button>
        </form>

        {net !== null && (
          <section className="wage-result">
            <h2>Výsledek</h2>
            <ul>
              <li>Hrubá mzda: <strong>{Number(gross).toLocaleString('cs-CZ')} Kč</strong></li>
              <li>Vyměřovací základ pro daň: <strong>{taxBase?.toLocaleString('cs-CZ')} Kč</strong></li>
              <li>Soc. pojištění zaměstnance (6,5 %): <strong>{social?.toLocaleString('cs-CZ')} Kč</strong></li>
              <li>Zdravotní pojištění zaměstnance (4,5 %): <strong>{health?.toLocaleString('cs-CZ')} Kč</strong></li>
              <li>Odhad daně z příjmu (15 %): <strong>{(taxBase * 0.15).toLocaleString('cs-CZ', { maximumFractionDigits: 0 })} Kč</strong></li>
              <li>
                <strong>Čistá mzda: {net.toLocaleString('cs-CZ')} Kč</strong>
              </li>
            </ul>
          </section>
        )}
      </main>
    </div>
  );
}

export default App;
