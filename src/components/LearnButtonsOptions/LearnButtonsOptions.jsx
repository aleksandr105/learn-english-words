import React, { useState } from "react";
import { ListBtn, Btn, BtnShowModal } from "./LearnButtonsOptions.styled";
import { Modal } from "../Modal/Modal";
import { IoMdSettings } from "react-icons/io";
import { useTranslation } from "react-i18next";

export const LearnButtonsOptions = () => {
  const [showModal, setShowModal] = useState(false);
  const [myChoiceLearn, setMyChoiceLearn] = useState(
    JSON.parse(localStorage.getItem("learnOptions"))
  );

  const { t } = useTranslation();

  const buttonText = [
    { text: t("thatLearnBtnText.basic"), component: <div></div> },
    { text: t("thatLearnBtnText.my"), component: <div></div> },
  ];

  const onChoiceLearn = (e) => {
    const btnIdx = Number(e.currentTarget.getAttribute("data-idx"));

    const newDataChoiceLearn = { ...myChoiceLearn, myChoiceLearn: btnIdx };

    localStorage.setItem("learnOptions", JSON.stringify(newDataChoiceLearn));

    setMyChoiceLearn(newDataChoiceLearn);
  };

  const toggleModal = (e) => {
    if (e.code === "Escape") setShowModal(false);

    if (e.target === e.currentTarget) setShowModal((prev) => !prev);
  };

  return (
    <>
      <ListBtn>
        {buttonText.map((el, idx) => {
          return (
            <li key={el.text}>
              <Btn
                onClick={onChoiceLearn}
                p={{ idx, myChoiceLearn: myChoiceLearn.myChoiceLearn }}
                data-idx={idx}
              >
                {el.text}
              </Btn>
              <BtnShowModal onClick={() => setShowModal(true)}>
                <IoMdSettings color="#FFB442" size={26} />
              </BtnShowModal>
              {showModal && (
                <Modal showModal={toggleModal}>{el.component}</Modal>
              )}
            </li>
          );
        })}
      </ListBtn>
    </>
  );
};
