import { Container } from "@mui/material";
import { Header } from "../Header/Header";
import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import { Spinner } from "../Spinner/Spinner";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const SharedLayout = () => {
  return (
    <>
      <ToastContainer />
      <Header />
      <Container>
        <Suspense fallback={<Spinner />}>
          <Outlet />
        </Suspense>
      </Container>
    </>
  );
};
