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
import { onPlay, onNatification } from "../../helpers";
import { useSpeaker } from "../../hooks/useSpeaker";

const selectOptions = [
  { value: 1, name: "Быстро" },
  { value: 0.5, name: "Средне" },
  { value: 0.2, name: "Медленно" },
];

export const List = () => {
  const dispatch = useDispatch();
  const { arrKey = [], arrValue = [], arrAllWords = [] } = useSelector(words);
  const [speedVoce, setSpeedVoce] = useState(1);
  const [wordClick, setWordClick] = useState(null);
  const [wordClick2, setWordClick2] = useState(null);
  const [wordsEn, setWordesEn] = useState(arrKey);
  const [wordsTranslation, setWordsTranslation] = useState(arrValue);
  const [buttonStatus, setButtonStatus] = useState(false);
  const [speakStatus, setSpeakStatus] = useState(false);
  const [clickError, setClickError] = useState(false);
  const [speak] = useSpeaker();

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

    const clickOnSameColumn =
      (wordsEn.includes(wordValue) && wordsEn.includes(wordClick)) ||
      (wordsTranslation.includes(wordValue) &&
        wordsTranslation.includes(wordClick2));

    if (wordsEn.includes(wordValue)) setWordClick(wordValue);

    if (wordsTranslation.includes(wordValue)) setWordClick2(wordValue);

    if (wordsEn.includes(wordValue) && !speakStatus) {
      if (
        !arrAllWords.some(
          (el) => el[wordValue] === wordClick2 || el[wordClick] === wordValue
        ) &&
        !clickOnSameColumn &&
        (wordClick || wordClick2)
      )
        setClickError(true);

      setSpeakStatus(true);

      if (wordClick2) setButtonStatus(true);

      await speak({ text: wordValue, rate: speedVoce });
      setSpeakStatus(false);
    }

    if (
      arrAllWords.some(
        (el) => el[wordValue] === wordClick2 || el[wordClick] === wordValue
      )
    ) {
      setButtonStatus(true);

      if (wordsEn.length >= 2) await onPlay(complited);

      const wordsEnFiltered = wordsEn.filter(
        (el) => el !== wordClick && el !== wordValue
      );

      const wordsTranslationFiltered = wordsTranslation.filter(
        (el) => el !== wordClick2 && el !== wordValue
      );

      setWordesEn(wordsEnFiltered);
      setWordsTranslation(wordsTranslationFiltered);
      setWordClick(null);
      setWordClick2(null);
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
    }

    if (!clickOnSameColumn && (wordClick || wordClick2)) {
      setButtonStatus(true);
      setClickError(true);
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
      setWordClick2(null);
      setWordClick(null);
      setClickError(false);
      setButtonStatus(false);
    }
  };

  return (
    <>
      <SelectWrapper>
        <SelectTitle>Скорость речи</SelectTitle>
        <Select name="speed" onChange={(e) => setSpeedVoce(e.target.value)}>
          {selectOptions.map(({ value, name }) => (
            <option key={name} value={value}>
              {name}
            </option>
          ))}
        </Select>
      </SelectWrapper>
      {wordsEn && wordsTranslation && (
        <ListButton>
          {wordsEn.map((el, idx) => {
            return (
              <ListButtomItem key={el}>
                <EnButton
                  disabled={buttonStatus && el !== wordClick}
                  variant="contained"
                  onClick={clickButton}
                  prop={{ el, wordClick, wordClick2, clickError }}
                >
                  {el}
                </EnButton>
                <EnButton
                  disabled={
                    buttonStatus && wordsTranslation[idx] !== wordClick2
                  }
                  variant="contained"
                  onClick={clickButton}
                  prop={{
                    el: wordsTranslation[idx],
                    wordClick,
                    wordClick2,
                    clickError,
                  }}
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
