// components/PaymentSchedule.jsx
import React, { useState } from "react";
import { formatCurrency } from "../utils/formatters";

export default function PaymentSchedule({ paymentHistory }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(12);

  // Filter out month 0 from payment history
  const filteredPaymentHistory = paymentHistory.filter(
    (entry) => entry.month !== 0
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredPaymentHistory.length / entriesPerPage);
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = filteredPaymentHistory.slice(
    indexOfFirstEntry,
    indexOfLastEntry
  );

  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="overflow-hidden">
      <h2 className="text-lg md:text-xl font-semibold mb-3">
        Payment Schedule
      </h2>

      {/* Compact mobile view with select key entries */}
      <div className="block md:hidden">
        <div className="flex justify-between items-center mb-2">
          <div className="text-sm">
            Page {currentPage} of {totalPages}
          </div>
          <div className="flex space-x-2">
            <select
              className="text-sm border rounded px-2 py-1"
              value={entriesPerPage}
              onChange={(e) => {
                setEntriesPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
            >
              <option value="5">5 / page</option>
              <option value="12">12 / page</option>
              <option value="20">20 / page</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-1 px-2 border-b border-gray-200 text-left">
                  Month
                </th>
                <th className="py-1 px-2 border-b border-gray-200 text-right">
                  Principal
                </th>
                <th className="py-1 px-2 border-b border-gray-200 text-right">
                  Remaining
                </th>
              </tr>
            </thead>
            <tbody>
              {currentEntries.map((entry) => (
                <tr key={entry.month} className="hover:bg-gray-50">
                  <td className="py-1 px-2 border-b border-gray-200">
                    {entry.month}
                  </td>
                  <td className="py-1 px-2 border-b border-gray-200 text-right">
                    {formatCurrency(entry.principal)}
                  </td>
                  <td className="py-1 px-2 border-b border-gray-200 text-right">
                    {formatCurrency(entry.remaining)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile pagination controls */}
        <div className="flex justify-between mt-3">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded text-sm ${
              currentPage === 1
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            Prev
          </button>
          <span className="text-sm py-1">
            {indexOfFirstEntry + 1}-
            {Math.min(indexOfLastEntry, filteredPaymentHistory.length)} of{" "}
            {filteredPaymentHistory.length}
          </span>
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 rounded text-sm ${
              currentPage === totalPages
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            Next
          </button>
        </div>
      </div>

      {/* Regular table for larger screens */}
      <div className="hidden md:block overflow-x-auto">
        <div className="flex justify-between items-center mb-2">
          <div className="text-sm">
            Page {currentPage} of {totalPages}
          </div>
          <div className="flex space-x-2">
            <select
              className="text-sm border rounded px-2 py-1"
              value={entriesPerPage}
              onChange={(e) => {
                setEntriesPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
            >
              <option value="5">5 / page</option>
              <option value="12">12 / page</option>
              <option value="20">20 / page</option>
            </select>
          </div>
        </div>

        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b border-gray-200 text-left">
                Month
              </th>
              <th className="py-2 px-4 border-b border-gray-200 text-right">
                Principal
              </th>
              <th className="py-2 px-4 border-b border-gray-200 text-right">
                Interest
              </th>
              <th className="py-2 px-4 border-b border-gray-200 text-right">
                Payment
              </th>
              <th className="py-2 px-4 border-b border-gray-200 text-right">
                Remaining
              </th>
            </tr>
          </thead>
          <tbody>
            {currentEntries.map((entry) => (
              <tr key={entry.month} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b border-gray-200">
                  {entry.month}
                </td>
                <td className="py-2 px-4 border-b border-gray-200 text-right">
                  {formatCurrency(entry.principal)}
                </td>
                <td className="py-2 px-4 border-b border-gray-200 text-right">
                  {formatCurrency(entry.interest)}
                </td>
                <td className="py-2 px-4 border-b border-gray-200 text-right">
                  {formatCurrency(entry.payment)}
                </td>
                <td className="py-2 px-4 border-b border-gray-200 text-right">
                  {formatCurrency(entry.remaining)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Desktop pagination controls */}
        <div className="flex justify-between mt-3">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded ${
              currentPage === 1
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            Previous
          </button>
          <div className="flex">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }

              return (
                <button
                  key={i}
                  onClick={() => paginate(pageNum)}
                  className={`w-8 mx-1 py-1 rounded ${
                    currentPage === pageNum
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 hover:bg-gray-300"
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
          </div>
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 rounded ${
              currentPage === totalPages
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
