import { useEffect, useState } from "react";
import { CreditScoreInputs, PaymentHistory } from "../share/types";
import { calculateCreditScore } from "../share/utils";
import CreditScoreDisplay from "./CreditScoreDisplay";
import ButtonToggle from "./ButtonToggle";
import NumberInput from "./NumberInput";
import RangeSlider from "./RangeSlider";

const CreditScoreSimulator = () => {
  const [creditScoreInputs, setCreditScoreInputs] = useState<CreditScoreInputs>(
    {
      creditUtilization: 0,
      paymentHistory: PaymentHistory.OnTime,
      newCreditApplications: 0,
      creditAge: 0,
      debtToIncomeRatio: 0,
    }
  );
  const [creditScore, setCreditScore] = useState<number>(
    calculateCreditScore(creditScoreInputs)
  );

  useEffect(() => {
    setCreditScore(calculateCreditScore(creditScoreInputs));
  }, [creditScoreInputs]);

  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center p-10">
      <div className="bg-white rounded-3xl shadow-lg p-8 w-full max-w-lg">
        <h1 className="text-[28px] font-semibold text-center text-gray-800 mb-2">
          Credit Score Simulator
        </h1>
        <CreditScoreDisplay score={creditScore} />
        <div className="space-y-6">
          <RangeSlider
            label="Credit Utilization"
            value={creditScoreInputs.creditUtilization}
            min={0}
            max={100}
            onChange={(value) =>
              setCreditScoreInputs({
                ...creditScoreInputs,
                creditUtilization: value,
              })
            }
            unit="%"
          />
          <ButtonToggle
            label="Payment History"
            options={[
              { label: "On-time Payments", value: PaymentHistory.OnTime },
              { label: "Missed Payments", value: PaymentHistory.Missed },
            ]}
            selectedValue={creditScoreInputs.paymentHistory}
            onChange={(value) =>
              setCreditScoreInputs({
                ...creditScoreInputs,
                paymentHistory: value as PaymentHistory,
              })
            }
          />
          <NumberInput
            label="New Credit Applications"
            min={0}
            onChange={(value) =>
              setCreditScoreInputs({
                ...creditScoreInputs,
                newCreditApplications: value,
              })
            }
          />
          <RangeSlider
            label="Credit Age"
            value={creditScoreInputs.creditAge}
            min={0}
            max={20}
            onChange={(value) =>
              setCreditScoreInputs({
                ...creditScoreInputs,
                creditAge: value,
              })
            }
            unit="years"
          />
          <RangeSlider
            label="Debt-to-Income Ratio"
            value={creditScoreInputs.debtToIncomeRatio}
            min={0}
            max={100}
            onChange={(value) =>
              setCreditScoreInputs({
                ...creditScoreInputs,
                debtToIncomeRatio: value,
              })
            }
            unit="%"
          />
        </div>
      </div>
    </div>
  );
};

export default CreditScoreSimulator;
