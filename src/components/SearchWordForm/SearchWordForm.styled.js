import styled from "@emotion/styled";

export const Form = styled.form`
  position: relative;
  width: 95%;
  @media screen and (min-width: 630px) {
    width: 460px;
  }
`;

export const Input = styled.input`
  width: 100%;
  height: 35px;
  border-radius: 10px;
  padding: 10px 33px 10px 10px;
`;

export const DellSearchTextBtn = styled.button`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  /* border-radius: 10px; */
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  right: 0px;
  top: 0;
  height: 35px;
  padding: 3px;
  background-color: #d5d5d5;
  transition: scale 200ms linear, background-color 200ms linear;
  &:hover,
  :focus {
    scale: 1.06;
    background-color: #e7e5e1;
  }
`;
