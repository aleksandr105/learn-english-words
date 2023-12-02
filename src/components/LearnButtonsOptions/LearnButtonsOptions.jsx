import React, { useState, useEffect } from "react";
import { ListBtn, Btn, BtnShowModal } from "./LearnButtonsOptions.styled";
import { Modal } from "../Modal/Modal";
import { IoMdSettings } from "react-icons/io";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { allSettings } from "../../redux/userSettings/selectors";
import { setMyChoiceLearn } from "../../redux/userSettings/userSettingsSlice";
import {
  getBaseWordsForAuthorized,
  getUserWords,
} from "../../redux/words/operationsWords";
import { MainWordsDbSettings } from "../MainWordsDbSettings/MainWordsDbSettings";
import { deleteWords } from "../../redux/dictionarySettings/dictionarySettingsSlice";

export const LearnButtonsOptions = () => {
  const [showModal, setShowModal] = useState(false);
  const myChoiceLearn = useSelector(allSettings);
  const [showSelectedModal, setShowSelectedModal] = useState(
    myChoiceLearn.myChoiceLearn
  );
  const dispatch = useDispatch();

  const { t, i18n } = useTranslation();

  useEffect(() => {
    dispatch(deleteWords());
    document.body.style.overflow = showModal ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [dispatch, showModal]);

  const buttonText = [
    {
      text: t("thatLearnBtnText.basic"),
      component: <MainWordsDbSettings setShowModal={setShowModal} />,
    },
    { text: t("thatLearnBtnText.my"), component: <div>vccfdgfdgrfg</div> },
  ];

  const onChoiceLearn = (e) => {
    const btnIdx = Number(e.currentTarget.getAttribute("data-idx"));

    const newDataChoiceLearn = { ...myChoiceLearn, myChoiceLearn: btnIdx };

    localStorage.setItem("learnOptions", JSON.stringify(newDataChoiceLearn));

    dispatch(setMyChoiceLearn(btnIdx));

    if (btnIdx === 0)
      dispatch(getBaseWordsForAuthorized(i18n.resolvedLanguage));

    if (btnIdx === 1) dispatch(getUserWords(i18n.resolvedLanguage));
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
              <BtnShowModal
                onClick={() => {
                  setShowModal(true);
                  setShowSelectedModal(idx);
                }}
              >
                <IoMdSettings color="#FFB442" size={26} />
              </BtnShowModal>
              {showModal && idx === showSelectedModal && (
                <Modal showModal={toggleModal}>{el.component}</Modal>
              )}
            </li>
          );
        })}
      </ListBtn>
    </>
  );
};
