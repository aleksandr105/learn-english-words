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
  ErrorValidationMessage,
} from "./AddWordsForm.styled";
import { useTranslation } from "react-i18next";
import { string } from "yup";
import { useDispatch, useSelector } from "react-redux";
import { addWordToUserDictionary } from "../../redux/dictionarySettings/operationDictionarySettings";
import { words } from "../../redux/words/selectors";

export const AddWordsForm = ({ setAddWordShow }) => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const currentWords = useSelector(words);
  const [step, setStep] = useState(1);
  const [englishWord, setEnglishWord] = useState("");
  const [translate, setTranslate] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const orErrorStep1 = englishWord === "" || errorMessage;
  const orErrorStep2 = translate === "" || errorMessage;
  let currentLanguage;
  let regex;

  switch (i18n.language) {
    case "ru":
      currentLanguage = "русские";
      regex = /^[а-яА-ЯёЁ]+$/;
      break;

    case "ua":
      currentLanguage = "українські";
      regex = /^[а-щА-ЩЬьЮюЯяЇїІіЄєҐґ']+$/;
      break;

    case "pl":
      currentLanguage = "polski";
      regex = /^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ]+$/;
      break;

    default:
      currentLanguage = "Polski";
      regex = /^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ]+$/;
  }

  const schemaEnglishWord = string()
    .required(t("userDbSettings.errorMessageRequired"))
    .min(2, t("userDbSettings.errorMessageMin"))
    .max(15, t("userDbSettings.errorMessageMax"))
    .matches(/^[a-zA-Z]+$/, t("userDbSettings.errorMessageMatches"));

  const translationWordSchema = string()
    .required(t("userDbSettings.errorMessageRequired"))
    .min(2, t("userDbSettings.errorMessageMin"))
    .max(15, t("userDbSettings.errorMessageMax"))
    .matches(
      regex,
      t("userDbSettings.errorMessageWrongLanguage", { currentLanguage })
    );

  useEffect(() => {
    const storageData = localStorage.getItem("vocabularyFormData");
    if (storageData) {
      const { englishWord, translate, step } = JSON.parse(storageData);

      const onValidityCheck = async () => {
        try {
          setStep(step);
          setEnglishWord(englishWord);
          setTranslate(translate);

          if (englishWord === "" || translate === "") return;

          await schemaEnglishWord.validate(englishWord);
          if (step === 2) await translationWordSchema.validate(translate);
          setErrorMessage(null);
        } catch (error) {
          setErrorMessage(error.message);
        }
      };

      onValidityCheck();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "vocabularyFormData",
      JSON.stringify({ englishWord, translate, step })
    );
  }, [step, englishWord, translate]);

  const handleEnglishWordChange = async (e) => {
    try {
      const value = e.target.value.trim();

      setEnglishWord(value);

      await schemaEnglishWord.validate(value);
      setErrorMessage(null);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const goToStepTwo = async () => {
    try {
      setStep(2);
      if (translate === "") return;
      await translationWordSchema.validate(translate);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handleTranslationChange = async (e) => {
    try {
      const value = e.target.value.trim();

      setTranslate(value);
      await translationWordSchema.validate(value);
      setErrorMessage(null);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const saveWord = async () => {
    await dispatch(
      await addWordToUserDictionary({
        data: {
          [englishWord]: [translate, translate, translate],
        },
        messageSuccess: t("userDbSettings.successedAddingWord"),
        messageError: t("userDbSettings.errorAddingWord"),
        currentWords,
        language: i18n.language,
      })
    );

    localStorage.setItem(
      "vocabularyFormData",
      JSON.stringify({ englishWord: "", translate: "", step: 1 })
    );
    setAddWordShow();
  };

  return (
    <Wrapper>
      {errorMessage && (
        <ErrorValidationMessage>{errorMessage}</ErrorValidationMessage>
      )}
      {step === 1 && (
        <InputWrapper>
          <InputTitle>{t("userDbSettings.inputTitleEngl")}</InputTitle>
          <Input
            autocomplete="off"
            type="text"
            name="englishWord"
            value={englishWord}
            onChange={handleEnglishWordChange}
            placeholder="World"
          />
          <BtnsWrapper>
            <ToBackStepBtn
              onClick={() => {
                setAddWordShow();
                setErrorMessage(null);
              }}
            >
              {t("userDbSettings.backBtn")}
            </ToBackStepBtn>
            <NextStepBtn
              disabled={orErrorStep1}
              onClick={goToStepTwo}
              orDisabled={orErrorStep1}
            >
              {t("userDbSettings.nextBtn")}
            </NextStepBtn>
          </BtnsWrapper>
        </InputWrapper>
      )}
      {step === 2 && (
        <InputWrapper>
          <InputTitle>
            {t("userDbSettings.inputTitileTranslation")}{" "}
            <EnglishWordWrapper>{englishWord}</EnglishWordWrapper>
          </InputTitle>
          <Input
            autocomplete="off"
            type="text"
            name="translateWord"
            value={translate}
            onChange={handleTranslationChange}
            placeholder={t("userDbSettings.placeholder")}
          />
          <BtnsWrapper>
            <ToBackStepBtn
              onClick={() => {
                setStep(1);
                setErrorMessage(null);
              }}
            >
              {t("userDbSettings.backBtn")}
            </ToBackStepBtn>
            <SaveWordBtn
              onClick={saveWord}
              disabled={orErrorStep2}
              orDisabled={orErrorStep2}
            >
              {t("userDbSettings.saveBtn")}
            </SaveWordBtn>
          </BtnsWrapper>
        </InputWrapper>
      )}
    </Wrapper>
  );
};
