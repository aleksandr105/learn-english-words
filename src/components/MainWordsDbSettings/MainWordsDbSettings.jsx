import React, { useEffect } from "react";
import {
  Wrapper,
  DbSettingsTitle,
  CloseModalButton,
} from "./MainWordsDbSettings.styled";
import { useTranslation } from "react-i18next";
import { GrClose } from "react-icons/gr";
import { SearchWordForm } from "../SearchWordForm/SearchWordForm";
import { ModalListSetting } from "../ModalListSetting/ModalListSetting";
import { useDispatch, useSelector } from "react-redux";
import { getBlockListWords } from "../../redux/dictionarySettings/operationDictionarySettings";
import { dataSettingsDictionary } from "../../redux/dictionarySettings/selectors";
import { Spinner } from "../Spinner/Spinner";
import { removeWordFromBlockList } from "../../redux/dictionarySettings/operationDictionarySettings";

export const MainWordsDbSettings = ({ setShowModal }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { words, isLoading } = useSelector(dataSettingsDictionary);

  useEffect(() => {
    dispatch(getBlockListWords());
  }, [dispatch]);

  return (
    <Wrapper>
      <CloseModalButton onClick={() => setShowModal(false)}>
        <GrClose />
      </CloseModalButton>
      <DbSettingsTitle>{t("mainDbSettings.title")}</DbSettingsTitle>
      <SearchWordForm />
      <Spinner isLoad={isLoading} />
      {words !== 0 && (
        <ModalListSetting
          data={words}
          requestFunction={removeWordFromBlockList}
        />
      )}
    </Wrapper>
  );
};
