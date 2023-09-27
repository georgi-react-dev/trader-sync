import { render, screen, fireEvent } from "@testing-library/react";

import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";
import Form from "../components/form/Form";
import React from "react";

const FormSetup = () => {
  const utils = render(
    <AuthProvider>
      <Router>
        <Form />
      </Router>
    </AuthProvider>
  );
  const email = screen.getByLabelText("email");
  const password = screen.getByLabelText("password");
  const signInLabel = screen.getByTestId("sign-in-label");
  const sighInButton = screen.getByTestId("sign-in-btn");
  return { ...utils, email, password, signInLabel, sighInButton };
};

test("renders sign in Form initialy when component render", () => {
  const { sighInButton } = FormSetup();

  expect(sighInButton).toHaveTextContent("Sign in");
});

test("on registration renders sign in form when click sign in button", () => {
  const { signInLabel } = FormSetup();
  const signUpLabel = screen.getByTestId("sign-up-label");
  fireEvent.click(signUpLabel);

  fireEvent.click(signInLabel);
  const button = screen.getByTestId("sign-in-btn");
  expect(button).toHaveTextContent("Sign in");
});

test("renders sign up form when click sign up label", () => {
  FormSetup();

  const label = screen.getByTestId("sign-up-label");
  fireEvent.click(label);
  const button = screen.getByTestId("sign-up-btn");
  expect(button).toHaveTextContent("Sign up");
});

test("show error message if fields are empty", () => {
  FormSetup();

  // const label = screen.getByTestId("sign-up-label");
  // fireEvent.click(label);
  const button = screen.getByTestId("sign-in-btn");
  fireEvent.click(button);
  const error = screen.getByTestId("fields-error");
  expect(error).toBeInTheDocument();
});

// test("show error message if email is empty", () => {
//   const { email, password } = FormSetup();

//   // const label = screen.getByTestId("sign-up-label");
//   // fireEvent.click(label);
//   const button = screen.getByTestId("sign-in-btn");
//   fireEvent.click(button);
//   const error = screen.getByTestId("fields-error");
//   expect(error).toBeInTheDocument();
// });
