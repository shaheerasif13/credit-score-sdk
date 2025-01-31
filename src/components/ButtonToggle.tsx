import { useTheme } from "../hooks/theme";

interface ButtonToggleProps {
  label: string;
  options: { label: string; value: string | number }[];
  selectedValue: string | number;
  onChange: (value: string | number) => void;
}

const ButtonToggle: React.FC<ButtonToggleProps> = ({
  label,
  options,
  selectedValue,
  onChange,
}) => {
  const theme = useTheme();

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">
        {label}
      </label>
      <div className="flex space-x-4 justify-start">
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            className={`px-6 py-2.5 rounded-lg transition-all duration-300 text-sm ${
              selectedValue === option.value
                ? "text-white" // Selected state
                : "text-gray-100" // Default state
            }`}
            style={{
              backgroundColor:
                selectedValue === option.value
                  ? theme.primaryColor // Selected state
                  : theme.secondaryColor, // Default state
            }}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ButtonToggle;
