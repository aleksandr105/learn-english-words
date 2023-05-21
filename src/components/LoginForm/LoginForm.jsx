import React, { useState } from "react";
import {
  Form,
  Input,
  InputWrapper,
  InputLabel,
  ButtonSubmit,
  ErrorMessage,
  ShowPassword,
} from "./LoginForm.styled";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";
import * as yup from "yup";
import { BiShow, BiHide } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { login } from "../../redux/auth/authOperations";

export const LoginForm = () => {
  const { t } = useTranslation();
  const [isShow, setIsShow] = useState("password");
  const dispatch = useDispatch();

  const schema = yup.object().shape({
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
    dispatch(login(data));
    reset();
  };

  const showPassword = () => {
    if (isShow === "password") setIsShow("text");
    if (isShow === "text") setIsShow("password");
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <InputWrapper>
        <InputLabel htmlFor="email">{t("inputLabel.email")}</InputLabel>
        <Input type="email" {...register("email")} changeError={errors.email} />
        <ErrorMessage>{errors.email?.message}</ErrorMessage>
      </InputWrapper>
      <InputWrapper>
        <InputLabel htmlFor="password">{t("inputLabel.password")}</InputLabel>
        <Input
          type={isShow}
          {...register("password")}
          changeError={errors.password}
        />
        <ErrorMessage>{errors.password?.message}</ErrorMessage>
        <ShowPassword onClick={showPassword}>
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
        {t("registerBtnSubmit.loginButton")}
      </ButtonSubmit>
    </Form>
  );
};
