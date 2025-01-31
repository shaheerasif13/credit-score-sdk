interface CreditScoreDisplayProps {
  score: number;
  scoreLabel: string;
  color: string;
}

const CreditScoreDisplay: React.FC<CreditScoreDisplayProps> = ({
  score,
  scoreLabel,
  color,
}) => {
  return (
    <div className="text-center">
      <h2 className="text-xl font-medium text-gray-800">Your Credit Score</h2>
      <p className={`text-5xl font-bold mt-2 ${color}`}>{score}</p>
      <p className={`text-[17px] font-medium ${color} mt-1`}>{scoreLabel}</p>
    </div>
  );
};

export default CreditScoreDisplay;
