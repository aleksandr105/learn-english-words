import React, { useState } from "react";
import { BsTrash3Fill } from "react-icons/bs";
import {
  DeleteWordBtn,
  BtnYes,
  BtnNo,
  OptionDeleteTitle,
  DeletedWord,
  ButtonsWrapper,
} from "./DeleteWordMenu.styled";
import { OptionsModal } from "../OptionsModal/OptionsModal";
import { useTranslation } from "react-i18next";

const styleOptionsModal = {
  position: "absolute",
  zIndex: 120,
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
  const [showDeleteMenu, setShowDeleteMenu] = useState(false);

  const { t } = useTranslation();

  const handleDelWordMenuTogle = (e) => {
    e?.stopPropagation();
    setShowDeleteMenu((prev) => !prev);
    disabledBtnMenu((prev) => !prev);
  };

  const onDeleteWord = () => {
    disabledBtnMenu((prev) => !prev);
    setShowDeleteMenu((prev) => !prev);
  };

  const [beforeWord, afterWord] = t("optionsDeleteWord.optionDeleleTitle", {
    word: p.el,
  }).split(p.el);

  return (
    <>
      <DeleteWordBtn
        p={p}
        onClick={handleDelWordMenuTogle}
        disabled={disableBtnDeleteWord}
      >
        <BsTrash3Fill color="#FFB442" />
      </DeleteWordBtn>
      {showDeleteMenu && (
        <OptionsModal
          closeModal={handleDelWordMenuTogle}
          style={styleOptionsModal}
        >
          <OptionDeleteTitle>
            {beforeWord} <DeletedWord>{p.el}</DeletedWord> {afterWord}
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
