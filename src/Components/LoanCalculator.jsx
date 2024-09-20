import React, { useState } from 'react';
import LoanTable from './LoanTable';

export default function LoanCalculator() {
    const [loanAmount, setLoanAmount] = useState('');
    const [loanTerm, setLoanTerm] = useState('');
    const [loanTermUnit, setLoanTermUnit] = useState('years');
    const [interestRate, setInterestRate] = useState('');
    const [compound, setCompound] = useState('annually');
    const [payback, setPayback] = useState('month');
    const [interestRateError, setInterestRateError] = useState('');
    const [loanAmountError, setLoanAmountError] = useState('');
    const [loanTermError, setLoanTermError] = useState('');

    const handleInterestRateChange = (e) => {
        let value = e.target.value;
        if (value.endsWith('%')) {
            value = value.slice(0, -1);
        }
        if (value === '' || (!isNaN(value) && value !== '')) {
            setInterestRate(value);
            setInterestRateError('');
        } else {
            setInterestRateError('Please enter a valid interest rate');
        }
    };

    const handleLoanTermChange = (e) => {
        const value = e.target.value;
        setLoanTerm(value);
        if (!isNaN(value) && value !== '') {
            setLoanTermError('');
        } else {
            setLoanTermError('Please enter a valid number');
        }
    };

    const handleLoanTermUnitChange = (e) => {
        setLoanTermUnit(e.target.value);
    };

    const handleCompoundChange = (e) => {
        setCompound(e.target.value);
    };

    const handlePaybackChange = (e) => {
        setPayback(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let valid = true;

        if (isNaN(loanAmount) || loanAmount === '') {
            setLoanAmountError('Please enter a valid number');
            valid = false;
        }

        if (isNaN(loanTerm) || loanTerm === '') {
            setLoanTermError('Please enter a valid number');
            valid = false;
        }

        if (valid) {
            // Proceed with form submission or further processing
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="loanAmount">Loan Amount:</label>
                    <input
                        type="text"
                        id="loanAmount"
                        name="loanAmount"
                        value={loanAmount}
                        onChange={(e) => setLoanAmount(e.target.value)}
                    />
                    {loanAmountError && <span style={{ color: 'red' }}>{loanAmountError}</span>}
                </div>
                <div>
                    <label htmlFor="loanTerm">Loan Term:</label>
                    <input
                        type="text"
                        id="loanTerm"
                        name="loanTerm"
                        value={loanTerm}
                        onChange={handleLoanTermChange}
                    />
                    {loanTermError && <span style={{ color: 'red' }}>{loanTermError}</span>}
                </div>
                <div>
                    <label htmlFor="loanTermUnit">Loan Term Unit:</label>
                    <select id="loanTermUnit" name="loanTermUnit" onChange={handleLoanTermUnitChange}>
                        <option value="years">Years</option>
                        <option value="months">Months</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="interestRate">Interest Rate:</label>
                    <input
                        type="text"
                        id="interestRate"
                        name="interestRate"
                        value={interestRate}
                        onChange={handleInterestRateChange}
                    />
                    {interestRateError && <span style={{ color: 'red' }}>{interestRateError}</span>}
                </div>
                <div>
                    <label htmlFor="compound">Compound:</label>
                    <select id="compound" name="compound" onChange={handleCompoundChange}>
                        <option value="annually">Annually</option>
                        <option value="semi-annually">Semi-annually</option>
                        <option value="quarterly">Quarterly</option>
                        <option value="monthly">Monthly</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="payback">Payback:</label>
                    <select id="payback" name="payback" onChange={handlePaybackChange}>
                        <option value="every day">Every day</option>
                        <option value="week">Week</option>
                        <option value="2 weeks">2 weeks</option>
                        <option value="half-month">Half-month</option>
                        <option value="month">Month</option>
                    </select>
                </div>
                <button type="submit">Submit</button>
            </form>
            <LoanTable
                loanAmount={loanAmount}
                loanTerm={loanTerm}
                loanTermUnit={loanTermUnit}
                interestRate={interestRate}
                payback={payback}
            />
        </div>
    );
}