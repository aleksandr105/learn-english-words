import React, { useState, useEffect } from "react";
import {
  EnButton,
  ListButton,
  ListButtomItem,
  ListsButtonWrapper,
} from "./List.styled";
import { useSelector, useDispatch } from "react-redux";
import { words } from "../../redux/words/selectors";
import { isLoggedIn } from "../../redux/auth/selectors";
import { error, victory, complited } from "../../audio";
import { onPlay, onNatification } from "../../helpers";
import { useSpeaker } from "../../hooks/useSpeaker";
import { useTranslation } from "react-i18next";
import { DeleteWordMenu } from "../DeleteWordMenu/DeleteWordMenu";
import { allSettings } from "../../redux/userSettings/selectors";
import { setWordsValue, setWordsKey } from "../../redux/words/wordsSlice";
import { saveStatistic } from "../../operations";

export const List = () => {
  const { select, melody, voice } = useSelector(allSettings);
  const dispatch = useDispatch();
  const { arrKey, arrValue, arrAllWords } = useSelector(words);
  const LogedIn = useSelector(isLoggedIn);
  const [wordClick, setWordClick] = useState(null);
  const [wordClick2, setWordClick2] = useState(null);
  const [buttonStatus, setButtonStatus] = useState(false);
  const [speakStatus, setSpeakStatus] = useState(false);
  const [clickError, setClickError] = useState(false);
  const [disableBtnDeleteWord, setDisableBtnDeleteWord] = useState(false);
  const speak = useSpeaker();
  const { t } = useTranslation();

  useEffect(() => {
    const clickToWindow = (e) => {
      if (e.target.nodeName !== "BUTTON" && e.target.nodeName !== "LI") {
        setWordClick(null);
        setWordClick2(null);
      }
    };

    window.addEventListener("click", clickToWindow);

    return () => {
      window.removeEventListener("click", clickToWindow);
    };
  }, [arrKey, arrValue]);

  const clickButton = async (e) => {
    const wordValue = e.target.textContent;

    const clickOnSameColumn =
      (arrKey.includes(wordValue) && arrKey.includes(wordClick)) ||
      (arrValue.includes(wordValue) && arrValue.includes(wordClick2));

    const isAnswerCorrect = arrAllWords.some(
      (el) => el[wordValue] === wordClick2 || el[wordClick] === wordValue
    );

    if (arrKey.includes(wordValue)) setWordClick(wordValue);

    if (arrValue.includes(wordValue)) setWordClick2(wordValue);

    if (arrKey.includes(wordValue) && !speakStatus) {
      if (!isAnswerCorrect && !clickOnSameColumn && (wordClick || wordClick2))
        setClickError(true);

      setSpeakStatus(true);

      if (wordClick2) setButtonStatus(true);

      if (voice) await speak({ text: wordValue, rate: select });
      setSpeakStatus(false);

      if (isAnswerCorrect && clickOnSameColumn && (wordClick || wordClick2))
        setClickError(false);
    }

    if (isAnswerCorrect) {
      setButtonStatus(true);

      if (arrKey.length >= 2 && melody) await onPlay(complited);

      const wordsEnFiltered = arrKey.filter(
        (el) => el !== wordClick && el !== wordValue
      );

      const wordsTranslationFiltered = arrValue.filter(
        (el) => el !== wordClick2 && el !== wordValue
      );

      setWordClick(null);
      setWordClick2(null);
      dispatch(setWordsKey(wordsEnFiltered));
      dispatch(setWordsValue(wordsTranslationFiltered));
      setButtonStatus(false);

      if (!wordsEnFiltered.length && !wordsTranslationFiltered.length) {
        if (melody) await onPlay(victory);

        onNatification(t("notification.good"), {
          type: "success",
          autoClose: 5000,
        });

        saveStatistic("correct");
      }
      return;
    }

    if (!clickOnSameColumn && (wordClick || wordClick2)) {
      setButtonStatus(true);
      setClickError(true);

      const getEnglishErrorWord = arrKey.includes(wordClick)
        ? wordClick
        : wordValue;

      onNatification(
        t("notification.bad", {
          wordEnglish: getEnglishErrorWord,
          wordTranslation: arrAllWords.reduce((acc, el) => {
            if (el[getEnglishErrorWord]) acc = el[getEnglishErrorWord];
            return acc;
          }, ""),
        }),
        {}
      );

      if (melody) await onPlay(error);

      saveStatistic("incorrect");

      setClickError(false);
      setWordClick2(null);
      setWordClick(null);
      setTimeout(() => {
        const key = arrAllWords
          .map((el) => Object.keys(el)[1])
          .sort(() => Math.random() - 0.5);
        const value = arrAllWords
          .map((el) => Object.values(el)[1])
          .sort(() => Math.random() - 0.5);

        dispatch(setWordsKey(key));
        dispatch(setWordsValue(value));
      }, 200);

      setButtonStatus(false);
    }
  };

  return (
    <>
      {arrKey && arrValue && (
        <ListsButtonWrapper>
          <ListButton>
            {arrKey.map((el) => (
              <ListButtomItem key={el}>
                {LogedIn && (
                  <DeleteWordMenu
                    p={{ el, wordClick }}
                    disableBtnDeleteWord={disableBtnDeleteWord}
                    disabledBtnMenu={setDisableBtnDeleteWord}
                  />
                )}
                <EnButton
                  disabled={buttonStatus && el !== wordClick}
                  variant="contained"
                  onClick={clickButton}
                  prop={{
                    el,
                    wordClick,
                    wordClick2,
                    clickError,
                    buttonStatus,
                  }}
                >
                  {el}
                </EnButton>
              </ListButtomItem>
            ))}
          </ListButton>
          <ListButton>
            {arrValue.map((el, idx) => (
              <ListButtomItem key={el + arrKey[idx]}>
                <EnButton
                  disabled={buttonStatus && el !== wordClick2}
                  variant="contained"
                  onClick={clickButton}
                  prop={{
                    el,
                    wordClick,
                    wordClick2,
                    clickError,
                    buttonStatus,
                  }}
                >
                  {el}
                </EnButton>
              </ListButtomItem>
            ))}
          </ListButton>
        </ListsButtonWrapper>
      )}
    </>
  );
};
