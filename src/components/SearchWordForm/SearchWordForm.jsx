import React, { useEffect } from "react";
import { Form, Input, DellSearchTextBtn } from "./SearchWordForm.styled";
import { useTranslation } from "react-i18next";
import { MdOutlineClear } from "react-icons/md";
import { useDispatch } from "react-redux";
import { deleteWords } from "../../redux/dictionarySettings/dictionarySettingsSlice";

export const SearchWordForm = ({
  searchWordsFunc,
  getAllWords,
  searchParams,
  setSeearchParams,
  setPage,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (searchParams === "") {
      dispatch(deleteWords());

      getAllWords({ limit: 50, page: 1 });
      return;
    }

    const delayDebounceFn = setTimeout(() => {
      setPage(1);
      dispatch(deleteWords());
      searchWordsFunc({ searchParams, limit: 50, page: 1 });
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const changeParams = (e) => {
    console.log("e");
    if (searchParams === "") setPage(1);
    setSeearchParams(e.target.value.trim());
  };

  return (
    <Form>
      {searchParams !== "" && (
        <DellSearchTextBtn onClick={() => setSeearchParams("")}>
          <MdOutlineClear color="red" size={25} />
        </DellSearchTextBtn>
      )}
      <Input
        placeholder={t("mainDbSettings.placeholder")}
        onChange={changeParams}
        value={searchParams}
      />
    </Form>
  );
};
