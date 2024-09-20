import PropTypes from 'prop-types';
import LoanTable from './LoanTable';

export default function LoanDetails({ loanAmount, loanTerm, loanTermUnit, interestRate, compound, payback }) {
    return (
        <div>
            <h2>Loan Details</h2>
            <p>Loan Amount: {loanAmount}</p>
            <p>Loan Term: {loanTerm} {loanTermUnit}</p>
            <p>Interest Rate: {interestRate}%</p>
            <p>Compound: {compound}</p>
            <p>Payback: {payback}</p>
            <LoanTable 
            loanAmount={loanAmount}
            loanTerm={loanTerm}
            loanTermUnit={loanTermUnit}
            interestRate={interestRate}
            compound={compound}
            payback={payback}
            />
        </div>
    );
}

LoanDetails.propTypes = {
    loanAmount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    loanTerm: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    loanTermUnit: PropTypes.string.isRequired,
    interestRate: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    compound: PropTypes.string.isRequired,
    payback: PropTypes.string.isRequired,
};