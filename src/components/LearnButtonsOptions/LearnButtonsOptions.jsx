import React, { useState } from "react";
import { ListBtn, Btn, BtnShowModal } from "./LearnButtonsOptions.styled";
import { Modal } from "../Modal/Modal";
import { IoMdSettings } from "react-icons/io";

export const LearnButtonsOptions = () => {
  const [showModal, setShowModal] = useState(false);
  const [myChoiceLearn, setMyChoiceLearn] = useState(
    JSON.parse(localStorage.getItem("learnOptions"))
  );

  const onChoiceLearn = (e) => {
    console.log(e.target.textContent);
  };

  const toggleModal = (e) => {
    if (e.code === "Escape") setShowModal(false);

    if (e.target === e.currentTarget) setShowModal((prev) => !prev);
  };

  return (
    <>
      <ListBtn>
        <li>
          <Btn onClick={onChoiceLearn}>База слов приложения</Btn>
          <BtnShowModal onClick={() => setShowModal(true)}>
            <IoMdSettings color="#FFB442" size={26} />
          </BtnShowModal>
          {showModal && <Modal showModal={toggleModal}></Modal>}
        </li>
        <li>
          <Btn onClick={onChoiceLearn}>Моя база слов</Btn>
          <BtnShowModal onClick={() => setShowModal(true)}>
            <IoMdSettings color="#FFB442" size={26} />
          </BtnShowModal>
          {showModal && <Modal showModal={toggleModal}></Modal>}
        </li>
      </ListBtn>
    </>
  );
};
