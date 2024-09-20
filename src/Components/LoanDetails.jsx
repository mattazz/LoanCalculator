import PropTypes from 'prop-types';
import LoanTable from './LoanTable';

function LoanDetails({ loanAmount, loanTerm, loanTermUnit, interestRate, compound, payback, onScheduleGenerated }) {
    return (
        <>
            <div id='loan-details'>
                <h2>Loan Details</h2>
                <p><span style={{ fontWeight: 'bold' }}>Loan Amount:</span> {loanAmount}</p>
                <p><span style={{ fontWeight: 'bold' }}>Loan Term:</span> {loanTerm} {loanTermUnit}</p>
                <p><span style={{ fontWeight: 'bold' }}>Interest Rate:</span> {interestRate}%</p>
                <p><span style={{ fontWeight: 'bold' }}>Compound:</span> {compound}</p>
                <p><span style={{ fontWeight: 'bold' }}>Payback:</span> {payback}</p>
            </div>
            <LoanTable
                loanAmount={loanAmount}
                loanTerm={loanTerm}
                loanTermUnit={loanTermUnit}
                interestRate={interestRate}
                compound={compound}
                payback={payback}
                onScheduleGenerated={onScheduleGenerated}
            />
        </>
    );
}

LoanDetails.propTypes = {
    loanAmount: PropTypes.string.isRequired,
    loanTerm: PropTypes.string.isRequired,
    loanTermUnit: PropTypes.string.isRequired,
    interestRate: PropTypes.string.isRequired,
    compound: PropTypes.string.isRequired,
    payback: PropTypes.string.isRequired,
    onScheduleGenerated: PropTypes.func.isRequired,
};

export default LoanDetails;