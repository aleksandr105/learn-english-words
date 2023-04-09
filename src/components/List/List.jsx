import React, { useState, useEffect } from "react";
import { Container } from "@mui/material";
import db from "../../db.json";
import {
  EnButton,
  FlexContainer,
  ListButton,
  ListButtomItem,
} from "./List.styled";

export const List = () => {
  const [wordClick, setWordClick] = useState("");
  const [wordsEn, setWordesEn] = useState(
    Object.keys(db).sort(() => Math.random() - 0.5)
  );
  const [wordsTranslation, setWordsTranslation] = useState(
    Object.values(db).sort(() => Math.random() - 0.5)
  );

  useEffect(() => {
    const clickToWindow = (e) => {
      if (e.target.nodeName !== "BUTTON") setWordClick("");
    };
    window.addEventListener("click", clickToWindow);
    return () => {
      window.removeEventListener("click", clickToWindow);
    };
  }, []);

  const clickButton = (e) => {
    const wordValue = e.target.textContent;

    const withList =
      (wordsEn.includes(wordValue) && wordsEn.includes(wordClick)) ||
      (wordsTranslation.includes(wordValue) &&
        wordsTranslation.includes(wordClick));

    setWordClick(wordValue);

    if (wordValue === db[wordClick] || db[wordValue] === wordClick) {
      setWordesEn(wordsEn.filter((el) => el !== wordClick && el !== wordValue));
      setWordsTranslation(
        wordsTranslation.filter((el) => el !== wordClick && el !== wordValue)
      );
      setWordClick("");
      return;
    } else if (wordClick !== "" && !withList) {
      alert(
        "Ты ошибся и за это будешь наказан :-)). Тебе придеться начать заново"
      );
      setWordesEn(Object.keys(db).sort(() => Math.random() - 0.5));

      setWordsTranslation(Object.values(db).sort(() => Math.random() - 0.5));
      setWordClick("");
    }
  };

  return (
    <Container>
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
    </Container>
  );
};
