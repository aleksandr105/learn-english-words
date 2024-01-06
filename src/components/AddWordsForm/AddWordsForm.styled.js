import styled from "@emotion/styled";

export const Wrapper = styled.div`
  width: 100%;
  @media screen and (min-width: 400px) {
    max-width: 420px;
  }
`;

export const InputTitle = styled.p`
  margin-bottom: 15px;
  font-weight: 500;
  color: #00f;
`;

export const NextStepBtn = styled.button`
  display: flex;
  margin-top: 3px;
  justify-content: center;
  align-items: center;
  border: none;
  padding: 3px;
  background-color: transparent;
  margin-left: auto;
  transition: scale 300ms cubic-bezier(0.4, 0, 0.2, 1);
  :hover {
    scale: 1.05;
  }
`;

export const Input = styled.input`
  width: 100%;
  height: 30px;
  border-radius: 10px;
  border-color: rgb(255, 184, 85);
  padding-left: 5px;
  padding-right: 5px;
  outline: none;
`;

export const InputWrapper = styled.div``;

export const ToBackStepBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  padding: 3px;
  background-color: transparent;
  margin-right: auto;
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
  margin-top: 10px;
  padding: 0px 5px 0px 5px;
`;

export const SaveWordBtn = styled.button`
  padding: 0px 8px 0px 8px;
  color: #00f;
  background-color: #5f5;
  border: none;
  border-radius: 15px;
  font-weight: 500;
  transition: scale 300ms cubic-bezier(0.4, 0, 0.2, 1);
  :hover {
    scale: 1.02;
  }
`;
