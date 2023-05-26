import React from "react";
import { useTranslation } from "react-i18next";
import { user } from "../../redux/auth/selectors";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/auth/authOperations";

export const LoggedInMenu = () => {
  const { t } = useTranslation();
  const { email } = useSelector(user);
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(logout());
  };

  return (
    <div>
      <p>{email}</p>
      <button onClick={onLogout}>{t("header.logout")}</button>
    </div>
  );
};
