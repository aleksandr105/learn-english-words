import React, { useState, useEffect } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/auth/authOperations";
import { removeErrorMassage } from "../../redux/auth/authSlice";
import { errorAuth } from "../../redux/auth/selectors";
import { onNatification } from "../../helpers";

export const LoginForm = () => {
  const { t, i18n } = useTranslation();
  const [isShow, setIsShow] = useState("password");
  const dispatch = useDispatch();
  const errorMessaage = useSelector(errorAuth);

  useEffect(() => {
    if (errorMessaage) onNatification(errorMessaage, { autoClose: true });
    return () => {
      dispatch(removeErrorMassage());
    };
  }, [dispatch, errorMessaage]);

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
    dispatch(login({ ...data, language: i18n.language }));
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
        {t("registerBtnSubmit.loginButton")}
      </ButtonSubmit>
    </Form>
  );
};
