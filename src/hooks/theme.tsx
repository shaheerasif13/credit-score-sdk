import { createContext, useContext } from "react";
import { Theme } from "../share/types";
import { CircleStack } from "../components/icons";

const defaultTheme: Theme = {
  primaryColor: "#6b7280",
  secondaryColor: "#a1a1aa",
  fontFamily: "Arial, sans-serif",
  scoreRanges: {
    Poor: { min: 300, max: 579, color: "#dc2626" }, // Red
    Fair: { min: 580, max: 669, color: "#f59e0b" }, // Orange
    Good: { min: 670, max: 739, color: "#10b981" }, // Green
    VeryGood: { min: 740, max: 799, color: "#2563eb" }, // Blue
    Excellent: { min: 800, max: 850, color: "#7c3aed" }, // Purple
  },
  locale: "en-US",
  icon: <CircleStack className="w-7 h-7" style={{ color: "#6b7280" }} />,
};

const ThemeContext = createContext<Theme>(defaultTheme);

export const ThemeProvider: React.FC<{
  theme?: Partial<Theme>;
  children: React.ReactNode;
}> = ({ theme, children }) => {
  const mergedTheme = { ...defaultTheme, ...theme };
  return (
    <ThemeContext.Provider value={mergedTheme}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
