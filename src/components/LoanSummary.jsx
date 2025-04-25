// components/LoanSummary.jsx
import React from "react";
import { formatCurrency } from "../utils/formatters";

export default function LoanSummary({ results }) {
  return (
    <div className="bg-gray-50 p-4 rounded-lg shadow mb-6">
      <h2 className="text-lg md:text-xl font-semibold mb-3 text-center">
        Loan Summary
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="bg-blue-100 p-3 rounded">
          <p className="text-gray-600 text-xs">Total Months/जम्मा महिना</p>
          <p className="text-lg font-bold">{results.months}</p>
        </div>
        <div className="bg-green-100 p-3 rounded">
          <p className="text-gray-600 text-xs">
            Final Amount/अन्तिम रकम
          </p>
          <p className="text-lg font-bold">
            {formatCurrency(results.finalAmount)}
          </p>
        </div>
        <div className="bg-purple-100 p-3 rounded">
          <p className="text-gray-600 text-xs">
            Total Payment/जम्मा भुक्तानी
          </p>
          <p className="text-lg font-bold">
            {formatCurrency(results.totalPayment)}
          </p>
        </div>
      </div>
    </div>
  );
}