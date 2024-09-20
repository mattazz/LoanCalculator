# Loan Calculator

This project is a Loan Calculator application built with React. It allows users to input loan details and generate an amortization schedule. The schedule can be viewed in a web table and downloaded as an Excel file.

## Features

- Input loan details including loan amount, term, interest rate, and payment frequency.
- Generate an amortization schedule based on the input details.
- View the amortization schedule in a web table.
- Download the amortization schedule as an Excel file.

## Components

### LoanCalculator

This component is responsible for capturing the loan details from the user.

#### Props

- `onSubmit`: Function to handle the form submission.

#### State

- `formState`: Object containing the loan details.
- `submittedState`: Object containing the submitted loan details.
- `amortizationSchedule`: Array containing the amortization schedule.

### LoanTable

This component displays the amortization schedule in a web table.

#### Props

- `loanAmount`: String representing the loan amount.
- `loanTerm`: Number representing the loan term.
- `loanTermUnit`: String representing the loan term unit (years or months).
- `interestRate`: String representing the interest rate.
- `payback`: String representing the payment frequency.
- `compound`: String representing the compounding frequency.
- `onScheduleGenerated`: Function to handle the generated schedule.

#### State

- `amortizationSchedule`: Array containing the amortization schedule.

### DownloadButton

This component allows the user to download the amortization schedule as an Excel file.

#### Props

- `data`: Array containing the amortization schedule.
- `fileName`: String representing the name of the Excel file.
- `interestRate`: Number representing the interest rate.

## Usage

1. Clone the repository.
2. Install the dependencies using `npm install`.
3. Run the application using `npm start`.
4. Enter the loan details in the form.
5. View the amortization schedule in the web table.
6. Click the "Download as Excel" button to download the schedule as an Excel file.

## Example

Here is an example of the first few rows of the amortization schedule:

| Period | Beginning Balance | Payment | Interest | Principal | Ending Balance |
|--------|--------------------|---------|----------|-----------|----------------|
| 1      | 100000.00          | 1110.21 | 500.00   | 610.21    | 99389.79       |
| 2      | 99389.79           | 1110.21 | 496.95   | 613.26    | 98776.54       |
| 3      | 98776.54           | 1110.21 | 493.88   | 616.32    | 98160.22       |
| 4      | 98160.22           | 1110.21 | 490.80   | 619.40    | 97540.81       |
| 5      | 97540.81           | 1110.21 | 487.70   | 622.50    | 96918.31       |

