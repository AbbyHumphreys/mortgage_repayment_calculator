import "./calculator_styles.sass";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSterlingSign, faPercent } from "@fortawesome/free-solid-svg-icons";

export default function MorgageCalculator () {
    return (
        <section className="mortage-calculator-container">
            <h1>Mortgage Calculator</h1>
            <form>
                <fieldset className="input-group">
                    <label htmlFor="mortgage_amount">Mortgage Amount</label>
                    <div className="input-wrapper">
                        <div className="icon-wrapper">
                            <FontAwesomeIcon icon={faSterlingSign} />
                        </div>
                        <input type="number" id="mortgage_amount" name="mortgage_amount" />
                    </div>
                </fieldset>
                <div className="half-column-container">
                    <fieldset>
                        <label htmlFor="mortgage_term">Mortgage Term</label>
                        <div className="input-wrapper">
                            <input type="number" id="mortgage_term" name="mortgage_term" />
                            <div className="icon-wrapper">
                                <p>years</p>
                            </div>
                        </div>
                    </fieldset>
                    <fieldset>
                        <label htmlFor="interest_rate">Interest Rate</label>
                        <div className="input-wrapper">
                            <input type="number" id="interest_rate" name="interest_rate" />
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
                <button>Calculate Repayments</button>
            </form>
        </section>
    )
    
}