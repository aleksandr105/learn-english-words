import {
  SelectWrapper,
  SelectTitle,
  Select,
  OptionButton,
  OptionButtonsWrapper,
} from './LearnOptions.styled';
import { useTranslation } from 'react-i18next';
import { PiSpeakerSlashDuotone, PiSpeakerHighDuotone } from 'react-icons/pi';
import { MdOutlineRecordVoiceOver, MdOutlineVoiceOverOff } from 'react-icons/md';
import { allSettings } from '../../redux/userSettings/selectors';
import { useDispatch, useSelector } from 'react-redux';
import {
  setSelect,
  setMelody,
  setVoice,
  setSettings,
} from '../../redux/userSettings/userSettingsSlice';
import { useEffect } from 'react';
import { useSpeaker } from '../../hooks/useSpeaker';
import { onNatification } from '../../helpers';
import { isLoggedIn } from '../../redux/auth/selectors';

const selectOptions = [
  { value: 1, name: 'value fast' },
  { value: 0.5, name: 'value medium' },
  { value: 0.2, name: 'value slow' },
];

export const LearnOptions = () => {
  const { t } = useTranslation();
  const learnOptions = useSelector(allSettings);
  const loggedIn = useSelector(isLoggedIn);
  const dispatch = useDispatch();
  const canUseSpeaker = useSpeaker();
  const isDisabledVoiceBtn = learnOptions.voice && canUseSpeaker;

  useEffect(() => {
    dispatch(setSettings(JSON.parse(localStorage.getItem('learnOptions'))));
  }, [dispatch, loggedIn]);

  const changeSpeedVoice = e => {
    const changedOptions = {
      ...learnOptions,
      select: e.target.value,
    };

    localStorage.setItem('learnOptions', JSON.stringify(changedOptions));
    dispatch(setSelect(e.target.value));
  };

  const changeMelody = () => {
    const changedOptions = {
      ...learnOptions,
      melody: !learnOptions.melody,
    };

    localStorage.setItem('learnOptions', JSON.stringify(changedOptions));
    dispatch(setMelody());
  };

  const changeVoice = () => {
    if (!canUseSpeaker) {
      onNatification(t('notification.cantUseSpeacer'), { autoClose: 5000, closeOnClick: false });
      return;
    }

    const changedOptions = {
      ...learnOptions,
      voice: !learnOptions.voice,
    };

    localStorage.setItem('learnOptions', JSON.stringify(changedOptions));
    dispatch(setVoice());
  };

  return (
    <SelectWrapper>
      <div>
        <SelectTitle>{t('learn.select title')}</SelectTitle>
        <Select
          name="speed"
          onChange={changeSpeedVoice}
          value={learnOptions.select}
          disabled={!isDisabledVoiceBtn}
          voiceStatus={isDisabledVoiceBtn}
        >
          {selectOptions.map(({ value, name }) => (
            <option key={name} value={value}>
              {t(`learn.${name}`)}
            </option>
          ))}
        </Select>
      </div>
      <OptionButtonsWrapper>
        <OptionButton onClick={changeVoice} optionsVoice={isDisabledVoiceBtn} id={1}>
          {isDisabledVoiceBtn ? (
            <MdOutlineRecordVoiceOver size={18} color="#00f" />
          ) : (
            <MdOutlineVoiceOverOff color="#00f" size={18} />
          )}
        </OptionButton>
        <OptionButton onClick={changeMelody} optionsMelody={learnOptions.melody} id={2}>
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
