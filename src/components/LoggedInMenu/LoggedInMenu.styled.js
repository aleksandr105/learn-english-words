import styled from "@emotion/styled";

export const Wrapper = styled.div`
  padding-right: 10px;
`;

export const Hello = styled.p`
  margin-bottom: 3px;
  @media screen and (min-width: 312px) and (max-width: 327px) {
    font-size: 15px;
  }
  @media screen and (max-width: 303px) {
    font-size: 13px;
  }
`;

export const Name = styled.p`
  @media screen and (min-width: 328px) and (max-width: 335px) {
    font-size: 15px;
  }
  @media screen and (min-width: 312px) and (max-width: 327px) {
    font-size: 13px;
  }
  @media screen and (min-width: 304px) and (max-width: 311px) {
    font-size: 12px;
  }
  @media screen and (max-width: 303px) {
    font-size: 10px;
  }
`;
