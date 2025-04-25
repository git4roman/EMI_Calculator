// utils/loanCalculations.js
export const calculateLoanPayments = (principal, interestRate, emi) => {
  let P = principal;
  let T = 1 / 12; // Monthly interest period
  let R = interestRate;
  let EMI = emi;
  let count = 0;

  const history = [];

  // Initial state
  history.push({
    month: 0,
    principal: P,
    payment: 0,
    interest: 0,
    remaining: P,
  });

  // Run until either loan is paid off OR 120 months is reached
  while (P / EMI >= 1 && count < 120) {
    const interest = P * T * R * 0.01;
    const newP = P + interest - EMI;

    count += 1;

    history.push({
      month: count,
      principal: P,
      payment: EMI,
      interest: interest,
      remaining: newP,
    });

    P = newP;
  }

  // If loan still remains after 120 months, pay off in final month
  if (P > 0) {
    const finalInterest = P * T * R * 0.01;
    const finalPayment = P + finalInterest;

    history.push({
      month: count + 1,
      principal: P,
      payment: finalPayment,
      interest: finalInterest,
      remaining: 0,
    });

    count += 1;
  }

  return {
    results: {
      months: count,
      finalAmount: P,
      totalPayment: history.reduce((sum, h) => sum + h.payment, 0),
    },
    history: history,
  };
};
