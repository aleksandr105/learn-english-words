export const words = (state) => {
  const arrKey = state.words
    .map((el) => Object.keys(el)[1])
    ?.sort(() => Math.random() - 0.5);
  const arrValue = state.words
    .map((el) => Object.values(el)[1])
    ?.sort(() => Math.random() - 0.5);
  const arrAllWords = state.words;
  return { arrKey, arrValue, arrAllWords };
};

export const loading = (state) => state.isLoading;
