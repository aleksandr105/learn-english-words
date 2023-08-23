import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../axiosSettings";

export const getWords = createAsyncThunk(
  "words/getAllWords",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await instance.get("/words");

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getBaseWordsForAuthorized = createAsyncThunk(
  "words/getBaseWordsForAuthorized",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await instance.get("words/get_words_for_authorized");

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getUserWords = createAsyncThunk(
  "words/getUserWords",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await instance.get("words/get_user_words");

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
