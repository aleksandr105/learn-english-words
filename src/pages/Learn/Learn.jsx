import React from "react";
import { List } from "../../components/List/List";
import { Spinner } from "../../components/Spinner/Spinner";
import { LearnOptions } from "../../components/LearnOptions/LearnOptions";
import { useSelector, useDispatch } from "react-redux";
import { words, loading } from "../../redux/words/selectors";
import { isLoggedIn } from "../../redux/auth/selectors";
import { MainTitle } from "../../components/MainTitle/MainTitle";
import { useEffect } from "react";
import {
  getWords,
  getBaseWordsForAuthorized,
  getUserWords,
} from "../../redux/words/operationsWords";
import { setLanguage } from "../../redux/words/wordsSlice";
import { useTranslation } from "react-i18next";
import { LearnButtonsOptions } from "../../components/LearnButtonsOptions/LearnButtonsOptions";
import { allSettings } from "../../redux/userSettings/selectors";

const Learn = ({ showSpinner }) => {
  const dispatch = useDispatch();
  const { arrKey = [], arrValue = [] } = useSelector(words);
  const isLoading = useSelector(loading);
  const LogedIn = useSelector(isLoggedIn);
  const { i18n } = useTranslation();
  const learnOptions = useSelector(allSettings);

  useEffect(() => {
    dispatch(setLanguage(i18n.resolvedLanguage));

    if ((!arrKey.length || !arrValue.length) && !LogedIn)
      dispatch(getWords(i18n.resolvedLanguage));

    if (
      (!arrKey.length || !arrValue.length) &&
      LogedIn &&
      learnOptions.myChoiceLearn === 0
    )
      dispatch(getBaseWordsForAuthorized(i18n.resolvedLanguage));

    if (
      (!arrKey.length || !arrValue.length) &&
      LogedIn &&
      learnOptions.myChoiceLearn === 1
    )
      dispatch(getUserWords(i18n.resolvedLanguage));
  }, [
    LogedIn,
    arrKey.length,
    arrValue.length,
    dispatch,
    i18n.resolvedLanguage,
    learnOptions.myChoiceLearn,
  ]);

  return (
    <section>
      <MainTitle />

      {!isLoading && !showSpinner ? (
        <>
          {LogedIn && <LearnButtonsOptions />}
          <LearnOptions />
          <List />
        </>
      ) : (
        <Spinner isLoad={true} />
      )}
    </section>
  );
};

export default Learn;
