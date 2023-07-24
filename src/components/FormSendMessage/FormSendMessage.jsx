import { useState, useEffect } from "react";
import {
  InputWrapper,
  Form,
  CloseModalButton,
  Name,
  LoaderWrapper,
} from "./FormSendMessage.styled";
import { user } from "../../redux/auth/selectors";
import { useSelector } from "react-redux";
import { GrClose } from "react-icons/gr";
import { useTranslation } from "react-i18next";
import { onNatification } from "../../helpers";
import { RotatingLines } from "react-loader-spinner";
import { sendMessageDeveloper } from "../../operations";

export const FormSendMessage = ({ showModal }) => {
  const { name, email } = useSelector(user);
  const [message, setMessage] = useState("");
  const [showLoader, setShowLoader] = useState(false);
  const { t } = useTranslation();

  const checkingMessage = message.trim().length;

  useEffect(() => {
    const message = localStorage.getItem("message");
    if (!message) return;
    setMessage(message);
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!checkingMessage) {
      onNatification(t("modal.errorMessage"), { autoClose: 5000 });
      return;
    }
    setShowLoader(true);

    await sendMessageDeveloper({ name, email, message });

    setMessage("");

    localStorage.removeItem("message");

    onNatification(t("modal.successMassage"), {
      autoClose: 5000,
      type: "success",
    });
    setShowLoader(false);
    showModal(false);
  };

  const changeMessage = (e) => {
    setMessage(e.target.value);
    localStorage.setItem("message", e.target.value);
  };

  return (
    <>
      {showLoader && (
        <LoaderWrapper>
          <RotatingLines
            strokeColor="#5f5"
            strokeWidth="5"
            animationDuration="0.75"
            width="96"
            visible={true}
          />
        </LoaderWrapper>
      )}
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
    </>
  );
};
