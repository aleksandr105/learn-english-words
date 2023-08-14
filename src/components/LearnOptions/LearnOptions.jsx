import {
  SelectWrapper,
  SelectTitle,
  Select,
  OptionButton,
  OptionButtonsWrapper,
} from "./LearnOptions.styled";
import { useTranslation } from "react-i18next";
import { PiSpeakerSlashDuotone, PiSpeakerHighDuotone } from "react-icons/pi";
import {
  MdOutlineRecordVoiceOver,
  MdOutlineVoiceOverOff,
} from "react-icons/md";
const selectOptions = [
  { value: 1, name: "value fast" },
  { value: 0.5, name: "value medium" },
  { value: 0.2, name: "value slow" },
];

export const LearnOptions = ({ changeOptins, learnOptions }) => {
  const { t } = useTranslation();

  const changeSpeedVoice = (e) => {
    const changedOptions = {
      ...learnOptions,
      select: e.target.value,
    };

    localStorage.setItem("learnOptions", JSON.stringify(changedOptions));
    changeOptins(changedOptions);
  };

  const changeMelody = () => {
    const changedOptions = {
      ...learnOptions,
      melody: !learnOptions.melody,
    };

    localStorage.setItem("learnOptions", JSON.stringify(changedOptions));
    changeOptins(changedOptions);
  };

  const changeVoice = () => {
    const changedOptions = {
      ...learnOptions,
      voice: !learnOptions.voice,
    };

    localStorage.setItem("learnOptions", JSON.stringify(changedOptions));
    changeOptins(changedOptions);
  };

  return (
    <SelectWrapper>
      <div>
        <SelectTitle>{t("learn.select title")}</SelectTitle>
        <Select
          name="speed"
          onChange={changeSpeedVoice}
          value={learnOptions.select}
          disabled={!learnOptions.voice}
          voiceStatus={learnOptions.voice}
        >
          {selectOptions.map(({ value, name }) => (
            <option key={name} value={value}>
              {t(`learn.${name}`)}
            </option>
          ))}
        </Select>
      </div>
      <OptionButtonsWrapper>
        <OptionButton
          onClick={changeVoice}
          optionsVoice={learnOptions.voice}
          id={1}
        >
          {learnOptions.voice ? (
            <MdOutlineRecordVoiceOver size={18} color="#00f" />
          ) : (
            <MdOutlineVoiceOverOff color="#00f" size={18} />
          )}
        </OptionButton>
        <OptionButton
          onClick={changeMelody}
          optionsMelody={learnOptions.melody}
          id={2}
        >
          {!learnOptions.melody ? (
            <PiSpeakerSlashDuotone color="#00f" size={18} />
          ) : (
            <PiSpeakerHighDuotone size={18} color="#00f" />
          )}
        </OptionButton>
      </OptionButtonsWrapper>
    </SelectWrapper>
  );
};
