import React from "react";
import PropTypes from "prop-types";

export default function LoanTable({ loanAmount, loanTerm, loanTermUnit, interestRate, payback, compound }) {
    // Convert props to numbers
    const loanAmountNum = Number(loanAmount);
    const loanTermNum = Number(loanTerm);
    const interestRateNum = Number(interestRate);

    console.log(`LoanTable: Props received ${JSON.stringify({ loanAmountNum, loanTermNum, loanTermUnit, interestRateNum, payback, compound })}`);

    // Determine the number of periods based on the payback frequency
    let periods;
    switch (payback) {
        case 'every day':
            periods = loanTermUnit === 'years' ? loanTermNum * 365 : loanTermNum * 30;
            break;
        case 'week':
            periods = loanTermUnit === 'years' ? loanTermNum * 52 : loanTermNum * 4;
            break;
        case '2 weeks':
            periods = loanTermUnit === 'years' ? loanTermNum * 26 : loanTermNum * 2;
            break;
        case 'half-month':
            periods = loanTermUnit === 'years' ? loanTermNum * 24 : loanTermNum * 2;
            break;
        case 'month':
        default:
            periods = loanTermUnit === 'years' ? loanTermNum * 12 : loanTermNum;
            break;
    }

    // Determine the interest rate per period based on the compounding frequency
    let compoundingPeriods;
    switch (compound) {
        case 'annually':
            compoundingPeriods = 1;
            break;
        case 'semi-annually':
            compoundingPeriods = 2;
            break;
        case 'quarterly':
            compoundingPeriods = 4;
            break;
        case 'monthly':
        default:
            compoundingPeriods = 12;
            break;
    }

    const periodInterestRate = Math.pow(1 + (interestRateNum / 100) / compoundingPeriods, compoundingPeriods / periods) - 1;

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
};