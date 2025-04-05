import styled from '@emotion/styled';

export const NoWordsMessage = styled.p`
  font-size: 25px;
  text-align: center;
  margin-top: 15px;
  margin-bottom: 15px;
  color: red;
`;

export const Img = styled.img`
  @media screen and (max-width: 400px) {
    max-height: 130px;
    flex-basis: 130px;
  }
  border-radius: 20px;
  max-height: 200px;
  flex-basis: 200px;
  margin: 0 auto;
`;

export const NoWordsMessageWrapper = styled.div`
  padding-bottom: 30px;
`;
