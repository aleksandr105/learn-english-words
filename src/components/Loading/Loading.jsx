import { ProgressBar } from "react-loader-spinner";
import { Wrapper, Title } from "./Loading.styled";
import React from "react";

export const Loading = ({ isLoad, styles }) => {
  return (
    <>
      {isLoad && (
        <Wrapper style={styles}>
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
