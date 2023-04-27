import { useState, useEffect } from "react";

export const useSpeaker = () => {
  const [voices, setVoices] = useState([]);

  const speaker = new SpeechSynthesisUtterance();

  useEffect(() => {
    if (!voices.length) {
      setVoices(window.speechSynthesis.getVoices());

      console.log("fsdfsdf");
    }
  }, [voices]);
  console.log(voices);
  const speak = ({ text, volume = 1, rate = 1, pitch = 0, lang = 5 }) => {
    speaker.voice = voices[lang];
    speaker.text = text.trim();
    speaker.volume = volume;
    speaker.rate = rate;
    speaker.pitch = pitch;
    window.speechSynthesis.speak(speaker);
    return new Promise((resolve) => (speaker.onend = () => resolve()));
  };

  return [speak, voices];
};
