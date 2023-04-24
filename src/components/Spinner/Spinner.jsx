import { ProgressBar } from "react-loader-spinner";
import { loading } from "../../redux/selectors";
import { useSelector } from "react-redux";
import { Wrapper, Title } from "./Spinner.styled";
import React from "react";

export const Spinner = () => {
  const isLoad = useSelector(loading);
  return (
    <>
      {isLoad && (
        <Wrapper>
          <Title>Loading...</Title>
          <ProgressBar
            height="180"
            width="180"
            ariaLabel="progress-bar-loading"
            borderColor="#5f5"
            barColor="#5f5"
            visible={true}
            wrapperStyle={{}}
          />
        </Wrapper>
      )}
    </>
  );
};
