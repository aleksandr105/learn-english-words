import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../axiosSettings";
import { setWordsToRedux } from "../../helpers";

export const getWords = createAsyncThunk(
  "words/getAllWords",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await instance.get("/words");

      return {
        ...setWordsToRedux({ data, currentLanguage: payload }),
        originalWords: data,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getBaseWordsForAuthorized = createAsyncThunk(
  "words/getBaseWordsForAuthorized",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await instance.get("words/get_words_for_authorized");
      return {
        ...setWordsToRedux({ data, currentLanguage: payload }),
        originalWords: data,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getUserWords = createAsyncThunk(
  "words/getUserWords",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await instance.get("words/get_user_words");
      return {
        ...setWordsToRedux({ data, currentLanguage: payload }),
        originalWords: data,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
