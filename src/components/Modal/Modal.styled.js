import styled from "@emotion/styled";

export const Backdrop = styled.div`
  position: fixed;
  padding: 15px;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 1200;
`;
