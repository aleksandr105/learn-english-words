import { forwardRef, useState } from "react";
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
import { FormSendMessage } from "../FormSendMessage/FormSendMessage";
import { useSelector } from "react-redux";
import { isLoggedIn } from "../../redux/auth/selectors";
import { onNatification } from "../../helpers";

export const Footer = forwardRef((props, ref) => {
  const [isShowModal, setIsShowModal] = useState(false);

  const loggedIn = useSelector(isLoggedIn);

  const { t } = useTranslation();

  const showModal = (e) => {
    if (!loggedIn) {
      onNatification(t("footer.notLoggedin"), { autoClose: 5000 });
      return;
    }

    if (e.code === "Escape") setIsShowModal(false);

    if (e.target === e.currentTarget) setIsShowModal((prev) => !prev);
  };

  return (
    <FooterEl ref={ref}>
      {isShowModal && (
        <Modal showModal={showModal}>
          <FormSendMessage showModal={setIsShowModal} />
        </Modal>
      )}
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
              <SendMessageButton onClick={showModal}>
                {t("footer.button")}
              </SendMessageButton>
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
