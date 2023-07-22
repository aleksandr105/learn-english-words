import { Container } from "@mui/material";
import { Header } from "../Header/Header";
import { Outlet } from "react-router-dom";
import { Suspense, useRef, useEffect, useState } from "react";
import { Spinner } from "../Spinner/Spinner";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Footer } from "../Footer/Footer";
import { Main } from "./SharedLayout.styled";

export const SharedLayout = () => {
  const [height, setHeight] = useState(null);
  const footerHeight = useRef();

  useEffect(() => {
    setHeight(footerHeight.current.clientHeight);
  }, []);

  return (
    <>
      <ToastContainer />
      <Header />
      <Main height={height}>
        <Container>
          <Suspense fallback={<Spinner />}>
            <Outlet />
          </Suspense>
        </Container>
      </Main>
      <Footer ref={footerHeight} />
    </>
  );
};
