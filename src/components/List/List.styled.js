import styled from "@emotion/styled";
import Button from "@mui/material/Button";

export const ListButton = styled.ul`
  padding-bottom: 40px;
  max-width: 350px;
  margin: 0 auto;
  li:not(:last-child) {
    margin-bottom: 10px;
  }
`;

export const ListButtomItem = styled.li`
  display: flex;
  button:first-of-type {
    margin-right: 15px;
  }
`;

export const EnButton = styled(Button)`
  color: ${({ prop: { el, wordClick, wordClick2, clickError } }) =>
    onBtnColor(
      "#00f",
      "white",
      el,
      wordClick,
      wordClick2,
      clickError,
      "white"
    )};
  background-color: ${({ prop: { el, wordClick, wordClick2, clickError } }) =>
    onBtnColor(
      "#5f5",
      "primary",
      el,
      wordClick,
      wordClick2,
      clickError,
      "red"
    )};
  :hover {
    background-color: ${({ prop: { el, wordClick, wordClick2, clickError } }) =>
      onBtnColor(
        "#5f5",
        "primary",
        el,
        wordClick,
        wordClick2,
        clickError,
        "red"
      )};
  }
  width: 100%;
  font-weight: 700;
`;

export const SelectWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

export const Select = styled.select`
  border-radius: 5px;
  background-color: #5f5;
  color: #00f;
  font-weight: 500;
  border: none;
  :focus {
    outline: none;
    border: none;
  }
`;

export const SelectTitle = styled.span`
  font-weight: 500;
  color: #00f;
  margin-right: 5px;
`;

function onBtnColor(
  active,
  notActive,
  el,
  wordClick,
  wordClick2,
  clickError,
  colorError
) {
  if ((el === wordClick || el === wordClick2) && !clickError) {
    return active;
  }

  if ((el !== wordClick || el !== wordClick2) && !clickError) return notActive;

  if (clickError) return colorError;
}
