import React, { useState, useEffect } from "react";
import {
  EnButton,
  ListButton,
  ListButtomItem,
  Select,
  SelectTitle,
  SelectWrapper,
} from "./List.styled";
import { useSelector, useDispatch } from "react-redux";
import { words } from "../../redux/selectors";
import { getWords } from "../../redux/words/operationsWords";
import { error, victory, complited } from "../../audio";
import { onPlay, onNatification, onSpeak } from "../../helpers";

export const List = () => {
  const dispatch = useDispatch();
  const { arrKey = [], arrValue = [], arrAllWords = [] } = useSelector(words);
  const [speedVoce, setSpeedVoce] = useState(1);
  const [wordClick, setWordClick] = useState("");
  const [wordClick2, setWordClick2] = useState("");
  const [wordsEn, setWordesEn] = useState(arrKey);
  const [wordsTranslation, setWordsTranslation] = useState(arrValue);
  const [buttonStatus, setButtonStatus] = useState(false);
  const [speakStatus, setSpeakStatus] = useState(false);

  useEffect(() => {
    const clickToWindow = (e) => {
      if (e.target.nodeName !== "BUTTON") setWordClick("");
    };
    window.addEventListener("click", clickToWindow);
    return () => {
      window.removeEventListener("click", clickToWindow);
    };
  }, []);

  const clickButton = async (e) => {
    const wordValue = e.target.textContent;

    const withList =
      (wordsEn.includes(wordValue) && wordsEn.includes(wordClick)) ||
      (wordsTranslation.includes(wordValue) &&
        wordsTranslation.includes(wordClick));

    setWordClick(wordValue);

    if (wordClick !== "" && !withList) setWordClick2(wordValue);

    if (wordsEn.includes(wordValue) && !speakStatus) {
      setSpeakStatus(true);

      if (wordsTranslation.includes(wordClick) && wordsEn.includes(wordValue)) {
        setButtonStatus(true);
      }
      await onSpeak({ text: wordValue, rate: speedVoce });
      setSpeakStatus(false);
    }

    if (
      arrAllWords.some((el) => wordValue === el[wordClick]) ||
      arrAllWords.some((el) => el[wordValue] === wordClick)
    ) {
      setButtonStatus(true);

      if (wordsEn.length >= 2) await onPlay(complited);
      const wordsEnFiltered = wordsEn.filter(
        (el) => el !== wordClick && el !== wordValue
      );
      const wordsTranslationFiltered = wordsTranslation.filter(
        (el) => el !== wordClick && el !== wordValue
      );
      setWordesEn(wordsEnFiltered);
      setWordsTranslation(wordsTranslationFiltered);
      setWordClick("");
      setButtonStatus(false);
      if (!wordsEnFiltered.length && !wordsTranslationFiltered.length) {
        await onPlay(victory);

        onNatification("Ты красава все сделал правильно, я горжусь тобой!!!", {
          type: "success",
          autoClose: 5000,
        });

        dispatch(getWords());
      }
      return;
    } else if (wordClick !== "" && !withList) {
      setButtonStatus(true);
      onNatification(
        `Ты ошибся слово "${
          wordsEn.includes(wordClick) ? wordClick : wordValue
        }" переводится как "${arrAllWords.reduce((acc, el) => {
          if (el[wordsEn.includes(wordClick) ? wordClick : wordValue])
            acc = el[wordsEn.includes(wordClick) ? wordClick : wordValue];
          return acc;
        }, "")}" за ошибку будешь наказан :-)). Тебе придется начать заново!!!`,
        {}
      );

      await onPlay(error);

      setWordesEn(arrKey);

      setWordsTranslation(arrValue);
      setWordClick2("");
      setWordClick("");
      setButtonStatus(false);
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
        <ListButton>
          {wordsEn.map((el, idx) => {
            return (
              <ListButtomItem key={el}>
                <EnButton
                  disabled={buttonStatus}
                  variant="contained"
                  onClick={clickButton}
                  prop={{ el, wordClick, wordClick2 }}
                >
                  {el}
                </EnButton>
                <EnButton
                  disabled={buttonStatus}
                  variant="contained"
                  onClick={clickButton}
                  prop={{ el: wordsTranslation[idx], wordClick, wordClick2 }}
                >
                  {wordsTranslation[idx]}
                </EnButton>
              </ListButtomItem>
            );
          })}
        </ListButton>
      )}
    </>
  );
};
