import "./resultscard_styles.sass"

interface ResultsCardProps {
    repaymentTotal: number;
    repaymentMonthly: number;
}

export default function ResultsCard ({ repaymentTotal, repaymentMonthly }: ResultsCardProps) {
    return (
        <section className="results-card">
            <h2 className="results-header">Your results</h2>
            <p>Your results are shown below based on the information you provided. 
                To adjust the results, edit the form and click “calculate repayments” again.</p>
            <div className="repayments-container">
                <p>Your monthly repayments</p>
                <p className="amount monthly-repayments">£{repaymentMonthly.toFixed(2)}</p>
                <hr></hr>
                <p>Total you'll repay over the term</p>
                <p className="amount total-repayments">£{repaymentTotal.toFixed(2)}</p>
            </div>
        </section>
    )
}