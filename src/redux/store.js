import { configureStore } from "@reduxjs/toolkit";
import { words } from "./words/wordsSlice";
import { auth } from "./auth/authSlice";

export const store = configureStore({
  reducer: { words, auth },
});
