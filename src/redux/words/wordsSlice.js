import { createSlice } from "@reduxjs/toolkit";
import { getWords } from "./operationsWords";

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

const wordsSlicee = createSlice({
  name: "words",
  initialState,

  extraReducers: (builder) => {
    builder
      .addCase(getWords.pending, handlePending)
      .addCase(getWords.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.words = action.payload;
      })
      .addCase(getWords.rejected, handleRejected);
  },
});

export const wordsReducer = wordsSlicee.reducer;
