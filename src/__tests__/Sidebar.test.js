import React from "react";
import { render, screen } from "@testing-library/react";

import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";
import { userEvent } from "@testing-library/user-event";

// import { router as MyRouter } from "../index";
import routesConfig from "../routesConfig";

test("not renders sidebar if logout is clicked", async () => {
  window.localStorage.setItem("token", "dawdawdawdawd");

  const router = createMemoryRouter(routesConfig, {
    initialEntries: ["/dashboard"],
  });

  render(
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );

  //   const { result } = renderHook(() => useAuth(), {
  //     wrapper: AuthProvider,
  //   });

  const logoutBtn = screen.getByTestId("logout-btn");
  const user = userEvent.setup();
  await user.click(logoutBtn);
  const sighInButton = screen.getByRole("button");
  expect(sighInButton).toHaveTextContent("Sign in");
});
