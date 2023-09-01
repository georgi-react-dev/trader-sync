import styled from "styled-components";

export const FormWrapper = styled.div`
  display: flex;
  background: #111721;
  justify-content: center;
  align-items: center;
  width: 100%;
  .container {
    text-align: center;
    color: #fff;
    margin-top: -5rem;
  }
  .container > header {
    font-size: 1.3rem;
    font-weight: 700;
    margin: 0 auto 60px auto;
    position: relative;
    height: 25px;
    width: 250px;
    overflow: hidden;
  }

  .header-headings {
    display: flex;
    flex-direction: column;
    position: absolute;
    width: 100%;
    transition: all 0.4s cubic-bezier(0.785, 0.135, 0.15, 0.86);
  }
  .header-headings > span {
    margin: 3px 0;
  }
  .header-headings.sign-in {
    transform: translateY(-8px);
  }
  .header-headings.sign-up {
    transform: translateY(-40px);
  }
  .header-headings.forgot {
    transform: translateY(-84px);
  }

  .options {
    display: flex;
    align-items: center;
    width: 350px;
    list-style: none;
  }
  @media screen and (max-width: 380px) {
    .options {
      width: 100%;
    }
  }
  .options > li {
    cursor: pointer;
    opacity: 0.5;
    transition: all 0.2s ease;
  }
  .options > li:hover {
    opacity: 1;
  }
  .options > li.active {
    opacity: 1;
  }
  .options > li:nth-of-type(2) {
    margin-left: 15px;
  }
  .options > li:last-of-type {
    margin-left: auto;
  }

  .account-form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;
  }

  .account-form-fields {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    transition: all 0.4s cubic-bezier(0.785, 0.135, 0.15, 0.86);
  }
  .account-form-fields.sign-in {
    max-height: 123px;
  }
  .account-form-fields.sign-up {
    max-height: 250px;
  }
  .account-form-fields.forgot {
    max-height: 61px;
  }
  .account-form-fields > input {
    border: 0;
    margin-bottom: 10px;
    padding: 15px;
    font-size: 1rem;
    font-family: Nunito, sans-serif;
    color: #000;
    border-radius: 5px;
  }
  .account-form-fields > input::placeholder {
    color: #aaa;
  }
  .account-form-fields > input::-webkit-input-placeholder {
    color: #aaa;
  }
  .account-form-fields > input:-ms-input-placeholder {
    color: #aaa;
  }
  .account-form-fields > input:focus {
    outline: none;
  }

  .btn-submit-form {
    border: 0;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    cursor: pointer;
    padding: 15px 0;
    border-radius: 5px;
    color: #fff;
    font-size: 1rem;
    font-family: Nunito, sans-serif;
    background: #6381e8;
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.13);
    transition: all 0.2s ease;
    margin-top: 0.2rem;
  }
  .btn-submit-form:hover {
    background: #4468e4;
  }
  .btn-submit-form:active,
  .btn-submit-form:focus {
    outline: none;
    background: #2e56e0;
  }

  footer {
    position: fixed;
    width: 100%;
    bottom: 0;
    left: 0;
    padding: 30px 0;
    text-align: center;
  }
  footer > a {
    color: #fff;
    font-weight: 700;
  }
`;

// export const FormContainer = styled.div`
//   max-width: 400px;
//   margin: 0 auto;
//   padding: 20px;
//   border: 1px solid #ccc;
//   border-radius: 8px;
//   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
// `;

export const FormInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const FormButton = styled.button`
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;
