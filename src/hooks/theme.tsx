import React, { createContext, useContext } from "react";
import { Theme } from "../share/types";

const defaultTheme: Theme = {
  primaryColor: "#007bff",
  secondaryColor: "#6c757d",
  fontFamily: "Arial, sans-serif",
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
