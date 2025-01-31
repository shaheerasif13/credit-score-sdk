import { useTheme } from "../hooks/theme";

interface NumberInputProps {
  label: string;
  min: number;
  onChange: (value: number) => void;
}

const NumberInput: React.FC<NumberInputProps> = ({ label, min, onChange }) => {
  const { primaryColor } = useTheme();

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">
        {label}
      </label>
      <input
        type="number"
        min={min}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full p-2 border-2 text-gray-700 rounded-lg text-sm focus:outline-none"
        style={{
          borderColor: "#9ca3af",
        }}
        onFocus={(e) => (e.target.style.borderColor = primaryColor)}
        onBlur={(e) => (e.target.style.borderColor = "#9ca3af")}
      />
    </div>
  );
};

export default NumberInput;
