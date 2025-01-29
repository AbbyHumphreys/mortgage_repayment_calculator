import "./calculator_styles.sass";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSterlingSign } from "@fortawesome/free-solid-svg-icons";

export default function MorgageCalculator () {
    return (
        <section className="mortage-calculator-container">
            <h1>Mortgage Calculator</h1>
            <form>
                <fieldset className="input-group">
                    <label htmlFor="mortgage_amount">Mortgage Amount</label>
                    <div className="input-wrapper">
                        <FontAwesomeIcon icon={faSterlingSign} />
                        <input type="number" id="mortgage_amount" name="mortgage_amount" />
                    </div>
                </fieldset>
                <fieldset>
                    <label htmlFor="mortgage_term">Mortgage Term</label>
                    <input type="number" id="mortgage_term" name="mortgage_term" />
                </fieldset>
                <fieldset>
                    <label htmlFor="interest_rate">Interest Rate</label>
                    <input type="number" id="interest_rate" name="interest_rate" />
                </fieldset>
                <fieldset>
                    <legend>Mortgage Type</legend>
                    <label>
                        <input type="radio" name="mortgage_type" value="repayment" />
                        Repayment
                    </label>
                    <label>
                        <input type="radio" name="mortgage_type" value="interest_only" />
                        Interest Only
                    </label>
                </fieldset>
                <button>Calculate Repayments</button>
            </form>
        </section>
    )
    
}