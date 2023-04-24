import React from "react";
import { List } from "../../components/List/List";
import { useSelector } from "react-redux";
import { words, loading } from "../../redux/selectors";
import { Title } from "./Learn.styled";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getWords } from "../../redux/words/operationsWords";

const Learn = () => {
  const dispatch = useDispatch();
  const { arrKey = [], arrValue = [], arrAllWords = [] } = useSelector(words);
  const isLoading = useSelector(loading);

  useEffect(() => {
    if (!arrKey.length || !arrValue.length) dispatch(getWords());
  }, [arrAllWords.length, arrKey.length, arrValue.length, dispatch]);

  return (
    <>
      <Title>Learn english words</Title>
      {arrAllWords.length !== 0 && !isLoading && <List />}
    </>
  );
};

export default Learn;
