import React from "react";
import { LoginForm } from "../../components/LoginForm/LoginForm";
import { GoogleAutorizeLink } from "../../components/GoogleAutorizeLink/GoogleAutorizeLink";
import { useSelector } from "react-redux";
import { isLoading } from "../../redux/auth/selectors";
import { RotatingLines } from "react-loader-spinner";
import { LoaderWrapper } from "./Login.styled";

const Login = () => {
  const isLoadingAuth = useSelector(isLoading);

  return (
    <>
      <LoaderWrapper>
        <RotatingLines
          strokeColor="#5f5"
          strokeWidth="5"
          animationDuration="0.75"
          width="96"
          visible={isLoadingAuth}
          style={{ margin: "0 auto", display: "block" }}
        />
      </LoaderWrapper>
      {!isLoadingAuth && (
        <>
          <LoginForm />
          <GoogleAutorizeLink />
        </>
      )}
    </>
  );
};

export default Login;
