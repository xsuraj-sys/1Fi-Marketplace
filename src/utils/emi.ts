/**
 * Calculates the EMI (Equated Monthly Installment).
 * Formula: E = P * r * (1 + r)^n / ((1 + r)^n - 1)
 * Where:
 * P = Principal loan amount
 * r = Monthly interest rate (Annual Rate / 12 / 100)
 * n = Tenure in months
 * 
 * If interest rate is 0 (No Cost EMI), simply divides Principal by tenure.
 */
export function calculateMonthlyEMI(principal: number, annualInterestRate: number, tenureMonths: number): number {
  if (tenureMonths <= 0) return 0;
  if (annualInterestRate === 0) {
    // We don't round here to preserve exact fractional amounts during calculation,
    // or we round but ensure total payable reconciles later. 
    // Usually for No Cost EMI, banks adjust the last month's EMI. For display, we round up.
    return Math.ceil(principal / tenureMonths);
  }

  const r = annualInterestRate / 12 / 100;
  const n = tenureMonths;
  const emi = (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  return Math.round(emi);
}

/**
 * Calculates the total amount payable over the tenure.
 */
export function calculateTotalPayable(principal: number, monthlyEMI: number, annualInterestRate: number, tenureMonths: number): number {
  if (annualInterestRate === 0) {
    return principal;
  }
  return monthlyEMI * tenureMonths;
}

/**
 * Helper to get the starting price of a product (lowest variant price).
 */
export function getStartingPrice(variants: { price: number }[]): number {
  if (!variants || variants.length === 0) return 0;
  return Math.min(...variants.map(v => v.price));
}
