import React from "react";
import { useTranslation } from "react-i18next";
import { user } from "../../redux/auth/selectors";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/auth/authOperations";
import { useSearchParams } from "react-router-dom";

export const LoggedInMenu = () => {
  const { t } = useTranslation();
  const { email } = useSelector(user);
  const dispatch = useDispatch();
  const [_, setSearchParams] = useSearchParams();

  const onLogout = () => {
    setSearchParams({});
    dispatch(logout());
  };

  return (
    <div>
      <p>{email}</p>
      <button onClick={onLogout}>{t("header.logout")}</button>
    </div>
  );
};
