import React, { useEffect, useState } from "react";
// import { useAuth } from "./AuthProvider";
// import { FormInput, FormButton } from "./formStyle";
import { useNavigate } from "react-router";
import { FormWrapper } from "./formStyle";
import { useAuth } from "../../context/AuthContext";

const Form = () => {
  const [option, setOption] = useState(1);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [repeatPassword, setRepeatPassword] = useState(null);
  const navigate = useNavigate();

  const { register, login, user, token, error, setError } = useAuth();
  console.log({ user });
  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
  }, [token, navigate]);

  const handleForm = async () => {
    console.log({ email, password, repeatPassword });
    if (option === 1 && email && password) {
      if (await login(email, password)) {
        setError(null);
        navigate("/dashboard");
      }
    }
    if (option === 2 && password === repeatPassword && email && password) {
      register(email, password);
    }
  };

  return (
    <FormWrapper>
      <div className="container">
        <header>
          <div
            className={
              "header-headings " +
              (option === 1 ? "sign-in" : option === 2 ? "sign-up" : "forgot")
            }
          >
            <span>Sign in to your account</span>
            <span>Create an account</span>
            <span>Reset your password</span>
          </div>
        </header>
        <ul className="options">
          <li
            className={option === 1 ? "active" : ""}
            onClick={() => setOption(1)}
          >
            Sign in
          </li>
          <li
            className={option === 2 ? "active" : ""}
            onClick={() => setOption(2)}
          >
            Sign up
          </li>
          <li
            className={option === 3 ? "active" : ""}
            onClick={() => setOption(3)}
          ></li>
        </ul>
        <div className="account-form" onSubmit={(evt) => evt.preventDefault()}>
          <div
            className={
              "account-form-fields " +
              (option === 1 ? "sign-in" : option === 2 ? "sign-up" : "forgot")
            }
          >
            <input
              id="email"
              name="email"
              type="email"
              placeholder="E-mail"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              required={option === 1 || option === 2 ? true : false}
              disabled={option === 3 ? true : false}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              id="repeat-password"
              name="repeat-password"
              type="password"
              placeholder="Repeat password"
              required={option === 2 ? true : false}
              disabled={option === 1 || option === 3 ? true : false}
              onChange={(e) => setRepeatPassword(e.target.value)}
            />
          </div>
          {error && <div style={{ color: "red" }}>{error.msg}</div>}
          <button
            className="btn-submit-form"
            type="submit"
            onClick={() => handleForm()}
          >
            {option === 1
              ? "Sign in"
              : option === 2
              ? "Sign up"
              : "Reset password"}
          </button>
        </div>
        <footer>
          <span className="text-underline">
            ©2023 Trader Sync. All right reserved
          </span>
        </footer>
      </div>
    </FormWrapper>
  );
};

export default Form;
