import styled from "@emotion/styled";

export const SelectWrapper = styled.div`
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

export const Select = styled.select`
  border-radius: 5px;
  height: 28px;
  background-color: ${({ voiceStatus }) => (voiceStatus ? "#5f5" : "#FF0000")};
  color: #00f;
  font-weight: 500;
  border: none;
  :focus {
    outline: none;
    border: none;
  }
`;

export const SelectTitle = styled.span`
  font-weight: 500;
  color: #00f;
  margin-right: 5px;
`;

export const OptionButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 30px;
`;

export const OptionButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  background-color: ${({ optionsVoice, optionsMelody, id }) => {
    if (id === 1) return optionsVoice ? "#5f5" : "#FF0000";
    if (id === 2) return optionsMelody ? "#5f5" : "#FF0000";
  }};
  padding: 5px;
  border-radius: 20px;
`;
