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
        className="w-full p-2 border-2 border-gray-300 rounded-lg text-gray-700 text-sm focus:border-gray-500 focus:outline-none"
      />
    </div>
  );
};

export default NumberInput;
