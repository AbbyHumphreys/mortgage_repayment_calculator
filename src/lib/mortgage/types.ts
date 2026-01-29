export type MortgageType = "repayment" | "interest_only";

export interface MortgageInput {
  amount: number;
  term: number; // years
  rate: number; // annual percentage, e.g. 4.5
  mortgageType: MortgageType;
}

export interface MortgageResults {
  repaymentMonthly: number;
  repaymentTotal: number;
}
