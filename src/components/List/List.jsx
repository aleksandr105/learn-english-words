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
import {
  getWords,
  getBaseWordsForAuthorized,
  getUserWords,
} from "../../redux/words/operationsWords";
import { error, victory, complited } from "../../audio";
import { onPlay, onNatification } from "../../helpers";
import { useSpeaker } from "../../hooks/useSpeaker";
import { useTranslation } from "react-i18next";
import { DeleteWordMenu } from "../DeleteWordMenu/DeleteWordMenu";
import { allSettings } from "../../redux/userSettings/selectors";

export const List = () => {
  const { select, melody, voice, myChoiceLearn } = useSelector(allSettings);
  const dispatch = useDispatch();
  const { arrKey = [], arrValue = [], arrAllWords = [] } = useSelector(words);
  const LogedIn = useSelector(isLoggedIn);
  const [wordClick, setWordClick] = useState(null);
  const [wordClick2, setWordClick2] = useState(null);
  const [wordsEn, setWordesEn] = useState(arrKey);
  const [wordsTranslation, setWordsTranslation] = useState(arrValue);
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
      (wordsEn.includes(wordValue) && wordsEn.includes(wordClick)) ||
      (wordsTranslation.includes(wordValue) &&
        wordsTranslation.includes(wordClick2));

    const isAnswerCorrect = arrAllWords.some(
      (el) => el[wordValue] === wordClick2 || el[wordClick] === wordValue
    );

    if (wordsEn.includes(wordValue)) setWordClick(wordValue);

    if (wordsTranslation.includes(wordValue)) setWordClick2(wordValue);

    if (wordsEn.includes(wordValue) && !speakStatus) {
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

      if (wordsEn.length >= 2 && melody) await onPlay(complited);

      const wordsEnFiltered = wordsEn.filter(
        (el) => el !== wordClick && el !== wordValue
      );

      const wordsTranslationFiltered = wordsTranslation.filter(
        (el) => el !== wordClick2 && el !== wordValue
      );

      setWordClick(null);
      setWordClick2(null);
      setWordesEn(wordsEnFiltered);
      setWordsTranslation(wordsTranslationFiltered);
      setButtonStatus(false);

      if (!wordsEnFiltered.length && !wordsTranslationFiltered.length) {
        if (melody) await onPlay(victory);

        onNatification(t("notification.good"), {
          type: "success",
          autoClose: 5000,
        });

        if (!LogedIn) dispatch(getWords());

        if (LogedIn && myChoiceLearn === 0)
          dispatch(getBaseWordsForAuthorized());

        if (LogedIn && myChoiceLearn === 1) dispatch(getUserWords());
      }
      return;
    }

    if (!clickOnSameColumn && (wordClick || wordClick2)) {
      setButtonStatus(true);
      setClickError(true);

      const getEnglishErrorWord = wordsEn.includes(wordClick)
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

      setClickError(false);
      setWordClick2(null);
      setWordClick(null);
      setTimeout(() => {
        setWordesEn(arrKey);
        setWordsTranslation(arrValue);
      }, 200);

      setButtonStatus(false);
    }
  };

  return (
    <>
      {wordsEn && wordsTranslation && (
        <ListsButtonWrapper>
          <ListButton>
            {wordsEn.map((el) => (
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
            {wordsTranslation.map((el) => (
              <ListButtomItem key={el}>
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
