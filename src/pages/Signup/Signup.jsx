import React from "react";
import { RegisterForm } from "../../components/RegisterForm/RegisterForm";
import { GoogleAutorizeLink } from "../../components/GoogleAutorizeLink/GoogleAutorizeLink";
import { successRegister } from "../../redux/auth/selectors";
import { useSelector } from "react-redux";

const Signup = () => {
  const isRegister = useSelector(successRegister);

  return (
    <>
      <RegisterForm />
      {!isRegister && <GoogleAutorizeLink />}
    </>
  );
};

export default Signup;
