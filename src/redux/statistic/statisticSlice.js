import { createSlice } from "@reduxjs/toolkit";
import { getStatistic } from "./statisticOperation";

const handlePending = (state, action) => {
  state.loading = true;
};

const handleRejected = (state, action) => {
  state.loading = false;
};

const initialState = {
  allLessons: 0,
  correctAnswers: 0,
  incorrectAnswers: 0,
  successLessonPercentage: "0%",
  errorLessonPercentage: "0%",
  learnedWordsCount: "0",
  wordsToLearn: 0,
  personalDictionaryCount: 0,
  loading: false,
};

const statisticSlice = createSlice({
  name: "statistic",
  initialState,

  extraReducers: (builder) => {
    builder
      .addCase(getStatistic.pending, handlePending)
      .addCase(getStatistic.fulfilled, (state, action) => {
        const {
          allLessons,
          correctAnswers,
          incorrectAnswers,
          successLessonPercentage,
          errorLessonPercentage,
          learnedWordsCount,
          wordsToLearn,
          personalDictionaryCount,
        } = action.payload;

        state.allLessons = allLessons;
        state.correctAnswers = correctAnswers;
        state.incorrectAnswers = incorrectAnswers;
        state.successLessonPercentage = `${successLessonPercentage}%`;
        state.errorLessonPercentage = `${errorLessonPercentage}%`;
        state.learnedWordsCount = learnedWordsCount;
        state.wordsToLearn = wordsToLearn;
        state.personalDictionaryCount = personalDictionaryCount;
        state.loading = false;
      })
      .addCase(getStatistic.rejected, handleRejected);
  },
});

export const { reducer: statistic } = statisticSlice;
