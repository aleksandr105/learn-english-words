import { Container } from "@mui/material";
import { Header } from "../Header/Header";
import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import { Spinner } from "../Spinner/Spinner";

export const SharedLayout = () => {
  return (
    <>
      <Header />
      <Container>
        <Suspense fallback={<Spinner />}>
          <Outlet />
        </Suspense>
      </Container>
    </>
  );
};
