import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  myChoiceLearn: 0,
  select: 1,
  voice: true,
  melody: true,
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,

  reducers: {
    setSettings(state, { payload }) {
      state.myChoiceLearn = payload.myChoiceLearn;
      state.select = payload.select;
      state.voice = payload.voice;
      state.melody = payload.melody;
    },
    setMyChoiceLearn(state, { payload }) {
      state.myChoiceLearn = payload;
    },
    setSelect(state, { payload }) {
      state.select = payload;
    },
    setVoice(state) {
      state.voice = !state.voice;
    },
    setMelody(state) {
      state.melody = !state.melody;
    },
  },
});

export const settings = settingsSlice.reducer;

export const { setSettings, setMyChoiceLearn, setSelect, setVoice, setMelody } =
  settingsSlice.actions;
