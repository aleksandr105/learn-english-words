import React, { useState } from "react";
import {
  List,
  Item,
  ButtonDelete,
  SpinnerWrapper,
} from "./ModalListSetting.styled";
import { MdOutlineClear } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { dataSettingsDictionary } from "../../redux/dictionarySettings/selectors";
import { Oval } from "react-loader-spinner";
import { onNatification } from "../../helpers";
import { useTranslation } from "react-i18next";
import { InfiniteScroll } from "../InfiniteScroll/InfiniteScroll";
import { EditingText } from "../EditingText/EditingText";

export const ModalListSetting = ({
  dellWordFromBlockList,
  getWordsFromBlockList,
  page,
  setPage,
  searchParams,
  getSearchWordsBlockList,
}) => {
  const dispatch = useDispatch();
  const { isLoadingDellFromBlockList, words } = useSelector(
    dataSettingsDictionary
  );
  const [elClick, setElClick] = useState(null);
  const { t } = useTranslation();

  const onDellWord = async (word) => {
    try {
      setElClick(word);
      const filteredWords = words.data.filter((el) => el !== word);

      await dispatch(
        dellWordFromBlockList({
          word,
          newState: { data: filteredWords, total: words.total },
        })
      );

      onNatification(t("mainDbSettings.dellWordForBlockListToast", { word }), {
        autoClose: 2000,
        type: "success",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDataFunc = async ({ page, limit, words }) => {
    if (words.data.length < words.total) {
      setPage((prev) => prev + 1);

      searchParams === ""
        ? dispatch(getWordsFromBlockList({ page, limit, words: words.data }))
        : dispatch(
            getSearchWordsBlockList({
              searchParams,
              limit,
              page,
              words: words.data,
            })
          );
      return;
    }
  };

  return (
    <List>
      <InfiniteScroll
        data={words}
        fetchDataFunc={fetchDataFunc}
        limit={50}
        page={page}
      >
        {words.data.map((el) => (
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
            <EditingText text={el} query={searchParams} />
          </Item>
        ))}
      </InfiniteScroll>
    </List>
  );
};
