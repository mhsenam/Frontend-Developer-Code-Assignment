import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  ReactNode,
  useEffect,
} from "react";

export type ThemeMode = "light" | "dark";

interface ThemeModeContextType {
  mode: ThemeMode;
  toggleThemeMode: () => void;
}

const ThemeModeContext = createContext<ThemeModeContextType | undefined>(
  undefined
);

interface ThemeModeProviderProps {
  children: ReactNode;
}

export const ThemeModeProvider: React.FC<ThemeModeProviderProps> = ({
  children,
}) => {
  const [mode, setMode] = useState<ThemeMode>(() => {
    // Get stored theme from localStorage or default to 'light'
    const storedPreference = localStorage.getItem("themeMode") as ThemeMode;
    if (storedPreference) {
      return storedPreference;
    }
    // Check for system preference
    const prefersDarkMode =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    return prefersDarkMode ? "dark" : "light";
  });

  useEffect(() => {
    localStorage.setItem("themeMode", mode);
    // Optional: Add/remove a class on the body if needed for global styles
    // document.body.classList.remove('light-theme', 'dark-theme');
    // document.body.classList.add(mode === 'dark' ? 'dark-theme' : 'light-theme');
  }, [mode]);

  const toggleThemeMode = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  const value = useMemo(() => ({ mode, toggleThemeMode }), [mode]);

  return (
    <ThemeModeContext.Provider value={value}>
      {children}
    </ThemeModeContext.Provider>
  );
};

export const useThemeMode = () => {
  const context = useContext(ThemeModeContext);
  if (context === undefined) {
    throw new Error("useThemeMode must be used within a ThemeModeProvider");
  }
  return context;
};
