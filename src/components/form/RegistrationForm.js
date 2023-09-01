// components/RegisterForm.js
import React, { useState } from "react";
import { useAuth } from "./AuthProvider";
import { FormInput, FormButton } from "./formStyle";
const RegistrationForm = () => {
  const { register } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    register({ email, password });
  };

  return (
    <form onSubmit={handleRegister}>
      <FormInput
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <FormInput
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <FormButton type="submit">Register</FormButton>
    </form>
  );
};

export default RegistrationForm;
