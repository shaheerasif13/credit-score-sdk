import { CreditScoreInputs, PaymentHistory } from "./types";

export const calculateCreditScore = (
  creditScoreInputs: CreditScoreInputs
): number => {
  let score = 850;

  if (creditScoreInputs.creditUtilization > 0.3) score -= 20; // High utilization hurts score
  if (creditScoreInputs.paymentHistory === PaymentHistory.Missed) score -= 50; // Missed payments hurt score
  if (creditScoreInputs.newCreditApplications > 2) score -= 10; // Too many applications hurt score
  if (creditScoreInputs.creditAge < 2) score -= 15; // New credit accounts hurt score
  if (creditScoreInputs.debtToIncomeRatio > 0.4) score -= 25; // High debt-to-income ratio hurts score

  return Math.max(300, Math.min(850, score));
};
