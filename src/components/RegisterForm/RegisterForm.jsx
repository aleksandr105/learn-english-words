import React from "react";
import {
  Form,
  Input,
  InputWrapper,
  InputLabel,
  ButtonSubmit,
  ErrorMessage,
  LoaderWrapper,
} from "./RegisterForm.styled";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";
import * as yup from "yup";
import { registerUser } from "../../redux/auth/authOperations";
import { useDispatch, useSelector } from "react-redux";
import { RotatingLines } from "react-loader-spinner";
import { isLoading, errorAuth } from "../../redux/auth/selectors";

export const RegisterForm = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const isLoadingAuth = useSelector(isLoading);
  const error = useSelector(errorAuth);

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

  return (
    <>
      <LoaderWrapper>
        <RotatingLines
          strokeColor="#5f5"
          strokeWidth="5"
          animationDuration="0.75"
          width="96"
          visible={isLoadingAuth}
          style={{ margin: "0 auto", display: "block" }}
        />
      </LoaderWrapper>
      {!isLoadingAuth && !error && (
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
              type="password"
              {...register("password")}
              changeError={errors.password}
            />
            <ErrorMessage>{errors.password?.message}</ErrorMessage>
          </InputWrapper>
          <ButtonSubmit
            type="submit"
            p={isValid ? "true" : undefined}
            disabled={!isValid}
          >
            {t("registerBtnSubmit.button")}
          </ButtonSubmit>
        </Form>
      )}
    </>
  );
};
