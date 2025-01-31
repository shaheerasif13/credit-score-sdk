import { useState } from "react";
import { CreditScoreInputs, PaymentHistory } from "../share/types";
import { calculateCreditScore } from "../share/utils";

const CreditScoreSimulator = () => {
  const [creditScoreInputs, setCreditScoreInputs] = useState<CreditScoreInputs>(
    {
      creditUtilization: 30,
      paymentHistory: PaymentHistory.OnTime,
      newCreditApplications: 0,
      creditAge: 5,
      debtToIncomeRatio: 20,
    }
  );
  const creditScore = calculateCreditScore(creditScoreInputs);
  const getScoreRange = (score: number) => {
    if (score >= 800) return { label: "Excellent", color: "text-green-600" };
    if (score >= 740) return { label: "Very Good", color: "text-blue-600" };
    if (score >= 670) return { label: "Good", color: "text-green-400" };
    if (score >= 580) return { label: "Fair", color: "text-yellow-500" };
    return { label: "Poor", color: "text-red-600" };
  };
  const scoreRange = getScoreRange(creditScore);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-center mb-8">
          Credit Score Simulator
        </h1>

        {/* Credit Score Display */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold">Your Credit Score</h2>
          <p className={`text-6xl font-bold ${scoreRange.color} mt-2`}>
            {creditScore}
          </p>
          <p className={`text-xl font-medium ${scoreRange.color} mt-2`}>
            {scoreRange.label}
          </p>
        </div>

        {/* Controls */}
        <div className="space-y-6">
          {/* Credit Utilization Slider */}
          <div>
            <label className="block text-lg font-medium mb-2">
              Credit Utilization: {creditScoreInputs.creditUtilization}%
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={creditScoreInputs.creditUtilization}
              onChange={(e) =>
                setCreditScoreInputs({
                  ...creditScoreInputs,
                  creditUtilization: Number(e.target.value),
                })
              }
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          {/* Payment History Toggle */}
          <div>
            <label className="block text-lg font-medium mb-2">
              Payment History
            </label>
            <div className="flex space-x-4">
              <button
                onClick={() =>
                  setCreditScoreInputs({
                    ...creditScoreInputs,
                    paymentHistory: PaymentHistory.OnTime,
                  })
                }
                className={`px-6 py-2 rounded-lg ${
                  creditScoreInputs.paymentHistory === PaymentHistory.OnTime
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                On-time Payments
              </button>
              <button
                onClick={() => {
                  setCreditScoreInputs({
                    ...creditScoreInputs,
                    paymentHistory: PaymentHistory.Missed,
                  });
                }}
                className={`px-6 py-2 rounded-lg ${
                  creditScoreInputs.paymentHistory === PaymentHistory.Missed
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                Missed Payments
              </button>
            </div>
          </div>

          {/* New Credit Applications Counter */}
          <div>
            <label className="block text-lg font-medium mb-2">
              New Credit Applications: {creditScoreInputs.newCreditApplications}
            </label>
            <input
              type="number"
              min="0"
              value={creditScoreInputs.newCreditApplications}
              onChange={(e) => {
                setCreditScoreInputs({
                  ...creditScoreInputs,
                  newCreditApplications: Number(e.target.value),
                });
              }}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>

          {/* Credit Age Slider */}
          <div>
            <label className="block text-lg font-medium mb-2">
              Credit Age: {creditScoreInputs.creditAge} years
            </label>
            <input
              type="range"
              min="0"
              max="20"
              value={creditScoreInputs.creditAge}
              onChange={(e) => {
                setCreditScoreInputs({
                  ...creditScoreInputs,
                  creditAge: Number(e.target.value),
                });
              }}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          {/* Debt-to-Income Ratio Input */}
          <div>
            <label className="block text-lg font-medium mb-2">
              Debt-to-Income Ratio: {creditScoreInputs.debtToIncomeRatio}%
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={creditScoreInputs.debtToIncomeRatio}
              onChange={(e) => {
                setCreditScoreInputs({
                  ...creditScoreInputs,
                  debtToIncomeRatio: Number(e.target.value),
                });
              }}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditScoreSimulator;
