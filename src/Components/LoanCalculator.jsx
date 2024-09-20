import React, { useState } from 'react';
import LoanTable from './LoanTable';
import LoanDetails from './LoanDetails';

export default function LoanCalculator({ onSubmit }) {
    const [formState, setFormState] = useState({
        loanAmount: '',
        loanTerm: '',
        loanTermUnit: 'years',
        interestRate: '',
        compound: 'annually',
        payback: 'month',
    });
    const [submittedState, setSubmittedState] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formState);
        setSubmittedState(formState);
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
                        value={formState.loanAmount}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="loanTerm">Loan Term:</label>
                    <input
                        type="text"
                        id="loanTerm"
                        name="loanTerm"
                        value={formState.loanTerm}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="loanTermUnit">Loan Term Unit:</label>
                    <select
                        id="loanTermUnit"
                        name="loanTermUnit"
                        value={formState.loanTermUnit}
                        onChange={handleChange}
                    >
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
                        value={formState.interestRate}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="compound">Compound:</label>
                    <select
                        id="compound"
                        name="compound"
                        value={formState.compound}
                        onChange={handleChange}
                    >
                        <option value="annually">Annually</option>
                        <option value="semi-annually">Semi-annually</option>
                        <option value="quarterly">Quarterly</option>
                        <option value="monthly">Monthly</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="payback">Payback:</label>
                    <select
                        id="payback"
                        name="payback"
                        value={formState.payback}
                        onChange={handleChange}
                    >
                        <option value="every day">Every day</option>
                        <option value="week">Week</option>
                        <option value="2 weeks">2 weeks</option>
                        <option value="half-month">Half-month</option>
                        <option value="month">Month</option>
                    </select>
                </div>
                <button type="submit">Submit</button>
            </form>
            {submittedState &&(
                <LoanDetails {...submittedState} />
            )}
            {submittedState && (
                
                <LoanTable {...submittedState} />
            )}
        </div>
    );
}