import React from "react";
import {
  Section,
  List,
  Item,
  Title,
  Wrapper,
  Field,
  Result,
} from "./StatisticComponent.styled";
import { useTranslation } from "react-i18next";

export const StatisticComponent = () => {
  const { t } = useTranslation();

  const translationArr = [
    "statistic.success",
    "statistic.error",
    "statistic.successPercentage",
    "statistic.errorPercentage",
    "statistic.learned",
    "statistic.toBeLearn",
    "statistic.inMyDictionary",
  ];

  return (
    <Section>
      <Wrapper>
        <Title>{t("statistic.title")}</Title>
        <List>
          {translationArr.map((el) => (
            <Item key={el}>
              <Field>{t(el)}</Field>
              <Result>0</Result>
            </Item>
          ))}
        </List>
      </Wrapper>
    </Section>
  );
};
