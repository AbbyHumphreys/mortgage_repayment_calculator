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
    amount: string
    term: string
    rate: string
    mortgageType: MortgageType
  }>({
    amount: '',
    term: '',
    rate: '',
    mortgageType: 'repayment',
  })

  const [errors, setErrors] = useState<{
    amount?: string
    term?: string
    rate?: string
  }>({})

  const validate = () => {
    const nextErrors: { amount?: string; term?: string; rate?: string } = {}

    const amount = Number(mortgageInfo.amount)
    const term = Number(mortgageInfo.term)
    const rate = Number(mortgageInfo.rate)

    if (!mortgageInfo.amount || amount <= 0)
      nextErrors.amount = 'Enter a mortgage amount greater than 0'
    if (!mortgageInfo.term || term <= 0)
      nextErrors.term = 'Enter a mortgage term in years'
    if (mortgageInfo.rate === '' || rate < 0)
      nextErrors.rate = 'Enter an interest rate (0 or more)'

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target

    setMortgageInfo((prev) => ({
      ...prev,
      [name]: type === 'radio' ? value : value,
    }))
  }

  const handleReset = () => {
    // Reset the form inputs and results
    setMortgageInfo({
      amount: '',
      term: '',
      rate: '',
      mortgageType: 'repayment',
    })
    setErrors({})
    setResults({ repaymentTotal: 0, repaymentMonthly: 0 })
  }

  const onCalculateMortgage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    const results = calculateMortgage({
      amount: Number(mortgageInfo.amount),
      term: Number(mortgageInfo.term),
      rate: Number(mortgageInfo.rate),
      mortgageType: mortgageInfo.mortgageType as 'repayment' | 'interest_only',
    })

    setResults(results)
  }

  return (
    <section className='mortage-calculator-container'>
      <form onSubmit={onCalculateMortgage}>
        <div className='mortgage-header-container'>
          <h1>Mortgage Calculator</h1>
          <button type='button' className='reset-button' onClick={handleReset}>
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
              placeholder='e.g. 250000'
              aria-invalid={!!errors.amount}
              aria-describedby={errors.amount ? 'amount-error' : undefined}
            />
          </div>
          {errors.amount && (
            <p id='amount-error' role='alert' className='field-error'>
              {errors.amount}
            </p>
          )}
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
                placeholder='e.g. 15'
                aria-invalid={!!errors.term}
                aria-describedby={errors.term ? 'term-error' : undefined}
              />
              <div className='icon-wrapper'>
                <p>years</p>
              </div>
            </div>
            {errors.term && (
              <p id='term-error' role='alert' className='field-error'>
                {errors.term}
              </p>
            )}
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
                placeholder='e.g. 2'
                aria-invalid={!!errors.rate}
                aria-describedby={errors.rate ? 'rate-error' : undefined}
              />
              <FontAwesomeIcon icon={faPercent} />
            </div>
            {errors.rate && (
              <p id='rate-error' role='alert' className='field-error'>
                {errors.rate}
              </p>
            )}
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
