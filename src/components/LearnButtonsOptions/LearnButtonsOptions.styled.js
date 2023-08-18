import styled from "@emotion/styled";

export const ListBtn = styled.ul`
  max-width: 350px;
  margin: 0 auto 20px auto;
  display: flex;
  gap: 15px;
  li {
    flex: 1;
    position: relative;
  }
`;

export const Btn = styled.button`
  width: 100%;
  height: 100%;
  border: none;
  padding: 5px 30px 5px 5px;
  font-weight: 600;
  border-radius: 10px;
  background-color: #1976d2;
  color: ${({ p: { idx, myChoiceLearn } }) =>
    idx === myChoiceLearn ? "#FF7B14" : "#fff"};
  scale: ${({ p: { idx, myChoiceLearn } }) =>
    idx === myChoiceLearn ? 1.1 : 1};
  box-shadow: ${({ p: { idx, myChoiceLearn } }) =>
    idx === myChoiceLearn
      ? "0px 1px 1px rgba(0, 0, 0, 0.12), 0px 4px 4px rgba(0, 0, 0, 0.06), 1px 4px 6px rgba(0, 0, 0, 0.16)"
      : "none"};
  cursor: pointer;
`;

export const BtnShowModal = styled.button`
  position: absolute;
  cursor: pointer;
  background-color: transparent;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  top: calc(50% - 16px);
  right: 0;
  transition: scale 300ms cubic-bezier(0.4, 0, 0.2, 1);
  padding: 3px;
  :hover,
  :focus {
    scale: 1.2;
    outline: none;
  }
`;
