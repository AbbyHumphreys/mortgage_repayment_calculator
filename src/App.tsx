import React from 'react';
import './App.css';
import MortgageCalculator from "./components/MortgageCalculator"
import ResultsCard from "./components/ResultsCard"

function App() {
  return (
    <main className='plus-jakarta-sans'>
      <MortgageCalculator />
      <ResultsCard />
    </main>
  );
}

export default App;
