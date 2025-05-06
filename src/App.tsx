import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material";
import { Layout } from "./components/Common";
import { FormProvider } from "./context/FormContext";
import {
  HomePage,
  ApplicationPage,
  SubmissionsPage,
  NotFoundPage,
} from "./pages";
import "./App.css";

// Create a theme instance with modern cool colors
const theme = createTheme({
  palette: {
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
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <FormProvider>
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
      </FormProvider>
    </ThemeProvider>
  );
}

export default App;
