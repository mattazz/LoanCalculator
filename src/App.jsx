import { useState } from "react"
import LoanCalc from "./Components/LoanCalculator"
import LoanDetails from "./Components/LoanDetails"
import "./App.css";

function App() {
  const [submitted, setSubmitted] = useState(false);
  const [loanDetails, setLoanDetails] = useState({});

  function handleFormSubmit(details){

    setLoanDetails(details)
    setSubmitted(true)
    console.log(`Form submitted moving up to app comp - ${JSON.stringify(details)}`);
    
  }

  return (
    <>
    <h1>Loan Calculator</h1>
    <LoanCalc onSubmit={handleFormSubmit} />
    <LoanDetails {...loanDetails} />
    </>
  )
}

export default App
