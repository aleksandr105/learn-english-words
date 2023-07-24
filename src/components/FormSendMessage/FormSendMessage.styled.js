import styled from "@emotion/styled";

export const Form = styled.form`
  position: relative;
  max-width: 100%;
  background: white;
  border-radius: 30px;
`;

export const InputWrapper = styled.div`
  padding: 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  input,
  button[type="submit"],
  textarea {
    display: block;
    width: 100%;
    padding: 0 20px;
    background: #e9eff6;
    line-height: 40px;
    border-width: 0;
    border-radius: 20px;
    font-family: "Roboto", sans-serif;
  }
  button[type="submit"] {
    margin-top: 30px;
    background: #5f5;
    color: #00f;
    font-weight: 700;
    cursor: pointer;
    max-width: 210px;
    transition: scale 300ms cubic-bezier(0.4, 0, 0.2, 1);
    :hover {
      scale: 1.05;
    }
  }
  textarea {
    resize: none;
  }
  h3 {
    margin-bottom: 15px;
    font-family: "Roboto", sans-serif;
    font-weight: 500;
    font-size: 24px;
    color: #707981;
  }
`;

export const Name = styled.p`
  font-weight: 700;
  margin-bottom: 10px;
`;

export const CloseModalButton = styled.button`
  position: absolute;
  right: 10px;
  top: 8px;
  border: none;
  border-radius: 50%;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background-color: #5f5;
  transition: scale 300ms cubic-bezier(0.4, 0, 0.2, 1);
  :hover {
    scale: 1.1;
  }
`;

export const LoaderWrapper = styled.div`
  position: absolute;
  z-index: 100;
  right: calc(50% - 96px / 2);
  top: calc(50% - 96px / 2);
`;
