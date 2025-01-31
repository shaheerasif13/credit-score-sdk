import React from 'react';
import './slider.css';  // Import the custom CSS file

interface SliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
  unit?: string; // Optional unit (like % or years)
}

const Slider: React.FC<SliderProps> = ({
  label,
  value,
  min,
  max,
  onChange,
  unit,
}) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1.5">
        {label}
      </label>
      <div className="flex items-center justify-between gap-1">
        <div className="flex items-center space-x-0.5">
          <p className="text-sm text-gray-700">{value}</p>
          {unit && <span className="text-sm text-gray-700">{unit}</span>}
        </div>
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="custom-slider"  // Using the custom CSS class
        />
      </div>
    </div>
  );
};

export default Slider;
