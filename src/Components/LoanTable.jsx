import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

function LoanTable({ loanAmount, loanTerm, loanTermUnit, interestRate, payback, compound, onScheduleGenerated }) {
    const [amortizationSchedule, setAmortizationSchedule] = useState([]);

    useEffect(() => {
        const loanAmountNum = parseFloat(loanAmount);
        const interestRateNum = parseFloat(interestRate) / 100;
        const periods = loanTermUnit === 'years' ? loanTerm * 12 : loanTerm;
        const periodInterestRate = interestRateNum / 12;

        const paymentPerPeriod = (loanAmountNum * periodInterestRate) / (1 - Math.pow(1 + periodInterestRate, -periods));

        const schedule = [];
        let beginningBalance = loanAmountNum;

        for (let period = 1; period <= periods; period++) {
            const interest = beginningBalance * periodInterestRate;
            const principal = paymentPerPeriod - interest;
            const endingBalance = beginningBalance - principal;

            schedule.push({
                period,
                beginningBalance: beginningBalance.toFixed(2),
                payment: paymentPerPeriod.toFixed(2),
                interest: interest.toFixed(2),
                principal: principal.toFixed(2),
                endingBalance: endingBalance.toFixed(2)
            });
            beginningBalance = endingBalance;
        }

        setAmortizationSchedule(schedule);

        if (onScheduleGenerated) {
            onScheduleGenerated(schedule);
        }
    }, [loanAmount, loanTerm, loanTermUnit, interestRate, payback, compound, onScheduleGenerated]);

    return (
        <div id='loan-table'>
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
        </div>
    );
}

LoanTable.propTypes = {
    loanAmount: PropTypes.string.isRequired,
    loanTerm: PropTypes.number.isRequired,
    loanTermUnit: PropTypes.string.isRequired,
    interestRate: PropTypes.string.isRequired,
    payback: PropTypes.string.isRequired,
    compound: PropTypes.string.isRequired,
    onScheduleGenerated: PropTypes.func
};

export default LoanTable;