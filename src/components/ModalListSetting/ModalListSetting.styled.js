import styled from "@emotion/styled";

export const List = styled.ul`
  margin: 50px auto 0px auto;
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  overflow: auto;
  max-width: 1112px;
  @media screen and (min-width: 996px) and (max-width: 1180px) {
    width: 926px;
  }
  @media screen and (min-width: 811px) and (max-width: 995px) {
    width: 741px;
  }
  @media screen and (min-width: 626px) and (max-width: 810px) {
    width: 556px;
  }
  @media screen and (min-width: 441px) and (max-width: 625px) {
    width: 371px;
  }
  @media screen and (max-width: 441px) {
    justify-content: center;
  }
`;

export const Item = styled.li`
  position: relative;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 169px;
  height: 37px;
  background-color: #1976d2;
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
`;

export const ButtonDelete = styled.button`
  position: absolute;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  right: 4px;
  border-radius: 4px;
  transition: scale 200ms linear, background-color 200ms linear;
  &:hover,
  :focus {
    scale: 1.1;
    background-color: #e7e5e1;
  }
`;

export const SpinnerWrapper = styled.div`
  position: absolute;
  z-index: 10;
  right: 2px;
  top: calc(43% - 13px);
`;
