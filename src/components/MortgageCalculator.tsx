import React, { useState } from 'react'
import './calculator_styles.sass'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSterlingSign, faPercent } from '@fortawesome/free-solid-svg-icons'
import { calculateMortgage } from '../lib/mortgage/calculateMortgage'
import type { MortgageType } from '../lib/mortgage/types'

interface MortgageCalculatorProps {
  setResults: (results: {
    repaymentTotal: number
    repaymentMonthly: number
  }) => void
}

export default function MorgageCalculator({
  setResults,
}: MortgageCalculatorProps) {
  const [mortgageInfo, setMortgageInfo] = useState<{
    amount: number
    term: number
    rate: number
    mortgageType: MortgageType
  }>({
    amount: 0,
    term: 0,
    rate: 0,
    mortgageType: 'repayment',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target
    setMortgageInfo((prevData) => ({
      ...prevData,
      [name]: type === 'radio' ? value : value === '' ? 0 : parseFloat(value),
    }))
  }

  // Clear input when focused (if it's `0`)
  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    if (e.target.value === '0') {
      e.target.value = '' // Clear the input
    }
  }

  // Restore `0` if input is empty on blur
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (e.target.value === '') {
      setMortgageInfo((prevData) => ({
        ...prevData,
        [e.target.name]: 0,
      }))
    }
  }

  const handleReset = () => {
    // Reset the form inputs and results
    setMortgageInfo({
      amount: 0,
      term: 0,
      rate: 0,
      mortgageType: 'repayment',
    })

    // Optionally clear the results
    setResults({ repaymentTotal: 0, repaymentMonthly: 0 })
  }

  const onCalculateMortgage = (e: React.FormEvent) => {
    e.preventDefault()

    const results = calculateMortgage(mortgageInfo)
    setResults(results)
  }

  return (
    <section className='mortage-calculator-container'>
      <form onSubmit={onCalculateMortgage}>
        <div className='mortgage-header-container'>
          <h1>Mortgage Calculator</h1>
          <button className='reset-button' onClick={handleReset}>
            Clear All
          </button>
        </div>
        <fieldset className='input-group'>
          <label htmlFor='mortgage_amount'>Mortgage Amount</label>
          <div className='input-wrapper'>
            <FontAwesomeIcon icon={faSterlingSign} />
            <input
              type='number'
              id='mortgage_amount'
              name='amount'
              value={mortgageInfo.amount}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </div>
        </fieldset>
        <div className='half-column-container'>
          <fieldset>
            <label htmlFor='mortgage_term'>Mortgage Term</label>
            <div className='input-wrapper'>
              <input
                type='number'
                id='mortgage_term'
                name='term'
                value={mortgageInfo.term}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
              <div className='icon-wrapper'>
                <p>years</p>
              </div>
            </div>
          </fieldset>
          <fieldset>
            <label htmlFor='interest_rate'>Interest Rate</label>
            <div className='input-wrapper'>
              <input
                type='number'
                id='interest_rate'
                name='rate'
                value={mortgageInfo.rate}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
              <FontAwesomeIcon icon={faPercent} />
            </div>
          </fieldset>
        </div>
        <fieldset>
          <legend>Mortgage Type</legend>
          <label className='radio-group'>
            <input
              type='radio'
              name='mortgageType'
              value='repayment'
              checked={mortgageInfo.mortgageType === 'repayment'}
              onChange={handleChange}
            />
            Repayment
          </label>
          <label className='radio-group'>
            <input
              type='radio'
              name='mortgageType'
              value='interest_only'
              checked={mortgageInfo.mortgageType === 'interest_only'}
              onChange={handleChange}
            />
            Interest Only
          </label>
        </fieldset>
        <button type='submit' className='submit-button'>
          Calculate Repayments
        </button>
      </form>
    </section>
  )
}
