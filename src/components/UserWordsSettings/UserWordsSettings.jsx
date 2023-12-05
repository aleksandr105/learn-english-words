import React, { useState } from "react";
import {
  Wrapper,
  CloseModalButton,
  DbSettingsTitle,
} from "./UserWordsSettings.styled";
import { GrClose } from "react-icons/gr";
import { useTranslation } from "react-i18next";
import { SearchWordForm } from "../SearchWordForm/SearchWordForm";

export const UserWordsSettings = ({ setShowModal }) => {
  const [page, setPage] = useState(1);
  const [searchParams, setSeearchParams] = useState("");

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
    </Wrapper>
  );
};
