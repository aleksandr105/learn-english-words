import React from "react";
import { LoginForm } from "../../components/LoginForm/LoginForm";
import { GoogleAutorizeLink } from "../../components/GoogleAutorizeLink/GoogleAutorizeLink";
import { useSelector } from "react-redux";
import { isLoading } from "../../redux/auth/selectors";

const Login = () => {
  const isLoadingAuth = useSelector(isLoading);
  return (
    <>
      <LoginForm />
      {!isLoadingAuth && <GoogleAutorizeLink />}
    </>
  );
};

export default Login;
