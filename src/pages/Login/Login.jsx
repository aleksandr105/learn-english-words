import React from "react";
import { LoginForm } from "../../components/LoginForm/LoginForm";
import { GoogleAutorizeLink } from "../../components/GoogleAutorizeLink/GoogleAutorizeLink";

const Login = () => {
  return (
    <>
      <LoginForm />
      <GoogleAutorizeLink />
    </>
  );
};

export default Login;
