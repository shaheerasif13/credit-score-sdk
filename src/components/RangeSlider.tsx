import { useEffect } from "react";
import { useTheme } from "../hooks/theme";

interface RangeSliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
  unit?: string;
}

const RangeSlider: React.FC<RangeSliderProps> = ({
  label,
  value,
  min,
  max,
  onChange,
  unit,
}) => {
  const theme = useTheme();

  // Dynamically update CSS variables based on the theme
  useEffect(() => {
    const slider = document.documentElement; // Apply to the root element
    slider.style.setProperty("--slider-track-color", theme.primaryColor);
    slider.style.setProperty("--slider-thumb-color", theme.secondaryColor);
    slider.style.setProperty("--slider-thumb-border-color", theme.primaryColor);
    slider.style.setProperty("--slider-focus-track-color", theme.primaryColor);
  }, [theme]);

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
          className="custom-slider"
        />
      </div>
    </div>
  );
};

export default RangeSlider;
