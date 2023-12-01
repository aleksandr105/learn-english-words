import { createSlice } from "@reduxjs/toolkit";
import { getBlockListWords } from "./operationDictionarySettings";

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
      })
      .addCase(getBlockListWords.rejected, handleRejected);
  },
});

export const settingsDictionary = dictionarySettingsSlice.reducer;
export const { deleteWords } = dictionarySettingsSlice.actions;
