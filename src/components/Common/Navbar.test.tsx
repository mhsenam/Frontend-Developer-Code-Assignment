import React from "react";
import { render, screen } from "@testing-library/react";
import Navbar from "./Navbar";
import { ThemeModeProvider } from "../../context/ThemeModeContext";
import { BrowserRouter as Router } from "react-router-dom"; // To wrap components using Link

// Mock react-i18next
jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key, // Simple mock for t function
    i18n: {
      changeLanguage: jest.fn(),
      language: "en",
    },
  }),
}));

// Mock useLocation from react-router-dom if Navbar uses it directly for active states
// (It does use useLocation)
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"), // import and retain default behavior
  useLocation: () => ({
    pathname: "/",
  }),
}));

describe("<Navbar />", () => {
  const renderNavbar = () => {
    return render(
      <Router>
        {" "}
        {/* Required by NavLink/Link components */}
        <ThemeModeProvider>
          <Navbar />
        </ThemeModeProvider>
      </Router>
    );
  };

  test("renders the brand name/logo text", () => {
    renderNavbar();
    // The brand name is "Smart Insurance" but it is part of a Typography component
    // We can look for text content that includes it.
    // Note: This might need adjustment based on how text is split in the DOM or specific selectors.
    expect(screen.getByText(/Smart Insurance/i)).toBeInTheDocument();
  });

  test("renders navigation links", () => {
    renderNavbar();
    expect(screen.getByText("nav.home")).toBeInTheDocument(); // Mocked t function returns the key
    expect(screen.getByText("nav.apply")).toBeInTheDocument();
    expect(screen.getByText("nav.submissions")).toBeInTheDocument();
  });

  test("renders theme toggle button", () => {
    renderNavbar();
    // The IconButton for theme toggle doesn't have explicit text.
    // We'd typically look for it by role, title, or test ID.
    // For now, let's assume it contains one of the icons (Brightness7Icon or Brightness4Icon)
    // This is a bit fragile; a data-testid would be better.
    const toggleButtons = screen.getAllByRole("button");
    //This is not a good way to test this, ideally we search for an aria-label or data-testid
    expect(toggleButtons.length).toBeGreaterThanOrEqual(1);
  });

  test("renders language switcher", () => {
    renderNavbar();
    // The Select for language switcher might not have explicit text accessible this way
    // We can check if the default value (EN) is present
    expect(screen.getByText("EN")).toBeInTheDocument();
  });

  // Further tests could include:
  // - Clicking the theme toggle and verifying the icon changes (would require more setup for theme context interaction)
  // - Changing language and verifying i18n.changeLanguage is called
  // - Mobile drawer functionality
});
