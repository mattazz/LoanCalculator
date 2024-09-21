import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

function LoanTable({ loanAmount, loanTerm, loanTermUnit, interestRate, payback, compound, onScheduleGenerated }) {
    const [amortizationSchedule, setAmortizationSchedule] = useState([]);

    useEffect(() => {
        const calculatePeriodicInterestRate = (annualRate, compoundFrequency) => {
            switch (compoundFrequency) {
                case 'annually':
                    return annualRate;
                case 'semi-annually':
                    return annualRate / 2;
                case 'quarterly':
                    return annualRate / 4;
                case 'monthly':
                    return annualRate / 12;
                default:
                    return annualRate;
            }
        };

        const generateAmortizationSchedule = (loanAmount, loanTerm, loanTermUnit, interestRate, payback, compound) => {
            const schedule = [];
            let numberOfPeriods;
            let periodInterestRate;

            // Determine the number of periods and period interest rate based on payback frequency
            switch (payback) {
                case 'every day':
                    numberOfPeriods = loanTermUnit === 'years' ? loanTerm * 365 : loanTerm * 30;
                    periodInterestRate = interestRate / 100 / 365;
                    break;
                case 'week':
                    numberOfPeriods = loanTermUnit === 'years' ? loanTerm * 52 : loanTerm * 4.33;
                    periodInterestRate = interestRate / 100 / 52;
                    break;
                case '2 weeks':
                    numberOfPeriods = loanTermUnit === 'years' ? loanTerm * 26 : loanTerm * 2.17;
                    periodInterestRate = interestRate / 100 / 26;
                    break;
                case 'half-month':
                    numberOfPeriods = loanTermUnit === 'years' ? loanTerm * 24 : loanTerm * 2;
                    periodInterestRate = interestRate / 100 / 24;
                    break;
                case 'month':
                    numberOfPeriods = loanTermUnit === 'years' ? loanTerm * 12 : loanTerm;
                    periodInterestRate = interestRate / 100 / 12;
                    break;
                default:
                    throw new Error('Invalid payback frequency');
            }

            // Adjust the period interest rate based on the compounding frequency
            periodInterestRate = calculatePeriodicInterestRate(periodInterestRate, compound);

            const paymentPerPeriod = (loanAmount * periodInterestRate) / (1 - Math.pow(1 + periodInterestRate, -numberOfPeriods));

            let beginningBalance = loanAmount;

            for (let period = 1; period <= numberOfPeriods; period++) {
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

            return schedule;
        };

        const loanAmountNum = parseFloat(loanAmount);
        const interestRateNum = parseFloat(interestRate);

        const schedule = generateAmortizationSchedule(
            loanAmountNum,
            parseFloat(loanTerm),
            loanTermUnit,
            interestRateNum,
            payback,
            compound
        );

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
    loanTerm: PropTypes.string.isRequired,
    loanTermUnit: PropTypes.string.isRequired,
    interestRate: PropTypes.string.isRequired,
    payback: PropTypes.string.isRequired,
    compound: PropTypes.string.isRequired,
    onScheduleGenerated: PropTypes.func
};

export default LoanTable;