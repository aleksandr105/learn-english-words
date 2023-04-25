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

export const onSpeak = ({ text, volume = 1, rate = 1, pitch = 0 }) => {
  const speaker = new SpeechSynthesisUtterance();
  speaker.text = text.trim();
  speaker.volume = volume;
  speaker.rate = rate;
  speaker.pitch = pitch;
  let voices = speechSynthesis.getVoices();
  speaker.voice = voices[5];
  speechSynthesis.speak(speaker);
  return new Promise((resolve) => (speaker.onend = () => resolve()));
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
