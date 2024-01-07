import React, { useState } from "react";
import {
  Wrapper,
  CloseModalButton,
  DbSettingsTitle,
  ShowAddWordBtn,
} from "./UserWordsSettings.styled";
import { GrClose } from "react-icons/gr";
import { useTranslation } from "react-i18next";
import { SearchWordForm } from "../SearchWordForm/SearchWordForm";
import { Loading } from "../Loading/Loading";
import { useDispatch, useSelector } from "react-redux";
import { dataSettingsDictionary } from "../../redux/dictionarySettings/selectors";
import { WordsNotFoundMessage } from "../WordsNotFoundMessage/WordsNotFoundMessage";
import { ModalListSetting } from "../ModalListSetting/ModalListSetting";
import {
  getUserWordsFromSettings,
  removeWordUserList,
  searchUserWords,
} from "../../redux/dictionarySettings/operationDictionarySettings";
import { AddWordsForm } from "../AddWordsForm/AddWordsForm";

const style = {
  top: "45%",
};

export const UserWordsSettings = ({ setShowModal }) => {
  const [page, setPage] = useState(1);
  const [searchParams, setSeearchParams] = useState("");
  const [addWordShow, setAddWordShow] = useState(false);
  const dispatch = useDispatch();

  const {
    words: { data },
    isLoading,
  } = useSelector(dataSettingsDictionary);

  const { t } = useTranslation();

  const getOnePageUserWords = ({ limit, page }) => {
    setPage(1);
    dispatch(getUserWordsFromSettings({ limit, page }));
  };

  const searchWords = ({ searchParams, limit, page }) => {
    dispatch(searchUserWords({ searchParams, limit, page }));
  };

  return (
    <Wrapper>
      <CloseModalButton onClick={() => setShowModal(false)}>
        <GrClose />
      </CloseModalButton>
      <DbSettingsTitle>{t("userDbSettings.title")}</DbSettingsTitle>
      {!addWordShow ? (
        <SearchWordForm
          searchWordsFunc={searchWords}
          getAllWords={getOnePageUserWords}
          searchParams={searchParams}
          setSeearchParams={setSeearchParams}
          setPage={setPage}
        />
      ) : (
        <AddWordsForm setAddWordShow={setAddWordShow} />
      )}
      {!addWordShow && (
        <ShowAddWordBtn onClick={() => setAddWordShow((prev) => !prev)}>
          {t("userDbSettings.showAddWordBtn")}
        </ShowAddWordBtn>
      )}
      <Loading isLoad={isLoading && !addWordShow} styles={style} />
      {!data.length && !isLoading && !addWordShow && <WordsNotFoundMessage />}
      {data !== 0 && data && !addWordShow && (
        <ModalListSetting
          dellWordFromBlockList={removeWordUserList}
          getWordsFromBlockList={getUserWordsFromSettings}
          getSearchWordsBlockList={searchUserWords}
          page={page}
          setPage={setPage}
          searchParams={searchParams}
        />
      )}
    </Wrapper>
  );
};
