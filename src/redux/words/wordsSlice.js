import { createSlice } from '@reduxjs/toolkit';
import {
  getWords,
  getBaseWordsForAuthorized,
  getUserWords,
  addWordToBlockList,
  removeUserWord,
} from './operationsWords';

const handlePending = (state, action) => {
  state.isLoading = true;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
  state.showSpinnerWhenAddsToBlockList = false;
};

const initialState = {
  words: { arrKey: [], arrValue: [], arrAllWords: [], originalWords: [] },
  isLoading: false,
  error: null,
  language: '',
  showSpinnerWhenAddsToBlockList: false,
};

const wordsSlicee = createSlice({
  name: 'words',
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
    setNewStateAfterDellWord(state, action) {
      state.words.arrKey = action.payload.newArrKey;
      state.words.arrValue = action.payload.newArrValue;
      state.words.arrAllWords = action.payload.newArrAllWords;
      state.words.originalWords = action.payload.newOriginalWords;
    },
    removeWords(state) {
      state.words = initialState.words;
    },
  },

  extraReducers: builder => {
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
    builder
      .addCase(addWordToBlockList.pending, state => {
        state.showSpinnerWhenAddsToBlockList = true;
      })
      .addCase(addWordToBlockList.fulfilled, (state, action) => {
        state.words.arrKey = action.payload.newArrKey;
        state.words.arrValue = action.payload.newArrValue;
        state.words.arrAllWords = action.payload.newArrAllWords;
        state.words.originalWords = action.payload.newOriginalWords;
        state.showSpinnerWhenAddsToBlockList = false;
        state.error = null;
      })
      .addCase(addWordToBlockList.rejected, handleRejected);
    builder
      .addCase(removeUserWord.pending, state => {
        state.showSpinnerWhenAddsToBlockList = true;
      })
      .addCase(removeUserWord.fulfilled, (state, action) => {
        state.words.arrKey = action.payload.newArrKey;
        state.words.arrValue = action.payload.newArrValue;
        state.words.arrAllWords = action.payload.newArrAllWords;
        state.words.originalWords = action.payload.newOriginalWords;
        state.showSpinnerWhenAddsToBlockList = false;
        state.error = null;
      })
      .addCase(removeUserWord.rejected, handleRejected);
  },
});

export const words = wordsSlicee.reducer;
export const {
  setLanguage,
  setTranslationWords,
  setWordsKey,
  setWordsValue,
  setNewStateAfterDellWord,
  removeWords,
} = wordsSlicee.actions;
