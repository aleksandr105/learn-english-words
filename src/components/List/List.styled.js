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
