import styled from "@emotion/styled";
import Button from "@mui/material/Button";

export const ButtonSubmit = styled(Button)`
  min-width: 180px;
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
  div:nth-of-type(-n + 2) {
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
`;

export const LoaderWrapper = styled.div`
  position: absolute;
  left: calc(50% - 50px);
  top: 40%;
`;

export const ErrorMessageWrapper = styled.div`
  margin-top: 180px;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const ErrorMessageAfterRequest = styled.p`
  color: red;
  text-align: center;
  margin-top: 25px;
  margin-bottom: 30px;
  font-weight: 500;
  font-size: 18px;
`;

export const ErrorMessageButton = styled.button`
  width: 160px;
  padding: 8px;
  border-radius: 20px;
  border: none;
  color: #00f;
  background-color: #5f5;
  font-weight: 500;
  cursor: pointer;
`;

export const ErrorMessageTitle = styled.h2`
  color: red;
  text-align: center;
`;

export const SuccessMessageWrapper = styled.div`
  margin-top: 150px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 800px;
  border: 3px solid #00f;
  padding: 10px;
  border-radius: 10px;
`;

export const SuccessMassageTitle = styled.h2`
  text-align: center;
  color: #00f;
  margin-bottom: 40px;
`;

export const SuccessMassageText = styled.p`
  color: #00f;
  font-weight: 500;
  background-color: #5f5;
  padding: 8px;
  border-radius: 10px;
  font-size: 18px;
`;

export const SuccessMassageButton = styled.button`
  margin-top: 30px;
  width: 130px;
  color: #00f;
  background-color: #5f5;
  border: none;
  padding: 8px;
  border-radius: 20px;
  font-weight: 500;
  cursor: pointer;
`;

export const ShowPassword = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  border: none;
  position: absolute;
  top: 25px;
  right: 12px;
  cursor: pointer;
  padding: 2px;
`;
