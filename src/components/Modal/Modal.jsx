import { useEffect } from "react";
import { createPortal } from "react-dom";
import { Backdrop } from "./Modal.styled";

const modalRoot = document.querySelector("#modal-root");

export const Modal = ({ showModal, children }) => {
  useEffect(() => {
    window.addEventListener("keydown", showModal);

    return () => {
      window.removeEventListener("keydown", showModal);
    };
  }, [showModal]);

  return createPortal(
    <Backdrop onClick={showModal}>{children}</Backdrop>,
    modalRoot
  );
};
