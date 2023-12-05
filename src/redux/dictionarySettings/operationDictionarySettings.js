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
