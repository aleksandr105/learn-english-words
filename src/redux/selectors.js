export const words = (state) => {
  let language = 0;

  const languageStatus = state.language;

  switch (languageStatus) {
    case "ua":
      language = 1;
      break;

    case "ru":
      language = 2;
      break;

    default:
      language = 0;
  }

  const arrKey = state.words
    .map((el) => Object.keys(el)[1])
    ?.sort(() => Math.random() - 0.5);

  const arrValue = state.words
    .map((el) => Object.values(el)[1][language])
    ?.sort(() => Math.random() - 0.5);

  const arrAllWords = state.words.map((el) => {
    return {
      _id: el._id,
      [Object.keys(el)[1]]: el[Object.keys(el)[1]][language],
    };
  });

  return { arrKey, arrValue, arrAllWords };
};

export const loading = (state) => state.isLoading;
