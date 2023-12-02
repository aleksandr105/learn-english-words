import { createSlice } from "@reduxjs/toolkit";
import {
  getBlockListWords,
  removeWordFromBlockList,
} from "./operationDictionarySettings";

const handlePending = (state, action) => {
  state.isLoading = true;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const initialState = {
  words: [],
  isLoading: false,
  isLoadingDellFromBlockList: false,
  error: null,
};

const dictionarySettingsSlice = createSlice({
  name: "settingsDictionary",
  initialState,

  reducers: {
    deleteWords(state, action) {
      state.words = [];
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getBlockListWords.pending, handlePending)
      .addCase(getBlockListWords.fulfilled, (state, action) => {
        state.words = action.payload;
        state.isLoading = false;
      })
      .addCase(getBlockListWords.rejected, handleRejected);
    builder
      .addCase(removeWordFromBlockList.pending, (state, action) => {
        state.isLoadingDellFromBlockList = true;
      })
      .addCase(removeWordFromBlockList.fulfilled, (state, action) => {
        state.words = action.payload;
        state.isLoadingDellFromBlockList = false;
      })
      .addCase(removeWordFromBlockList.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoadingDellFromBlockList = false;
      });
  },
});

export const settingsDictionary = dictionarySettingsSlice.reducer;
export const { deleteWords } = dictionarySettingsSlice.actions;
