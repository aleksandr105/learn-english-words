import React, { useState, useEffect } from "react";
import {
  EnButton,
  FlexContainer,
  ListButton,
  ListButtomItem,
  Select,
  SelectTitle,
  SelectWrapper,
} from "./List.styled";
import { useSelector } from "react-redux";
import { words } from "../../redux/selectors";
import { useDispatch } from "react-redux";
import { getWords } from "../../redux/words/operationsWords";

import useTextToSpeech from "react-hook-text-to-speech";

export const List = () => {
  const dispatch = useDispatch();
  const { arrKey = [], arrValue = [], arrAllWords = [] } = useSelector(words);
  const [speedVoce, setSpeedVoce] = useState(1);
  const [wordClick, setWordClick] = useState("");
  const [wordsEn, setWordesEn] = useState(arrKey);
  const [wordsTranslation, setWordsTranslation] = useState(arrValue);

  useEffect(() => {
    const clickToWindow = (e) => {
      if (e.target.nodeName !== "BUTTON") setWordClick("");
    };
    window.addEventListener("click", clickToWindow);
    return () => {
      window.removeEventListener("click", clickToWindow);
    };
  }, []);

  const convert = useTextToSpeech();

  const clickButton = (e) => {
    const wordValue = e.target.textContent;

    if (wordsEn.includes(wordValue)) convert(wordValue, speedVoce);

    const withList =
      (wordsEn.includes(wordValue) && wordsEn.includes(wordClick)) ||
      (wordsTranslation.includes(wordValue) &&
        wordsTranslation.includes(wordClick));

    setWordClick(wordValue);

    if (
      arrAllWords.some((el) => wordValue === el[wordClick]) ||
      arrAllWords.some((el) => el[wordValue] === wordClick)
    ) {
      const wordsEnFiltered = wordsEn.filter(
        (el) => el !== wordClick && el !== wordValue
      );
      const wordsTranslationFiltered = wordsTranslation.filter(
        (el) => el !== wordClick && el !== wordValue
      );
      setWordesEn(wordsEnFiltered);
      setWordsTranslation(wordsTranslationFiltered);

      setWordClick("");

      if (!wordsEnFiltered.length && !wordsTranslationFiltered.length) {
        alert("Ты красава все сделал правильно, я горжусь тобой!!!");
        dispatch(getWords());
      }
      return;
    } else if (wordClick !== "" && !withList) {
      alert(
        `Ты ошибся слово "${
          wordsEn.includes(wordClick) ? wordClick : wordValue
        }" переводится как "${arrAllWords.reduce((acc, el) => {
          if (el[wordsEn.includes(wordClick) ? wordClick : wordValue])
            acc = el[wordsEn.includes(wordClick) ? wordClick : wordValue];
          return acc;
        }, "")}" за ошибку будешь наказан :-)). Тебе придется начать заново!!!`
      );
      setWordesEn(
        arrAllWords
          .map((el) => Object.keys(el)[1])
          ?.sort(() => Math.random() - 0.5)
      );

      setWordsTranslation(arrAllWords.map((el) => Object.values(el)[1]))?.sort(
        () => Math.random() - 0.5
      );
      setWordClick("");
    }
  };

  return (
    <>
      <SelectWrapper>
        <SelectTitle>Скорость речи</SelectTitle>
        <Select name="speed" onChange={(e) => setSpeedVoce(e.target.value)}>
          <option value="1">Быстро</option>
          <option value="0.5">Средне</option>
          <option value="0.2">Медленно</option>
        </Select>
      </SelectWrapper>
      {wordsEn && wordsTranslation && (
        <FlexContainer>
          <ListButton>
            {wordsEn.map((el) => {
              return (
                <ListButtomItem key={el}>
                  <EnButton
                    variant="contained"
                    onClick={clickButton}
                    prop={{ el, wordClick }}
                  >
                    {el}
                  </EnButton>
                </ListButtomItem>
              );
            })}
          </ListButton>
          <ListButton>
            {wordsTranslation.map((el) => {
              return (
                <ListButtomItem key={el}>
                  <EnButton
                    variant="contained"
                    onClick={clickButton}
                    prop={{ el, wordClick }}
                  >
                    {el}
                  </EnButton>
                </ListButtomItem>
              );
            })}
          </ListButton>
        </FlexContainer>
      )}
    </>
  );
};
