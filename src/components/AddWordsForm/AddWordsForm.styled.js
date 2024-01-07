import styled from "@emotion/styled";

export const Wrapper = styled.div`
  width: 100%;
  position: relative;
  @media screen and (min-width: 400px) {
    max-width: 420px;
  }
`;

export const InputTitle = styled.p`
  margin-bottom: 8px;
  font-weight: 500;
  color: #00f;
`;

export const NextStepBtn = styled.button`
  padding: 8px;
  width: 90px;
  color: ${({ orDisabled }) => (orDisabled ? "red" : "#00f")};
  background-color: ${({ orDisabled }) => (orDisabled ? "#E8E8E8" : "#5f5")};
  border: none;
  border-radius: 15px;
  font-weight: 500;
  transition: scale 300ms cubic-bezier(0.4, 0, 0.2, 1);
  :hover {
    scale: 1.05;
  }
`;

export const Input = styled.input`
  width: 100%;
  height: 35px;
  border-radius: 10px;
  border-color: rgb(255, 184, 85);
  padding-left: 5px;
  padding-right: 5px;
  outline: none;
`;

export const InputWrapper = styled.div``;

export const ToBackStepBtn = styled.button`
  padding: 8px;
  width: 90px;
  color: #00f;
  background-color: #5f5;
  border: none;
  border-radius: 15px;
  font-weight: 500;
  margin-right: 20px;
  transition: scale 300ms cubic-bezier(0.4, 0, 0.2, 1);
  :hover {
    scale: 1.05;
  }
`;

export const EnglishWordWrapper = styled.span`
  color: rgb(255, 184, 85);
  font-weight: 500;
  text-transform: uppercase;
`;

export const BtnsWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

export const SaveWordBtn = styled.button`
  padding: 8px;
  width: 90px;
  color: ${({ orDisabled }) => (orDisabled ? "red" : "#00f")};
  background-color: ${({ orDisabled }) => (orDisabled ? "#E8E8E8" : "#5f5")};
  border: none;
  border-radius: 15px;
  font-weight: 500;
  transition: scale 300ms cubic-bezier(0.4, 0, 0.2, 1);
  :hover {
    scale: 1.02;
  }
`;

export const ErrorValidationMessage = styled.p`
  color: red;
  position: absolute;
  left: 5px;
  bottom: 31%;
  font-size: 15px;
`;
