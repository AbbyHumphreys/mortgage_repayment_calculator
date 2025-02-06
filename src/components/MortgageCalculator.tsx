import React, { useState } from "react"
import "./calculator_styles.sass";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSterlingSign, faPercent } from "@fortawesome/free-solid-svg-icons";

export default function MorgageCalculator () {

    const [mortgageInfo, setMortgageInfo] = useState({
        amount: 0,
        term: 0,
        rate: 0
    })

    const handleChange = (e: any) => {
        const { name, value, type } = e.target;
        console.log(e.target.name)
        setMortgageInfo((prevData) => ({
            ...prevData,
            [name]: type === "" ? 0 : parseFloat(value),
        }))
    }

    // Clear input when focused (if it's `0`)
    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        if (e.target.value === '0') {
            e.target.value = ''; // Clear the input
        }
    };

    // Restore `0` if input is empty on blur
    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        if (e.target.value === '') {
            setMortgageInfo((prevData) => ({
                ...prevData,
                [e.target.name]: 0,
            }));
        }
    };
console.log(mortgageInfo)
    function calculateMortgage (e: React.FormEvent) {
        e.preventDefault();

        const {amount, term, rate} = mortgageInfo
        console.log("This is Mortgage Info", mortgageInfo)
        let interest = rate / 100
        let repaymentTotal = amount * interest
        let repaymentMonthly = repaymentTotal / term
        return console.log(repaymentMonthly)
    }

    return (
        <section className="mortage-calculator-container">
            <form onSubmit={calculateMortgage}>
                <div className="mortgage-header-container">
                    <h1>Mortgage Calculator</h1>
                    <button className="reset-button">Clear All</button>
                </div>
                <fieldset className="input-group">
                    <label htmlFor="mortgage_amount">Mortgage Amount</label>
                    <div className="input-wrapper">
                        <FontAwesomeIcon icon={faSterlingSign} />
                        <input 
                            type="number" 
                            id="mortgage_amount" 
                            name="amount" 
                            value={mortgageInfo.amount} 
                            onChange={handleChange}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                        />
                    </div>
                </fieldset>
                <div className="half-column-container">
                    <fieldset>
                        <label htmlFor="mortgage_term">Mortgage Term</label>
                        <div className="input-wrapper">
                            <input 
                                type="number" 
                                id="mortgage_term" 
                                name="term" 
                                value={mortgageInfo.term} 
                                onChange={handleChange}
                                onFocus={handleFocus}
                                onBlur={handleBlur}
                            />
                            <div className="icon-wrapper">
                                <p>years</p>
                            </div>
                        </div>
                    </fieldset>
                    <fieldset>
                        <label htmlFor="interest_rate">Interest Rate</label>
                        <div className="input-wrapper">
                            <input 
                                type="number" 
                                id="interest_rate" 
                                name="rate" 
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
                    <label className="radio-group">
                        <input type="radio" name="mortgage_type" value="repayment" />
                        Repayment
                    </label>
                    <label className="radio-group">
                        <input type="radio" name="mortgage_type" value="interest_only" />
                        Interest Only
                    </label>
                </fieldset>
            <button className="submit-button">Calculate Repayments</button>
            </form>
        </section>
    )
    
}