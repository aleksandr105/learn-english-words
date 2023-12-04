import React, { useState } from "react";
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
import {
  getBlockListWords,
  searchRequest,
} from "../../redux/dictionarySettings/operationDictionarySettings";
import { dataSettingsDictionary } from "../../redux/dictionarySettings/selectors";
import { Loading } from "../Loading/Loading";
import { removeWordFromBlockList } from "../../redux/dictionarySettings/operationDictionarySettings";
import { WordsNotFoundMessage } from "../WordsNotFoundMessage/WordsNotFoundMessage";

const style = {
  top: "45%",
};

export const MainWordsDbSettings = ({ setShowModal }) => {
  const [page, setPage] = useState(1);
  const [searchParams, setSeearchParams] = useState("");

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const {
    words: { data },
    isLoading,
  } = useSelector(dataSettingsDictionary);

  const getOnePageWordsBlockList = ({ limit, page }) => {
    setPage(1);
    dispatch(getBlockListWords({ limit, page }));
  };

  const searchWords = (text) => {
    dispatch(searchRequest(text));
  };

  return (
    <Wrapper>
      <CloseModalButton onClick={() => setShowModal(false)}>
        <GrClose />
      </CloseModalButton>
      <DbSettingsTitle>{t("mainDbSettings.title")}</DbSettingsTitle>
      <SearchWordForm
        searchWordsFunc={searchWords}
        getAllWords={getOnePageWordsBlockList}
        searchParams={searchParams}
        setSeearchParams={setSeearchParams}
      />
      <Loading isLoad={isLoading} styles={style} />
      {!data.length && !isLoading && <WordsNotFoundMessage />}
      {data !== 0 && data && (
        <ModalListSetting
          dellWordFromBlockList={removeWordFromBlockList}
          getWordsFromBlockList={getBlockListWords}
          page={page}
          setPage={setPage}
          searchParams={searchParams}
        />
      )}
    </Wrapper>
  );
};
