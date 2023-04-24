import { configureStore } from "@reduxjs/toolkit";
import { wordsReducer } from "./words/wordsSlice";

export const store = configureStore({
  reducer: wordsReducer,
});
