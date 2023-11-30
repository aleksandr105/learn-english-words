import { toast } from "react-toastify";

export const onPlay = (file) => {
  const audio = new Audio(file);
  return new Promise((resolve) => {
    audio.addEventListener("ended", () => {
      resolve();
    });
    audio.play();
  });
};

export const onNatification = (
  message = "",
  {
    position = "top-center",
    autoClose = false,
    hideProgressBar = false,
    closeOnClick = true,
    pauseOnHover = true,
    draggable = true,
    progress = undefined,
    theme = "light",
    type = "error",
  }
) => {
  toast[type](message, {
    position,
    autoClose,
    hideProgressBar,
    closeOnClick,
    pauseOnHover,
    draggable,
    progress,
    theme,
  });
};

export const setWordsToRedux = ({ data, currentLanguage }) => {
  let language = 0;

  switch (currentLanguage) {
    case "ua":
      language = 1;
      break;

    case "ru":
      language = 2;
      break;

    default:
      language = 0;
  }

  const arrKey = data
    .map((el) => Object.keys(el)[1])
    ?.sort(() => Math.random() - 0.5);

  const arrValue = data
    .map((el) => Object.values(el)[1][language])
    ?.sort(() => Math.random() - 0.5);

  const arrAllWords = data.map((el) => {
    return {
      _id: el._id,
      [Object.keys(el)[1]]: el[Object.keys(el)[1]][language],
    };
  });

  return { arrKey, arrValue, arrAllWords };
};

export const onChooseWordsForLanguage = (data, keys, currentLanguage) => {
  let language = 0;

  switch (currentLanguage) {
    case "ua":
      language = 1;
      break;

    case "ru":
      language = 2;
      break;

    default:
      language = 0;
  }

  const arrAllWords = data.map((el) => {
    return {
      _id: el._id,
      [Object.keys(el)[1]]: el[Object.keys(el)[1]][language],
    };
  });

  const arrValue = arrAllWords
    .filter((el) => keys.includes(Object.keys(el)[1]))
    .map((el) => Object.values(el)[1])
    .sort(() => Math.random() - 0.5);

  return { arrValue, arrAllWords };
};
