import React from "react";
import { RegisterForm } from "../../components/RegisterForm/RegisterForm";
import { GoogleAutorizeLink } from "../../components/GoogleAutorizeLink/GoogleAutorizeLink";
import { successRegister } from "../../redux/auth/selectors";
import { useSelector, isLoading } from "react-redux";

const Signup = () => {
  const isRegister = useSelector(successRegister);
  const isLoadingAuth = useSelector(isLoading);

  return (
    <>
      <RegisterForm />
      {!isRegister && !isLoadingAuth && <GoogleAutorizeLink />}
    </>
  );
};

export default Signup;
