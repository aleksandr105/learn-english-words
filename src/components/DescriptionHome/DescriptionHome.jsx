import React from "react";
import { Section } from "./DescriptionHome.styled";
import { useTranslation } from "react-i18next";

export const DescriptionHome = () => {
  const { t } = useTranslation();

  return (
    <Section>
      <p>{t("homePage.description")}</p>
      <p>
        {t("homePage.forRegisteredUsers")}
        <span>{t("homePage.benefit1")}</span>
        <span>{t("homePage.benefit2")}</span>
        <span>{t("homePage.benefit3")}</span>
      </p>
      <p>{t("homePage.motivation")}</p>
      <p>{t("homePage.startLearn")}</p>
      <p>{t("homePage.usAlready")}</p>
    </Section>
  );
};
