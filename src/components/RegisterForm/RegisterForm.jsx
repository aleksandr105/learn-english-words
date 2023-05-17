import React from "react";
import {
  Form,
  Input,
  InputWrapper,
  InputLabel,
  ButtonSubmit,
  ErrorMessage,
} from "./RegisterForm.styled";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";
import * as yup from "yup";

export const RegisterForm = () => {
  const { t } = useTranslation();

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
    console.log(data);
    reset();
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <InputWrapper>
        <InputLabel htmlFor="name">{t("inputLabel.name")}</InputLabel>
        <Input type="string" {...register("name")} changeError={errors.name} />
        <ErrorMessage>{errors.name?.message}</ErrorMessage>
      </InputWrapper>
      <InputWrapper>
        <InputLabel htmlFor="email">{t("inputLabel.email")}</InputLabel>
        <Input type="email" {...register("email")} changeError={errors.email} />
        <ErrorMessage>{errors.email?.message}</ErrorMessage>
      </InputWrapper>
      <InputWrapper>
        <InputLabel htmlFor="password">{t("inputLabel.password")}</InputLabel>
        <Input
          type="password"
          {...register("password")}
          changeError={errors.password}
        />
        <ErrorMessage>{errors.password?.message}</ErrorMessage>
      </InputWrapper>
      <ButtonSubmit type="submit" isErr={isValid} disabled={!isValid}>
        {t("registerBtnSubmit.button")}
      </ButtonSubmit>
    </Form>
  );
};
