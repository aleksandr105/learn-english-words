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
