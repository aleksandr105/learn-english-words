import React, { useState, useEffect } from "react";
import { Form, Input } from "./SearchWordForm.styled";
import { useTranslation } from "react-i18next";

export const SearchWordForm = () => {
  const [seearchParams, setSeearchParams] = useState("");
  const { t } = useTranslation();

  useEffect(() => {}, [seearchParams]);

  const changeParams = (e) => {
    setSeearchParams(e.target.value.trim());
  };

  return (
    <Form>
      <Input
        placeholder={t("mainDbSettings.placeholder")}
        onChange={changeParams}
      />
    </Form>
  );
};
