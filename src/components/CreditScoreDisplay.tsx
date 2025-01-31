import { useTheme } from "../hooks/theme";
import { formatNumber } from "../share/utils";

interface CreditScoreDisplayProps {
  score: number;
}

const CreditScoreDisplay: React.FC<CreditScoreDisplayProps> = ({ score }) => {
  const { scoreRanges, locale } = useTheme();

  // Determine the score range based on the user's score
  const getScoreRange = (score: number) => {
    for (const [label, range] of Object.entries(scoreRanges)) {
      if (score >= range.min && score <= range.max) {
        return { label, color: range.color };
      }
    }
    return { label: "Unknown", color: "#000000" }; // Fallback for out-of-range scores
  };

  const scoreRange = getScoreRange(score);

  return (
    <div className="text-center">
      <h2 className="text-xl font-medium text-gray-800">Your Credit Score</h2>
      <p
        className={`text-5xl font-bold mt-2`}
        style={{ color: scoreRange.color }}
      >
        {formatNumber(score, locale)}
      </p>
      <p
        className={`text-[17px] font-medium mt-1`}
        style={{ color: scoreRange.color }}
      >
        {scoreRange.label}
      </p>
    </div>
  );
};

export default CreditScoreDisplay;
