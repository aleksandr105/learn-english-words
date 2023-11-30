import styled from "@emotion/styled";

export const DeleteWordBtn = styled.button`
  position: absolute;
  padding: 3px;
  z-index: 100;
  display: ${({ p: { el, wordClick } }) =>
    el === wordClick ? "none" : "flex"};
  background-color: transparent;
  border: none;
  right: 2px;
  top: calc(50% - 11px);
  cursor: pointer;
  transition: scale 300ms cubic-bezier(0.4, 0, 0.2, 1);
  :hover,
  :focus {
    scale: 1.4;
  }
`;

export const DeletedWord = styled.span`
  color: red;
  font-weight: bold;
  display: block;
`;

export const OptionDeleteTitle = styled.p`
  text-align: center;
  font-weight: 500;
`;

export const ButtonsWrapper = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: space-around;
`;

export const BtnYes = styled.button`
  background-color: #ff0000;
  border: none;
  padding: 2px 3px;
  font-weight: 500;
  border-radius: 5px;
  color: #fff;
  width: 36px;
  cursor: pointer;
`;

export const BtnNo = styled.button`
  background-color: #5f5;
  font-weight: 500;
  border: none;
  padding: 2px 3px;
  border-radius: 5px;
  width: 36px;
  cursor: pointer;
`;

export const SpinnerWrapper = styled.div`
  position: absolute;
  z-index: 10;
  right: 2px;
  top: calc(43% - 11px);
`;
