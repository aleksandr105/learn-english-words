import styled from "@emotion/styled";

export const Section = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
`;

export const Wrapper = styled.div`
  box-shadow: 0 6px 6px rgba(0, 0, 0, 0.4);
  background-color: #dddddd;
  border-radius: 10px;
  padding: 20px 10px;
  @media screen and (max-width: 400px) {
    width: 100%;
  }
  @media screen and (min-width: 401px) {
    width: 500px;
  }
`;

export const Title = styled.h3`
  text-align: center;
`;

export const List = styled.ul`
  margin-top: 20px;
`;

export const Item = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid rgb(255, 180, 66);
  padding: 3px;
  :not(:last-child) {
    margin-bottom: 8px;
  }
`;

export const Field = styled.p`
  padding-right: 20px;
`;

export const Result = styled.p`
  white-space: nowrap;
`;
