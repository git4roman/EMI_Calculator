// utils/loanCalculations.js
export const calculateLoanPayments = (principal, interestRate, emi) => {
  let P = principal;
  let T = 1.0 / 12.0; // Monthly interest period
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

  while (P / EMI >= 1) {
    const M = EMI / P;
    const interest = P * T * R * 0.01;
    const newP = (P + interest) * (1 - M);

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

  // Add final payment
  const finalInterest = P * T * R * 0.01;
  const finalPayment = P + finalInterest;

  history.push({
    month: count + 1,
    principal: P,
    payment: finalPayment,
    interest: finalInterest,
    remaining: 0,
  });

  return {
    results: {
      months: count + 1,
      finalAmount: P,
      totalPayment: count * EMI + finalPayment,
    },
    history: history,
  };
};
