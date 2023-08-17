import styled from "@emotion/styled";

export const ListBtn = styled.ul`
  max-width: 350px;
  margin: 0 auto 20px auto;
  display: flex;
  gap: 15px;
  li {
    flex: 1;
    position: relative;
  }
`;

export const Btn = styled.button`
  width: 100%;
  height: 100%;
  border: none;
  padding: 5px 10px 5px 0px;
  font-weight: 600;
  border-radius: 10px;
  background-color: #1976d2;
  color: #fff;
  cursor: pointer;
`;

export const BtnShowModal = styled.button`
  position: absolute;
  cursor: pointer;
  background-color: transparent;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  top: calc(50% - 16px);
  right: 0;
  transition: scale 300ms cubic-bezier(0.4, 0, 0.2, 1);
  padding: 3px;
  :hover,
  :focus {
    scale: 1.2;
    outline: none;
  }
`;
