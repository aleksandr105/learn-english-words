export const useSpeaker = () => {
  const speaker = new SpeechSynthesisUtterance();

  const speak = ({ text, volume = 1, rate = 1, pitch = 1 }) => {
    speaker.lang = "en-US";
    speaker.text = text.trim();
    speaker.volume = volume;
    speaker.rate = rate;
    speaker.pitch = pitch;
    speechSynthesis.speak(speaker);
    return new Promise((resolve) => (speaker.onend = () => resolve()));
  };
  return speak;
};
