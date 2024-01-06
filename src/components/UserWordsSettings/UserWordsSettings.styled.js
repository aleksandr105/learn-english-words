import styled from "@emotion/styled";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  background-color: #fff;
  padding: 60px 20px 35px 20px;
  border-radius: 20px;
  box-shadow: inset rgba(255, 255, 255, 0.2) 8px 8px 18px 5px,
    inset rgba(0, 0, 0, 0.5) -8px -8px 18px 5px;
  height: 95vh;
  width: 100%;
`;

export const DbSettingsTitle = styled.h2`
  text-align: center;
  color: #00f;
  text-transform: uppercase;
  background-color: #5f5;
  padding: 6px 13px 6px 13px;
  max-width: 400px;
  border-radius: 30px;
  margin-bottom: 40px;
`;

export const CloseModalButton = styled.button`
  position: absolute;
  right: 25px;
  top: 15px;
  border: none;
  border-radius: 50%;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background-color: #ff9714;
  transition: scale 300ms cubic-bezier(0.4, 0, 0.2, 1);
  :hover {
    scale: 1.1;
  }
`;

export const ShowAddWordBtn = styled.button`
  margin-top: 20px;
  padding: 8px;
  border-radius: 8px;
  border: none;
  color: #00f;
  background-color: #5f5;
  font-weight: 500;
  transition: scale 300ms cubic-bezier(0.4, 0, 0.2, 1);
  :hover {
    scale: 1.02;
  }
`;
