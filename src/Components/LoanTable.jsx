import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

function LoanTable({ loanAmount, loanTerm, loanTermUnit, interestRate, payback, compound, onScheduleGenerated }) {
    const loanAmountNum = parseFloat(loanAmount);
    const interestRateNum = parseFloat(interestRate) / 100;
    const periods = loanTermUnit === 'years' ? loanTerm * 12 : loanTerm;
    const periodInterestRate = interestRateNum / 12;

    console.log(`Periods: ${periods}, Period Interest Rate: ${periodInterestRate}`);

    const paymentPerPeriod = (loanAmountNum * periodInterestRate) / (1 - Math.pow(1 + periodInterestRate, -periods));

    const amortizationSchedule = [];
    let beginningBalance = loanAmountNum;

    for (let period = 1; period <= periods; period++) {
        const interest = beginningBalance * periodInterestRate;
        const principal = paymentPerPeriod - interest;
        const endingBalance = beginningBalance - principal;

        amortizationSchedule.push({
            period,
            beginningBalance: beginningBalance.toFixed(2),
            payment: paymentPerPeriod.toFixed(2),
            interest: interest.toFixed(2),
            principal: principal.toFixed(2),
            endingBalance: endingBalance.toFixed(2)
        });
        beginningBalance = endingBalance;
    }

    useEffect(() => {
        if (onScheduleGenerated) {
            onScheduleGenerated(amortizationSchedule);
        }
    }, [amortizationSchedule, onScheduleGenerated]);

    return (
        <table>
            <thead>
                <tr>
                    <th>Period</th>
                    <th>Beginning Balance</th>
                    <th>Payment</th>
                    <th>Interest</th>
                    <th>Principal</th>
                    <th>Ending Balance</th>
                </tr>
            </thead>
            <tbody>
                {amortizationSchedule.map((row) => (
                    <tr key={row.period}>
                        <td>{row.period}</td>
                        <td>{row.beginningBalance}</td>
                        <td>{row.payment}</td>
                        <td>{row.interest}</td>
                        <td>{row.principal}</td>
                        <td>{row.endingBalance}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

LoanTable.propTypes = {
    loanAmount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    loanTerm: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    loanTermUnit: PropTypes.string.isRequired,
    interestRate: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    payback: PropTypes.string.isRequired,
    compound: PropTypes.string.isRequired,
    onScheduleGenerated: PropTypes.func.isRequired,
};

export default LoanTable;