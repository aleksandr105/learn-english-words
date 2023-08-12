import styled from "@emotion/styled";

export const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  padding-bottom: 40px;
`;

export const Img = styled.img`
  border-radius: 20px;
  max-height: 250px;
  flex-basis: 250px;
`;

export const Title = styled.h3`
  text-align: center;
  color: red;
  font-size: 30px;
`;

export const Text = styled.p`
  margin-top: 50px;
  text-align: center;
  font-weight: 600;
  font-size: 20px;
`;

export const WrapperText = styled.div`
  flex-basis: 250px;
  padding: 20px;
`;
