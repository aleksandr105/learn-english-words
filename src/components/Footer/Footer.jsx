import { forwardRef } from "react";
import {
  FooterEl,
  Logo,
  Wrapper,
  Copyright,
  TextSendMessage,
  TextDonate,
  FlexContainer,
  LogoLink,
  SendMessageButton,
  TextSendMessageWrapper,
  TextDonateWrapper,
  PaymentDetails,
} from "./Footer.styled";
import { Container } from "@mui/material";
import logo from "../../SVG/symbol-defs.svg";
import { useTranslation } from "react-i18next";
import { Modal } from "../Modal/Modal";

export const Footer = forwardRef((props, ref) => {
  const { t } = useTranslation();

  const showModal = () => {};

  return (
    <FooterEl ref={ref}>
      {false && <Modal showModal={showModal}>ddfdfdf</Modal>}
      <Container>
        <FlexContainer>
          <LogoLink to="/">
            <Logo>
              <use href={`${logo}#icon-logo`}></use>
            </Logo>
          </LogoLink>
          <Wrapper>
            <TextSendMessageWrapper>
              <TextSendMessage>{t("footer.textSendMessage")}</TextSendMessage>
              <SendMessageButton>{t("footer.button")}</SendMessageButton>
            </TextSendMessageWrapper>
            <TextDonateWrapper>
              <TextDonate>{t("footer.donate")}:</TextDonate>
              <PaymentDetails>PL 41156000132011374180000001</PaymentDetails>
            </TextDonateWrapper>
          </Wrapper>
        </FlexContainer>
        <Copyright>
          &copy; 2023 | {t("footer.copyrightText")} | {t("footer.developer")}:
          Oleksandr Shcherbyna
        </Copyright>
      </Container>
    </FooterEl>
  );
});
