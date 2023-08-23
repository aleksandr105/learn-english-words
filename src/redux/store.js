import { configureStore } from "@reduxjs/toolkit";
import { words } from "./words/wordsSlice";
import { auth } from "./auth/authSlice";
import { settings } from "./userSettings/userSettingsSlice";

export const store = configureStore({
  reducer: { words, auth, settings },
});
