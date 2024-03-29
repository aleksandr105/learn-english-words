import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../axiosSettings";
import { onNatification } from "../../helpers";
import { setWordsToRedux } from "../../helpers";
import { setNewStateAfterDellWord } from "../words/wordsSlice";

export const getBlockListWords = createAsyncThunk(
  "settingsDictionary/getBlockList",
  async ({ page, limit, words = [] }, { rejectWithValue }) => {
    try {
      const { data } = await instance.get(
        `words/get_words_block_list?page=${page}&limit=${limit}`
      );

      return { data: [...words, ...data.data], total: data.total };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const removeWordFromBlockList = createAsyncThunk(
  "settingsDictionary/removeWordFromBlockList",
  async ({ word, newState }, { rejectWithValue }) => {
    try {
      await instance.delete("words/remove_word_from_block_list", {
        data: { words: [word] },
      });

      return newState;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const searchRequest = createAsyncThunk(
  "settingsDictionary/searchRequest",
  async ({ searchParams, limit, page, words = [] }, { rejectWithValue }) => {
    try {
      const { data } = await instance.get(
        `words/get_search_words_block_list/${searchParams}?limit=${limit}&page=${page}`
      );

      return { data: [...words, ...data.data], total: data.total };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getUserWordsFromSettings = createAsyncThunk(
  "settingsDictionary/getUserWords",
  async ({ page, limit, words = [] }, { rejectWithValue }) => {
    try {
      const { data } = await instance.get(
        `words/get_all_user_words?page=${page}&limit=${limit}`
      );

      return { data: [...words, ...data.data], total: data.total };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const removeWordUserList = createAsyncThunk(
  "settingsDictionary/dellWordFromUserDictionary",
  async ({ word, newState }, { rejectWithValue }) => {
    try {
      await instance.delete("words/remove_user_words", {
        data: { words: [word] },
      });

      return newState;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const searchUserWords = createAsyncThunk(
  "settingsDictionary/searchUserWords",
  async ({ searchParams, limit, page, words = [] }, { rejectWithValue }) => {
    try {
      const { data } = await instance.get(
        `words/search_user_words/${searchParams}?limit=${limit}&page=${page}`
      );

      return { data: [...words, ...data.data], total: data.total };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addWordToUserDictionary = createAsyncThunk(
  "settingsDictionary/addUserWord",
  async (
    { data, messageSuccess, messageError, currentWords, language },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const response = await instance.patch("words/add_user_word", data);
      onNatification(messageSuccess, { type: "success", autoClose: 3000 });

      const { arrKey, arrValue, arrAllWords, originalWords } = currentWords;

      const { myChoiceLearn } = JSON.parse(
        localStorage.getItem("learnOptions")
      );

      if (currentWords.arrAllWords.length < 10 && myChoiceLearn === 1) {
        const addedWord = response.data.userWords[0];

        const {
          arrKey: key,
          arrValue: value,
          arrAllWords: words,
        } = setWordsToRedux({
          data: [addedWord],
          currentLanguage: language,
        });

        const sort = (a, b) => Math.random() - 0.5;

        dispatch(
          setNewStateAfterDellWord({
            newArrKey: [...key, ...arrKey].sort(sort),
            newArrValue: [...value, ...arrValue].sort(sort),
            newArrAllWords: [...words, ...arrAllWords],
            newOriginalWords: [addedWord, ...originalWords],
          })
        );

        return response;
      }

      return response;
    } catch (error) {
      if (error.response.status === 400) {
        let translatedErrorMessage = "";

        const errorMessage = {
          ru: "Невозможно добавить!!! Это слово или перевод уже существует в словаре",
          ua: "Неможливо додати!!! Це слово або переклад вже існує у словнику",
          pl: "Nie można dodać!!! To słowo lub tłumaczenie już istnieje w słowniku",
        };

        switch (language) {
          case "ru":
            translatedErrorMessage = errorMessage.ru;
            break;
          case "ua":
            translatedErrorMessage = errorMessage.ua;
            break;
          case "pl":
            translatedErrorMessage = errorMessage.pl;
            break;
          default:
            translatedErrorMessage = errorMessage.pl;
        }

        onNatification(translatedErrorMessage, { autoClose: 4000 });
        return rejectWithValue(error.message);
      }

      onNatification(messageError + error.message, { autoClose: 4000 });
      return rejectWithValue(error.message);
    }
  }
);
