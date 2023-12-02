import React, { useState } from "react";
import {
  List,
  Item,
  ItemText,
  ButtonDelete,
  SpinnerWrapper,
} from "./ModalListSetting.styled";
import { MdOutlineClear } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { dataSettingsDictionary } from "../../redux/dictionarySettings/selectors";
import { Oval } from "react-loader-spinner";
import { onNatification } from "../../helpers";
import { useTranslation } from "react-i18next";

export const ModalListSetting = ({ data, requestFunction }) => {
  const dispatch = useDispatch();
  const { isLoadingDellFromBlockList } = useSelector(dataSettingsDictionary);
  const [elClick, setElClick] = useState(null);
  const { t } = useTranslation();

  const onDellWord = async (word) => {
    try {
      setElClick(word);
      const newState = data.filter((el) => el !== word);

      await dispatch(requestFunction({ word, newState }));

      onNatification(t("mainDbSettings.dellWordForBlockListToast", { word }), {
        autoClose: 2000,
        type: "success",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <List>
      {data.map((el) => (
        <Item key={el}>
          {elClick !== el && (
            <ButtonDelete
              onClick={() => onDellWord(el)}
              disabled={isLoadingDellFromBlockList}
            >
              <MdOutlineClear color="red" size={25} />
            </ButtonDelete>
          )}
          {elClick === el && isLoadingDellFromBlockList && (
            <SpinnerWrapper>
              <Oval
                height={25}
                width={25}
                strokeWidth={12}
                color="rgb(255, 180, 66)"
                secondaryColor="#FF7B14"
              />
            </SpinnerWrapper>
          )}
          <ItemText>{el}</ItemText>
        </Item>
      ))}
    </List>
  );
};
