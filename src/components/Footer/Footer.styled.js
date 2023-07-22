import styled from "@emotion/styled";
import { Link } from "react-router-dom";

export const FooterEl = styled.footer`
  background-color: #2f303a;
  @media screen and (max-width: 799px) {
    padding: 15px 0px;
  }

  @media screen and (min-width: 800px) {
    padding: 30px 0px;
  }
`;

export const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  @media screen and (min-width: 800px) {
    display: flex;
    flex-direction: row;
    align-items: start;
  }
`;

export const LogoLink = styled(Link)`
  @media screen and (max-width: 799px) {
    margin-bottom: 8px;
  }

  @media screen and (min-width: 800px) {
    flex: 0;
    margin-right: 20px;
  }
`;

export const Logo = styled.svg`
  width: 36px;
  height: 36px;
  border-radius: 50px;
  background-color: #5f5;
  fill: #00f;
`;

export const Wrapper = styled.div`
  @media screen and (min-width: 800px) {
    display: flex;
    margin-bottom: 15px;
    gap: 100px;
    flex: 1;
  }
`;

export const TextSendMessageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid silver;
  padding: 8px;
  border-radius: 10px;
  max-width: 550px;
  @media screen and (max-width: 799px) {
    margin-bottom: 8px;
  }
  @media screen and (min-width: 800px) {
    flex-basis: 50%;
  }
`;

export const TextSendMessage = styled.p`
  color: #ffffff;
  margin-bottom: 10px;
  text-align: center;
`;

export const SendMessageButton = styled.button`
  padding: 5px;
  border-radius: 10px;
  border: none;
  color: #00f;
  background-color: #5f5;
  font-weight: 700;
  cursor: pointer;
  transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1),
    scale 300ms cubic-bezier(0.4, 0, 0.2, 1);
  :hover {
    background-color: #9cf654;
    scale: 1.03;
  }
`;

export const TextDonateWrapper = styled.div`
  border: 1px solid silver;
  padding: 8px;
  border-radius: 10px;
  max-width: 550px;
  @media screen and (max-width: 799px) {
    margin-bottom: 8px;
  }
  @media screen and (min-width: 800px) {
    flex-basis: 50%;
  }
`;

export const TextDonate = styled.p`
  color: #ffffff;
  text-align: center;
  margin-bottom: 5px;
`;

export const PaymentDetails = styled.p`
  color: #ffffff;
  text-align: center;
  @media screen and (max-width: 799px) {
    font-size: 13px;
  }
`;

export const Copyright = styled.p`
  color: #ffffff;
  text-align: center;
  font-size: 13px;
  line-height: 17px;
`;
