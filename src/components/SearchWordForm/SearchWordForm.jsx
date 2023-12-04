import React, { useEffect } from "react";
import { Form, Input, DellSearchTextBtn } from "./SearchWordForm.styled";
import { useTranslation } from "react-i18next";
import { MdOutlineClear } from "react-icons/md";

export const SearchWordForm = ({
  searchWordsFunc,
  getAllWords,
  searchParams,
  setSeearchParams,
}) => {
  const { t } = useTranslation();

  useEffect(() => {
    if (searchParams === "") {
      getAllWords({ limit: 50, page: 1 });
      return;
    }

    const delayDebounceFn = setTimeout(() => {
      searchWordsFunc(searchParams);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const changeParams = (e) => {
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
