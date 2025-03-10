export interface CreditScoreInputs {
  creditUtilization: number; // 0 to 1 (0% to 100%)
  paymentHistory: PaymentHistory; // "on-time" or "missed"
  newCreditApplications: number;
  creditAge: number; // in years
  debtToIncomeRatio: number; // 0 to 1 (0% to 100%)
}

export interface Theme {
  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
  scoreRanges: ScoreRanges;
  locale?: string;
  icon?: string | React.ReactNode;
}

export interface ScoreRange {
  min: number;
  max: number;
  color: string;
}

export interface ScoreRanges {
  [key: string]: ScoreRange;
}

export enum PaymentHistory {
  OnTime = "on-time",
  Missed = "missed",
}
