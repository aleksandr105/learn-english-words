import React from "react";
import { RegisterForm } from "../../components/RegisterForm/RegisterForm";
import { isLoading } from "../../redux/auth/selectors";
import { useSelector } from "react-redux";
import { RotatingLines } from "react-loader-spinner";
import { LoaderWrapper } from "./Signup.styled";

const Signup = () => {
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
      {!isLoadingAuth && <RegisterForm />}
    </>
  );
};

export default Signup;
