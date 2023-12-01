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
