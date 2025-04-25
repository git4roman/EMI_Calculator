// App.jsx (Main file)
import { useState, useEffect } from "react";
import LoanForm from "./components/LoanForm";
import LoanSummary from "./components/LoanSummary";
import PaymentSchedule from "./components/PaymentSchedule";
import { calculateLoanPayments } from "./utils/loanCalculations";

export default function LoanCalculator() {
  const [principal, setPrincipal] = useState(null);
  const [interestRate, setInterestRate] = useState(null);
  const [emi, setEmi] = useState(null);
  const [results, setResults] = useState(null);
  const [paymentHistory, setPaymentHistory] = useState([]);

  const handleCalculate = () => {
    if (!principal || !interestRate || !emi) {
      return;
    }

    const { results: calculatedResults, history } = calculateLoanPayments(
      principal,
      interestRate,
      emi
    );

    setResults(calculatedResults);
    setPaymentHistory(history);
  };

  useEffect(() => {
    // Avoid initial calculation with null values
    if (principal && interestRate && emi) {
      handleCalculate();
    }
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto p-4 bg-white shadow-lg rounded-lg">
      <h1 className="text-xl md:text-2xl font-bold mb-4 text-center text-blue-700">
        Loan Calculator
      </h1>

      <LoanForm
        principal={principal}
        interestRate={interestRate}
        emi={emi}
        setPrincipal={setPrincipal}
        setInterestRate={setInterestRate}
        setEmi={setEmi}
        onCalculate={handleCalculate}
      />

      {results && <LoanSummary results={results} />}

      {paymentHistory.length > 0 && (
        <PaymentSchedule paymentHistory={paymentHistory} />
      )}
    </div>
  );
}
