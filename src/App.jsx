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
  const [loading, setLoading] = useState(false);

  const handleCalculate = () => {
    if (!principal || !interestRate || !emi) {
      return;
    }

    setLoading(true);

    // Simulate delay for better UX
    setTimeout(() => {
      const { results: calculatedResults, history } = calculateLoanPayments(
        principal,
        interestRate,
        emi
      );

      setResults(calculatedResults);
      setPaymentHistory(history);
      setLoading(false);
    }, 300); // Adjust delay as needed
  };

  useEffect(() => {
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

      {/* Loader */}
      {loading && (
        <div className="flex flex-col items-center my-6">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm text-blue-600 mt-2">Calculating...</p>
        </div>
      )}

      {/* Results */}
      {!loading && results && <LoanSummary results={results} />}

      {/* Payment Table */}
      {!loading && paymentHistory.length > 0 && (
        <PaymentSchedule paymentHistory={paymentHistory} />
      )}
    </div>
  );
}
