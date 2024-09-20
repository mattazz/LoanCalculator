import React, { useState } from 'react';
import LoanDetails from './LoanDetails';
import DownloadButton from './DownloadButton';

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
    const [amortizationSchedule, setAmortizationSchedule] = useState([]);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const validateInputs = () => {
        const newErrors = {};
        if (!formState.loanAmount || isNaN(formState.loanAmount) || formState.loanAmount <= 0) {
            newErrors.loanAmount = 'Please enter a valid loan amount.';
        }
        if (!formState.loanTerm || isNaN(formState.loanTerm) || formState.loanTerm <= 0) {
            newErrors.loanTerm = 'Please enter a valid loan term.';
        }
        if (!formState.interestRate || isNaN(formState.interestRate) || formState.interestRate <= 0) {
            newErrors.interestRate = 'Please enter a valid interest rate.';
        }
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validateInputs();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        setErrors({});
        onSubmit(formState);
        setSubmittedState(formState);
        console.log('Form submitted:', formState);
    };

    const handleScheduleGenerated = (schedule) => {
        setAmortizationSchedule(schedule);
    };

    return (
        <>
            <div id='form-container'>
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
                        {errors.loanAmount && <p className="error">{errors.loanAmount}</p>}
                    </div>
                    <div id='loan-term-value'>
                        <label htmlFor="loanTerm">Loan Term:</label>
                        <input
                            type="text"
                            id="loanTerm"
                            name="loanTerm"
                            value={formState.loanTerm}
                            onChange={handleChange}
                        />
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
                        {errors.interestRate && <p className="error">{errors.interestRate}</p>}
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
            </div>
            {submittedState && (
                <>
                    <DownloadButton
                        data={amortizationSchedule}
                        fileName="LoanDetails.xlsx"
                        interestRate={parseFloat(formState.interestRate) / 100}
                    />
                    <LoanDetails {...submittedState} onScheduleGenerated={handleScheduleGenerated} />
                </>

            )}
        </>
    )
}