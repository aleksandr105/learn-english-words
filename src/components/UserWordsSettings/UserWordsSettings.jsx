import React, { useState } from "react";
import {
  Wrapper,
  CloseModalButton,
  DbSettingsTitle,
} from "./UserWordsSettings.styled";
import { GrClose } from "react-icons/gr";
import { useTranslation } from "react-i18next";
import { SearchWordForm } from "../SearchWordForm/SearchWordForm";
import { Loading } from "../Loading/Loading";
import { useDispatch, useSelector } from "react-redux";
import { dataSettingsDictionary } from "../../redux/dictionarySettings/selectors";
import { WordsNotFoundMessage } from "../WordsNotFoundMessage/WordsNotFoundMessage";
import { ModalListSetting } from "../ModalListSetting/ModalListSetting";

const style = {
  top: "45%",
};

export const UserWordsSettings = ({ setShowModal }) => {
  const [page, setPage] = useState(1);
  const [searchParams, setSeearchParams] = useState("");
  const dispatch = useDispatch();

  const {
    words: { data },
    isLoading,
  } = useSelector(dataSettingsDictionary);

  const { t } = useTranslation();

  return (
    <Wrapper>
      <CloseModalButton onClick={() => setShowModal(false)}>
        <GrClose />
      </CloseModalButton>
      <DbSettingsTitle>{t("userDbSettings.title")}</DbSettingsTitle>
      <SearchWordForm
        searchWordsFunc={() => {}}
        getAllWords={() => {}}
        searchParams={searchParams}
        setSeearchParams={setSeearchParams}
        setPage={setPage}
      />
      <Loading isLoad={isLoading} styles={style} />
      {!data.length && !isLoading && <WordsNotFoundMessage />}
      {data !== 0 && data && (
        <ModalListSetting
          dellWordFromBlockList={() => {}}
          getWordsFromBlockList={() => {}}
          getSearchWordsBlockList={() => {}}
          page={page}
          setPage={setPage}
          searchParams={searchParams}
        />
      )}
    </Wrapper>
  );
};