import React, { useState, useEffect } from "react";
import {
  Section,
  RegisteredUsers,
  TotalUsersTitle,
  LearnLink,
} from "./DescriptionHome.styled";
import { useTranslation, Trans } from "react-i18next";
import { getTotalUsers } from "../../operations";
import { Oval } from "react-loader-spinner";

export const DescriptionHome = () => {
  const { t } = useTranslation();

  const [users, setUsers] = useState(0);
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    setShowLoader(true);
    getTotalUsers().then(({ data }) => {
      setUsers(data.totalUsers);
      setShowLoader(false);
    });
  }, []);

  return (
    <Section>
      <p>
        <Trans i18nKey="homePage.description">
          Приветствую! В этом приложении мы предлагаем изучать английские слова
          на трех языках: украинском, русском и польском. Посетив страницу
          <LearnLink to="learn" />, вы получите 10 пар слов из базы, которые
          наиболее часто используются в разговорной речи. Ваша задача - найти
          пару для каждого английского слова, кликнув сначала на английское
          слово, а затем на соответствующее слово на выбранном языке (или
          наоборот). Если ответ верный, пара исчезнет, и таким образом, вы
          пройдете все 10 пар. В случае ошибки, вам придется вернуться к
          изучению всех слов, на которые вы ответили правильно. Всплывающее окно
          покажет вам сообщение о вашей ошибке и правильный ответ.
        </Trans>
      </p>
      <RegisteredUsers>
        {t("homePage.forRegisteredUsers")}
        <span>{t("homePage.benefit1")}</span>
        <span>{t("homePage.benefit2")}</span>
        <span>{t("homePage.benefit3")}</span>
      </RegisteredUsers>
      <p>{t("homePage.motivation")}</p>
      <TotalUsersTitle>
        {t("homePage.usAlready")}:
        <div style={{ display: "flex", justifyContent: "center" }}>
          {showLoader ? (
            <Oval
              height={25}
              width={25}
              strokeWidth={8}
              color="#00f"
              secondaryColor="#5f5"
            />
          ) : (
            <span>{users}</span>
          )}
        </div>
      </TotalUsersTitle>
    </Section>
  );
};
