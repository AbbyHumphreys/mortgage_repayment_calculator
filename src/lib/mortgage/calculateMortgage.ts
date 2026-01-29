import { MortgageInput, MortgageResults } from "./types";

const roundTo2 = (n: number) => Math.round((n + Number.EPSILON) * 100) / 100;

export function calculateMortgage(input: MortgageInput): MortgageResults {
  const { amount, term, rate, mortgageType } = input;

  if (amount <= 0 || term <= 0 || rate < 0) {
    return { repaymentMonthly: 0, repaymentTotal: 0 };
  }

  const totalPayments = term * 12;
  const monthlyRate = rate / 100 / 12;

  let repaymentMonthly = 0;
  let repaymentTotal = 0;

  if (mortgageType === "interest_only") {
    repaymentMonthly = amount * monthlyRate;
    repaymentTotal = repaymentMonthly * totalPayments;
  } else {
    // Repayment mortgage
    if (monthlyRate === 0) {
      // 0% interest edge case
      repaymentMonthly = amount / totalPayments;
    } else {
      const pow = Math.pow(1 + monthlyRate, totalPayments);
      repaymentMonthly = (amount * monthlyRate * pow) / (pow - 1);
    }

    repaymentTotal = repaymentMonthly * totalPayments;
  }

  // prevent NaN/Infinity leaking to UI
  if (!Number.isFinite(repaymentMonthly) || !Number.isFinite(repaymentTotal)) {
    return { repaymentMonthly: 0, repaymentTotal: 0 };
  }

  return {
    repaymentMonthly: roundTo2(repaymentMonthly),
    repaymentTotal: roundTo2(repaymentTotal),
  };
}
