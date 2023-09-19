import { createSlice } from "@reduxjs/toolkit";
import {
  getWords,
  getBaseWordsForAuthorized,
  getUserWords,
} from "./operationsWords";

const handlePending = (state, action) => {
  state.isLoading = true;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const initialState = {
  words: { arrKey: [], arrValue: [], arrAllWords: [], originalWords: [] },
  isLoading: false,
  error: null,
  language: "",
};

const wordsSlicee = createSlice({
  name: "words",
  initialState,

  reducers: {
    setLanguage(state, action) {
      state.language = action.payload;
    },
    setTranslationWords(state, action) {
      state.words.arrValue = action.payload.arrValue;
      state.words.arrAllWords = action.payload.arrAllWords;
    },
    setWordsKey(state, action) {
      state.words.arrKey = action.payload;
    },
    setWordsValue(state, action) {
      state.words.arrValue = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getWords.pending, handlePending)
      .addCase(getWords.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.words = action.payload;
      })
      .addCase(getWords.rejected, handleRejected);
    builder
      .addCase(getBaseWordsForAuthorized.pending, handlePending)
      .addCase(getBaseWordsForAuthorized.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.words = action.payload;
      })
      .addCase(getBaseWordsForAuthorized.rejected, handleRejected);
    builder
      .addCase(getUserWords.pending, handlePending)
      .addCase(getUserWords.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.words = action.payload;
      })
      .addCase(getUserWords.rejected, handleRejected);
  },
});

export const words = wordsSlicee.reducer;
export const { setLanguage, setTranslationWords, setWordsKey, setWordsValue } =
  wordsSlicee.actions;
