import React from "react";
import { useTranslation } from "react-i18next";
import { user } from "../../redux/auth/selectors";
import { useSelector } from "react-redux";
import { Wrapper, Name, Hello } from "./LoggedInMenu.styled";

export const LoggedInMenu = () => {
  const { t } = useTranslation();
  const { name } = useSelector(user);

  const resizeText = (text) => {
    const nameArr = text.split(" ");

    const newNameArr = nameArr.map((el) => {
      if (el.length > 16) {
        return el.slice(0, 7) + "..." + el.slice(el.length - 6);
      }
      return el;
    });

    return newNameArr.join(" ");
  };

  return (
    <Wrapper>
      <Hello>{t("header.hello")}</Hello>
      <Name>{resizeText(name)}</Name>
    </Wrapper>
  );
};
