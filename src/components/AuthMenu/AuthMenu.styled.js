import styled from "@emotion/styled";
import { NavLink } from "react-router-dom";

export const List = styled.ul`
  margin-left: auto;
`;

export const Item = styled.li``;

export const Link = styled(NavLink)`
  color: white;
  font-weight: 500;
  border-radius: 10px;
  display: inline-block;
  padding: 3px;
  &.active {
    color: #00f;
    background-color: #5f5;
  }
`;
