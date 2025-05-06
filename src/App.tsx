import React, { useMemo } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { Layout } from "./components/Common";
import { FormProvider as AppFormProvider } from "./context/FormContext";
import { ThemeModeProvider, useThemeMode } from "./context/ThemeModeContext";
import {
  HomePage,
  ApplicationPage,
  SubmissionsPage,
  NotFoundPage,
} from "./pages";
import "./App.css";
import "./i18n"; // Initialize i18next

// Moved theme creation into a component that can access the context
const AppThemeController: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { mode } = useThemeMode();

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: mode, // Set mode dynamically
          ...(mode === "light"
            ? {
                // Light Mode Palette
                primary: {
                  main: "#3b82f6", // Blue
                  light: "#8ac0ff",
                  dark: "#1d4ed8",
                },
                secondary: {
                  main: "#0ea5e9", // Sky blue
                  light: "#7dd3fc",
                  dark: "#0369a1",
                },
                error: {
                  main: "#ef4444", // Modern red
                },
                warning: {
                  main: "#f59e0b", // Amber
                },
                info: {
                  main: "#3b82f6", // Blue
                },
                success: {
                  main: "#10b981", // Emerald
                },
                background: {
                  default: "#f8fafc", // Light background
                  paper: "#ffffff",
                },
                text: {
                  primary: "#0f172a", // Dark text for contrast
                  secondary: "#475569",
                },
              }
            : {
                // Dark Mode Palette
                primary: {
                  main: "#60a5fa", // Lighter Blue for dark mode
                  light: "#93c5fd",
                  dark: "#2563eb",
                },
                secondary: {
                  main: "#38bdf8", // Lighter Sky blue
                  light: "#7dd3fc",
                  dark: "#0ea5e9",
                },
                error: {
                  main: "#f87171", // Lighter red
                },
                warning: {
                  main: "#fbbf24", // Lighter amber
                },
                info: {
                  main: "#60a5fa", // Lighter Blue
                },
                success: {
                  main: "#34d399", // Lighter Emerald
                },
                background: {
                  default: "#0f172a", // Dark background (e.g., slate-900)
                  paper: "#1e293b", // Slightly lighter dark for paper (e.g., slate-800)
                },
                text: {
                  primary: "#f1f5f9", // Light text for dark mode (e.g., slate-100)
                  secondary: "#cbd5e1", // (e.g., slate-300)
                },
              }),
        },
        typography: {
          fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
          h1: {
            fontWeight: 600,
          },
          h2: {
            fontWeight: 600,
          },
          h3: {
            fontWeight: 600,
          },
          h4: {
            fontWeight: 500,
          },
          button: {
            textTransform: "none", // More modern look without all caps
          },
        },
        shape: {
          borderRadius: 8, // Slightly rounded corners
        },
        components: {
          MuiButton: {
            styleOverrides: {
              root: {
                borderRadius: "0.5rem",
                padding: "0.5rem 1.25rem",
                boxShadow: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
              },
              contained: {
                "&:hover": {
                  boxShadow:
                    "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
                },
              },
            },
          },
          MuiPaper: {
            styleOverrides: {
              root: {
                boxShadow:
                  "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
              },
            },
          },
        },
      }),
    [mode]
  );

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

function App() {
  return (
    <ThemeModeProvider>
      <AppThemeController>
        <CssBaseline />{" "}
        {/* Ensures background color is applied based on theme mode */}
        <AppFormProvider>
          {" "}
          {/* Use renamed FormProvider */}
          <Router>
            <Layout>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/apply" element={<ApplicationPage />} />
                <Route path="/submissions" element={<SubmissionsPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Layout>
          </Router>
        </AppFormProvider>
      </AppThemeController>
    </ThemeModeProvider>
  );
}

export default App;
