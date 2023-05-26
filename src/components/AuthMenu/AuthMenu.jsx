import React from "react";
import { List, Item, Link } from "./AuthMenu.styled";
import { useTranslation } from "react-i18next";

const pagesAuth = ["login", "Signup"];

export const AuthMenu = () => {
  const { t } = useTranslation();

  return (
    <List>
      {pagesAuth.map((el) => (
        <Item key={el}>
          <Link to={el === "Home" ? "/" : el.toLowerCase()}>
            {t(`header.${el.toLocaleLowerCase()}`)}
          </Link>
        </Item>
      ))}
    </List>
  );
};
