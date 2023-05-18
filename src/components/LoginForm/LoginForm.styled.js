import styled from "@emotion/styled";
import Button from "@mui/material/Button";

export const ButtonSubmit = styled(Button)`
  width: 50%;
  display: block;
  margin: 35px auto auto auto;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 15px;
  font-weight: 700;
  color: ${(props) => (props.p ? "#00f" : "white")};
  background-color: ${(props) => (!props.p ? "red" : "#5f5")};
  border-radius: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: scale 150ms linear;
  :hover {
    background-color: #5f5;
    scale: 1.03;
  }
  :disabled {
    opacity: 0.6;
    cursor: not-allowed;
    color: white;
  }
`;

export const Form = styled.form`
  padding-top: 200px;
  max-width: 400px;
  margin: 0 auto;
  input:not(:last-child) {
    margin-bottom: 20px;
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: ${({ changeError }) =>
    changeError ? "1px solid red" : "1px solid #ccc"};
  border-radius: 4px;
  font-size: 14px;
  :focus {
    outline: none;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
  }
`;

export const InputWrapper = styled.div`
  position: relative;
`;

export const InputLabel = styled.label`
  display: block;
  margin-bottom: 3px;
  font-size: 15px;
`;

export const ErrorMessage = styled.p`
  position: absolute;
  color: red;
  text-align: center;
  left: 0px;
  bottom: 0px;
`;