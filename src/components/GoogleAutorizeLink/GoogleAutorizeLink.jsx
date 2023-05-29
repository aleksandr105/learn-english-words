import React from "react";
import { Link, Wrapper, IconWrapper } from "./GoogleAutorizeLink.styled";
import { useTranslation } from "react-i18next";
import { FcGoogle } from "react-icons/fc";

export const GoogleAutorizeLink = () => {
  const { t } = useTranslation();

  return (
    <Wrapper>
      <Link href="https://cute-tan-slug-hat.cyclic.app/api/auth/google">
        {t("googleLinkAutorize.googleLogin")}
        <IconWrapper>
          <FcGoogle size="18px" />
        </IconWrapper>
      </Link>
    </Wrapper>
  );
};
