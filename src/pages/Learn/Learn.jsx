import React from "react";
import { List } from "../../components/List/List";
import { Spinner } from "../../components/Spinner/Spinner";
import { useSelector } from "react-redux";
import { words, loading } from "../../redux/words/selectors";
import { MainTitle } from "../../components/MainTitle/MainTitle";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getWords } from "../../redux/words/operationsWords";
import { setLanguage } from "../../redux/words/wordsSlice";
import { useTranslation } from "react-i18next";

const Learn = ({ showSpinner }) => {
  const dispatch = useDispatch();
  const { arrKey = [], arrValue = [], arrAllWords = [] } = useSelector(words);
  const isLoading = useSelector(loading);
  const { i18n } = useTranslation();

  useEffect(() => {
    dispatch(setLanguage(i18n.resolvedLanguage));
    if (!arrKey.length || !arrValue.length) dispatch(getWords());
  }, [
    arrAllWords.length,
    arrKey.length,
    arrValue.length,
    dispatch,
    i18n.resolvedLanguage,
  ]);

  return (
    <>
      <MainTitle />

      {arrAllWords.length !== 0 && !isLoading && !showSpinner ? (
        <List />
      ) : (
        <Spinner isLoad={true} />
      )}
    </>
  );
};

export default Learn;
