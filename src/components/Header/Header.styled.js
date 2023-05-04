import styled from "@emotion/styled";
import { NavLink } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";

export const Logo = styled.svg`
  width: 36px;
  height: 36px;
  border-radius: 50px;
  background-color: #5f5;
  fill: #00f;
`;

export const Nav = styled(NavLink)`
  color: white;
  display: block;
  padding: 6px 10px;
  border-radius: 15px;
  font-weight: 600;
  text-transform: uppercase;
  font-size: 20px;
  &.active {
    background-color: #5f5;
    color: #00f;
  }
`;

export const NavMobile = styled(NavLink)`
  padding: 6px 12px;
  flex-grow: 1;
  color: #71706f;
  border-radius: 15px;
  &.active {
    background-color: #5f5;
    color: #00f;
  }
`;

export const NavList = styled.ul`
  display: flex;
  li:not(:last-child) {
    margin-right: 10px;
  }
`;

export const LanguageMenu = styled(MenuItem)`
  min-height: 20px;
  display: flex;
  justify-content: center;
  padding: 6px 8px;
  flex-grow: 1;
  color: #71706f;
  border-radius: 15px;
  background-color: ${({ p: { active } }) => (active ? "#5f5" : "transparant")};
  color: ${({ p: { active } }) => (active ? "#00f" : "#71706f")};
  :hover,
  :focus {
    background-color: ${({ p: { active } }) =>
      active ? "#5f5" : "transparant"};
    color: ${({ p: { active } }) => (active ? "#00f" : "#71706f")};
  }
  font-weight: 500;
  span {
    height: 0px inherit;
  }
`;

export const SelectedLanguage = styled.p`
  margin: 0;
  font-size: 13px;
  text-transform: uppercase;
`;
