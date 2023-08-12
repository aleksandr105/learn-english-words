import styled from "@emotion/styled";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 35px;
  padding-bottom: 40px;
`;

export const Link = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #5f5;
  padding: 10px;
  border-radius: 15px;
  text-align: center;
  color: #00f;
  font-size: 16px;
  font-weight: 600;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: scale 150ms linear;
  :hover {
    background-color: #5f5;
    scale: 1.02;
  }
`;

export const IconWrapper = styled.div`
  background-color: white;
  display: inline-flex;
  margin-left: 3px;
  padding: 3px;
  border-radius: 50%;
`;
