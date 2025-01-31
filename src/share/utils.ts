import { CreditScoreInputs, PaymentHistory, ScoreRange } from "./types";

export const calculateCreditScore = (
  creditScoreInputs: CreditScoreInputs,
  scoreRanges: { [key: string]: ScoreRange }
): number => {
  let minScore = Infinity;
  let maxScore = -Infinity;

  // Find the min and max scores
  for (const scoreRange of Object.values(scoreRanges)) {
    minScore = Math.min(minScore, scoreRange.min);
    maxScore = Math.max(maxScore, scoreRange.max);
  }

  let score = maxScore;
  let deduction = 0;

  // Credit Utilization Deduction (-5 per 10% over 30%)
  if (creditScoreInputs.creditUtilization > 30)
    deduction +=
      Math.floor((creditScoreInputs.creditUtilization - 30) / 10) * 5;

  // Payment History Deduction
  if (creditScoreInputs.paymentHistory === PaymentHistory.Missed)
    deduction += 100;

  // New Credit Applications (-10 per application after 2)
  if (creditScoreInputs.newCreditApplications > 2)
    deduction += (creditScoreInputs.newCreditApplications - 2) * 10;

  // Credit Age Deduction (-10 per year under 5 years)
  if (creditScoreInputs.creditAge < 5)
    deduction += (5 - creditScoreInputs.creditAge) * 10;

  // Debt-to-Income Ratio Deduction (-10 per 10% over 40%)
  if (creditScoreInputs.debtToIncomeRatio > 40)
    deduction +=
      Math.floor((creditScoreInputs.debtToIncomeRatio - 40) / 10) * 10;

  score -= deduction;
  return Math.max(minScore, Math.min(maxScore, score));
};

export const formatNumber = (value: number, locale: string = "en-US") => {
  return new Intl.NumberFormat(locale).format(value);
};
