import { useTheme } from "../hooks/theme";

interface NumberInputProps {
  label: string;
  value: number;
  min: number;
  onChange: (value: number) => void;
}

const NumberInput: React.FC<NumberInputProps> = ({
  label,
  value,
  min,
  onChange,
}) => {
  const { primaryColor } = useTheme();

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">
        {label}
      </label>
      <input
        type="number"
        min={min}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full p-2 border-2 rounded-lg text-sm focus:outline-none"
        style={{
          borderColor: primaryColor,
          color: primaryColor,
          backgroundColor: "transparent",
        }}
      />
    </div>
  );
};

export default NumberInput;
