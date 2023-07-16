import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  InputWrapper,
  InputLabel,
  ButtonSubmit,
  ErrorMessage,
  ErrorMessageWrapper,
  ErrorMessageAfterRequest,
  ErrorMessageButton,
  ErrorMessageTitle,
  SuccessMessageWrapper,
  SuccessMassageTitle,
  SuccessMassageText,
  SuccessMassageButton,
  ShowPassword,
} from "./RegisterForm.styled";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";
import * as yup from "yup";
import { registerUser } from "../../redux/auth/authOperations";
import { useDispatch, useSelector } from "react-redux";
import { errorAuth, successRegister } from "../../redux/auth/selectors";
import { removeErrorMassage, removeSuccess } from "../../redux/auth/authSlice";
import { BiShow, BiHide } from "react-icons/bi";
import { GoogleAutorizeLink } from "../GoogleAutorizeLink/GoogleAutorizeLink";

export const RegisterForm = () => {
  const { t, i18n } = useTranslation();
  const [isShow, setIsShow] = useState("password");
  const dispatch = useDispatch();
  const error = useSelector(errorAuth);
  const isSuccess = useSelector(successRegister);

  useEffect(() => {
    return () => {
      dispatch(removeErrorMassage());
      dispatch(removeSuccess());
    };
  }, [dispatch]);

  const schema = yup.object().shape({
    name: yup
      .string(() => t("customErrorMessages.string"))
      .required(() => t("customErrorMessages.required"))
      .min(3, () => t("customErrorMessages.minName", { count: 3 }))
      .max(32, () => t("customErrorMessages.max", { count: 32 })),
    email: yup
      .string(() => t("customErrorMessages.string"))
      .required(() => t("customErrorMessages.required"))
      .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, () =>
        t("customErrorMessages.email")
      ),
    password: yup
      .string(() => t("customErrorMessages.string"))
      .required(() => t("customErrorMessages.required"))
      .min(6, () => t("customErrorMessages.min", { count: 6 }))
      .max(32, () => t("customErrorMessages.max", { count: 32 })),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "all",
  });

  const onSubmit = (data) => {
    dispatch(registerUser({ ...data, language: i18n.language }));
    reset();
  };

  const showPassword = () => {
    if (isShow === "password") setIsShow("text");
    if (isShow === "text") setIsShow("password");
  };

  return (
    <>
      {!error && !isSuccess && (
        <>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <InputWrapper>
              <InputLabel htmlFor="name">{t("inputLabel.name")}</InputLabel>
              <Input
                type="string"
                {...register("name")}
                changeError={errors.name}
              />
              <ErrorMessage>{errors.name?.message}</ErrorMessage>
            </InputWrapper>
            <InputWrapper>
              <InputLabel htmlFor="email">{t("inputLabel.email")}</InputLabel>
              <Input
                type="email"
                {...register("email")}
                changeError={errors.email}
              />
              <ErrorMessage>{errors.email?.message}</ErrorMessage>
            </InputWrapper>
            <InputWrapper>
              <InputLabel htmlFor="password">
                {t("inputLabel.password")}
              </InputLabel>
              <Input
                type={isShow}
                {...register("password")}
                changeError={errors.password}
              />
              <ErrorMessage>{errors.password?.message}</ErrorMessage>
              <ShowPassword onClick={showPassword} type="button">
                {isShow === "password" ? (
                  <BiShow size={"25px"} />
                ) : (
                  <BiHide size={"25px"} />
                )}
              </ShowPassword>
            </InputWrapper>
            <ButtonSubmit
              type="submit"
              p={isValid ? "true" : undefined}
              disabled={!isValid}
            >
              {t("registerBtnSubmit.button")}
            </ButtonSubmit>
          </Form>
          <GoogleAutorizeLink />
        </>
      )}
      {error && (
        <ErrorMessageWrapper>
          <ErrorMessageTitle>
            {t("registerBtnSubmit.errorTitle")}
          </ErrorMessageTitle>
          <ErrorMessageAfterRequest>{error}</ErrorMessageAfterRequest>
          <ErrorMessageButton
            type="button"
            onClick={() => dispatch(removeErrorMassage())}
          >
            {t("registerBtnSubmit.errorMessage")}
          </ErrorMessageButton>
        </ErrorMessageWrapper>
      )}
      {isSuccess && (
        <SuccessMessageWrapper>
          <SuccessMassageTitle>
            {t("successRegister.successTitle")}
          </SuccessMassageTitle>
          <SuccessMassageText>
            {t("successRegister.successMassage")}
          </SuccessMassageText>
          <SuccessMassageButton
            type="button"
            onClick={() => dispatch(removeSuccess())}
          >
            {t("successRegister.successButton")}
          </SuccessMassageButton>
        </SuccessMessageWrapper>
      )}
    </>
  );
};
