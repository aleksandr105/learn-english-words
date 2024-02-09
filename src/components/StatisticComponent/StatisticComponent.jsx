import React, { useEffect } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { getStatistic } from "../../redux/statistic/statisticOperation";
import { Oval } from "react-loader-spinner";

export const StatisticComponent = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const statistic = useSelector((state) => state.statistic);

  useEffect(() => {
    dispatch(getStatistic());
  }, [dispatch]);

  const translationArr = [
    "statistic.complited",
    "statistic.success",
    "statistic.error",
    "statistic.successPercentage",
    "statistic.errorPercentage",
    "statistic.learned",
    "statistic.toBeLearn",
    "statistic.inMyDictionary",
  ];

  const arrLearnedWordCount = statistic?.learnedWordsCount?.split("/");

  return (
    <Section>
      <Wrapper>
        <Title>{t("statistic.title")}</Title>
        <List>
          {translationArr.map((el, idx) => (
            <Item key={el}>
              <Field>{t(el)}</Field>
              {!statistic.loading ? (
                <Result>
                  {idx !== 5
                    ? statistic[Object.keys(statistic)[idx]]
                    : `${arrLearnedWordCount[0]} ${t("statistic.iz")} ${
                        arrLearnedWordCount[1]
                      }`}
                </Result>
              ) : (
                <Oval
                  height={15}
                  width={15}
                  strokeWidth={8}
                  color="#00f"
                  secondaryColor="#5f5"
                />
              )}
            </Item>
          ))}
        </List>
      </Wrapper>
    </Section>
  );
};
