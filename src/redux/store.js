import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { words } from './words/wordsSlice';
import { auth } from './auth/authSlice';
import { settings } from './userSettings/userSettingsSlice';
import { settingsDictionary } from './dictionarySettings/dictionarySettingsSlice';
import { statistic } from './statistic/statisticSlice';
import { logout, login } from './auth/authOperations';

const appReducer = combineReducers({
  words,
  auth,
  settings,
  settingsDictionary,
  statistic,
});

const rootReducer = (state, action) => {
  if (action.type === logout.fulfilled.type || action.type === login.fulfilled.type) {
    state = undefined;
  }
  return appReducer(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['settingsDictionary/addUserWord/fulfilled'],
      },
    }),
});
