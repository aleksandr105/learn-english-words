import { useEffect } from "react";
import { createPortal } from "react-dom";
import { ModalItem, Backdrop } from "./Modal.styled";

const modalRoot = document.querySelector("#modal-root");

export const Modal = ({ showModal, children }) => {
  useEffect(() => {
    window.addEventListener("keydown", showModal);

    return () => {
      window.removeEventListener("keydown", showModal);
    };
  }, [showModal]);

  return createPortal(
    <Backdrop>
      <ModalItem>{children}</ModalItem>
    </Backdrop>,
    modalRoot
  );
};
