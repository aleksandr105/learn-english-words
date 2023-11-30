import React, { useState } from "react";
import { BsTrash3Fill } from "react-icons/bs";
import {
  DeleteWordBtn,
  BtnYes,
  BtnNo,
  OptionDeleteTitle,
  DeletedWord,
  ButtonsWrapper,
  SpinnerWrapper,
} from "./DeleteWordMenu.styled";
import { OptionsModal } from "../OptionsModal/OptionsModal";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { allSettings } from "../../redux/userSettings/selectors";
import {
  addWordToBlockList,
  removeUserWord,
} from "../../redux/words/operationsWords";
import { words } from "../../redux/words/selectors";
import { Oval } from "react-loader-spinner";
import { onNatification } from "../../helpers";

const styleOptionsModal = {
  position: "absolute",
  zIndex: 10000,
  width: "150px",
  top: "-100%",
  left: "50%",
  backgroundColor: "#EEEEEE",
  borderRadius: "10px",
  padding: "10px",
};

export const DeleteWordMenu = ({
  p,
  disabledBtnMenu,
  disableBtnDeleteWord,
}) => {
  const dispatch = useDispatch();
  const { myChoiceLearn } = useSelector(allSettings);
  const { arrKey, arrValue, arrAllWords, originalWords } = useSelector(words);
  const showSpinnerWhenAddsToBlockList = useSelector(
    (state) => state.words.showSpinnerWhenAddsToBlockList
  );

  const [showDeleteMenu, setShowDeleteMenu] = useState(false);
  const [showSpiner, setShowSpiner] = useState(false);

  const { t } = useTranslation();

  const handleDelWordMenuTogle = (e) => {
    e?.stopPropagation();
    setShowDeleteMenu((prev) => !prev);
    disabledBtnMenu((prev) => !prev);
  };

  const filterDeletingWords = (word) => {
    const newArrKey = arrKey.filter((el) => el !== word);
    const newArrValue = arrValue.filter(
      (el) => el !== Object.values(arrAllWords.find((el) => el[word]) || {})[1]
    );
    const newArrAllWords = arrAllWords.filter((el) => !el[word]);
    const newOriginalWords = originalWords.filter((el) => !el[word]);
    return { newArrKey, newArrValue, newArrAllWords, newOriginalWords };
  };

  const onDeleteWord = () => {
    setShowSpiner(true);
    switch (myChoiceLearn) {
      case 0:
        dispatch(
          addWordToBlockList({
            word: p.el,
            newState: filterDeletingWords(p.el),
          })
        ).then(() =>
          onNatification("Success", {
            autoClose: 2000,
            type: "success",
          })
        );
        break;
      case 1:
        dispatch(
          removeUserWord({
            word: p.el,
            newState: filterDeletingWords(p.el),
          })
        ).then(() =>
          onNatification("Success", {
            autoClose: 2000,
            type: "success",
          })
        );
        break;
      default:
        console.log("not value");
    }

    disabledBtnMenu((prev) => !prev);
    setShowDeleteMenu((prev) => !prev);
  };

  const [beforeWord, afterWord] = t("optionsDeleteWord.optionDeleleTitle", {
    word: p.el,
  }).split(p.el);

  return (
    <>
      {!showSpiner && (
        <DeleteWordBtn
          p={p}
          onClick={handleDelWordMenuTogle}
          disabled={disableBtnDeleteWord || showSpinnerWhenAddsToBlockList}
        >
          <BsTrash3Fill color="#FFB442" />
        </DeleteWordBtn>
      )}
      {showSpinnerWhenAddsToBlockList && showSpiner && (
        <SpinnerWrapper>
          <Oval
            height={22}
            width={22}
            strokeWidth={12}
            color="rgb(255, 180, 66)"
            secondaryColor="#FF7B14"
          />
        </SpinnerWrapper>
      )}
      {showDeleteMenu && (
        <OptionsModal
          closeModal={handleDelWordMenuTogle}
          style={styleOptionsModal}
        >
          <OptionDeleteTitle>
            {myChoiceLearn === 0 ? (
              <>
                {beforeWord} <DeletedWord>{p.el}</DeletedWord> {afterWord}
              </>
            ) : (
              <>
                {t("optionsDeleteWord.optionDeleteUserWordTitle")}
                <DeletedWord>{p.el}</DeletedWord>
              </>
            )}
          </OptionDeleteTitle>
          <ButtonsWrapper>
            <BtnYes onClick={onDeleteWord}>
              {t("optionsDeleteWord.btnYes")}
            </BtnYes>
            <BtnNo onClick={handleDelWordMenuTogle}>
              {t("optionsDeleteWord.btnNo")}
            </BtnNo>
          </ButtonsWrapper>
        </OptionsModal>
      )}
    </>
  );
};
