import { useState } from 'react';
import './App.css';
import MortgageCalculator from "./components/MortgageCalculator"
import ResultsCard from "./components/ResultsCard"

function App() {

  const [results, setResults] = useState({
    repaymentTotal: 0,
    repaymentMonthly: 0,
  });

  return (
    <main className='plus-jakarta-sans'>
      <MortgageCalculator setResults={setResults} />
      <ResultsCard repaymentTotal={results.repaymentTotal} repaymentMonthly={results.repaymentMonthly}/>
    </main>
  );
}

export default App;
