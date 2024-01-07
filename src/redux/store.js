import { configureStore } from "@reduxjs/toolkit";
import { words } from "./words/wordsSlice";
import { auth } from "./auth/authSlice";
import { settings } from "./userSettings/userSettingsSlice";
import { settingsDictionary } from "./dictionarySettings/dictionarySettingsSlice";

export const store = configureStore({
  reducer: { words, auth, settings, settingsDictionary },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["settingsDictionary/addUserWord/fulfilled"],
      },
    }),
});
