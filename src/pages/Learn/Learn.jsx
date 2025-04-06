import React from 'react';
import { List } from '../../components/List/List';
import { Spinner } from '../../components/Spinner/Spinner';
import { LearnOptions } from '../../components/LearnOptions/LearnOptions';
import { useSelector, useDispatch } from 'react-redux';
import { words, loading } from '../../redux/words/selectors';
import { isLoggedIn, isRefreshing } from '../../redux/auth/selectors';
import { MainTitle } from '../../components/MainTitle/MainTitle';
import { useEffect } from 'react';
import {
  getWords,
  getBaseWordsForAuthorized,
  getUserWords,
} from '../../redux/words/operationsWords';
import { setLanguage } from '../../redux/words/wordsSlice';
import { useTranslation } from 'react-i18next';
import { LearnButtonsOptions } from '../../components/LearnButtonsOptions/LearnButtonsOptions';
import { WordsNotFoundMessage } from '../../components/WordsNotFoundMessage/WordsNotFoundMessage';

const Learn = ({ showSpinner }) => {
  const dispatch = useDispatch();
  const { arrKey = [], arrValue = [], arrAllWords } = useSelector(words);
  const isLoading = useSelector(loading);
  const logedIn = useSelector(isLoggedIn);
  const refresh = useSelector(isRefreshing);
  const { i18n } = useTranslation();
  const { myChoiceLearn } = JSON.parse(localStorage.getItem('learnOptions'));

  useEffect(() => {
    dispatch(setLanguage(i18n.resolvedLanguage));

    if ((!arrKey.length || !arrValue.length) && !logedIn && !refresh) {
      dispatch(getWords(i18n.resolvedLanguage));
    }
    if ((!arrKey.length || !arrValue.length) && logedIn && myChoiceLearn === 0)
      dispatch(getBaseWordsForAuthorized(i18n.resolvedLanguage));

    if ((!arrKey.length || !arrValue.length) && logedIn && myChoiceLearn === 1)
      dispatch(getUserWords(i18n.resolvedLanguage));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [logedIn, arrKey.length, arrValue.length, dispatch, i18n.resolvedLanguage]);

  return (
    <section>
      <MainTitle />
      {logedIn && <LearnButtonsOptions />}
      <LearnOptions />
      {!isLoading && !showSpinner ? (
        <>{arrAllWords.length !== 0 ? <List /> : <WordsNotFoundMessage />}</>
      ) : (
        <Spinner isLoad={true} />
      )}
    </section>
  );
};

export default Learn;
