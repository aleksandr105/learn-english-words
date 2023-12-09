import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../axiosSettings";

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
