import styled from "@emotion/styled";

export const Main = styled.main`
  min-height: ${({ height }) => `calc(100vh - ${height}px)`};
`;
