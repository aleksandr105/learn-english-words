import styled from "@emotion/styled";

export const ButtonSubmit = styled.button`
  width: 50%;
  display: block;
  margin: 0 auto;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
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
  border: ${(isError) => {
    console.log(isError.message);
    return isError ? "1px solid red" : "1px solid #ccc";
  }};
  border-radius: 4px;
  font-size: 14px;
  :focus {
    outline: none;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
  }
`;

export const InputWrapper = styled.div``;

export const InputLabel = styled.label`
  display: block;
  margin-bottom: 3px;
`;

export const ErrorMessage = styled.p`
  color: red;
  text-align: center;
`;
