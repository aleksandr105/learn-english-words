import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../axiosSettings";

export const getBlockListWords = createAsyncThunk(
  "settingsDictionary/getBlockList",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await instance.get("words/get_words_block_list");
      return data;
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
