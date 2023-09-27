import { render, screen, fireEvent } from "@testing-library/react";
import Dashboard from "../routes/Dashboard";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";
import React from "react";

const DashboardSetup = () => {
  const utils = render(
    <AuthProvider>
      <Router>
        <Dashboard />
      </Router>
    </AuthProvider>
  );
  const dashboard = screen.getByTestId("title");
  //   const password = screen.getByLabelText("password");
  //   const signInLabel = screen.getByTestId("sign-in-label");
  //   const sighInButton = screen.getByTestId("sign-in-btn");
  return { ...utils, dashboard };
};

test("renders h1 with text Dashboard", () => {
  const { dashboard } = DashboardSetup();

  expect(dashboard).toHaveTextContent("Dashboard");
});
