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
