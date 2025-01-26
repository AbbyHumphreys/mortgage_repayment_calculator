import "./calculator_styles.sass"

export default function MorgageCalculator () {
    return (
        <section>
            <h1>Mortgage Calculator</h1>
            <form>
                <fieldset>
                    <label htmlFor="mortgage_amount">Mortgage Amount</label>
                    <input type="number" id="mortgage_amount" name="mortgage_amount" />
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