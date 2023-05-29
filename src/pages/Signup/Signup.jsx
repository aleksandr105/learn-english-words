import React from "react";
import { RegisterForm } from "../../components/RegisterForm/RegisterForm";
import { GoogleAutorizeLink } from "../../components/GoogleAutorizeLink/GoogleAutorizeLink";

const Signup = () => {
  return (
    <>
      <RegisterForm />
      <GoogleAutorizeLink />
    </>
  );
};

export default Signup;
