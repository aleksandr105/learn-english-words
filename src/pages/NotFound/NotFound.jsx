import React from "react";
import notFoundGif from "../../GIFS/giphy.gif";
import { Wrapper, Img, Title, Text, WrapperText } from "./NotFound.styled";
import { useTranslation } from "react-i18next";
import { MainTitle } from "../../components/MainTitle/MainTitle";

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <>
      <MainTitle />
      <Wrapper>
        <Img src={notFoundGif} alt="Not Found Gif" />
        <WrapperText>
          <Title>Error 404</Title>
          <Text>{t("notFound.text")}</Text>
        </WrapperText>
      </Wrapper>
    </>
  );
};

export default NotFound;
