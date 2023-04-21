import { Container } from "@mui/material";
import { Header } from "../Header/Header";
import { Outlet } from "react-router-dom";
import { Suspense } from "react";

export const SharedLayout = () => {
  return (
    <>
      <Header />
      <Container>
        <Suspense fallback={<div>Loading...</div>}>
          <Outlet />
        </Suspense>
      </Container>
    </>
  );
};
