import { useState, useEffect } from "react";
import {
  InputWrapper,
  Form,
  CloseModalButton,
  Name,
} from "./FormSendMessage.styled";
import { user } from "../../redux/auth/selectors";
import { useSelector } from "react-redux";
import { GrClose } from "react-icons/gr";
import { useTranslation } from "react-i18next";

export const FormSendMessage = ({ showModal }) => {
  const { name, email } = useSelector(user);
  const [message, setMessage] = useState("");
  const { t } = useTranslation();

  useEffect(() => {
    const message = localStorage.getItem("message");
    if (!message) return;
    setMessage(message);
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    setMessage("");
    localStorage.removeItem("message");
    showModal(false);
  };

  const changeMessage = (e) => {
    setMessage(e.target.value);
    localStorage.setItem("message", e.target.value);
  };

  return (
    <Form onSubmit={onSubmit}>
      <CloseModalButton type="button" onClick={() => showModal(false)}>
        <GrClose size={"15px"} />
      </CloseModalButton>
      <InputWrapper>
        <h3>{t("modal.title")}</h3>
        <Name>{name}</Name>
        <textarea
          placeholder={t("modal.placeholder")}
          rows="5"
          onChange={changeMessage}
          value={message}
        ></textarea>
        <button type="submit">{t("modal.button")}</button>
      </InputWrapper>
    </Form>
  );
};
