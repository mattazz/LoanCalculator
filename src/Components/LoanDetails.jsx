import React from 'react';
import PropTypes from 'prop-types';
import LoanTable from './LoanTable';

function LoanDetails({ loanAmount, loanTerm, loanTermUnit, interestRate, compound, payback, onScheduleGenerated }) {
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
        onScheduleGenerated={onScheduleGenerated}
      />
    </div>
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