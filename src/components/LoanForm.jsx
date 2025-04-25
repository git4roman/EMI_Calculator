// components/LoanForm.jsx
import React from "react";

export default function LoanForm({
  principal,
  interestRate,
  emi,
  setPrincipal,
  setInterestRate,
  setEmi,
  onCalculate,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onCalculate();
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="grid grid-cols-1 gap-3">
        <div className="mb-3">
          <label
            className="block text-gray-700 text-sm font-bold mb-1"
            htmlFor="principal"
          >
            Principal Amount (₹)
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="principal"
            type="number"
            min="1"
            value={principal || ""}
            onChange={(e) => setPrincipal(Number(e.target.value))}
            placeholder="भुक्तानीको लागि रकम प्रविष्ट गर्नुहोस्।"
          />
        </div>

        <div className="mb-3">
          <label
            className="block text-gray-700 text-sm font-bold mb-1"
            htmlFor="interestRate"
          >
            Annual Interest Rate (%)
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="interestRate"
            type="number"
            min="0"
            step="0.1"
            value={interestRate || ""}
            onChange={(e) => setInterestRate(Number(e.target.value))}
            placeholder="ब्याजको प्रतिशत लेख्नुहोस्?"
          />
        </div>

        <div className="mb-3">
          <label
            className="block text-gray-700 text-sm font-bold mb-1"
            htmlFor="emi"
          >
            Monthly Payment (₹)
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="emi"
            type="number"
            min="1"
            value={emi || ""}
            onChange={(e) => setEmi(Number(e.target.value))}
            placeholder="प्रत्येक महिनाको भुक्तानी लेख्नुहोस्।"
          />
        </div>
      </div>

      <div className="flex items-center justify-center mt-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline w-full md:w-auto"
          type="submit"
        >
          Calculate
        </button>
      </div>
    </form>
  );
}
