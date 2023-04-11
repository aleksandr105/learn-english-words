import styled from "@emotion/styled";
import Button from "@mui/material/Button";

export const FlexContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: 40px;
  ul:not(:last-child) {
    margin-right: 20px;
  }
`;

export const ListButton = styled.ul`
  li:not(:last-child) {
    margin-bottom: 8px;
  }
`;

export const ListButtomItem = styled.li``;

export const EnButton = styled(Button)`
  color: ${({ prop: { el, wordClick } }) =>
    el === wordClick ? "#00f" : "white"};
  background-color: ${({ prop: { el, wordClick } }) =>
    el === wordClick ? "#5f5" : "primary"};
  :hover {
    background-color: ${({ prop: { el, wordClick } }) =>
      el === wordClick ? "#5f5" : "primary"};
  }
  width: 100%;
  font-weight: 700;
`;

export const SelectWrapper = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  margin-bottom: 10px;
`;

export const Select = styled.select`
  border-radius: 5px;
  background-color: #5f5;
  color: #00f;
  font-weight: 500;
  border: none;
`;

export const SelectTitle = styled.span`
  font-weight: 500;
  color: #00f;
  margin-right: 5px;
  margin-left: auto;
`;
