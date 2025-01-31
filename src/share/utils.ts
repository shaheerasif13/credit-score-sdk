import { CreditScoreInputs, PaymentHistory } from "./types";

export const calculateCreditScore = (
  creditScoreInputs: CreditScoreInputs
): number => {
  let score = 850;

  if (creditScoreInputs.creditUtilization > 0.3) score -= 20;
  if (creditScoreInputs.paymentHistory === PaymentHistory.Missed) score -= 50;
  if (creditScoreInputs.newCreditApplications > 2) score -= 10;
  if (creditScoreInputs.creditAge < 2) score -= 15;
  if (creditScoreInputs.debtToIncomeRatio > 0.4) score -= 25;

  return Math.max(300, Math.min(850, score));
};

export const formatNumber = (value: number, locale: string = "en-US") => {
  return new Intl.NumberFormat(locale).format(value);
};
