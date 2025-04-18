import React from 'react';
import notFoundGif from '../../GIFS/giphy.gif';
import { NoWordsMessage, Img, NoWordsMessageWrapper } from './WordsNotFoundMessage.styled';
import { useTranslation } from 'react-i18next';

export const WordsNotFoundMessage = () => {
  const { t } = useTranslation();

  return (
    <NoWordsMessageWrapper>
      <NoWordsMessage>{t('mainDbSettings.noWordsMessage')}</NoWordsMessage>
      <Img src={notFoundGif} alt="Not Found Gif" />
    </NoWordsMessageWrapper>
  );
};
