import React, { useState, useEffect } from "react";
import {
  Wrapper,
  InputTitle,
  NextStepBtn,
  Input,
  InputWrapper,
  ToBackStepBtn,
  EnglishWordWrapper,
  BtnsWrapper,
  SaveWordBtn,
} from "./AddWordsForm.styled";
import { useTranslation } from "react-i18next";
import {
  BsFillArrowRightCircleFill,
  BsFillArrowLeftCircleFill,
} from "react-icons/bs";

export const AddWordsForm = ({ setAddWordShow }) => {
  const { t } = useTranslation();
  const [step, setStep] = useState(1);
  const [englishWord, setEnglishWord] = useState("");
  const [translate, setTranslate] = useState("");

  useEffect(() => {
    const storageData = localStorage.getItem("vocabularyFormData");
    if (storageData) {
      const { englishWord, translate, step } = JSON.parse(storageData);

      setStep(step);
      setEnglishWord(englishWord);
      setTranslate(translate);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "vocabularyFormData",
      JSON.stringify({ englishWord, translate, step })
    );
  }, [step, englishWord, translate]);

  const saveWord = () => {
    localStorage.setItem(
      "vocabularyFormData",
      JSON.stringify({ englishWord: "", translate: "", step: 1 })
    );
    setAddWordShow();
  };

  return (
    <Wrapper>
      {step === 1 && (
        <InputWrapper>
          <InputTitle>{t("userDbSettings.inputTitleEngl")}</InputTitle>
          <Input
            type="text"
            name="englishWord"
            value={englishWord}
            onChange={(e) => setEnglishWord(e.target.value.trim())}
            placeholder="World"
          />
          <NextStepBtn onClick={() => setStep(2)}>
            <BsFillArrowRightCircleFill size={30} color="rgb(255, 184, 85)" />
          </NextStepBtn>
        </InputWrapper>
      )}
      {step === 2 && (
        <InputWrapper>
          <InputTitle>
            {t("userDbSettings.inputTitileTranslation")}{" "}
            <EnglishWordWrapper>{englishWord}</EnglishWordWrapper>
          </InputTitle>
          <Input
            type="text"
            name="translateWord"
            value={translate}
            onChange={(e) => setTranslate(e.target.value.trim())}
            placeholder={t("userDbSettings.placeholder")}
          />
          <BtnsWrapper>
            <ToBackStepBtn onClick={() => setStep(1)}>
              <BsFillArrowLeftCircleFill size={30} color="rgb(255, 184, 85)" />
            </ToBackStepBtn>
            <SaveWordBtn onClick={saveWord}>{t("save word")}</SaveWordBtn>
          </BtnsWrapper>
        </InputWrapper>
      )}
    </Wrapper>
  );
};
